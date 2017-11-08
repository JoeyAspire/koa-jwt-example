
const token = require('../../common/token')


async function keepalive(ctx, next) {
    token.refreshPayload(ctx)
    ctx.body = Object.assign({success: false}, ERRORS.SUCC)
    return await next();
}

module.exports = keepalive;