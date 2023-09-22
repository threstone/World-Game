import { Logger, getLogger } from 'log4js';
import * as ChildProcess from 'child_process';

export abstract class BaseWorker {

    protected _execPath: string;
    private _args: ReadonlyArray<string>;
    private _options: ChildProcess.ForkOptions;
    private _name: string;

    worker: ChildProcess.ChildProcess;
    exitedAfterKill: boolean = false;
    autuResume: boolean;

    logger: Logger

    constructor(autuResume = false) {
        this.autuResume = autuResume;
        this._name = Object.getPrototypeOf(this).constructor.name;
        this.logger = getLogger(this._name)
    }

    fork(args?: ReadonlyArray<string>, options?: ChildProcess.ForkOptions) {
        if (!this._execPath) {
            this.logger.error('no execPath');
            return;
        }
        this._args = args;
        this._options = options
        this.initWorker();
    }

    private initWorker() {
        const worker = ChildProcess.fork(this._execPath, this._args, this._options);
        this.worker = worker;

        worker.on('exit', this.onExit.bind(this));
        worker.on('error', this.onError.bind(this));
        worker.on('message', this.onMessage.bind(this));
    }

    kill() {
        this.logger.info(`kill worker${this.worker.pid}`);
        this.exitedAfterKill = true;
        process.kill(this.worker.pid);
    }

    onExit(code: number, signal: string) {
        this.logger.info(`worker${this.worker.pid} exit code: ${code}, signal: ${signal}, exitedAfterKill: ${this.exitedAfterKill}`);
        this.worker.removeAllListeners();
        if (this.autuResume) {
            this.logger.info(`worker${this.worker.pid} was exited, resume a new ${this._name}`)
            this.initWorker();
        }
    }

    onError(error: Error) {
        this.logger.error(`worker${this.worker.pid} got error: ${error}`);
    }

    onMessage(message: any) {
        this.logger.info(`worker${this.worker.pid} message: ${message}`);
    }
}