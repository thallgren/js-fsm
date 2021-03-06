/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var datapb_data_pb = require('../datapb/data_pb.js');
goog.exportSymbol('proto.puppet.fsm.Action', null, global);
goog.exportSymbol('proto.puppet.fsm.Actor', null, global);
goog.exportSymbol('proto.puppet.fsm.ActorRequest', null, global);
goog.exportSymbol('proto.puppet.fsm.Message', null, global);
goog.exportSymbol('proto.puppet.fsm.Parameter', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.puppet.fsm.Parameter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.puppet.fsm.Parameter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.puppet.fsm.Parameter.displayName = 'proto.puppet.fsm.Parameter';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.puppet.fsm.Parameter.prototype.toObject = function(opt_includeInstance) {
  return proto.puppet.fsm.Parameter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.puppet.fsm.Parameter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Parameter.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    type: jspb.Message.getFieldWithDefault(msg, 2, ""),
    lookup: (f = msg.getLookup()) && datapb_data_pb.Data.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.puppet.fsm.Parameter}
 */
proto.puppet.fsm.Parameter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.puppet.fsm.Parameter;
  return proto.puppet.fsm.Parameter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.puppet.fsm.Parameter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.puppet.fsm.Parameter}
 */
proto.puppet.fsm.Parameter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 3:
      var value = new datapb_data_pb.Data;
      reader.readMessage(value,datapb_data_pb.Data.deserializeBinaryFromReader);
      msg.setLookup(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.puppet.fsm.Parameter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.puppet.fsm.Parameter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.puppet.fsm.Parameter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Parameter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getLookup();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      datapb_data_pb.Data.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.puppet.fsm.Parameter.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.puppet.fsm.Parameter.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string type = 2;
 * @return {string}
 */
proto.puppet.fsm.Parameter.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.puppet.fsm.Parameter.prototype.setType = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional puppet.datapb.Data lookup = 3;
 * @return {?proto.puppet.datapb.Data}
 */
proto.puppet.fsm.Parameter.prototype.getLookup = function() {
  return /** @type{?proto.puppet.datapb.Data} */ (
    jspb.Message.getWrapperField(this, datapb_data_pb.Data, 3));
};


/** @param {?proto.puppet.datapb.Data|undefined} value */
proto.puppet.fsm.Parameter.prototype.setLookup = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.puppet.fsm.Parameter.prototype.clearLookup = function() {
  this.setLookup(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.puppet.fsm.Parameter.prototype.hasLookup = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.puppet.fsm.ActorRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.puppet.fsm.ActorRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.puppet.fsm.ActorRequest.displayName = 'proto.puppet.fsm.ActorRequest';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.puppet.fsm.ActorRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.puppet.fsm.ActorRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.puppet.fsm.ActorRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.ActorRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.puppet.fsm.ActorRequest}
 */
proto.puppet.fsm.ActorRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.puppet.fsm.ActorRequest;
  return proto.puppet.fsm.ActorRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.puppet.fsm.ActorRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.puppet.fsm.ActorRequest}
 */
proto.puppet.fsm.ActorRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.puppet.fsm.ActorRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.puppet.fsm.ActorRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.puppet.fsm.ActorRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.ActorRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.puppet.fsm.ActorRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.puppet.fsm.ActorRequest.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.puppet.fsm.Actor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.puppet.fsm.Actor.repeatedFields_, null);
};
goog.inherits(proto.puppet.fsm.Actor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.puppet.fsm.Actor.displayName = 'proto.puppet.fsm.Actor';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.puppet.fsm.Actor.repeatedFields_ = [1,2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.puppet.fsm.Actor.prototype.toObject = function(opt_includeInstance) {
  return proto.puppet.fsm.Actor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.puppet.fsm.Actor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Actor.toObject = function(includeInstance, msg) {
  var f, obj = {
    actionsList: jspb.Message.toObjectList(msg.getActionsList(),
    proto.puppet.fsm.Action.toObject, includeInstance),
    inputList: jspb.Message.toObjectList(msg.getInputList(),
    proto.puppet.fsm.Parameter.toObject, includeInstance),
    outputList: jspb.Message.toObjectList(msg.getOutputList(),
    proto.puppet.fsm.Parameter.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.puppet.fsm.Actor}
 */
proto.puppet.fsm.Actor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.puppet.fsm.Actor;
  return proto.puppet.fsm.Actor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.puppet.fsm.Actor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.puppet.fsm.Actor}
 */
proto.puppet.fsm.Actor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.puppet.fsm.Action;
      reader.readMessage(value,proto.puppet.fsm.Action.deserializeBinaryFromReader);
      msg.addActions(value);
      break;
    case 2:
      var value = new proto.puppet.fsm.Parameter;
      reader.readMessage(value,proto.puppet.fsm.Parameter.deserializeBinaryFromReader);
      msg.addInput(value);
      break;
    case 3:
      var value = new proto.puppet.fsm.Parameter;
      reader.readMessage(value,proto.puppet.fsm.Parameter.deserializeBinaryFromReader);
      msg.addOutput(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.puppet.fsm.Actor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.puppet.fsm.Actor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.puppet.fsm.Actor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Actor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getActionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.puppet.fsm.Action.serializeBinaryToWriter
    );
  }
  f = message.getInputList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.puppet.fsm.Parameter.serializeBinaryToWriter
    );
  }
  f = message.getOutputList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.puppet.fsm.Parameter.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Action actions = 1;
 * @return {!Array.<!proto.puppet.fsm.Action>}
 */
proto.puppet.fsm.Actor.prototype.getActionsList = function() {
  return /** @type{!Array.<!proto.puppet.fsm.Action>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.puppet.fsm.Action, 1));
};


/** @param {!Array.<!proto.puppet.fsm.Action>} value */
proto.puppet.fsm.Actor.prototype.setActionsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.puppet.fsm.Action=} opt_value
 * @param {number=} opt_index
 * @return {!proto.puppet.fsm.Action}
 */
proto.puppet.fsm.Actor.prototype.addActions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.puppet.fsm.Action, opt_index);
};


