import { BaseWorker } from "./BaseWorker";
import * as Path from 'path';

export class PingWorker extends BaseWorker {
    constructor() {
        super();
        this._execPath = Path.join(__filename, '../../../ping-server/bin/main.js');
    }
}