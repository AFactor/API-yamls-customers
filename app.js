
var 
  util = require("util"),
    port = process.env.PORT || 3006,
  fs = require('fs'),
	clc = require('cli-color'),
	cp = require('glob-copy'),
    yaml = require('yamljs');
	glob = require("glob");
	


	

 

	var info = function(data){
		console.log(clc.green(data));
	}

	var warn = function(data){
		console.log(clc.yellow(data));
	}

	var error = function(data){
		console.log(clc.red(data));
	}

	var debug = function(data){
		console.log(clc.red.bgWhite.underline(data));
	}

  info('data');
  console.log("here is something");  

