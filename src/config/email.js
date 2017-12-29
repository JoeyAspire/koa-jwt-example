const _ = require('lodash')

let html = `
<div>
<p>Dear <%= userToBe.username||'friend' %>:</p>
    <p style="text-indent:2em;">You currently registered at our site. This email is for you to finish the registration. Click the following url to finally get your membership.</p>
    <p style="text-indent:2em;"><a href="<%= url %>" target="_blank"><%= url %></a></p>
<p>Koa-Jwt-Example</p>
</div>
`
module.exports = {
    messenger: 'qq',
    user: '742641156@qq.com',
    pass: 'your qq confirmation code', // qq confirmation code'
    from: 'Koa-Jwt-Example <742641156@qq.com>',
    subject: 'Finish Registration At Site Koa-Jwt-Example',
    html: html
}
