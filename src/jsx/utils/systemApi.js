var storage = window.localStorage,
	ajaxVer = 0,						//ajax版本号
	ajaxQueue = {};						//ajax处理队列
var g_deviceMessage = {
	isIpad : false,
	isIphone : false,
	isIOS : false,
	isAndroid : false,
	isPC : false,
	deviceType:"PC",
	screenWidth:"",
	screenHeight:""
};
var KEY = {
	APPINTRO:"appintro", //引导页变量
	BASETHEME:"basetheme",//主题皮肤
    USERID:"userid",
    USERNAME: "username"

};
var systemApi = {
	getValue : function(name) {
		return storage.getItem(name);
	},
	setValue : function(name, value) {
		storage.setItem(name, value);
	},
	getDeviceMessage:function(){
		return g_deviceMessage;
	},
	getKey:function(){
		return KEY;
	},
	removeValue : function(name) {
		storage.removeItem(name);
	},
	isProduction:function(){
		return (process.env["NODE_ENV"] || "") != "develop";
 	},
	log:function(text){
		if((process.env["NODE_ENV"] || "") != "production" && console && console.log){
			console.log(text);
		}
	}
	,overrideES6JS:function(){
		if (!Array.prototype.find) {
	  		Array.prototype.find = function(predicate) {
		    	'use strict';
    			if (this == null) {
		      		throw new TypeError('Array.prototype.find called on null or undefined');
		    	}
			    if (typeof predicate !== 'function') {
			      	throw new TypeError('predicate must be a function');
			    }
			    var list = Object(this);
			    var length = list.length >>> 0;
			    var thisArg = arguments[1];
			    var value;

			    for (var i = 0; i < length; i++) {
			      	value = list[i];
			      	if (predicate.call(thisArg, value, i, list)) {
			        	return value;
			      	}
			    }
			    return undefined;
		  	};
		}
		if (!Array.prototype.findIndex) {
	  		Array.prototype.findIndex = function(predicate) {
		    	if (this === null) {
		      		throw new TypeError('Array.prototype.findIndex called on null or undefined');
			    }
			    if (typeof predicate !== 'function') {
			      	throw new TypeError('predicate must be a function');
			    }
			    var list = Object(this);
			    var length = list.length >>> 0;
			    var thisArg = arguments[1];
			    var value;

			    for (var i = 0; i < length; i++) {
			      	value = list[i];
			      	if (predicate.call(thisArg, value, i, list)) {
			        	return i;
			      	}
		    	}
			    return -1;
		  	};
		}
	},
	initDeviceMessage:function(){
		if(/ipad/gi.test(navigator.appVersion)){
			g_deviceMessage.isIpad = true;
			g_deviceMessage.deviceType="ipad";
			g_deviceMessage.isIOS = true;
		}else if(/iPhone/gi.test(navigator.appVersion)){
			g_deviceMessage.isIphone = true;
			g_deviceMessage.deviceType="iphone";
			g_deviceMessage.isIOS = true;
		}else if(/android/gi.test(navigator.appVersion)){
			g_deviceMessage.isAndroid = true;
        	g_deviceMessage.deviceType="android phone";
		}else{
			  g_deviceMessage.isPC = true;
				g_deviceMessage.deviceType="pc";
		}

		if(g_deviceMessage.isIOS){
			g_deviceMessage.screenWidth = $(window).width();
			g_deviceMessage.screenHeight = $(window).height();
		}else{
			g_deviceMessage.screenWidth = document.documentElement.clientWidth;//window.document.width;// window.screen.width;
			g_deviceMessage.screenHeight = document.documentElement.clientHeight;//window.document.height;//window.screen.height;
		}

	},

	isAndroid : (/android/gi).test(navigator.appVersion),
	isIPhone : (/iphone|ipad/gi).test(navigator.appVersion)
};
systemApi.initDeviceMessage();
systemApi.overrideES6JS();
if(TestEnvironment){
	//http://192.168.103.112:8080/jeeplus/mcapp/optionalstock/getOptionalStock
	//http://192.168.103.108:8080/jeeplus/mcapp/optionalstock/getOptionalStock
	//47.101.164.147    8089
	var rootIP = "47.101.164.147";
	systemApi.setValue("rootUrl","http://"+rootIP+":8089/jeeplus/mcapp/");
	systemApi.setValue("websocketUrl","ws://"+rootIP+":8086"); 
}
else{
	systemApi.setValue("rootUrl","");
}

module.exports = systemApi;
