var fs = require("fs"),
    path = require("path"),
    uglifyjs = require("uglify-js"),
    rootPath = path.resolve(__dirname, "./asset/js"),
    destRootPath = path.resolve(__dirname, "./asset/js");

if(!fs.existsSync(destRootPath)){
    fs.mkdirSync(destRootPath);
}
readAndUgly(rootPath, destRootPath);

//递归拷贝文件
function readAndUgly(filePath, destPath){
    fs.readdir(filePath, function(err, files){
        if(err){
            console.log("read err:"+filePath);
            return;
        }
        files.forEach(function(fileName){
            var absPath = path.join(filePath, fileName),
                absDestPath = path.join(destPath, fileName);
            fs.stat(absPath,function(err,stats){
                if(err) throw err;
                //如果是文件
                if(stats.isFile() && (absPath.indexOf("bundle.")>-1 || absPath.indexOf("main.js")>-1)){
                    uglifyFile(absPath, absDestPath);
                }
            })
        })
    });
}

function uglifyFile(src,dest){
    fs.readFile(src, "utf8", function(err, code){
        var result = uglifyjs.minify(code);
        fs.writeFile(dest, result.code, function(){});
        console.log(dest+":done!");
    });
}
