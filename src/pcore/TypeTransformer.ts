import * as ts from "typescript";
import {Expression, Identifier, isFunctionLike} from "typescript";
import {StringMap} from "./Util";

/**
 * Transform the string representation of a TypeScript type definition into
 * a string representation of its corresponding Pcore type.
 * @param tsType - String representation of the TypeScript type to convert
 * @returns String representation of the resulting Puppet type.
 */
export function toPcoreType(tsType : string) : string {
  return transformType(parseType(tsType));
}

function transformTypeName(typeName: string) : string {
  switch(typeName) {
  case 'string':
    return 'String';
  case 'any':
    return 'Any';
  case 'object':
    return 'Hash';
  case 'number':
  case 'Number':
  case 'Decimal':
    return 'Float';
  case 'boolean':
    return 'Boolean';
  case 'integer':
  case 'bigint':
    return 'Integer';
  case 'Date':
    return 'Timestamp';
  case 'RegExp':
    return 'Regexp';
  default:
    return typeName;
  }
}

/**
 * inferWorkflowTypes uses the TypeScript compiler to infer the types of input arguments and
 * actions and resources.
 * @param fn
 * @param content
 */
export function inferWorkflowTypes(sources : Array<string>) : StringMap {
  let program = ts.createProgram(sources, {
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.CommonJS,
  })

  let checker = program.getTypeChecker();

  let collector = {};
  let path = [];

  let collect = (name : string, value : any) => {
    let leaf = collector;
    path.forEach((p) => {
      let b = leaf[p];
      if(b === undefined) {
        b = {};
        leaf[p] = b;
      }
      leaf = b;
    })
    leaf[name] = value;
  }

  let expectKind = <T extends ts.Node>(n : ts.Node, okFunc : (n : ts.Node) => n is T, expected : string) : T => {
    if(!okFunc(n)) {
      throw new Error(`expected node of ${expected} type. Got kind: ${n.kind}`)
    }
    return n;
  };

  let expectHash = (na : ts.NodeArray<Expression>) : ts.ObjectLiteralExpression => {
    if(na.length == 1) {
      return expectKind(na[0], ts.isObjectLiteralExpression, 'object literal')
    }
    throw new Error(`expected exactly one parameter of type object literal`);
  };

  let traverseProperties = (o : ts.ObjectLiteralExpression, tf : (pa : ts.PropertyAssignment) => void) => {
    o.properties.forEach((p) => tf(expectKind(p, ts.isPropertyAssignment, 'property assignment')));
  };

  let traverseAction = (o : ts.ObjectLiteralExpression) => {
  };

  let traverseWorkflow = (o : ts.ObjectLiteralExpression) => {
    traverseProperties(o, traverseWorkflowProperty);
  };

  let traversePtypeBody = (n : ts.Node) => {
    // Extract the string literal from __ptype function
    //
    // __ptype() : string {
    //   return "Some::Type::Name";
    // }
    if(ts.isStringLiteral(n)) {
      collect('type', n.text)
    } else {
      ts.forEachChild(n, traversePtypeBody);
    }
  };

  let traverseObjectType = (o : ts.Node) => {
    // Find the __ptype() function and traverse its body
    if(ts.isMethodDeclaration(o)) {
      if(o.name.getText() === '__ptype') {
        traversePtypeBody(o.body)
      }
    } else {
      ts.forEachChild(o, traverseObjectType);
    }
  };

  let traverseResourceProperty = (pa: ts.PropertyAssignment) => {
    if(pa.name.getText() === 'state' && isFunctionLike(pa.initializer)) {
      // Infer type information about input and state type
      let f = (<ts.FunctionLikeDeclaration>pa.initializer);

      // The type of the initializer must be the type of the state itself.
      // Let the checker find out what type that is so that we can extract
      // the actual type from its __ptype() function
      checker.getTypeAtLocation(f).getCallSignatures().forEach((s) => {
        s.getReturnType().symbol.declarations.forEach(traverseObjectType);
      });

      // Extract the parameter types. Those are the types for the resource input variables
      let params = {};
      f.parameters.forEach((p) => {
        params[p.name.getText()] = p.type === undefined ? 'any' : p.type.getText();
      });
      collect('input', params);
    }
  };

  let traverseResource = (o : ts.ObjectLiteralExpression) => {
    traverseProperties(o, traverseResourceProperty);
  };

  // Traverses the workflow hash
  let traverseWorkflowProperty = (n : ts.PropertyAssignment) => {
    if(n.name.getText() !== 'activities')
      return;

    let o = expectKind(n.initializer, ts.isObjectLiteralExpression, 'object literal');
    o.properties.forEach((p) => {
      let pa = expectKind(p, ts.isPropertyAssignment, 'property assignment');
      let f = expectKind(pa.initializer, ts.isCallExpression, 'call');
      let c = f.expression;
      if(ts.isIdentifier(c)) {
        let key = (<Identifier>c).text;
        switch (key) {
        case 'resource':
          path.push(pa.name.getText());
          traverseResource(expectHash(f.arguments));
          path.pop();
          break;
        case 'action':
          path.push(pa.name.getText());
          traverseAction(expectHash(f.arguments));
          path.pop();
          break;
        case 'workflow':
          path.push(pa.name.getText());
          traverseWorkflow(expectHash(f.arguments));
          path.pop();
          break;
        }
      }
    });
  };

  let traverse = (o : ts.Node) => {
    switch(o.kind) {
    case ts.SyntaxKind.CallExpression:
      let f = (<ts.CallExpression>o);
      let c = f.expression;
      if(ts.isIdentifier(c)) {
        let key = (<Identifier>c).text;
        switch (key) {
        case 'resource':
          traverseResource(expectHash(f.arguments));
          return;
        case 'action':
          traverseAction(expectHash(f.arguments));
          return;
        case 'workflow':
          traverseWorkflow(expectHash(f.arguments));
          return;
        }
      }
    }
    ts.forEachChild(o, traverse);
  };

  for(const n of sources) {
    ts.forEachChild(program.getSourceFile(n), traverse);
  }
  return collector;
}

