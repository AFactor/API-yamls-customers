
var
  util = require("util"),
  fs = require('fs'),
  clc = require('cli-color'),
  cp = require('glob-copy'),
  yaml = require('yamljs'),
  cmd = require('node-cmd'),
  glob = require("glob");

var info = function (data) {
  console.log(clc.green(data));
}

var warn = function (data) {
  console.log(clc.yellow(data));
}

var error = function (data) {
  console.log(clc.red(data));
}

var debug = function (data) {
  console.log(clc.red.bgWhite.underline(data));
}
//info("data");
process.argv.forEach(element => {
  info(element);
});

// now create a tmp sub folder
var folderName = util.format("tmp_%s_%s", process.argv[2], new Date().getTime());
fs.mkdirSync(folderName);
info(folderName + ' created');
//copy all apis in the subfolder
cp.sync('./apis/**/*.yaml', "./" + folderName);
cp.sync('./products/*.yaml', "./" + folderName);
//load env varibales
var config = require("./" + process.argv[3]);
var login = util.format('apic login -u %s -p %s -s %s', config.userName, config.password, config.server);
info(login);
var logout = util.format('apic logout -s %s', config.server);
info(logout);



var pushArray = [];
for (var p = 4; p < process.argv.length; p++) {
  var path = "./" + folderName + process.argv[p];
  var singlePush = util.format('apic publish %s %s  -c %s -o %s -s %s', path, config.catalogue, config.org, config.server);
  pushArray.push(singlePush);

}
var pushCommand = pushArray.join(' & ');
debug('Push command: ' + pushCommand);
warn(pushArray.length + ' product(s) are being pushed to destination');
cmd.get(login, doLogin);



var doLogout = function (err, data, stderr) {
  if (stderr || err) {
    error('error while logging out' + err + stderr);

  } else {
    warn("logout from source : " + data);

  }
  

}

var doLogin = function (err, data, stderr) {
  if (stderr || err) {
    error('error while logging in' + err + stderr);

  } else {
    info(data);
    cmd.get(pushCommand, function(err,data, stderr){
      cmd.get(logout,doLogout);
    })
  }
}











