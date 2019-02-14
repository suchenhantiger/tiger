var listeners = { };
var Event = {
    register:function(type,cb){
        if(listeners[type]){
            listeners[type].push(cb);
        }
        else {
            listeners[type] = [cb];
        }
    },
    unregister:function(type,cb){
        var list = listeners[type];
        if(list){
            for(var i=0;i<list.length;i++){
                if(list[i] == cb){
                    list.splice(i,1);
                    break;
                }
            }
        }
    },
    fire:function(type,params){
        var cbs = listeners[type];
        if(cbs){
            for(var i=0;i<cbs.length;i++){
                cbs[i](params);
            }
        }
    }
}

//原生调用H5接口
window["nativeCallWebJS"] = {

}


module.exports = Event;
