function setRespones(result) {
    //console.log(">>>" + result + "<<<");
    if (result) {
      var resultJson = JSON.parse(result);
      if (resultJson.actionName) {
        var callbackfunc = Bridge.callbackFuncs[resultJson.actionName];
        console.log(resultJson.actionName +" exec : "+result);
        console.log("resultJson.data : "+JSON.stringify(resultJson.data));
        if(resultJson.success==true)
            callbackfunc(resultJson.data,true);
        else 
            callbackfunc(resultJson.errorMsg,false);
      }
    }
  }

window.ReceiveResult = setRespones;

var Bridge={
    callbacksCount:1,
    callbacks:{},
    callbackFuncs:{},

    /**
    * 兼容ipad和android的回调方法，不可修改!!!
    * @param {} callbackId
    * @param {} resultArray
    */
    resultForCallback: function (callbackId,resultJson) {
        try {
            console.log("callbackId "+callbackId+" :"+resultJson);
            var callback = Bridge.callbacks[callbackId];
            if (!callback) return;
            callback.call(null,resultJson);
            Bridge.callbacks[callbackId]=null;
        }
        catch (e) {
            // error handle
        }
    },

    /**
    *
    * @param {} functionName	执行函数名
    * @param {} args			函数参数:json串格式/字符串,若不传递参数，请使用一个可以判断args==false的参数即可null,"",false等
    * @param {} callback		  回调函数
    * @param {} calltype
    */
    call: function(functionName, args, callback,calltype) {
        if(args && args.url){
            var a=document.createElement("A");
            a.setAttribute("href",args.url);
            document.documentElement.appendChild(a);
            //console.log(a.href);
            args.url=a.href;		//获取绝对url
            //alert(args.url)
            a.parentNode.removeChild(a);
            a=null;
        }
        calltype=calltype||'default';
        var hasCallback = typeof callback == "function";
        var callbackId = hasCallback ? Bridge.callbacksCount++ : 0;


        if (hasCallback)
            Bridge.callbacks[callbackId] = callback;


        
    },
    getLocationInfo: function(args, callback) {
        
     
        var hasCallback = typeof callback == "function";
        var callbackId = hasCallback ? Bridge.callbacksCount++ : 0;
        if (hasCallback){
            Bridge.callbacks[callbackId] = callback;
            args.callbackId = callbackId;
            args.actionName = "getLocationInfo";
            console.log(args.actionName+" :"+args.callbackId);
        }
        if(!isDebug)    
        CIBH5SDK.getLocationInfo(JSON.stringify(args));

    },getImeiInfo: function( args, callback) {
        
     
        var hasCallback = typeof callback == "function";
        var callbackId = hasCallback ? Bridge.callbacksCount++ : 0;
        if (hasCallback){
            Bridge.callbacks[callbackId] = callback;
            args.actionName = "getImeiInfo";
            args.callbackId = callbackId;
            console.log(args.actionName+" :"+args.callbackId);
        }
        if(!isDebug)    
            CIBH5SDK.getImeiInfo(JSON.stringify(args));

    },
    sendRequest: function(functionName, args, callback) {
        args.serverName = "attendance";
     
        var hasCallback = typeof callback == "function";
       // var callbackId = hasCallback ? Bridge.callbacksCount++ : 0;
       console.log(" sendRequest -->"+functionName+JSON.stringify(args));
        if (hasCallback)
            Bridge.callbackFuncs[functionName] = callback;
        if(!isDebug)
        CIBH5SDK.SendRequest(JSON.stringify(args));

    }
    ,
    sendRequestWithCallback: function(args, callback) {
        
        var hasCallback = typeof callback == "function";
        var callbackId = hasCallback ? Bridge.callbacksCount++ : 0;
        if (hasCallback){
            Bridge.callbacks[callbackId] = callback;
            args.callbackId = callbackId;
            console.log(" sendRequest -->"+args.actionName+JSON.stringify(args));
        }
        if(!isDebug)    
            CIBH5SDK.SendRequestWithCallback(JSON.stringify(args));
    }
}

window.xyzqplatformglobal = Bridge;
module.exports = Bridge;
