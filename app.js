var matrix = require("./libs/matrix.js");
var libssl = require("./libs/libssl.js");
const express = require('express')();
matrix.initMatrix(express);
express.listen(matrix.config.port, () => console.log("I am ready!"));
var lex = libssl.lex;
//require('https').createServer(lex.httpsOptions, lex.middleware(express)).listen(matrix.config.port, function () {console.log("I am ready!\nUsing: ", this.address());});