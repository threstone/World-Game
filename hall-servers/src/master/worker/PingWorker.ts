import { ForkOptions } from "child_process";
import { BaseWorker } from "./BaseWorker";
import * as Path from 'path';

export class PingWorker extends BaseWorker {

    port: number;

    constructor(autuResume = false) {
        super(autuResume);
        this._execPath = Path.join(__filename, '../../../ping-server/bin/main.js');
    }

    /**
     * start ping server
     * @param port ping server listening port
     */
    start(port: number, options?: ForkOptions): void {
        this.port = port;
        super.fork([`${port}`], options);
    }
}