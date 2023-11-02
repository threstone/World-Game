import { ServerTypeEnum } from "./Const";

export class Board {
    
    type: ServerTypeEnum;
    expireTime: number;
    pingServerIps: string[];

    constructor(type: ServerTypeEnum) {
        this.type = type;
    }
}