proto.puppet.fsm.Actor.prototype.clearActionsList = function() {
  this.setActionsList([]);
};


/**
 * repeated Parameter input = 2;
 * @return {!Array.<!proto.puppet.fsm.Parameter>}
 */
proto.puppet.fsm.Actor.prototype.getInputList = function() {
  return /** @type{!Array.<!proto.puppet.fsm.Parameter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.puppet.fsm.Parameter, 2));
};


/** @param {!Array.<!proto.puppet.fsm.Parameter>} value */
proto.puppet.fsm.Actor.prototype.setInputList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.puppet.fsm.Parameter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.puppet.fsm.Parameter}
 */
proto.puppet.fsm.Actor.prototype.addInput = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.puppet.fsm.Parameter, opt_index);
};


proto.puppet.fsm.Actor.prototype.clearInputList = function() {
  this.setInputList([]);
};


/**
 * repeated Parameter output = 3;
 * @return {!Array.<!proto.puppet.fsm.Parameter>}
 */
proto.puppet.fsm.Actor.prototype.getOutputList = function() {
  return /** @type{!Array.<!proto.puppet.fsm.Parameter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.puppet.fsm.Parameter, 3));
};


/** @param {!Array.<!proto.puppet.fsm.Parameter>} value */
proto.puppet.fsm.Actor.prototype.setOutputList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.puppet.fsm.Parameter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.puppet.fsm.Parameter}
 */
proto.puppet.fsm.Actor.prototype.addOutput = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.puppet.fsm.Parameter, opt_index);
};


proto.puppet.fsm.Actor.prototype.clearOutputList = function() {
  this.setOutputList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.puppet.fsm.Action = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.puppet.fsm.Action.repeatedFields_, null);
};
goog.inherits(proto.puppet.fsm.Action, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.puppet.fsm.Action.displayName = 'proto.puppet.fsm.Action';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.puppet.fsm.Action.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.puppet.fsm.Action.prototype.toObject = function(opt_includeInstance) {
  return proto.puppet.fsm.Action.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.puppet.fsm.Action} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Action.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    iterate: (f = msg.getIterate()) && datapb_data_pb.Data.toObject(includeInstance, f),
    inputList: jspb.Message.toObjectList(msg.getInputList(),
    proto.puppet.fsm.Parameter.toObject, includeInstance),
    outputList: jspb.Message.toObjectList(msg.getOutputList(),
    proto.puppet.fsm.Parameter.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.puppet.fsm.Action}
 */
proto.puppet.fsm.Action.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.puppet.fsm.Action;
  return proto.puppet.fsm.Action.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.puppet.fsm.Action} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.puppet.fsm.Action}
 */
