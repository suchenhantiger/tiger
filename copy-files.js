var fs = require("fs"),
    path = require("path"),
    srcFolder = process.argv[2],
    destFolder = process.argv[3],
    rootPath = path.resolve(__dirname, srcFolder),
    destRootPath = path.resolve(__dirname, destFolder);
    
mkdirsSync(destRootPath)
readAndCopy(rootPath, destRootPath);

//递归创建文件夹
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

//递归拷贝文件
function readAndCopy(filePath, destPath){
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
                if(stats.isFile()){
                    copyFile(absPath, absDestPath);
                }
                else if(stats.isDirectory()){
                    if(!fs.existsSync(absDestPath)){
                        fs.mkdirSync(absDestPath);
                    }
                    readAndCopy(absPath, absDestPath);
                }
            })
        })
    });
}

function copyFile(src,dest){
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}
