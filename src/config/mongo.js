module.exports = {

    /**
     * maximum times of retry before connection established
     */
    retry: 4,

    /**
     * each time an attempt to establish a connection fails, wait some snippet of time and retry
     */
    wait: 1000,


    /**
     * database address
     */
    url: 'mongodb://localhost:27017/test'
}