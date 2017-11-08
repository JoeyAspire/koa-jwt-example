#about this package
This npm package shows how to create a web server that supports jwt authentication using koa2. Mongodb is used with mongoose as connector. Five fundermental apis are available for user to register, confirm registration, login, logout, and periodly fetch new token from server.
This package creates a http server, which is of course very unsafe. Https supports will come later.

#how can i manipulate this package
* I.    Get the web server started and try each api using postman
* II.   Read the code throughly and get to kown what's going on

#quick start
* I.    npm install -g nodemon gulp
* II.   npm install
* III.  npm start   #this would starts a web server at port 9999
* IV.   open http://localhost:9999/
* V.    POST a request to http://localhost:9999/auth/register
Send your email and password to web server and you got a reply like this:

{
    success: true,
    confirmId: 'A sha256 hashed string'
}
<br />
<br />
* VI.   POST a request to http://localhost:9999/auth/confirm
Send confirmId and got replied like this:
{
    success: true
}

* VII.   POST a request to http://localhost:9999/auth/login
Send email address and password and got replied like this:
{
    success: true,
    token: 'a jwt token string'
}
and at the same time, this token is also returned as cookie with name of 'jwt', whether to use cookie to feedback the token is optional. 









## need-to-knows

### need-to-kown about mongoose
* Do not declare methods using ES6 arrow functions (=>). 
> "Arrow functions explicitly prevent binding this, so your method will not have access to the document and the above examples will not work." 
See the `Instance methods` part of mongoose [guide page](http://mongoosejs.com/docs/guide.html).


* Pay attention to the return value of the static helper methods of models

    > "Any model method which involves specifying query conditions can be executed two ways:  
        When a callback function:  
        - is passed, the operation will be executed immediately with the results passed to the callback.  
        - is not passed, an instance of Query is returned, which provides a special query builder interface."
    (Sited from the [docs for queries](http://mongoosejs.com/docs/queries.html))

* [Api docs for models](http://mongoosejs.com/docs/api.html#model-js)




# how to write markdown language
* [markdown tutorial](https://www.markdowntutorial.com/)