#! /usr/bin/env node
/*自运行*/
var convert = require("./convert");
var program = require("commander");
(function () {
	convert.convert();

})(); // end function
