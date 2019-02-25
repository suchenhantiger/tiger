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
function genSignStr(params, jsoncallback) {
    var paramList,
        list = [],
        confuseStr = "xzehome_20161018";

    //在参数中添加回调参数
    params["jsoncallback"] = jsoncallback;
    paramList = sort(params);

    for (var i = 0; i < paramList.length; i++) {
        var item = paramList[i];
        list.push(item + "=" + params[item]);
    }

    return md5(list.join("&") + confuseStr).toUpperCase();
}

//请求成功回调
function requestSuccess(ver, deferred, iskick, data){
    if (ajaxQueue[ver]) {
        delete ajaxQueue[ver];

        var success = data.success,	    //判断成功失败
            body = data.data;	      //相应数据内容

        if(success == true){	//请求成功
            deferred.resolve(body);
        }
        else if(body.status == "-10099" && body.info_detail == "未登录或会话已过期" ){	//session超时

            hashHistory.replace("/login");
        }
        else{//请求失败
            deferred.reject({message:data.msg});
        }

    }

}

function requestError(ver, deferred, data){
    if (ajaxQueue[ver]) {
        delete ajaxQueue[ver];
        systemApi.log("接口访问失败");
        var info="连接失败",
            info_detail="亲，有点小意外，请您稍后再试！";

        if(data.status=="404" && data.statusText=="error"){
            info_detail="亲，有点小意外，请您稍后再试！";
        }
        else if(data.status=="0" && data.statusText=="timeout"){
            info_detail="亲，有点小意外，请您稍后再试！";
        }
        deferred.reject({
            info:info,
            info_detail:info_detail
        });
    }
}

//原生请求成功回调
function nativeRequestSuccess(ver, deferred, iskick){
    return function(response){
        var data = JSON.parse(response.data);
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
        //拼装参数数组
        var iskick=0,
            paramStr = [],
            ver = ajaxVer++,
            timeStamp = new Date().getTime(),
            {needToken} = otherParams,
            jsoncallback = "jQuery_" + timeStamp + "_" + ver;

        //记录ajax编号
        ajaxQueue[ver] = true;

        needToken = needToken==undefined?true:needToken;

        if(!params.access_token && needToken){
            params.access_token = [systemApi.getValue("access_token"),0]
        }

        var deferred = $.Deferred();
        //针对后端sign校验，将cache设置为true，并自己添加一个随机数
        if (false) {
            var sendParams = {};
            for (var key in params) {
                var isVauleof=params[key][1],
                 //   tKey = isVauleof==0?key:"value("+key+")",
                    value = params[key][0];

              //  sendParams[tKey] = value;
              sendParams[key] = value;
                if(key == "kick")  iskick = value;
            }
            //生产环境用原生发
            var sendUrl = systemApi.getValue("rootUrl") + url;
            cordovaHTTP.get(
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
            params["_"] = "" + timeStamp + ver;

            //遍历参数生成参数串
            for (var key in params) {

                paramStr.push(key+"="+params[key]);
                //console.log(key+"="+params[key]);
                if(key == "kick")  iskick = value;
            }
            //添加签名sign
            paramStr.push("sign=" + genSignStr(params, jsoncallback));

            //拼装请求url
            var sendUrl = systemApi.getValue("rootUrl") + url + "?" + paramStr.join("&");
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
