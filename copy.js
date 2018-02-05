
var
  util = require("util"),
  fs = require('fs'),
  cp = require('glob-copy'),
  glob = require("glob");

console.log('all process args')
process.argv.forEach(element => {
  console.log(element);
});

console.log('now creating a tmp sub folder');
var folderName = util.format("tmp_%s_%s", process.argv[2], new Date().getTime());
fs.mkdirSync(folderName);
console.log('tmp folder ' + folderName + ' created');
console.log('copy all apis in the subfolder');
cp.sync('./apis/**/*.yaml', "./" + folderName);




//load env varibales
//var config = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
//console.log(config);
//var login = util.format('apic login -u %s -p %s -s %s', config.userName, config.password, config.server);
//info(login);
//var logout = util.format('apic logout -s %s', config.server);
//info(logout);

// var allProductfiles = fs.readdirSync(folderName);

// allProductfiles.forEach(file =>{
//   console.log('file' + file);
//   if(!process.argv.includes(file)){
//     fs.unlinkSync(folderName + '/' + file);
//   }

// })


// var pushArray = [];
// for (var p = 4; p < process.argv.length; p++) {
//   var path = "./" + folderName + process.argv[p];
//   var singlePush = util.format('apic publish %s %s  -c %s -o %s -s %s', path, config.catalogue, config.org, config.server);
//   pushArray.push(singlePush);

// }
// var pushCommand = pushArray.join(' & ');
// debug('Push command: ' + pushCommand);
// warn(pushArray.length + ' product(s) are being pushed to destination');
// // cmd.get(login, doLogin);



// var doLogout = function (err, data, stderr) {
//   if (stderr || err) {
//     error('error while logging out' + err + stderr);

//   } else {
//     warn("logout from source : " + data);

//   }
  

// }

// var doLogin = function (err, data, stderr) {
//   if (stderr || err) {
//     error('error while logging in' + err + stderr);

//   } else {
//     info(data);
//     cmd.get(pushCommand, function(err,data, stderr){
//       cmd.get(logout,doLogout);
//     })
//   }
// }











