import {clearIntervals} from '../store/actions';

function doNothing(){}

var Client = {
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
        if(Bridge){
            Bridge.call("androidBack",{}, doNothing, calltype);
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
