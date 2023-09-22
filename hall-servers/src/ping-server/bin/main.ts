import { HttpServer } from "../HttpServer";
import { configure } from 'log4js';
import * as loggerConfig from '../../../config/ping-server/log4js.json';

// config log4js
configure(loggerConfig);

// get port from the startup param
const port  = parseInt(process.argv[2]);
if(!isNaN(port)){
    // create a simple http server
    new HttpServer(port);
}