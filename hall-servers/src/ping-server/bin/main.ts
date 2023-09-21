import { HttpServer } from "../HttpServer";
import { configure } from 'log4js';
import * as serverConfig from '../../../config/ping-server/config.json';
import * as loggerConfig from '../../../config/ping-server/log4js.json';

configure(loggerConfig);
new HttpServer(serverConfig.port);