import { configure } from 'log4js';
import * as loggerConfig from '../config/log4js.json';
import * as serverConfig from '../config/config.json';
import { HttpServer } from './HttpServer';
import { HallInfoMgr } from './HallInfoMgr';

export class GloBalVar {

    private static _httpServer: HttpServer;
    public static get httpServer() { return this._httpServer };

    private static _hallInfoMgr: HallInfoMgr;
    public static get hallInfoMgr() { return this._hallInfoMgr };

    public static init() {
        configure(loggerConfig);

        this._hallInfoMgr = new HallInfoMgr(serverConfig.serverBulletinBoardAddress);
        
        this._httpServer = new HttpServer(serverConfig.port);
    }
}