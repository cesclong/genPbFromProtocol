var path = require('path');
var fs = require('fs');
var glob = require('glob');
var child_process = require('child_process');


/**
 * 遍历当前文件夹下的所有*.proto文件，获取用户名，然后编译成*.pb文件
 * @return 
 */
function walk(){


	var absPathForCurrent = path.resolve("./");
	var pattern =   "*.proto";
	var files = glob.sync( pattern, {nodir:true});

	var cmdList = [];
	var fileList = [];
	files.forEach(function (item) {
		// var sub = item.substring(item.indexOf(".proto")); //获取.proto
		var subName = item.substring(0,item.indexOf(".proto"));//获取名字
		var pbFileName = subName + ".pb";
		var cmd = "protoc --descriptor_set_out " + pbFileName + " " + item;
		cmdList.push(cmd);
		fileList.push(pbFileName);
	});	

	console.log(">>>>>>>开始生成pb文件<<<<<<<");
	var _index = 0;
	cmdList.forEach(function (item) {
		console.log("+++++++正在生成---->" + fileList[_index]);
		child_process.exec(item);
		_index = _index + 1;
	});
	console.log(">>>>>>>生成pb文件完成<<<<<<<");
}


function test() {
	var cmdStr = 'protoc --descriptor_set_out mypro.pb mypro.proto \n';
	child_process.exec(cmdStr, function(err,stdout,stderr){
		console.log(err);
		console.log(stdout);
		if(err) {
			console.log('test:'+stderr);
		} else {
			console.log("成功");
		}

	});
}

//export function
module.exports.convert = walk;
// module.exports.test = test;
