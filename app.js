var matrix = require("./libs/matrix.js");
const express = require('express')();
matrix.initMatrix(express);
express.listen(matrix.config.port, () => console.log("I am ready!"));