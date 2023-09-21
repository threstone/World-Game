import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import { getLogger } from 'log4js';
import { GloBalVar } from './GlobalVar';

const logger = getLogger();

export class HttpServer {

    constructor(port: number) {
        logger.info(`init http server, port:${port}`);

        const app = new Koa();
        app.use(BodyParser());
        app.use(this.vaildCheck.bind(this));

        this.addRouter(app);

        app.listen(port, () => {
            logger.info(`start http server successfully, port:${port}`);
        });
    }

    private addRouter(app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
        const router = new Router();
        app.use(router.routes());

        router.get('/getAllHallInfo', this.getAllHallInfo.bind(this));
    }

    private async vaildCheck(ctx: Koa.Context, next: Koa.Next) {
        // some vaild logic 
        let vaild = true;
        if (vaild) {
            await next();
        } else {
            ctx.response.body = "Access Denied";
        }
    }

    private async getAllHallInfo(ctx: Koa.Context, next: Koa.Next) {
        // ctx.response.body = GloBalVar.boardMgr.registerServerInfo();
        await next();
    }

   
}