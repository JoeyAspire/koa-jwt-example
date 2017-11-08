/**
 * koa-jwt try to get token from cookie named `cookie`
 */
const cookie = 'jwt';


/**
 * koa-jwt decrypt payload and mount it to ctx.state with a property name of `key`
 */
const key = 'user';


/**
 * the secret code that npm package `jsonwebtoken` uses to encrypt and decode payload
 */
const secret = '0ce95313-76b0-4ff1-ac1f-46e0fe86e609';


/**
 * the default hash algorithm of npm package `jsonwebtoken` which koa-jwt relies on
 */
const algorithm = 'HS256';

/**
 * token max age in a human readable format the koa-jwt support, exp. 0.5d 1h
 */ 
const expiresIn = '0.5d';


/**
 * token max age( in milliseconds), coresponds to the `expiresIn` const variable
 */ 
const maxAge = 0.5*60*60*1000


/**
 * each time before generating a token 
 * we set its prop name by the value of `randprop` with a random value 
 * so that we get a brand-new token
 */
const randProp = '_rand_prop_'


module.exports = {
    cookie,
    key,
    secret,
    algorithm,
    maxAge,
    randProp,

    /**
     * options for koa-jwt to decode token
     */
    decodeOpts: {
        cookie, key, secret,
    },


    /**
     * options for jsonwebtoken to encode data
     */
    encodeOpts: {
        algorithm, expiresIn
    }
};
