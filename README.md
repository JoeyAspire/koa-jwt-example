# about

This package creates a web server that supports jwt authentication using koa2.


# how to use

*   globally installed softwares
    -   install mongodb and launch mongod, which listens on port 27017 by default
    -   install gulp & babel-node globally `npm install -g gulp babel-node`
    -   install postman naive app to simulate and capture https request

*   download and install
    -  clone remote package. `git clone https://github.com/JoeyAspire/koa-jwt-example.git`
    -  cd into project directory. `cd koa-jwt-example`
    -  install packages. `npm install`
    
*   configure emails
    -   open src/config/email.js
    -   fill in your own user and pass info
    -   custom your own email format sent to confirm registration from user

        (only surport qq email service currently)

*   start web server
    -   `npm start` # at port 9999 by default

*   simulate https requests
    
    Open postman naive app, make sure the [intercepter](https://www.getpostman.com/docs/postman/sending_api_requests/interceptor_extension) is enabled in the postman header toolbar. then:

    -   post a register request
        -   visit `https://127.0.0.1:9999/auth/register` with params:

            username: 'who are u'
            password: 'your password'
            email: 'valid_email_address@xxxx.com'
            confirmUrl: 'https://127.0.0.1:9999/auth/confirm'

            A useable email address is required for registration. Each time someone launch a register request, we generate an unique comfirm code which corresponds to the email address and nobody kowns this code except us. We then compose the code with the `confirmUrl` above to generate a confirmation url, which will be sent by email to the user. The user then visit the url and we kown that, he really own the email address. (by the way, the comfirmation code expires in one day, which is also customizable in src/config/usertobe.js)

        -   check your email, open the confirmation url in browser, it is something like：
                https://127.0.0.1:9999/auth/confirm?confirmId=sdfsdf90sasdfAWEsd

            you are a member now.

    -   post a login request

        -   visit `https://127.0.0.1:9999/auth/login` with params:

            username: 'who are u'
            password: 'your password'

            or
            email: 'valid_email_address@xxxx.com'
            password: 'your password'

            The response json object contains a jwt `token` property, which is also planted in cookies. Since jwt token may expire in some time. Client needs to make keepalive requests to web server.


    -   post keepalive requests periodly

        -   visit `https://127.0.0.1:9999/auth/keepalive` to refresh jwt token


    -   post logout request

        -   visit `https://127.0.0.1:9999/auth/logout` and your jwt token will be set to blank string.


#  issues i came across

*   Do not declare methods using ES6 arrow functions (=>)

    > "Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work."

    See the `Instance methods` part of mongoose [guide page](http://mongoosejs.com/docs/guide.html).


*   Pay attention to the return value of the static helper methods of models

    > "Any model method which involves specifying query conditions can be executed two ways:  
        When a callback function:  
        - is passed, the operation will be executed immediately with the results passed to the callback.  
        - is not passed, an instance of Query is returned, which provides a special query builder interface."
    (Sited from the [docs for queries](http://mongoosejs.com/docs/queries.html))






#   references
*   [markdown tutorial](https://www.markdowntutorial.com/)
*   [what is digital signature](http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html)
*   [SSL/TLS协议运行机制的概述](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
*   [用Node.js创建自签名的HTTPS服务器](http://cnodejs.org/topic/54745ac22804a0997d38b32d)
*   [download openssl executable for windows](http://slproweb.com/products/Win32OpenSSL.html)
*   [windows 下 openssl 的安装和使用](http://houjixin.blog.163.com/blog/static/3562841020144143494875/)
*   [capture cookies in postman naive apps](https://www.getpostman.com/docs/postman/sending_api_requests/interceptor_extension)
*   [mongoose model api](http://mongoosejs.com/docs/api.html#model-js)
