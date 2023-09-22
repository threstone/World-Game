import { BaseWorker } from "./BaseWorker";
import * as Path from 'path';

export class HallWorker extends BaseWorker {
    constructor(autuResume = false) {
        super(autuResume);
        this._execPath = Path.join(__filename, '../../../hall-server/bin/main.js');
    }
}