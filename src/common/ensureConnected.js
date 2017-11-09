const mongoose = require('mongoose')
const conf = require('../config/mongo')
const log = console.log


let connect = async function() {

    let doit = function(){
        return new Promise(function(resolve, reject) {
            mongoose.Promise = Promise
            mongoose.connect(conf.url, {useMongoClient: true, promiseLibrary: global.Promise}).catch(()=>{})

            mongoose.connection.once('error', () => {
                log('[app] mongodb connection error')
                resolve(false)
            })


            mongoose.connection.once('open', () => {
                log('[app] mongodb connected')
                resolve(true)
            })

        })
    }

    let wait = function (){
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(true)
            }, conf.wait)
        })
    }

    if ( await doit() ) {
        return true;
    }
    
    let cnt = 0
    let retry = conf.retry || 0
    let succ


    while( ( cnt++ < retry ) && 
        !(succ = await doit()) 
    ) {
        await wait()
    }

    return !!succ
    
}

/**
 * make sure a connection to mongodb is available
 * 
 * @return {Object} mongoose.connection or null
 */
let ensureConnected = async function() {
    if ( mongoose.connection 
        && mongoose.connection.readyState === 1 ) {
        return true;
    }

    let succ = await connect()

    return succ ? mongoose.connection : null;
}


module.exports = connect