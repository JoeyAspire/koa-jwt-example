const https = require('https')
const fs = require('fs')
const Koa = require('koa')
const formidable = require('koa2-formidable')
const router = require('koa-router')()
const jwt = require('koa-jwt')
const controllers = require('./controllers/')
const app = new Koa()
const conf = require('./config')
const mongoose = require('mongoose')
const log = console.log;




log('[app] set formidable routes')
app.use(formidable())



log('[app] set jwt routes')
app.use(controllers.auth.handle401)
app.use(jwt(conf.jwt.decodeOpts).unless({
    path: ['/auth/register', '/auth/login', '/auth/confirm']
}));




log('[app] set auth routes')
router.post('/auth/register', controllers.auth.register )
router.post('/auth/confirm', controllers.auth.confirm )
router.get('/auth/confirm', controllers.auth.confirm )
router.post('/auth/login', controllers.auth.login )
router.post('/auth/keepalive', controllers.auth.keepalive )
router.post('/auth/logout', controllers.auth.logout )




app.use(router.routes())

if ( conf.server.https ) {
    let options = {
        key: fs.readFileSync('./ssl/server-key.pem'),
        cert: fs.readFileSync('./ssl/server-cert.pem')
    }
    https.createServer(options, app.callback()).listen(conf.server.port)

} else {
    app.listen(conf.server.port)
}

// app.listen(conf.server.port)
log('[app] listening on port ',conf.server.port)