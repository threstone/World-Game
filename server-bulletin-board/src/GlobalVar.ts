import { configure } from 'log4js';
import * as loggerConfig from '../config/log4js.json';
import * as serverConfig from '../config/config.json';
import { HttpServer } from './HttpServer';
import { BoardMgr } from './BoardMgr';

export class GloBalVar {

    private static _httpServer: HttpServer;
    public static get httpServer() { return this._httpServer };
    
    private static _boardMgr: BoardMgr;
    public static get boardMgr() { return this._boardMgr };

    public static init() {
        configure(loggerConfig);

        this._httpServer = new HttpServer(serverConfig.port);
        this._boardMgr = new BoardMgr(serverConfig.registerInterval);
    }
}