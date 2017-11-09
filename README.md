# about

This package shows how to create a web server that supports jwt authentication using koa2.


## quick start

*   prepare
    -   install mongodb and run mongod, it should listen at port 27017 by default
    -   npm install -g gulp babel-node

*   clone git package and install
    -   git clone https://github.com/JoeyAspire/koa-jwt-example.git
    -   cd koa-jwt-example
    -   npm install

*   start server
    -   npm start

*   try visit
    -   http://localhost:9999/auth/register   
        -   post your email username password
        -   then web server responses a confirmId, which will expire within some period or time
        -   and you are now a user-to-be

    -   http://localhost:9999/auth/confirm
        -   post confirmId to web server
        -   and you are now a formal user

    -   http://localhost:9999/auth/login
        -   post your email+password or username+password
        -   then you are signed in and you got a token by cookie and http response body
    
    -   http://localhost:9999/auth/keepalive
        -   when you visit this url, the token recorded in cookie would be sent to web server
        -   then the token get recalculated and replanted in cookie

    -   http://localhost:9999/auth/logout
        -   when you visit this url, your token get set to blank string ""




##  about mongoose

*   Do not declare methods using ES6 arrow functions (=>)

    > "Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work."

    See the `Instance methods` part of mongoose [guide page](http://mongoosejs.com/docs/guide.html).


*   Pay attention to the return value of the static helper methods of models

    > "Any model method which involves specifying query conditions can be executed two ways:  
        When a callback function:  
        - is passed, the operation will be executed immediately with the results passed to the callback.  
        - is not passed, an instance of Query is returned, which provides a special query builder interface."
    (Sited from the [docs for queries](http://mongoosejs.com/docs/queries.html))

*   [Api docs for models](http://mongoosejs.com/docs/api.html#model-js)




##  about markdown
* [markdown tutorial](https://www.markdowntutorial.com/)