
const token = require('../../common/token')
const ERRORS = require('../../errors/')


async function keepalive(ctx, next) {
    let tk = token.refreshPayload(ctx)
    ctx.body = Object.assign({success: true, token: tk}, ERRORS.SUCC)
    return await next();
}

module.exports = keepalive;