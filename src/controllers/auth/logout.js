
const token = require('../../common/token')
const ERRORS = require('../../errors/')


async function logout(ctx, next) {
    token.destroyToken(ctx)
    ctx.body = Object.assign({success: true, token: ""}, ERRORS.SUCC)
    await next();
}

module.exports = logout;