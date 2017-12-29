const nodemailer = require('nodemailer')
const URI = require('urijs')
const _ = require('lodash')

async function _send_mail(ctx, userToBe, conf) {

    return new Promise(function(resolve, reject) {
        let uri;

        try {
            uri = ctx.request.body.confirmUrl;
            uri = new URI(uri)
            uri.addQuery('confirmId', userToBe.confirmId);
        } catch (e) {
            uri = null
        }
        
        if ( !uri || !uri.toString() ) {
            return resolve({err: {}, info: {}});
        }
        

        if ( !(userToBe && userToBe.email) ) {
            return resolve({ err: true, info: {} });
        }


        let generalOptions = {
            host: 'smtp.qq.com',
            port: 465,
            auth: {
                type: 'login',
                user: conf.user,
                pass: conf.pass // 此处需要传 qq 的确认码
            },
            secure: true
        }


        let sharedContent = {
            from: conf.from
        }




        // console.log(JSON.stringify(uri, null, '\t'));

        let content = {
            to: userToBe.email,
            subject: conf.subject,
            html: _.template(conf.html)({
                userToBe: userToBe, 
                url: uri.toString()
            })
        }

        //     html: `Dear ${userToBe.email || userToBe.username}:<br />
        //     please click the following url to finish your registration at site 'xxx.xxx.com'<br />
        //     <a href="${uri.toString()}">${uri.toString()}</a>
        // `


        let transporter = nodemailer.createTransport(generalOptions, sharedContent);
        
        transporter.sendMail(content, function(err, info) {
            
            if ( err ) {
                resolve({err, info});
            } else {
                resolve({err, info});
            }


            transporter.close();

        })

    })
}

module.exports = _send_mail