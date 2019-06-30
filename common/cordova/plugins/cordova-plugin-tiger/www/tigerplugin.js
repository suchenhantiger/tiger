cordova.define("cordova-plugin-tiger.common", function(require, exports, module) {

               var exec = require('cordova/exec');

               module.exports = {

               copyToBoard: function(success, failure, copyStr) {
               cordova.exec(success, failure, "TigerPlugin", "copyToBoard", [copyStr]);
             },getLocation: function(timeout,success, failure) {
               cordova.exec(success, failure, "TigerPlugin", "getLocation",[timeout]);
               },
               androidBack: function(success, failure){
               cordova.exec(success, failure, "TigerPlugin", "androidBack", []);
                },appUpdate: function(appInfo,success, failure){
                  cordova.exec(success, failure, "TigerPlugin", "appUpdate", [appInfo]);
                   },
                enterMeeting:function(success, fail, meeting_path,meeting_path_ios) {
                cordova.exec(success, fail, "TigerPlugin", "enterMeeting", [meeting_path,meeting_path_ios]);
                },
                uploadBonree:function(success, fail) {
                  cordova.exec(success, fail, "TigerPlugin", "uploadBonree", []);
                  },
               setAndroidKeyboardResponseOpen: function(isOpen) {
                cordova.exec(null, null, "TigerPlugin", "setAndroidKeyboardResponseOpen", [isOpen]);
                },
               callPhone: function(success, failure, number) {
               cordova.exec(success, failure, "TigerPlugin", "callPhone", [number]);
               },
               sendMessage: function(success, failure, phoneNumber,textMessage) {
               cordova.exec(success, failure, "TigerPlugin", "sendMessage", [phoneNumber,textMessage]);
               },
               getVersionNumber: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "getVersionNumber", []);
               },
               getPhoneModel: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "getPhoneModel", []);
               },
               getSystemPhoneName: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "getSystemPhoneName", []);
               },
               getSystemPhoneVersion: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "getSystemPhoneVersion", []);
               },
               showGuidePageVC: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "showGuidePageVC", []);
               },
               openReaderVC: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyOpenReaderVC", [paras]);
               },
               xyhUpdateApp: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "xyhUpdateApp", []);
               },
               xyhSSOApp: function(success, fail,paras,token) {
               cordova.exec(success, fail, "TigerPlugin", "xyhSSOApp", [paras]);
               },
               callMiniApp: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "callMiniApp", [paras]);
               },
               xyhNotice: function(success, fail,paras,token) {
               cordova.exec(success, fail, "TigerPlugin", "xyhNotice", [paras,token]);
               },
               xyhScanCode: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhScanCode", [paras]);
               },
               xyhNewWindow: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhNewWindow", [paras]);
               },
               xyhCloseWindow: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhCloseWindow", [paras]);
               },
               xyhGetTmpdata: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhGetTmpdata", [paras]);
               },
               xyhCleanTmpdata: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhCleanTmpdata", [paras]);
               },
               xyhDeviceinfo: function(success, fail) {
               cordova.exec(success, fail, "TigerPlugin", "xyhDeviceinfo", []);
               },
               xyhInAppBrowser: function(success, fail,src, watermark, userid, username) {
                 cordova.InAppBrowser.open(src, '_blank', 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭,watermark='+watermark+",userid="+userid+",username="+username);
               },
               xyhCommitBBSImg: function(success, fail,paras) {
          		 cordova.exec(success, fail, "TigerPlugin", "xyhCommitBBSImg", [paras]);
               },
               xyhUploadImages: function(success, fail, paras){
                   cordova.exec(success, fail, "TigerPlugin", "xyhUploadImages", [paras]);
               },
               xyhGetItem: function(success, fail,name) {
                cordova.exec(success, fail, "TigerPlugin", "xyhGetItem", [name]);
               },
               xyhSetItem: function(success, fail,name,value) {
                cordova.exec(success, fail, "TigerPlugin", "xyhSetItem", [name,value]);
               },
               xyhRemoveItem: function(success, fail,name) {
                cordova.exec(success, fail, "TigerPlugin", "xyhRemoveItem", [name]);
               },
               fileDownload: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyFileDownload", [paras]);
               },
               fileDownloadCancel: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyFileDownloadCancel", [paras]);
               },
               getFileListStates: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyGetFileListStates", [paras]);
               },
              xyhSetGlobalTheme: function(success, fail,paras) {
                 cordova.exec(success, fail, "TigerPlugin", "xyhSetGlobalTheme", [paras]);
               },
               xyhOaTraveIssue: function(success, fail,paras) {
                cordova.exec(success, fail, "TigerPlugin", "xyhOaTraveIssue", [paras]);
               },
               xyhSetCustomUserPhoto: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhSetCustomUserPhoto", [paras]);
               },
               xyhCommitHrAttatchment: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhCommitHrAttatchment", [paras]);
               },
               xyhOpenPhotoBrowser: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhOpenPhotoBrowser", [paras]);
               },
               xyhSaveContact: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhSaveContact", [paras]);
               },
               xyhSetTempTheme: function(success, fail,paras) {
                    cordova.exec(success, fail, "TigerPlugin", "xyhSetTempTheme", [paras]);
               },
               xyhClearTempTheme: function(success, fail,paras) {
                cordova.exec(success, fail, "TigerPlugin", "xyhClearTempTheme", []);
               },
               xyhStartXGPush: function(success, fail,paras, token) {
                   cordova.exec(success, fail, "TigerPlugin", "xyhStartXGPush", [paras, token]);
                 },
  			   attachFileDownload: function(success, fail,filename,fileurl,watermark,userid,username) { //filename需包含后缀，如：xxx.doc
                   cordova.exec(success, fail, "TigerPlugin", "attachFileDownload", [filename,fileurl,watermark,userid,username]);
                 },
                 //  params {pageName:xxx}
               trackPageBegin:function(params)
               {
                  cordova.exec(null, null, "TigerPlugin", "trackPageBegin", [params]);
               },

               //  params {pageName:xxx}
               trackPageEnd:function(params)
               {
                  cordova.exec(null, null, "TigerPlugin", "trackPageEnd", [params]);
               },

               //  params {eventId:xxx,eventLabel:xxx,parameters:{}}
               trackEvent:function(params)
               {
                  cordova.exec(null, null, "TigerPlugin", "trackEvent", [params]);
               },

               //  params {key:xxx,value:xxx}
               setGlobalKV:function(params)
               {
                  cordova.exec(null, null, "TigerPlugin", "setGlobalKV", [params]);
               },

               xyhSaveImageDataToLibrary: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhSaveImageDataToLibrary", [paras]);
               },

               xyhOpenApp: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhOpenApp", [paras]);
               },
               xyhHasAppInstalled: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhHasAppInstalled", [paras]);
               },
               xyhOpenCustomBrowser: function(success, fail,paras, watermark, userid, username) {
               cordova.exec(success, fail, "TigerPlugin", "xyhOpenCustomBrowser", [paras, watermark, userid, username]);
               },
               xyhOpenInternalBrowser: function(success, fail,paras, watermark, userid, username) {
               cordova.exec(success, fail, "TigerPlugin", "xyhOpenInternalBrowser", [paras, watermark, userid, username]);
               },
               xyhGetNetworkStatus: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhGetNetworkStatus", [paras]);
               },
 						   xyhGetFloderUrl: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhGetFloderUrl", [paras]);
               },
 							 xyhSetScreenState: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "xyhSetScreenState", [paras]);
               },
               xyhPunchCard: function(success, fail,paras) {
                   cordova.exec(success, fail, "TigerPlugin", "xyhPunchCard", [paras]);
               },
               waterMark: function(success, fail,paras) {
               cordova.exec(success, fail, "TigerPlugin", "waterMark", [paras]);
               }
               };
               });
