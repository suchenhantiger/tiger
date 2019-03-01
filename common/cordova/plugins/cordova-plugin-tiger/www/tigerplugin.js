cordova.define("cordova-plugin-xycommonplugin.common", function(require, exports, module) {

               var exec = require('cordova/exec');

               module.exports = {

               copyToBoard: function(success, failure, copyStr) {
               cordova.exec(success, failure, "XYCommonPlugin", "copyToBoard", [copyStr]);
             },getLocation: function(timeout,success, failure) {
               cordova.exec(success, failure, "XYCommonPlugin", "getLocation",[timeout]);
               },
               androidBack: function(success, failure){
               cordova.exec(success, failure, "XYCommonPlugin", "androidBack", []);
                },
                enterMeeting:function(success, fail, meeting_path,meeting_path_ios) {
                cordova.exec(success, fail, "XYCommonPlugin", "enterMeeting", [meeting_path,meeting_path_ios]);
                },
                uploadBonree:function(success, fail) {
                  cordova.exec(success, fail, "XYCommonPlugin", "uploadBonree", []);
                  },
               setAndroidKeyboardResponseOpen: function(isOpen) {
                cordova.exec(null, null, "XYCommonPlugin", "setAndroidKeyboardResponseOpen", [isOpen]);
                },
               callPhone: function(success, failure, number) {
               cordova.exec(success, failure, "XYCommonPlugin", "callPhone", [number]);
               },
               sendMessage: function(success, failure, phoneNumber,textMessage) {
               cordova.exec(success, failure, "XYCommonPlugin", "sendMessage", [phoneNumber,textMessage]);
               },
               getVersionNumber: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "getVersionNumber", []);
               },
               getPhoneModel: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "getPhoneModel", []);
               },
               getSystemPhoneName: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "getSystemPhoneName", []);
               },
               getSystemPhoneVersion: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "getSystemPhoneVersion", []);
               },
               showGuidePageVC: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "showGuidePageVC", []);
               },
               openReaderVC: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyOpenReaderVC", [paras]);
               },
               xyhUpdateApp: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhUpdateApp", []);
               },
               xyhSSOApp: function(success, fail,paras,token) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhSSOApp", [paras]);
               },
               callMiniApp: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "callMiniApp", [paras]);
               },
               xyhNotice: function(success, fail,paras,token) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhNotice", [paras,token]);
               },
               xyhScanCode: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhScanCode", [paras]);
               },
               xyhNewWindow: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhNewWindow", [paras]);
               },
               xyhCloseWindow: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhCloseWindow", [paras]);
               },
               xyhGetTmpdata: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhGetTmpdata", [paras]);
               },
               xyhCleanTmpdata: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhCleanTmpdata", [paras]);
               },
               xyhDeviceinfo: function(success, fail) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhDeviceinfo", []);
               },
               xyhInAppBrowser: function(success, fail,src, watermark, userid, username) {
                 cordova.InAppBrowser.open(src, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭,watermark='+watermark+",userid="+userid+",username="+username);
               },
               xyhCommitBBSImg: function(success, fail,paras) {
          		 cordova.exec(success, fail, "XYCommonPlugin", "xyhCommitBBSImg", [paras]);
               },
               xyhUploadImages: function(success, fail, paras){
                   cordova.exec(success, fail, "XYCommonPlugin", "xyhUploadImages", [paras]);
               },
               xyhGetItem: function(success, fail,name) {
                cordova.exec(success, fail, "XYCommonPlugin", "xyhGetItem", [name]);
               },
               xyhSetItem: function(success, fail,name,value) {
                cordova.exec(success, fail, "XYCommonPlugin", "xyhSetItem", [name,value]);
               },
               xyhRemoveItem: function(success, fail,name) {
                cordova.exec(success, fail, "XYCommonPlugin", "xyhRemoveItem", [name]);
               },
               fileDownload: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyFileDownload", [paras]);
               },
               fileDownloadCancel: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyFileDownloadCancel", [paras]);
               },
               getFileListStates: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyGetFileListStates", [paras]);
               },
              xyhSetGlobalTheme: function(success, fail,paras) {
                 cordova.exec(success, fail, "XYCommonPlugin", "xyhSetGlobalTheme", [paras]);
               },
               xyhOaTraveIssue: function(success, fail,paras) {
                cordova.exec(success, fail, "XYCommonPlugin", "xyhOaTraveIssue", [paras]);
               },
               xyhSetCustomUserPhoto: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhSetCustomUserPhoto", [paras]);
               },
               xyhCommitHrAttatchment: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhCommitHrAttatchment", [paras]);
               },
               xyhOpenPhotoBrowser: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhOpenPhotoBrowser", [paras]);
               },
               xyhSaveContact: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhSaveContact", [paras]);
               },
               xyhSetTempTheme: function(success, fail,paras) {
                    cordova.exec(success, fail, "XYCommonPlugin", "xyhSetTempTheme", [paras]);
               },
               xyhClearTempTheme: function(success, fail,paras) {
                cordova.exec(success, fail, "XYCommonPlugin", "xyhClearTempTheme", []);
               },
               xyhStartXGPush: function(success, fail,paras, token) {
                   cordova.exec(success, fail, "XYCommonPlugin", "xyhStartXGPush", [paras, token]);
                 },
  			   attachFileDownload: function(success, fail,filename,fileurl,watermark,userid,username) { //filename需包含后缀，如：xxx.doc
                   cordova.exec(success, fail, "XYCommonPlugin", "attachFileDownload", [filename,fileurl,watermark,userid,username]);
                 },
                 //  params {pageName:xxx}
               trackPageBegin:function(params)
               {
                  cordova.exec(null, null, "XYCommonPlugin", "trackPageBegin", [params]);
               },

               //  params {pageName:xxx}
               trackPageEnd:function(params)
               {
                  cordova.exec(null, null, "XYCommonPlugin", "trackPageEnd", [params]);
               },

               //  params {eventId:xxx,eventLabel:xxx,parameters:{}}
               trackEvent:function(params)
               {
                  cordova.exec(null, null, "XYCommonPlugin", "trackEvent", [params]);
               },

               //  params {key:xxx,value:xxx}
               setGlobalKV:function(params)
               {
                  cordova.exec(null, null, "XYCommonPlugin", "setGlobalKV", [params]);
               },

               xyhSaveImageDataToLibrary: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhSaveImageDataToLibrary", [paras]);
               },

               xyhOpenApp: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhOpenApp", [paras]);
               },
               xyhHasAppInstalled: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhHasAppInstalled", [paras]);
               },
               xyhOpenCustomBrowser: function(success, fail,paras, watermark, userid, username) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhOpenCustomBrowser", [paras, watermark, userid, username]);
               },
               xyhOpenInternalBrowser: function(success, fail,paras, watermark, userid, username) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhOpenInternalBrowser", [paras, watermark, userid, username]);
               },
               xyhGetNetworkStatus: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhGetNetworkStatus", [paras]);
               },
 						   xyhGetFloderUrl: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhGetFloderUrl", [paras]);
               },
 							 xyhSetScreenState: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "xyhSetScreenState", [paras]);
               },
               xyhPunchCard: function(success, fail,paras) {
                   cordova.exec(success, fail, "XYCommonPlugin", "xyhPunchCard", [paras]);
               },
               waterMark: function(success, fail,paras) {
               cordova.exec(success, fail, "XYCommonPlugin", "waterMark", [paras]);
               }
               };
               });
