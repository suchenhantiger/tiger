import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

import JSEncrypt from 'jsencrypt';

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


export function saveAccMt4(component, params,cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/saveAccMt4",params).done((data)=>{
            var {mt4Id,mt4AccType} = data;
            var account_list = systemApi.getValue("account_list") || "[]";
            account_list = JSON.parse(account_list);
            account_list.push({mt4Id,mt4AccType});
            systemApi.setValue("account_list",JSON.stringify(account_list))
            dispatch({type:"UPDATE_ACCOUNT_List",data:account_list });
            hashHistory.goBack();
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

export function changePasswordByCode(component, newpassword,validCode,cb){
    return function(dispatch, state){
        newpassword = md5(newpassword);
        component.requestJSON("loginregister/changePasswordOrStatus",{updateType:0,securityCode:validCode,newpassword}).done((data)=>{

            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}
//websocket 异常时采用轮训方式而使用的接口
export function getMessagePwd(component, phone,cb){
    return function(dispatch, state){
        var time =  (new Date()).getTime();
        component.requestJSON("loginregister/sendCode",{phone,time},null,{needToken:false}).done((data)=>{
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
            console.log(data.code);
            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}
//loginregister/
//websocket 异常时采用轮训方式而使用的接口
export function login(component, params,logintype,cb){
    return function(dispatch, state){
        params.time = (new Date()).getTime();
     //   params.token = params.phone+"_"+Math.random();

        component.requestJSON("loginregister/login",params,null,{needToken:false}).done((data)=>{
            var { avatarUrl,clientId,
                email,emailIsActive,
                freeze,isFinger,isPushMsg,isReal,
                nickname,tel,telActive,
                token,
                expireTime} = data;
                systemApi.setValue("avatarUrl",avatarUrl);
                systemApi.setValue("clientId",clientId);
                systemApi.setValue("email",email);
                systemApi.setValue("emailIsActive",emailIsActive);
                systemApi.setValue("freeze",freeze);
                systemApi.setValue("isFinger",isFinger);
                systemApi.setValue("isPushMsg",isPushMsg);
                systemApi.setValue("isReal",isReal);
                systemApi.setValue("nickname",nickname);
                systemApi.setValue("tel",tel);
                systemApi.setValue("telActive",telActive);
                systemApi.setValue("tigertoken",token);
                systemApi.setValue("expireTime",expireTime);
         
                if(freeze==0){
                    dispatch(showMessage(ERROR, "账号已冻结，请联系客服"));
                }else if(freeze==1){
                    hashHistory.push("/login/setpwd");
                }else if(freeze==9){
                    hashHistory.push("/work");
                }else{
                    hashHistory.push("/work");
                }
                
            cb && cb();
        }).fail((data)=>{
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

