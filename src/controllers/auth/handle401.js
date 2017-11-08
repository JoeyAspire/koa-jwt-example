const ERRORS = require('../../errors/');

/**
 * handle exceptions that koa-jwt throws by calling `ctx.throw`
 * 
 * koa-jwt throws exception when
 *  1.  no token found in http request
 *  2.  token found but expired
 *  3.  token found but token can not pass validation
 */
async function handle401 (ctx, next) {
    
    return await next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = Object.assign({success: false}, ERRORS.NEED_LOGIN);
        } else {
            ctx.body = Object.assign({success: false}, ERRORS.FAIL);
        }
    });
}


module.exports = handle401