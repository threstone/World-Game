import { getLogger } from "log4js";
import { HallWorker } from "./worker/HallWorker";
const logger = getLogger();

export class HallMgr {

    private _works: HallWorker[];

    pingServerCount: number;

    constructor(pingServerCount: number) {
        this.pingServerCount = pingServerCount;
        this._works = [];
    }

    startServers() {
        for (let index = 0; index < this.pingServerCount; index++) {
            const hallWorker = new HallWorker();
            hallWorker.fork();
            this._works.push(hallWorker);
        }
    }
}