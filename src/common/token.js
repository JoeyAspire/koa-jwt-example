const conf = require('../config/jwt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

module.exports = {
    
    /**
     * get payload from ctx.state
     * @param {Object} ctx
     * @return {String}
     */
    getPayload: function(ctx) {
        return ctx.state[conf.key || 'user'] || {}
    },



    /**
     * calculate token of `payload` then plant to cookie
     * 
     * main steps:
     *  1. attach `payload` with some random property
     *  2. calculate the token
     *  3. plant token to cookie
     *  4. return token
     * 
     * about params
     *  `payload` is the payload based on which to calculate a token, if not provided, get it from koa's context `ctx`
     * 
     * @param {Object} ctx
     * @param {Object} payload
     * @return {String}
     * 
     */
    setPayload: function(ctx, payload) {
        payload = payload || this.getPayload()
        payload[conf.randProp] = uuid()
        let token = jwt.sign(payload, conf.secret, conf.encodeOpts)
        ctx.cookies.set(conf.cookie, token, {maxAge: conf.maxAge})
        return token
    },

    destroyToken: function(ctx) {
        let token = ""
        ctx.cookies.set(conf.cookie, token)
        return token
    }

}

module.exports.refreshPayload = module.exports.setPayload