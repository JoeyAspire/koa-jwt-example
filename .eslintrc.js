/*global module:true*/
module.exports = {
    "env": {
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "off",
            "unix"
        ],
        "quotes": [
            "off",
            "double"
        ],
        "semi": [
            "off",
            "never"
        ]
    }
};