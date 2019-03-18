import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

import JSEncrypt from 'jsencrypt';
import * as CryptoJS from 'crypto-js';

export function getMt4Message(component, params,cb){
    return function(dispatch, state){

        // queryType
        // floatTrade
        // ticket
        // mt4Id

        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/getMt4Message",params).done((data)=>{
         console.log(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function updateUserInfo(component,cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("users/getUserMessage",{clientId}).done((data)=>{
            var { avatarUrl,
                email,emailIsActive,
                freeze,isFinger,isPushMsg,isReal,
                nickname,tel,telActive,mt4Accs=[]
                } = data;
                systemApi.setValue("avatarUrl",avatarUrl);
                systemApi.setValue("email",email);
                systemApi.setValue("emailIsActive",emailIsActive);
                systemApi.setValue("freeze",freeze);
                systemApi.setValue("isFinger",isFinger);
                systemApi.setValue("isPushMsg",isPushMsg);
                systemApi.setValue("isReal",isReal);
                systemApi.setValue("nickname",nickname);
                systemApi.setValue("tel",tel);
                systemApi.setValue("telActive",telActive);
                if(mt4Accs && mt4Accs.length>0){
                    var currAcc = systemApi.getValue("mt4Id");
                    var isChange = true;
                    for(var item in mt4Accs){
                        if(currAcc == mt4Accs[item].mt4Id){//不需要更新
                            isChange=false;
                            break;
                        }
                    }
                    if(isChange)
                    {
                        systemApi.setValue("mt4Id",mt4Accs[0].mt4Id);
                        systemApi.setValue("mt4AccType",mt4Accs[0].mt4AccType);
                    }
                }else{
                    //没有账号
                    systemApi.removeValue("mt4Id");
                    systemApi.removeValue("mt4AccType");
                }                

            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function saveAccMt4(component, params,cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/saveAccMt4",params).done((data)=>{
            // var {mt4Id,mt4AccType} = data;
            // var account_list = systemApi.getValue("account_list") || "[]";
            // account_list = JSON.parse(account_list);
            // account_list.push({mt4Id,mt4AccType});
            // systemApi.setValue("account_list",JSON.stringify(account_list))
            // dispatch({type:"UPDATE_ACCOUNT_List",data:account_list });
            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function changePassword(component, newpassword,cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        newpassword = md5(newpassword);
        component.requestJSON("loginregister/changePasswordOrStatus",{updateType:0,clientId,newpassword}).done((data)=>{

            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function changePasswordByCode(component, phone,newpassword,validCode,cb){
    return function(dispatch, state){
        newpassword = md5(newpassword);
        component.requestJSON("loginregister/findPassword",{phone,updateType:0,securityCode:validCode,newpassword},null,{needToken:false}).done((data)=>{

            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}
//websocket 异常时采用轮训方式而使用的接口
export function getMessagePwd(component, phone,type,cb){
    return function(dispatch, state){
        var time =  (new Date()).getTime();
        component.requestJSON("loginregister/sendCode",{phone,time,type},null,{needToken:false}).done((data)=>{
            console.log(data);
            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

//websocket 异常时采用轮训方式而使用的接口
export function getEmailPwd(component, email,cb){
    return function(dispatch, state){
        var time =  (new Date()).getTime();
        component.requestJSON("loginregister/sendCode",{email,time},null,{needToken:false}).done((data)=>{
            console.log(data);
            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}
//loginregister/
function Decrypt(data,AuthTokenKey,AuthTokenIv) {
    let data2 = data.replace(/\n/gm, "");
    let decrypted = CryptoJS.AES.decrypt(data2, CryptoJS.enc.Latin1.parse(AuthTokenKey), {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}


export function updateToken(component,cb){
    return function(dispatch, state){
        var params = {};
        var key=""+Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,15));
        var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB';
        var encrypt = new JSEncrypt();
        // console.log(key);
        encrypt.setPublicKey(PUBLIC_KEY);
        params.token =  encrypt.encrypt(key);
        params.clientId = systemApi.getValue("clientId");
        // console.log('加密后数据:%o',params.token);

        component.requestJSON("users/updateToken",params).done((data)=>{
            // dispatch(hideLoading());
            var { avatarUrl,clientId,
                email,emailIsActive,
                freeze,isFinger,isPushMsg,isReal,
                nickname,tel,telActive,syntoken,
                token,mt4Accs=[],
                expireTime} = data;
                token = Decrypt(token,key,"20190315mcappaes");
                systemApi.setValue("tigertoken",token);
                //systemApi.setValue("phone",phone);
                // systemApi.setValue("avatarUrl",avatarUrl);
                // systemApi.setValue("clientId",clientId);
                // systemApi.setValue("email",email);
                systemApi.setValue("emailIsActive",emailIsActive);
                systemApi.setValue("freeze",freeze);
                systemApi.setValue("isFinger",isFinger);
                // systemApi.setValue("syntoken",syntoken);
                // systemApi.setValue("isPushMsg",isPushMsg);
                systemApi.setValue("isReal",isReal);
                // systemApi.setValue("nickname",nickname);
                // systemApi.setValue("tel",tel);
                systemApi.setValue("telActive",telActive);
                // systemApi.setValue("expireTime",expireTime);
                // if(mt4Accs && mt4Accs.length>0){
                //     var currAcc = systemApi.getValue("mt4Id");
                //     var isChange = true;
                //     for(var item in mt4Accs){
                //         if(currAcc == mt4Accs[item].mt4Id){//不需要更新
                //             isChange=false;
                //             break;
                //         }
                //     }
                //     if(isChange)
                //     {
                //         systemApi.setValue("mt4Id",mt4Accs[0].mt4Id);
                //         systemApi.setValue("mt4AccType",mt4Accs[0].mt4AccType);
                //     }

                // }else{
                //     //没有账号
                //     systemApi.removeValue("mt4Id");
                //     systemApi.removeValue("mt4AccType");

                // }              
              
                // if(freeze==0){
                //     dispatch(showMessage(ERROR, "账号已冻结，请联系客服"));
                // }else if(freeze==1){
                //     hashHistory.push("/login/setpwd");
                // }else if(freeze==9){
                //     hashHistory.replace("/work");
                // }else{
                //     hashHistory.replace("/work");
                // }
                
            cb && cb();
        }).fail((data)=>{
            // dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function login(component, params,logintype,cb){
    return function(dispatch, state){
        dispatch(showLoading());
        var {phone} =params;
        params.time = (new Date()).getTime();
        var key=""+Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,15));
        var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB';
        var encrypt = new JSEncrypt();
        // console.log(key);
        encrypt.setPublicKey(PUBLIC_KEY);
        params.token =  encrypt.encrypt(key);
        // console.log('加密后数据:%o',params.token);

        component.requestJSON("loginregister/login",params,null,{needToken:false}).done((data)=>{
            dispatch(hideLoading());
            var { avatarUrl,clientId,
                email,emailIsActive,
                freeze,isFinger,isPushMsg,isReal,
                nickname,tel,telActive,syntoken,
                token,mt4Accs=[],
                expireTime} = data;
                token = Decrypt(token,key,"20190315mcappaes");
                systemApi.setValue("phone",phone);
                systemApi.setValue("avatarUrl",avatarUrl);
                systemApi.setValue("clientId",clientId);
                systemApi.setValue("email",email);
                systemApi.setValue("emailIsActive",emailIsActive);
                systemApi.setValue("freeze",freeze);
                systemApi.setValue("isFinger",isFinger);
                systemApi.setValue("syntoken",syntoken);
                systemApi.setValue("isPushMsg",isPushMsg);
                systemApi.setValue("isReal",isReal);
                systemApi.setValue("nickname",nickname);
                systemApi.setValue("tel",tel);
                systemApi.setValue("telActive",telActive);
                systemApi.setValue("tigertoken",token);
                systemApi.setValue("expireTime",expireTime);
                if(mt4Accs && mt4Accs.length>0){
                    var currAcc = systemApi.getValue("mt4Id");
                    var isChange = true;
                    for(var item in mt4Accs){
                        if(currAcc == mt4Accs[item].mt4Id){//不需要更新
                            isChange=false;
                            break;
                        }
                    }
                    if(isChange)
                    {
                        systemApi.setValue("mt4Id",mt4Accs[0].mt4Id);
                        systemApi.setValue("mt4AccType",mt4Accs[0].mt4AccType);
                    }

                }else{
                    //没有账号
                    systemApi.removeValue("mt4Id");
                    systemApi.removeValue("mt4AccType");

                }              
              
                if(freeze==0){
                    dispatch(showMessage(ERROR, "账号已冻结，请联系客服"));
                }else if(freeze==1){
                    hashHistory.push("/login/setpwd");
                }else if(freeze==9){
                    hashHistory.replace("/work");
                }else{
                    hashHistory.replace("/work");
                }
                
            cb && cb();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

// avatarUrl: ""
// clientId: "b6c9a22e4baf4183a200455546ab3496"
// email: ""
// emailIsActive: "0"
// "expireTime ": 1551268177590
// freeze: "0"
// isFinger: "0"
// isPushMsg: "0"
// isReal: "0"
// nickname: ""
// tel: "18650478910"
// telActive: "1"
// token: "MtmklSgqnCLixYaYiLWlSPP/k19wNEBWkK6EucGU21Rd1FvqxzLfoExTdj8WAMW5j+1mkxvSrXlx
// ↵Cbb5uWXbsnsa5ZCF3OOGkUoR7qDaJz8B+xXgcwRpnDBlUbcMieNcKZfmb5skXbAgfuyUEVdfTY70
// ↵6aTj6XbR2VGrbh3lhvE="
   //   params.token = params.phone+"_"+Math.random();
   // const encrypt = new JSEncrypt();
        // encrypt.setPrivateKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB');
        // encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB'+ '-----END PUBLIC KEY-----');
        // var token="65928a6dfca54365a0353a2b1aad4f47";
        // // token = new Base64().encode(token);
        // // console.log(token);
        // // var res = encrypt.decrypt(token);
        // // console.log(res);
        // // var res2 = encrypt.encrypt(res);
        // // console.log(res);

      
        // //   //console.log('加密后数据:%o',new Base64().encode(encrypted) );
        // //   //使用私钥解密
        //   var decrypt = new JSEncrypt();
        //   decrypt.setPublicKey( PUBLIC_KEY);
        //  // decrypt.setPrivateKey(PUBLIC_KEY);
        //   var encrypted="bwmVpVnBIPp145JAPVfgN29AE3d+3cPJsGW7/NwVps+RRt2tN5qbWhAiUX+HEyGgPiiUdqkNgxa4FMMzZ0ruDBj7lv91QBrCCYF41Yj79Vk/0f5qkmnta4CuImkhlARakoYUp6DviZbB/6MCeJkhwEJEJ8i9fD0MWT3EOfP5N/8=";
          
        //   var uncrypted = decrypt.decrypt(encrypted);
        //   console.log('解密后数据:%o', uncrypted);
       // var PRIVATE_KEY = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAInluXgFfvR23pfSYfWc3g53iZmBg5qrtnOXPdzwC78mJqvec/s1F60jlQ/yYfGfnGFuMz2w4PR1uvaPVONX/qxrzGUctg3xAyNzVJTfCyQxhQS6n45Pv7DTUgd43WHEJxJneYw4RXmceInDqefvJe+jHsbjxJEvCyA449cWb8LtAgMBAAECgYAojXdKlYstR1vUmBkYyuX+qSa9Dvpt3PuN6LdXpvw9XXHX71Z6VLW+xA0NIIGvNfoeKPNGvCKboZe29JXJOdJ53egF18pIXDiEoXT5nhwowQqQ7842GK/GILOvNXC2gpWxPqlOYbjvQBOQbZsKeF9Ea6MDesAQ7x8TKhMtpYzZYQJBAPSE43ESyd/U3GsmLILLjx67P8CrbUdeXWvqtBFdMov25dpEgtlWuS1qj3Yc+wbmii6l9PzyI2BKH1fGLuZXG1UCQQCQXz8L1/hcj/zqAgdazbJ3M7163I2l1in+uWACD49bTifYQtmlLmqqmp95AXRmXyG6Ind5q3KxdxSnzyVXofk5AkASJNY3qrw+Fq5waPm+jtpE3oIhitbmB9OI0XahHzhD+IMfyhungu7kttaEXiwmW+7+/SOLrXAAkh93ROZwAyCtAkAArJEsyvtb40g5B31lTSSSLemqkzEOHyvfBpqOJ+hxcrH47ob5oHfbCBHKjNkwSS1tIxAPv18vuPCdv/faquTxAkBbT5rlNJRcZejsPuJErLla5nrf6AiWD/7QoFBVtp/PBGg9t0lxoXHxzCE5/EVSOvwQnTg3TE5jDRWaPdNjH+pQ';
        