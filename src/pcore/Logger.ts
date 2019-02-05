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
}

export class ArrayLogger implements Logger {
  readonly entries : Array<LogEntry> = new Array<LogEntry>();

  private log(level : LogLevel, format : string, args : Array<any>) {
    this.entries.push(new LogEntry(level, format, args));
  }

  debug(format: string, ...args: any) {
    this.log(LogLevel.Debug, format, args);
  }

  error(format: string, ...args: any) {
    this.log(LogLevel.Error, format, args);
  }

  info(format: string, ...args: any) {
    this.log(LogLevel.Info, format, args);
  }

  warning(format: string, ...args: any) {
    this.log(LogLevel.Warning, format, args);
  }
}

