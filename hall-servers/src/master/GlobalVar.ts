import { configure } from 'log4js';
import * as loggerConfig from '../../config/master/log4js.json';
import * as serverConfig from '../../config/master/config.json';
import { PingMgr } from './PingMgr';


export class GloBalVar {
   
    private static _pingMgr: PingMgr;

    public static init() {
        configure(loggerConfig);

        this._pingMgr = new PingMgr(serverConfig.pingServerCount);
        this._pingMgr.startServers();
    }
}