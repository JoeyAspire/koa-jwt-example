const mongoose = require('mongoose')
const User = require('../../models/User')
const UserToBe = require('../../models/UserToBe')
const ERRORS = require('../../errors/')
const ensureConnected = require('../../common/ensureConnected')
const schema = require('../../models/_userSchema')
const _ = require('lodash')



let props = []

for( let p in schema ) {
    props.push(p)
    props[p] = 1
}

async function confirm(ctx, next) {
    
    if ( !await ensureConnected() ) {
        ctx.body = Object.assign({success: false}, ERRORS.SERVER_ERR)
        return await next()
    }

    let req = ctx.request
    let confirmId = (req.query && req.query.confirmId)
        || (req.body && req.body.confirmId)
    
    
    let usertobe, user;
    usertobe = await UserToBe.findOne({confirmId: confirmId})
                            .select(props).exec()

    if ( !usertobe ) {
        ctx.body = Object.assign({success: false}, ERRORS.CONFIRM_CODE_EXPIRED)
        return await next()
    }

    user = _.pick(usertobe, props)
    user = new User(user)
    user = await user.save()
    if ( user && !user.errors ) {
        // usertobe.remove()
        await usertobe.remove()
        ctx.body = Object.assign({success: true}, ERRORS.SUCC)
    } else {
        ctx.body = Object.assign({success: false}, ERRORS.FAIL)
    }

    return await next();
    

}

module.exports = confirm;