function parseType(t : string) : ts.TypeNode {
  let fn = '/parameter/type.ts';
  let sf = ts.createSourceFile(fn, 'var x:' + t + ';', ts.ScriptTarget.ES2018, true);
  let diag = ts.createProgram([fn], {}).getSyntacticDiagnostics(sf);
  if(diag.length > 0) {
    throw new Error(`'${t}' is not a valid type definition`);
  }
  return (<ts.VariableStatement>sf.statements[0]).declarationList.declarations[0].type;
}

function typeTransformationError(t : ts.TypeNode) : never {
  throw new Error("unable to convert type '" + t.getFullText() + "'");
}

/**
 * Converts a type reference in the form Array<string> to Array[String]
 * @param tr
 */
function transformTypeReference(tr : ts.TypeReferenceNode) : string {
  let args = tr.typeArguments;
  let name = transformTypeName(tr.typeName.getText());
  if(args !== undefined && args.length > 0) {
    name += '[';
    let first = true;
    args.forEach((arg) => {
      if(first) {
        first = false;
      } else {
        name += ',';
      }
      name += transformType(arg);
    });
    name += ']';
  }
  return name;
}

/**
 * Converts a type literal in the form <code>{ x: string, y: number }</code> into
 * <code>Struct['x' => String, 'y' => Float]</code> and <code>{ [s: string]: boolean }</code> into
 * <code>Hash[String,Boolean]</code>.
 * @param tl
 */
function transformTypeLiteral(tl : ts.TypeLiteralNode) : string {
  let args = tl.members;
  switch(args.length) {
  case 0:
    return 'Hash';
  case 1:
    let arg = args[0];
    if (ts.isIndexSignatureDeclaration(arg)) {
      let pn = (<ts.IndexSignatureDeclaration>arg);
      let params = pn.parameters;
      if (params.length == 1) {
        // This is a hash declaration.
        return 'Hash[' + transformType(params[0].type) + ',' + transformType(pn.type) + ']';
      }
      typeTransformationError(tl);
    }
    // Fall through to default
  default:
    if(!ts.isPropertySignature(args[0])) {
      typeTransformationError(tl);
    }
    let name = 'Struct[';
    for(let i = 0; i < args.length; i++) {
      let ps = <ts.PropertySignature>args[i];
      if(i > 0) {
        name += ',';
      }
      if(ps.questionToken === undefined) {
        name += "'" + ps.name.getText() + "' => "
      } else {
        name += "Optional['" + ps.name.getText() + "'] => "
      }
      name += transformType(ps.type);
    }
    return name + ']';
  }
}

