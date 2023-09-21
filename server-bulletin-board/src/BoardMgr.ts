
export class BoardMgr {

    public registerInterval: number;

    constructor(registerInterval: number) {
        this.registerInterval = registerInterval;
    }

    public getHallServerInfo() {
        throw new Error('Method not implemented.');
    }

    public deleteServerInfo() {
        return true;
    }

    public registerServerInfo() {

    }
}