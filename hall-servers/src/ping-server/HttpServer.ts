import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import { getLogger } from 'log4js';

const logger = getLogger(`pingServer${process.pid}`);

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

        router.get('/getHallInfo', this.getHallInfo.bind(this));
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

    private async getHallInfo(ctx: Koa.Context, next: Koa.Next) {
        logger.info(`getHallInfo1`);
        ctx.response.body = 'getHallInfo1';
        await next();
    }


}