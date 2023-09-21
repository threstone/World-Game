import Axios from 'axios';

export class HallInfoMgr {
    
    serverBulletinBoardAddress: string;

    constructor(serverBulletinBoardAddress: string) {
        this.serverBulletinBoardAddress = serverBulletinBoardAddress;
        this.init();
    }

    async init() {
        const res = await Axios.get(`${this.serverBulletinBoardAddress}getInterval`);
        console.log(res);
    }
}   