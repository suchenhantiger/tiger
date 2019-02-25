import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';



//websocket 异常时采用轮训方式而使用的接口
export function getMessagePwd(component, phone,cb){
    return function(dispatch, state){
        var time =  (new Date()).getTime();
        component.requestJSON("loginregister/sendCode",{phone,time}).done((data)=>{
            console.log(data.Code);
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
        component.requestJSON("loginregister/login",params).done((data)=>{
            console.log(data.Code);
            cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}