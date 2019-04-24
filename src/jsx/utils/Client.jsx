import {clearIntervals} from '../store/actions';

function doNothing(){}
function getBase64Image(img) {  
    var canvas = document.createElement("canvas");  
    canvas.width = img.width;  
    canvas.height = img.height;  
    var ctx = canvas.getContext("2d");  
    ctx.drawImage(img, 0, 0, img.width, img.height);  
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
    var dataURL = canvas.toDataURL("image/"+ext);  
    return dataURL;  
}

//实现将项目的图片转化成base64
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
 　　ctx = canvas.getContext('2d'),
 　　img = new Image;
 　　img.crossOrigin = 'Anonymous';
 　　img.onload = function(){
     　　canvas.height = img.height;
     　　canvas.width = img.width;
     　　ctx.drawImage(img,0,0);
     　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
     　　callback.call(this, dataURL);
     　　canvas = null; 
     };
 　　img.src = url;
 } 


var Client = {
      
    getPicture: function(success,fail) {
       if(isDebug){success&& success("data:image/png;base64,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"); return;}
        navigator.camera.getPicture(
            (imageData)=> {
                console.log("data:image/jpeg;base64," +imageData);
                success && success("data:image/jpeg;base64," +imageData);
            }, 
            (message)=>{
                fail('Failed because: ' + message);
            }, 
            {   quality: 10,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//指定图片来自相册
            });
    },
    openUrlWithBrowser: function(url,success,fail) {
        if(isDebug){        
            window.open(url);
            return;
        }
        cordova.InAppBrowser.open(url, '_system', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
     },
     openUrlInapp: function(url,success,fail) {
        if(isDebug){        
            window.open(url);
            return;
        }
        cordova.InAppBrowser.open(url, '_blank', 'location=yes,toolbar=yes,toolbarposition=top,hidenavigationbuttons=yes,hideurlbar=yes,closebuttoncaption=关闭');
     },
    sendRequestWS: function(functionname,param,callback){//走原生webservice接口
        param.serverName = "attendance";
        Bridge.sendRequestWithCallback(param, (resultJson)=>{
            console.log("resultJson.data : "+JSON.stringify(resultJson.data));
            if(resultJson.success==true)
                callback(resultJson.data,true);
            else 
                callback(resultJson.errorMsg,false);
        });
    },
    getLocationInfo: function(callback) {
        //window.plugins.XYCommonPlugin.copyToBoard(doNothing, doNothing, text);
        Bridge.getLocationInfo({actionName:"getLocationInfo"}, callback);
    },
    getImeiInfo: function(callback) {
        //window.plugins.XYCommonPlugin.copyToBoard(doNothing, doNothing, text);
        Bridge.getImeiInfo({actionName:"getImeiInfo"}, callback);
    },
    //记录页面进入
    trackPageBegin: function(pageName){
        
    },
    //记录页面离开
    trackPageEnd: function(pageName){
        
    },
    //记录事件
    trackEvent: function(eventId,eventLabel){
        
    },
    call: function(phoneNum) {
        Bridge.call("call",{"number":phoneNum}, null);

    },
    sendMessage:function(phoneNum, message) {
        message = message || "";
        window.plugins.XYCommonPlugin.sendMessage(doNothing, doNothing, phoneNum, message);
    },
    getHardwareInfo:function(success,fail){

      window.plugins.XYCommonPlugin.xyhDeviceinfo((data)=>{
        if(success)
         success(data);
      },doNothing);

    },
    SaveImageDataToLibrary:function(success,data){
         window.plugins.XYCommonPlugin.xyhSaveImageDataToLibrary(success,doNothing,data);
    },

    openCustomBrowser:function(url){
         window.plugins.XYCommonPlugin.xyhOpenCustomBrowser(doNothing,doNothing,url);
    },
    callMiniApp:function(obj, calltype, success){
        success = success || doNothing;
        console.log(JSON.stringify(obj));
        Bridge.call("callMiniApp", obj, success, calltype);
    },
    closeWindow:function(data,calltype=""){
        clearIntervals();
        Bridge.call("closeWindow",data, null,calltype);
    },
    ssoApp:function(success,obj){
        window.plugins.XYCommonPlugin.xyhSSOApp(success,doNothing,obj);
    },
    hasAppInstalled:function(success,fail,obj){
        window.plugins.XYCommonPlugin.xyhHasAppInstalled(success,fail,obj);
    },
    openApp:function(success,fail,obj){
        window.plugins.XYCommonPlugin.xyhOpenApp(success,fail,obj);
    },
    scanCode:function(success,fail,obj){
        window.plugins.XYCommonPlugin.xyhScanCode((data)=>{

          if(success)
           success(data);
        },doNothing,obj);
    },
    openOaTraveIssue:function(obj){
         window.plugins.XYCommonPlugin.xyhOaTraveIssue(doNothing,doNothing,obj);
    },
    openBulDetail:function(obj,token){
         window.plugins.XYCommonPlugin.xyhNotice(doNothing,doNothing,obj,token);
    },
    getXZQKFileState:function(success,obj){

         window.plugins.XYCommonPlugin.xzqkGetFileListStates(success,doNothing,obj);
    },
    openXZQKFile:function(obj){
         window.plugins.XYCommonPlugin.openXZSKReaderVC(doNothing,doNothing,obj);
    },
    downloadXZQKFile:function(obj){
         window.plugins.XYCommonPlugin.xzqkFileDownload(doNothing,doNothing,obj);
    },
    downloadXZQKFileCancel:function(obj){
         window.plugins.XYCommonPlugin.xzqkFileDownloadCancel(doNothing,doNothing,obj);
    },
    checkAppVersion:function(){
        window.plugins.XYCommonPlugin.xyhUpdateApp(doNothing,doNothing);
    },
    setCustomUserPhoto:function(success,error,obj){
         window.plugins.XYCommonPlugin.xyhSetCustomUserPhoto(success,error,obj);
    },
    getTmpdata:function(success){
        window.plugins.XYCommonPlugin.xyhGetTmpdata(success,doNothing,{});
    },
    clearTmpdata:function(success,obj){
        window.plugins.XYCommonPlugin.xyhCleanTmpdata(success,doNothing,obj);
    },
    setGlobalTheme:function(obj){
        window.plugins.XYCommonPlugin.xyhSetGlobalTheme(doNothing,doNothing,obj);
    },
    setTempTheme:function(obj){
        window.plugins.XYCommonPlugin.xyhSetTempTheme(doNothing,doNothing,obj);
    },
    clearTempTheme:function(){
        window.plugins.XYCommonPlugin.xyhClearTempTheme(doNothing,doNothing,{});
    },
    setPushId: function(obj) {
      window.plugins.XYCommonPlugin.xyhStartXGPush(doNothing,doNothing,obj);
    },
    fileDownload: function(success,obj) {
        Bridge.call("filedownload",obj,success);
    },

    openPhoto:function(obj){
      window.plugins.XYCommonPlugin.xyhOpenPhotoBrowser(doNothing,doNothing,obj);
    },
    getValue : function(name) {
      var value="";
      window.plugins.XYCommonPlugin.xyhGetItem((ret)=>{
       value=ret;
     },doNothing,name);

     return value;

    },
    //设置数据
    setValue : function(name, value) {


    },
    //删除数据
    removeValue : function(name) {


    },
    backForAndroid:function(calltype){
        if(!isDebug){
            window.plugins.TigerPlugin.androidBack(doNothing, doNothing);
        }
        else{
            console.log("backForAndroid click");
        }
    },
    backButton:function(type){
        //type : add-添加，delete-删除
        Bridge.call("xybackbutton",{type}, doNothing, "");
    }
};

module.exports = Client;
