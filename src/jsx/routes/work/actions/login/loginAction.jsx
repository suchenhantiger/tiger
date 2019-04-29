import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

import JSEncrypt from 'jsencrypt';
import * as CryptoJS from 'crypto-js';
var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ5bl4BX70dt6X0mH1nN4Od4mZgYOaq7Zzlz3c8Au/Jiar3nP7NRetI5UP8mHxn5xhbjM9sOD0dbr2j1TjV/6sa8xlHLYN8QMjc1SU3wskMYUEup+OT7+w01IHeN1hxCcSZ3mMOEV5nHiJw6nn7yXvox7G48SRLwsgOOPXFm/C7QIDAQAB';

export function getMt4Message(component, params,cb){
    return function(dispatch, state){
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
                    var hasF = false;
                    var hasM = false; 
                    for(var item in mt4Accs){
                        var {mt4Id,mt4AccType,mt4NickName} = mt4Accs[item];
                        if(mt4AccType==2){//跟单账号
                            hasF = true;
                            systemApi.setValue("f_mt4Id",mt4Id);
                            systemApi.setValue("f_mt4NickName",mt4NickName);
                        }else if(mt4AccType==3){//高手账号
                            hasM = true;
                            systemApi.setValue("m_mt4Id",mt4Id);
                            systemApi.setValue("m_mt4NickName",mt4NickName);
                        }
                        
                        if(currAcc == mt4Id){//不需要更新
                            isChange=false;
                        }
                    }
                    if(isChange)
                    {
                        systemApi.setValue("mt4Id",mt4Accs[0].mt4Id);
                        systemApi.setValue("mt4AccType",mt4Accs[0].mt4AccType);
                        systemApi.setValue("mt4NickName",mt4Accs[0].mt4NickName);
                    }
                    if(!hasF){
                        systemApi.removeValue("f_mt4Id");
                        systemApi.removeValue("f_mt4NickName");
                    }
                    if(!hasM){
                        systemApi.removeValue("m_mt4Id");
                        systemApi.removeValue("m_mt4NickName");
                    }

                }else{
                    //没有账号
                    systemApi.removeValue("mt4Id");
                    systemApi.removeValue("f_mt4Id");
                    systemApi.removeValue("m_mt4Id");
                    systemApi.removeValue("mt4AccType");
                    systemApi.removeValue("mt4NickName");
                    systemApi.removeValue("f_mt4NickName");
                    systemApi.removeValue("m_mt4NickName");

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
        dispatch(showLoading());
        component.requestJSON("users/saveAccMt4",params).done((data)=>{
            // var {mt4Id,mt4AccType} = data;
            // systemApi.setValue("mt4Id",mt4Id);
            // systemApi.setValue("mt4AccType",mt4AccType);
            dispatch(hideLoading());
            cb && cb();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function changePassword(component, newpassword,cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        //newpassword = md5(newpassword);
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(PUBLIC_KEY);
       
        if(newpassword)
        {
            newpassword=  encrypt.encrypt(newpassword);
        }
        component.requestJSON("users/changePasswordOrStatus",{updateType:0,clientId,newpassword}).done((data)=>{

            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function changePasswordByold(component, params,cb){
    return function(dispatch, state){
        params.clientId = systemApi.getValue("clientId");
       
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(PUBLIC_KEY);
       console.log(params.oldpassword);
        if(params.oldpassword)
        {
            params.oldpassword =  encrypt.encrypt(params.oldpassword);
        }
        console.log(params.oldpassword);
        if(params.newpassword){
            params.newpassword =  encrypt.encrypt(params.newpassword);
        }

        component.requestJSON("users/changePasswordOrStatus",params).done((data)=>{
            dispatch(showMessage(SUCCESS, "修改成功"));
            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function changePasswordByCode(component, phone,newpassword,validCode,cb){
    return function(dispatch, state){
       
        //newpassword = md5(newpassword);
        var time =  (new Date()).getTime();
        if(newpassword)
        {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(PUBLIC_KEY);
            newpassword =  encrypt.encrypt(newpassword);
            //newpassword = encodeURIComponent(newpassword);
           // console.log(newpassword);
        }
        dispatch(showLoading());
        component.requestJSON("loginregister/findPassword",{time,phone,updateType:0,securityCode:validCode,newpassword},null,{needToken:false}).done((data)=>{
            dispatch(hideLoading());
            cb && cb();
            dispatch(showMessage(SUCCESS, "密码重置成功"));
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function verification(component, params,cb){
    return function(dispatch, state){
        params.clientId = systemApi.getValue("clientId");
        dispatch(showLoading());
        component.requestJSON("users/verification",params).done((data)=>{
            dispatch(hideLoading());
            console.log(data);
            cb && cb();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


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

//websocket 异常时采用轮训方式而使用的接口
export function getChangeEmailPwd(component, email,cb){
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
    console.log(AuthTokenKey+"  "+AuthTokenIv);
    let data2 = data.replace(/\n/gm, "");
    let decrypted = CryptoJS.AES.decrypt(data2, 
        CryptoJS.enc.Latin1.parse(AuthTokenKey), 
        {
        iv: CryptoJS.enc.Latin1.parse(AuthTokenIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function mcEncrypt(data,AuthTokenKey,AuthTokenIv) {
    //let data2 = data.replace(/\n/gm, "");
  //  data= CryptoJS.enc.Latin1.parse(data);

    let encrypted = CryptoJS.AES.encrypt(data, 
        CryptoJS.enc.Latin1.parse(AuthTokenKey), 
        { iv: CryptoJS.enc.Latin1.parse(AuthTokenIv), 
            mode: CryptoJS.mode.CBC, 
            padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}



export function updateToken(component,cb,failCb){
    return function(dispatch, state){
        var params = {};
        var key=""+Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,15));
        var encrypt = new JSEncrypt();
        // console.log(key);
        encrypt.setPublicKey(PUBLIC_KEY);
        params.token =  encrypt.encrypt(key);
        params.clientId = systemApi.getValue("clientId");
        // console.log('加密后数据:%o',params.token);

        component.requestJSON("users/updateToken",params).done((data)=>{
            // dispatch(hideLoading());
            var { avatarUrl,clientId,tokenVersion,
                email,emailIsActive,
                freeze,isFinger,isPushMsg,isReal,
                nickname,tel,telActive,syntoken,
                token,mt4Accs=[],
                expireTime} = data;
                token = Decrypt(token,key,"20190315mcappaes");
                systemApi.setValue("tigertoken",token);
                systemApi.setValue("signVersion",tokenVersion);
                systemApi.setValue("avatarUrl",avatarUrl);
                systemApi.setValue("clientId",clientId);
                systemApi.setValue("email",email);
                systemApi.setValue("emailIsActive",emailIsActive);
                systemApi.setValue("freeze",freeze);
                systemApi.setValue("isFinger",isFinger);
                systemApi.setValue("syntoken",syntoken);
                // systemApi.setValue("isPushMsg",isPushMsg);
                systemApi.setValue("isReal",isReal);
                systemApi.setValue("nickname",nickname);
                systemApi.setValue("tel",tel);
                systemApi.setValue("telActive",telActive);
                
                if(mt4Accs && mt4Accs.length>0){
                    var currAcc = systemApi.getValue("mt4Id");
                    var isChange = true;
                    var hasF = false;
                    var hasM = false; 
                    for(var item in mt4Accs){
                        var {mt4Id,mt4AccType,mt4NickName} = mt4Accs[item];
                        if(mt4AccType==2){//跟单账号
                            hasF = true;
                            systemApi.setValue("f_mt4Id",mt4Id);
                            systemApi.setValue("f_mt4NickName",mt4NickName);
                        }else if(mt4AccType==3){//高手账号
                            hasM = true;
                            systemApi.setValue("m_mt4Id",mt4Id);
                            systemApi.setValue("m_mt4NickName",mt4NickName);
                        }
                        
                        if(currAcc == mt4Id){//不需要更新
                            isChange=false;
                        }
                    }
                    if(isChange)
                    {
                        systemApi.setValue("mt4Id",mt4Accs[0].mt4Id);
                        systemApi.setValue("mt4AccType",mt4Accs[0].mt4AccType);
                        systemApi.setValue("mt4NickName",mt4Accs[0].mt4NickName);
                    }
                    if(!hasF){
                        systemApi.removeValue("f_mt4Id");
                        systemApi.removeValue("f_mt4NickName");
                    }
                    if(!hasM){
                        systemApi.removeValue("m_mt4Id");
                        systemApi.removeValue("m_mt4NickName");
                    }

                }else{
                    //没有账号
                    systemApi.removeValue("mt4Id");
                    systemApi.removeValue("f_mt4Id");
                    systemApi.removeValue("m_mt4Id");
                    systemApi.removeValue("mt4AccType");
                    systemApi.removeValue("mt4NickName");
                    systemApi.removeValue("f_mt4NickName");
                    systemApi.removeValue("m_mt4NickName");

                }              
               
            cb && cb();
        }).fail((data)=>{
            // dispatch(hideLoading());
            failCb && failCb();
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
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(PUBLIC_KEY);
        params.token =  encrypt.encrypt(key);
        if(params.password)
            params.password = mcEncrypt(params.password,key,"20190315mcappaes");
        component.requestJSON("loginregister/login",params,null,{needToken:false}).done((data)=>{
            dispatch(hideLoading());
            var { avatarUrl,clientId,tokenVersion,
                email,emailIsActive,
                freeze,isFinger,isPushMsg,isReal,
                nickname,tel,telActive,syntoken,
                token,mt4Accs=[],
                expireTime} = data;
                token = Decrypt(token,key,"20190315mcappaes");
                systemApi.setValue("signVersion",tokenVersion);
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
                    var hasF = false;
                    var hasM = false; 
                    for(var item in mt4Accs){
                        var {mt4Id,mt4AccType,mt4NickName} = mt4Accs[item];
                        if(mt4AccType==2){//跟单账号
                            hasF = true;
                            systemApi.setValue("f_mt4Id",mt4Id);
                            systemApi.setValue("f_mt4NickName",mt4NickName);
                        }else if(mt4AccType==3){//高手账号
                            hasM = true;
                            systemApi.setValue("m_mt4Id",mt4Id);
                            systemApi.setValue("m_mt4NickName",mt4NickName);
                        }
                        
                        if(currAcc == mt4Id){//不需要更新
                            isChange=false;
                        }
                    }
                    if(isChange)
                    {
                        systemApi.setValue("mt4Id",mt4Accs[0].mt4Id);
                        systemApi.setValue("mt4AccType",mt4Accs[0].mt4AccType);
                        systemApi.setValue("mt4NickName",mt4Accs[0].mt4NickName);
                    }
                    if(!hasF){
                        systemApi.removeValue("f_mt4Id");
                        systemApi.removeValue("f_mt4NickName");
                    }
                    if(!hasM){
                        systemApi.removeValue("m_mt4Id");
                        systemApi.removeValue("m_mt4NickName");
                    }

                }else{
                    //没有账号
                    systemApi.removeValue("mt4Id");
                    systemApi.removeValue("f_mt4Id");
                    systemApi.removeValue("m_mt4Id");
                    systemApi.removeValue("mt4AccType");
                    systemApi.removeValue("mt4NickName");
                    systemApi.removeValue("f_mt4NickName");
                    systemApi.removeValue("m_mt4NickName");

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
