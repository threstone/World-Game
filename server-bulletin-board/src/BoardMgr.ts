import { Board } from "./Board";
import { ServerTypeEnum } from "./Const";

export class BoardMgr {

    public registerInterval: number;
    private _serverMap: Map<ServerTypeEnum, Map<string, Board>>;
    private _cacheData: Map<ServerTypeEnum, string[]>;

    constructor(registerInterval: number) {
        this.registerInterval = registerInterval;

        this._serverMap = new Map<ServerTypeEnum, Map<string, Board>>();
        const keys = Object.keys(ServerTypeEnum);
        for (let index = 0; index < keys.length; index++) {
            const type = keys[index] as ServerTypeEnum;
            const infoMap = new Map<string, Board>();
            this._serverMap.set(type, infoMap);
        }

        this._cacheData = new Map<ServerTypeEnum, string[]>();

        setInterval(this.delExpireInfo.bind(this), 1000);
    }

    private delExpireInfo() {
        this._serverMap.forEach((map, type) => {
            map.forEach((board, uuid) => {
                if (Date.now() > board.expireTime) {
                    this._cacheData.delete(type);
                    map.delete(uuid);
                }
            });
        });
    }

    public getServerInfo(type: ServerTypeEnum) {
        let result = this._cacheData.get(type);
        if (!result) {
            const infoMap = this._serverMap.get(type);
            if (!infoMap) {
                return false;
            }
            result = [];
            infoMap.forEach((board) => {
                result = result.concat(board.pingServerIps);
            });
        }
        return result
    }

    public deleteServerInfo(type: ServerTypeEnum, uuid: string) {
        const infoMap = this._serverMap.get(type);
        if (!infoMap) {
            return false;
        }
        infoMap.delete(uuid);
        return true;
    }

    public registerServerInfo(type: ServerTypeEnum, uuid: string, pingServerIps: string[]) {
        const infoMap = this._serverMap.get(type);
        if (!infoMap) {
            return false;
        }

        let board = infoMap.get(uuid);
        if (!board) {
            board = new Board(type);
            infoMap.set(uuid, board);
        }
        board.expireTime = Date.now() + this.registerInterval;
        board.pingServerIps = pingServerIps;
        this._cacheData.delete(type);
        return true;
    }
}