/**
 * Converts a tuple in the form <code>[string, number]</code> into <code>Tuple[String, Float]</code>. Optional
 * and captures rest are both handled so <code>[string, boolean?, ...number]</code> becomes
 * <code>Tuple[String,Boolean,Float,1]</code> and <code>[string, boolean?, number?] becomes
 * <code>Tuple[String,Boolean,Float,1,3]</code>.
 * @param tn
 */
function transformTupleType(tn : ts.TupleTypeNode) : string {
  let args = tn.elementTypes;
  let name = 'Tuple[';
  let min = -1;
  let rest = false;
  for(let i = 0; i < args.length; i++) {
    if(i > 0) {
      name += ',';
    }
    let arg = args[i];
    switch(arg.kind) {
    case ts.SyntaxKind.OptionalType:
      arg = (<ts.OptionalTypeNode>arg).type;
      if(min < 0) {
        min = i;
      }
      break;
    case ts.SyntaxKind.RestType:
      if(min < 0) {
        min = i;
      }
      arg = (<ts.RestTypeNode>arg).type;
      rest = true;
      break;
    default:
      if(min >= 0) {
        throw new Error("required type cannot follow optional in tuple")
      }
    }
    name += transformType(arg);
  }
  if(min >= 0) {
    name += ',';
    name += min;
    if(!rest) {
      name += ',';
      name += args.length;
    }
  }
  return name + ']';
}

/**
 * Converts a union in the form <code>string | number</code> into <code>Variant[String, Float]</code>
 * @param ut
 */
function transformUnionType(ut : ts.UnionTypeNode) : string {
  // Union of string literals is an Enum
  let strings : string[] = [];
  let others : ts.TypeNode[] = [];

  ut.types.forEach(t => {
    if(ts.isLiteralTypeNode(t)) {
      let lt = <ts.LiteralTypeNode>t;
      if(ts.isStringLiteral(lt.literal)) {
        strings.push((<ts.LiteralExpression>lt.literal).text);
        return;
      }
    }
    others.push(t);
  });

  if(others.length > 0) {
    let name = 'Variant[';
    let first = true;
    if(strings.length > 0) {
      name += transformEnum(strings);
      first = false;
    }
    others.forEach(t => {
      if(first) {
        first = false;
      } else {
        name += ',';
      }
      name += transformType(t);
    });
    return name + ']';
  }
  return transformEnum(strings);
}

function transformEnum(enums : string[]) : string {
  let name = 'Enum[';
  for(let i = 0; i < enums.length; i++) {
    if(i > 0) {
      name += ',';
    }
    name += "'" + enums[i] + "'";
  }
  name += ']';
  return name;
}


function transformLiteralType(lt: ts.LiteralTypeNode) : string {
  if(ts.isStringLiteral(lt.literal)) {
    let expr = <ts.LiteralExpression>lt.literal;
    if(expr.kind == ts.SyntaxKind.StringLiteral) {
      return "Enum['" + expr.text + "']";
    }
  }
  typeTransformationError(lt);
}

/**
 * Transform a ts.TypeNode into a string representation of a Puppet Type Definition.
 * @param t
 */
function transformType(t : ts.TypeNode) : string {
  if(ts.isArrayTypeNode(t)) {
    return 'Array[' + transformType((<ts.ArrayTypeNode>t).elementType) + ']';
  }

  if(ts.isTypeReferenceNode(t)) {
    return transformTypeReference(<ts.TypeReferenceNode>t);
  }

  if (ts.isTypeLiteralNode(t)) {
    return transformTypeLiteral(<ts.TypeLiteralNode>t);
  }

  if(ts.isTupleTypeNode(t)) {
    return transformTupleType(<ts.TupleTypeNode>t);
  }

  if(ts.isUnionTypeNode(t)) {
    return transformUnionType((<ts.UnionTypeNode>t));
  }

  if(ts.isLiteralTypeNode(t)) {
    return transformLiteralType(<ts.LiteralTypeNode>t);
  }

  let tn = ts.tokenToString(t.kind);
  if(tn === undefined) {
    typeTransformationError(t);
  }
  return transformTypeName(tn);
}
