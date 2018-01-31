
var 
  util = require("util"),
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
//info("data");
process.argv.forEach(element => {
  info(element);  
});

// now create a tmp sub folder
var folderName = util.format("tmp_%s_%s", process.argv[2],   new Date().getTime());
fs.mkdirSync(folderName);
info(folderName + ' created');
//copy all apis in the subfolder
cp.sync('./apis/**/*.yaml',   "./" + folderName);  
cp.sync('./products/*.yaml',   "./" + folderName );
   



