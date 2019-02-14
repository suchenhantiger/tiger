var cacheObj = {};

var Cache = {
    /*设置缓存*/
    setValue:function(name, value){
        cacheObj[name] = {
            time:new Date().getTime(),
            data:value
        };
    },
    /*取缓存；overtime 超时时间*/
    getValue:function(name, overtime){
        var cache = cacheObj[name];
        if(!cache) return null;

        var {time,data} = cache,
            now = new Date().getTime(),
            diff = now - time;

        if(overtime && diff > overtime){
            return null;
        }

        return data;
    },
    remove:function(name){
        delete cacheObj[name];
    },
    removeAll:function(){
        cacheObj = {};
    }
}

module.exports = Cache;
