/**
 * Created by Administrator on 2016-6-22.
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 ||  u.indexOf('android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1 //是否iPad
        };
    }()
}

if(!isDebug){
    //加载cordova资源文件
    if (browser.versions.iPhone || browser.versions.iPad) {
        document.write("<script src='js/cordova/ios/cordova.js'></script>");
    }else if(browser.versions.android){ //是否是android
        document.write("<script src='js/cordova/android/cordova.js'></script>");
    }else{
        document.write("<script src='js/cordova/android/cordova.js'></script>");
    }
}