proto.puppet.fsm.Action.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new datapb_data_pb.Data;
      reader.readMessage(value,datapb_data_pb.Data.deserializeBinaryFromReader);
      msg.setIterate(value);
      break;
    case 3:
      var value = new proto.puppet.fsm.Parameter;
      reader.readMessage(value,proto.puppet.fsm.Parameter.deserializeBinaryFromReader);
      msg.addInput(value);
      break;
    case 4:
      var value = new proto.puppet.fsm.Parameter;
      reader.readMessage(value,proto.puppet.fsm.Parameter.deserializeBinaryFromReader);
      msg.addOutput(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.puppet.fsm.Action.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.puppet.fsm.Action.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.puppet.fsm.Action} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Action.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIterate();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      datapb_data_pb.Data.serializeBinaryToWriter
    );
  }
  f = message.getInputList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.puppet.fsm.Parameter.serializeBinaryToWriter
    );
  }
  f = message.getOutputList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.puppet.fsm.Parameter.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.puppet.fsm.Action.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.puppet.fsm.Action.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional puppet.datapb.Data iterate = 2;
 * @return {?proto.puppet.datapb.Data}
 */
proto.puppet.fsm.Action.prototype.getIterate = function() {
  return /** @type{?proto.puppet.datapb.Data} */ (
    jspb.Message.getWrapperField(this, datapb_data_pb.Data, 2));
};


/** @param {?proto.puppet.datapb.Data|undefined} value */
proto.puppet.fsm.Action.prototype.setIterate = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.puppet.fsm.Action.prototype.clearIterate = function() {
  this.setIterate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.puppet.fsm.Action.prototype.hasIterate = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated Parameter input = 3;
 * @return {!Array.<!proto.puppet.fsm.Parameter>}
 */
proto.puppet.fsm.Action.prototype.getInputList = function() {
  return /** @type{!Array.<!proto.puppet.fsm.Parameter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.puppet.fsm.Parameter, 3));
};


/** @param {!Array.<!proto.puppet.fsm.Parameter>} value */
proto.puppet.fsm.Action.prototype.setInputList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.puppet.fsm.Parameter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.puppet.fsm.Parameter}
 */
proto.puppet.fsm.Action.prototype.addInput = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.puppet.fsm.Parameter, opt_index);
};


proto.puppet.fsm.Action.prototype.clearInputList = function() {
  this.setInputList([]);
};


/**
 * repeated Parameter output = 4;
 * @return {!Array.<!proto.puppet.fsm.Parameter>}
 */
proto.puppet.fsm.Action.prototype.getOutputList = function() {
  return /** @type{!Array.<!proto.puppet.fsm.Parameter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.puppet.fsm.Parameter, 4));
};


/** @param {!Array.<!proto.puppet.fsm.Parameter>} value */
proto.puppet.fsm.Action.prototype.setOutputList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.puppet.fsm.Parameter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.puppet.fsm.Parameter}
 */
proto.puppet.fsm.Action.prototype.addOutput = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.puppet.fsm.Parameter, opt_index);
};


proto.puppet.fsm.Action.prototype.clearOutputList = function() {
  this.setOutputList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.puppet.fsm.Message = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.puppet.fsm.Message, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.puppet.fsm.Message.displayName = 'proto.puppet.fsm.Message';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.puppet.fsm.Message.prototype.toObject = function(opt_includeInstance) {
  return proto.puppet.fsm.Message.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.puppet.fsm.Message} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Message.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    value: (f = msg.getValue()) && datapb_data_pb.Data.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.puppet.fsm.Message}
 */
proto.puppet.fsm.Message.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.puppet.fsm.Message;
  return proto.puppet.fsm.Message.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.puppet.fsm.Message} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.puppet.fsm.Message}
 */
proto.puppet.fsm.Message.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setId(value);
      break;
    case 2:
      var value = new datapb_data_pb.Data;
      reader.readMessage(value,datapb_data_pb.Data.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.puppet.fsm.Message.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.puppet.fsm.Message.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.puppet.fsm.Message} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.puppet.fsm.Message.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      datapb_data_pb.Data.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 id = 1;
 * @return {number}
 */
proto.puppet.fsm.Message.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.puppet.fsm.Message.prototype.setId = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional puppet.datapb.Data value = 2;
 * @return {?proto.puppet.datapb.Data}
 */
proto.puppet.fsm.Message.prototype.getValue = function() {
  return /** @type{?proto.puppet.datapb.Data} */ (
    jspb.Message.getWrapperField(this, datapb_data_pb.Data, 2));
};


/** @param {?proto.puppet.datapb.Data|undefined} value */
proto.puppet.fsm.Message.prototype.setValue = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.puppet.fsm.Message.prototype.clearValue = function() {
  this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.puppet.fsm.Message.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};


goog.object.extend(exports, proto.puppet.fsm);
