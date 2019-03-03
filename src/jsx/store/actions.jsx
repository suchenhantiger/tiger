export const SHOW_LOADING = '_BASE_SHOW_LOADING_';
export const HIDE_LOADING = '_BASE_HIDE_LOADING_';
export const SHOW_MESSAGE = '_BASE_SHOW_MESSAGE_';
export const HIDE_MESSAGE = '_BASE_HIDE_MESSAGE_';

export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';

let msgIndex = -1;
let loadIndex = -1;
let load_duration = 15000;

export function showLoading(){
    return function(dispatch){
        clearTimeout(loadIndex);
        dispatch({type:SHOW_LOADING});
        loadIndex = setTimeout(()=>{
            dispatch(hideLoading());
        }, load_duration);
    }
}

export function hideLoading(){
    return function(dispatch){
        dispatch({type:HIDE_LOADING});
    }
}
export function initOptionalList(){
    return function(dispatch){
        var optionalList_local = systemApi.getValue("optional_list") || "[]";
        optionalList_local = JSON.parse(optionalList_local);
        dispatch({type:"INIT_OPTIONAL_LIST",data:optionalList_local });
    }
}

export function updateOptionalList(optList){
    return function(dispatch){
               
        var dataStr = JSON.stringify(optList);
        // console.log(dataStr);
        systemApi.setValue("optional_list",dataStr);
        // console.log(systemApi.getValue("optional_list"));
        dispatch({type:"INIT_OPTIONAL_LIST",data:optList });
    }
}

export function initProductList(callback){
    return function(dispatch){
        var productList_local = systemApi.getValue("product_list") || "[]";
        productList_local = JSON.parse(productList_local);
        dispatch({type:"INIT_PRODUCT_LIST",data:productList_local });

        callback && callback();
    }
}
export function initAccountList(callback){
    return function(dispatch){
        var account_list = systemApi.getValue("account_list") || "[]";
        account_list = JSON.parse(account_list);
        console.log(account_list);
        dispatch({type:"UPDATE_ACCOUNT_List",data:account_list });

        callback && callback();
    }
}


/*
    @param type
        信息提示类型（success|error|warning）
    @param message
        显示消息内容
    @param duration
        显示时长（默认2000ms）
*/
export function showMessage(type, message, duration){
    duration = duration || 2000;
    return function(dispatch, state){
        clearTimeout(msgIndex);
        dispatch({type:SHOW_MESSAGE,msgType:type,message});

        msgIndex = setTimeout(function(){
            dispatch({type:HIDE_MESSAGE});
        },duration);
    }
}
