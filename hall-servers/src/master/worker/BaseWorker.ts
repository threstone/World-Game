import * as Cluster from 'cluster';
import { getLogger } from 'log4js';
import * as ChildProcess from 'child_process';

const logger = getLogger();
export abstract class BaseWorker {

    protected _worker: Cluster.Worker;
    protected _execPath: string;

    fork(args?: any[]) {
        if (!this._execPath) {
            logger.error('no execPath');
            return;
        }
        Cluster.setupMaster({
            exec: this._execPath,
            args,
            silent: false
        })
        const worker = Cluster.fork();
        this._worker = worker;
        worker.on('exit', this.onExit.bind(this));
        worker.on('error', this.onError.bind(this));
        worker.on('message', this.onMessage.bind(this));

        // const child = ChildProcess.fork(this._execPath, { silent: false })
        // child.on('exit', this.onExit.bind(this));
        // child.on('error', this.onError.bind(this));
        // child.on('message', this.onMessage.bind(this));
    }

    disconnect() {
        this._worker.disconnect();
    }

    onExit(code: number, signal: string) {
        logger.info(`worker exit code: ${code}, signal: ${signal} , exitedAfterDisconnect: ${this._worker.exitedAfterDisconnect}`);
    }

    onError(error: Error) {
        logger.error(`worker got error: ${error}`);
    }

    onMessage(message: any) {
        logger.info(`worker message: ${message}`);
    }
}