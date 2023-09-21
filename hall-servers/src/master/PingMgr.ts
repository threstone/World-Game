import { PingWorker } from "./worker/PingWorker";

export class PingMgr {

    private _works: PingWorker[];

    pingServerCount: number;

    constructor(pingServerCount: number) {
        this.pingServerCount = pingServerCount;
        this._works = [];
    }

    startServers() {
        for (let index = 0; index < this.pingServerCount; index++) {
            const pingWorker = new PingWorker();
            pingWorker.fork();
            this._works.push(pingWorker);
        }
    }
}