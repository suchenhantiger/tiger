var fs = require("fs"),
    path = require("path"),
    folder = process.argv[2],
    rootPath = path.resolve(__dirname, folder);

fs.exists(rootPath, function(exists){
    if(exists) deleteFolder(rootPath);
});

 
//递归拷贝文件
function deleteFolder(filePath){
    var files = fs.readdirSync(filePath);
    for(var i=0;i<files.length;i++){
        var fileName = files[i],
            absPath = path.join(filePath, fileName),
            stats = fs.statSync(absPath);

        if(stats.isFile()){
            fs.unlinkSync(absPath);
        }
        else if(stats.isDirectory()){
            deleteFolder(absPath);
            fs.rmdirSync(absPath);
        }
    }
}
