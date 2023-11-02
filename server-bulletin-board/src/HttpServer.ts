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

        router.post('/getInterval', this.registerInterval.bind(this));
        router.put('/registerServerInfo', this.registerServerInfo.bind(this));
        router.delete('/deleteServerInfo', this.deleteServerInfo.bind(this));
        router.get('/getServerInfo', this.getServerInfo.bind(this));
    }

    private async vaildCheck(ctx: Koa.Context, next: Koa.Next) {
        // some vaild logic 
        let vaild = true;
        if (vaild) {
            await next();
        } else {
            ctx.response.body = "Access Denied";
            ctx.response.status = 401;
        }
    }

    /** get register interval */
    private async registerInterval(ctx: Koa.Context, next: Koa.Next) {
        ctx.response.body = GloBalVar.boardMgr.registerInterval;
        await next();
    }

    /** register server information */
    private async registerServerInfo(ctx: Koa.Context, next: Koa.Next) {
        const body = ctx.request.body as any;
        if (!body.uuid || !body.type || body.pingServerIps?.length === 0 || !GloBalVar.boardMgr.registerServerInfo(body.type, body.uuid, body.pingServerIps)) {
            ctx.response.status = 400;
            return;
        }
        ctx.response.body = 200;
        await next();
    }

    /** delete server information */
    private async deleteServerInfo(ctx: Koa.Context, next: Koa.Next) {
        const body = ctx.request.body as any;
        if (!body.uuid || !body.type || !GloBalVar.boardMgr.deleteServerInfo(body.type, body.uuid)) {
            ctx.response.status = 400;
            return;
        }
        ctx.response.body = 200;
        await next();
    }

    /** get the servers information by type */
    private async getServerInfo(ctx: Koa.Context, next: Koa.Next) {
        const body = ctx.request.body as any;
        if (!body.type) {
            ctx.response.status = 400;
            return;
        }
        const result = GloBalVar.boardMgr.getServerInfo(body.type);
        if (result === false) {
            ctx.response.status = 400;
            return;
        }
        ctx.response.body = result;
        await next();
    }
}