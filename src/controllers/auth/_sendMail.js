const nodemailer = require('nodemailer')
const URI = require('urijs')

async function _send_mail(ctx, userToBe) {

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
                user: '742641156@qq.com',
                pass: 'put your code here' // qq comfirmation code
            },
            secure: true
        }


        let sharedContent = {
            from: 'who am i <742641156@qq.com>'
        }




        console.log(JSON.stringify(uri, null, '\t'));

        let content = {
            to: userToBe.email,
            subject: 'Confirm Your Registration At Our Site',
            html: `Dear ${userToBe.email || userToBe.username}:<br />
                please click the following url to finish your registration at site 'xxx.xxx.com'<br />
                <a href="${uri.toString()}">${uri.toString()}</a>
            `
        }


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