import mad5 from './md5_Utf8'
var ajaxVer = 0,        //ajax版本号
    ajaxQueue = {},     //ajax处理队列
    errorMapping = {
        404: "您的网络好像有问题",
        500: "服务器开小差了，请稍后"
    };

//参数排序
function sort(params) {
    var paramList = [];
    for (var key in params) {
        paramList.push(key);
    }
    return paramList.sort();
}

//生成签名字符串
function genSignStr(params, needToken) {
    var paramList,
        list = [];

    //在参数中添加回调参数
    paramList = sort(params);

    for (var i = 0; i < paramList.length; i++) {
        var item = paramList[i];
        if(null!=params[item]){
            if(item=="file" || item=="address" 
            // || item=="syntoken"   
            ) continue;
            list.push(item + "=" + params[item]);
        }
            
    }

    if(needToken){
        list.push("token=" + systemApi.getValue("tigertoken"));
    }else{
        list.push("token=65928a6dfca54365a0353a2b1aad4f47");
    }

  //  console.log(list);
   // console.log(list.join("&"));
    return mad5(list.join("&"));
    // return md5(list.join("&")).toUpperCase();
}

//请求成功回调
function requestSuccess(ver, deferred, iskick, data){
    var {syntoken}=data;
    if(syntoken) 
        systemApi.setValue("syntoken",syntoken);
    if (ajaxQueue[ver]) {
        delete ajaxQueue[ver];

        var success = data.success,	    //判断成功失败
            body = data.data,	      //相应数据内容
            code = data.code;          //返回码
// console.log(data);
        if(success == true){	//请求成功
            deferred.resolve(body);
        }
        else if(code ==400){	//session超时
            deferred.reject({message:"登录超时"});
            systemApi.removeValue("tigertoken");
            systemApi.removeValue("mt4Id");
            systemApi.removeValue("mt4AccType");
            hashHistory.replace("/login");
        }
        else{//请求失败
            deferred.reject({message:data.msg});
        }

    }

}

function requestError(ver, deferred, data){
    var {syntoken}=data;
    if(syntoken) 
        systemApi.setValue("syntoken",syntoken);
    
    if (ajaxQueue[ver]) {
        delete ajaxQueue[ver];
        systemApi.log("接口访问失败");
        var info="连接失败",
            info_detail="网络异常，请您稍后再试！";

        if(data.status=="404" && data.statusText=="error"){
            info_detail="网络异常，请您稍后再试！";
        }
        else if(data.status=="0" && data.statusText=="timeout"){
            info_detail="网络异常，请您稍后再试！";
        }
        deferred.reject({
            info:info,
            message:info_detail
        });
    }
}

//原生请求成功回调
function nativeRequestSuccess(ver, deferred, iskick){
    return function(response){
        var data = JSON.parse(response.data);
        console.log("sch native post");
        console.log(response);
        requestSuccess(ver, deferred, iskick, data);
    }
}

//原生请求失败回调
function nativeRequestError(ver, deferred){
    return function(data){
        requestError(ver, deferred, data)
    }
}

//网页请求成功回调
function webRequestSuccess(ver, deferred, iskick){
    return function(data){
        requestSuccess(ver, deferred, iskick, data);
    }
}

//网页请求失败回调
function webRequestError(ver, deferred){
    return function(data){
        requestError(ver, deferred, data)
    }
}

module.exports = {
    /*
    发送Ajax请求
    otherParams:{
        needToken - 是否需要添加token
    }
    */
    requestJSON: function(url, params, otherParams) {
        otherParams = otherParams || {};

        params.agentId=100001;//代理商id 固定
        //拼装参数数组
        var iskick=0,
            paramStr = [],
            ver = ajaxVer++,
            timeStamp = new Date().getTime(),
            {needToken,tempurl} = otherParams,
            jsoncallback = "jQuery_" + timeStamp + "_" + ver;

        //记录ajax编号
        ajaxQueue[ver] = true;
        var rootUrl=tempurl==undefined?systemApi.getValue("rootUrl"):tempurl;
        needToken = needToken==undefined?true:needToken;

        var deferred = $.Deferred();
        //针对后端sign校验，将cache设置为true，并自己添加一个随机数
        if (postNative) {
            var sendParams = {};
            for (var key in params) {
                if(null==params[key]) continue;
                sendParams[key] = params[key];
                if(key == "kick")  iskick = params[key];
            }
            //生产环境用原生发
            //获取签名
            sendParams.sign = genSignStr(sendParams,needToken);
            if(needToken){
                sendParams.signVersion = systemApi.getValue("signVersion");
            }
            
            var sendUrl = rootUrl + url;
            cordovaHTTP.post(
                sendUrl,
                sendParams,
                { Authorization: "OAuth2: token" },
                nativeRequestSuccess(ver, deferred, iskick),
                nativeRequestError(ver, deferred)
            );
        }
        else{
            //测试环境用jsonp
            //参数中添加防缓存参数

            //遍历参数生成参数串
            for (var key in params) {
                if(params[key]==null) continue;
                if(key == "prodCode"){
                    paramStr.push(key+"="+encodeURIComponent(params[key]));
                }else
                    paramStr.push(key+"="+params[key]);
                //console.log(key+"="+params[key]);
                
            }
            //添加签名sign
            paramStr.push("sign=" + genSignStr(params,needToken));
            if(needToken){
                paramStr.push("signVersion="+systemApi.getValue("signVersion"));
            }
            params["_"] = "" + timeStamp + ver;

            //拼装请求url
            var sendUrl = rootUrl + url + "?" + paramStr.join("&");
            
            //打印请求url
            systemApi.log(sendUrl + "&jsoncallback=" + jsoncallback);

            $.ajax({
                url: sendUrl,
                dataType: "jsonp",
                type: "GET",
                jsonp: "jsoncallback",
                cache: true,
                jsonpCallback: jsoncallback,
                timeout:"15000"
            })
            .done(webRequestSuccess(ver, deferred, iskick))
            .fail(webRequestError(ver, deferred));
        }

        return {
            ver: ver,
            promise: deferred.promise()
        };
    },
    //取消ajax请求，不执行ajax回调
    cancelRequest: function(ver) {
        if (ver instanceof Array) {
            for (var i = 0; i < ver.length; i++) {
                delete ajaxQueue[ver[i]];
            }
        } else {
            delete ajaxQueue[ver];
        }
    }
}
