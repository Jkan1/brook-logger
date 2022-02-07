import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Rotation } from './Rotation';
import { Level } from './Level';

interface LoggerOptions {
  path?: string;
  errorPath?: string;
  rotation?: Rotation;
  initLog?: Boolean
}

export default class Logger {
  public LOG_PATH = 'logs/';
  public ERROR_LOG_PATH = this.LOG_PATH;

  private LOG_ROTATION = Rotation.DAILY;
  private LOG_STAMP = new Date().toISOString().slice(0, 10);
  private stdOutName: string = '';
  private stdErrorName: string = '';
  private stdOutStream: any;
  private stdErrorStream: any;

  constructor(loggerOptions?: LoggerOptions) {
    if (loggerOptions?.path) this.LOG_PATH = loggerOptions.path;
    if (loggerOptions?.errorPath) this.ERROR_LOG_PATH = loggerOptions.errorPath;
    if (loggerOptions?.rotation) this.LOG_ROTATION = loggerOptions.rotation;

    if (this.LOG_ROTATION == Rotation.HOURLY) this.LOG_STAMP = new Date().toISOString().slice(0, 13);

    if (!existsSync(this.LOG_PATH))
      mkdirSync(this.LOG_PATH);

    if (this.ERROR_LOG_PATH && !existsSync(this.ERROR_LOG_PATH))
      mkdirSync(this.ERROR_LOG_PATH);

    this.stdOutName = this.LOG_PATH + 'logs-' + this.LOG_STAMP;
    this.stdErrorName = (this.ERROR_LOG_PATH || this.LOG_PATH) + 'error-logs-' + this.LOG_STAMP;

    this.stdOutStream = createWriteStream(this.stdOutName, { flags: 'a' });
    this.stdErrorStream = createWriteStream(this.stdErrorName, { flags: 'a' });

    if (loggerOptions?.initLog)
      this.log('Logger Initialized');
  }

  private stdOutLog(...data: any) {
    for (let index = 0; index < data.length; index++) {
      if (typeof data[index] == 'string') this.stdOutStream.write(data[index]);
      else if (typeof data[index] == 'function')
        this.stdOutStream.write(data[index].toString());
      else if (typeof data[index] == 'object')
        try {
          this.stdOutStream.write(JSON.stringify(data[index]));
        } catch (error) {
          this.stdOutStream.write(data[index].toString());
        }
      this.stdOutStream.write(' ');
    }
    this.stdOutStream.write('\n');
  }

  private stdErrorLog(...data: any) {
    for (let index = 0; index < data.length; index++) {
      if (typeof data[index] == 'string') this.stdErrorStream.write(data[index]);
      else if (typeof data[index] == 'object')
        try {
          this.stdErrorStream.write(JSON.stringify(data[index]));
        } catch (error) {
          this.stdErrorStream.write(data[index].toString());
        }
      this.stdErrorStream.write(' ');
    }
    this.stdErrorStream.write('\n');
  }

  public log(...data: any) {
    const timestamp = new Date().toISOString();
    this.stdOutLog(timestamp, '- ' + Level.INFO + ' ~', ...data);
    console.log(timestamp, '- ' + Level.INFO + ' ~', ...data);
  }
  public warn(...data: any) {
    const timestamp = new Date().toISOString();
    this.stdOutLog(timestamp, '- ' + Level.WARN + ' ~', ...data);
    console.warn(timestamp, '- ' + Level.WARN + ' ~', ...data);
  }
  public error(...data: any) {
    const timestamp = new Date().toISOString();
    this.stdErrorLog(timestamp, '- ' + Level.ERROR + ' ~', ...data);
    this.stdOutLog(timestamp, '- ' + Level.ERROR + ' ~', ...data);
    console.error(timestamp, '- ' + Level.ERROR + ' ~', ...data);
  }
}
