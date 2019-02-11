import {vsprintf} from "sprintf-js"

export enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR"
}

export interface Logger {
  info(format : string, ...args : any)
  warning(format : string, ...args : any)
  debug(format : string, ...args : any)
  error(format : string, ...args : any)
}

export class LogEntry {
  readonly level : LogLevel;
  readonly format : string;
  readonly args : Array<any>;

  constructor(level : LogLevel, format : string, args : Array<any>) {
    this.level = level;
    this.format = format;
    this.args = args;
  }

  toString() {
    return `${this.level}: ${vsprintf(this.format, this.args)}`;
  }

  toStringNL() {
    return `${this.level}: ${vsprintf(this.format, this.args)}\n`;
  }
}

export abstract class AbstractLogger implements Logger {
  readonly entries : Array<LogEntry> = new Array<LogEntry>();

  protected abstract log(entry : LogEntry);

  debug(format: string, ...args: any) {
    this.log(new LogEntry(LogLevel.Debug, format, args));
  }

  error(format: string, ...args: any) {
    this.log(new LogEntry(LogLevel.Error, format, args));
  }

  info(format: string, ...args: any) {
    this.log(new LogEntry(LogLevel.Info, format, args));
  }

  warning(format: string, ...args: any) {
    this.log(new LogEntry(LogLevel.Warning, format, args));
  }
}

export class ArrayLogger extends AbstractLogger {
  readonly entries : Array<LogEntry> = new Array<LogEntry>();

  protected log(entry : LogEntry) {
    this.entries.push(entry);
  }

  public logEntries() : ReadonlyArray<LogEntry> {
    return this.entries;
  }
}

export class ConsoleLogger extends AbstractLogger {
  protected log(entry : LogEntry) {
    console.log(entry);
  }
}

export class StreamLogger extends AbstractLogger {
  private readonly stream : NodeJS.WritableStream;

  constructor(stream : NodeJS.WritableStream) {
    super();
    this.stream = stream;
  }

  protected log(entry : LogEntry) {
    this.stream.write(entry.toStringNL());
  }
}

