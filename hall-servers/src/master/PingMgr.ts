import { PingWorker } from "./worker/PingWorker";
import * as serverConfig from '../../config/ping-server/config.json';
import { getLogger } from "log4js";

const logger = getLogger();
export class PingMgr {

    private _works: PingWorker[];

    pingServerCount: number;

    constructor(pingServerCount: number) {
        this.pingServerCount = pingServerCount;
        this._works = [];
    }

    startServers() {
        for (let index = 0; index < this.pingServerCount; index++) {
            const pingWorker = new PingWorker(true);
            pingWorker.start(serverConfig.startPort + index);
            this._works.push(pingWorker);
        }
    }
}