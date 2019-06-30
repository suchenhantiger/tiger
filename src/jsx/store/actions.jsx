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

export function showConfirm(message){
    return function(dispatch){
        dispatch({type:"show_confirm",message,confirmCb:null});
    }
}

export function showConfirmWithCb(message,confirmCb){
    return function(dispatch){
        dispatch({type:"show_confirm",message,confirmCb});
    }
}

export function hideConfirm(confirmCb){
    return function(dispatch){
        confirmCb && confirmCb();
        dispatch({type:"close_confirm"});
    }
}

export function showComplete(completeMsg){
    return function(dispatch){
        dispatch({type:"show_complete",completeMsg});
    }
}

export function hideComplete(){
    return function(dispatch){
        dispatch({type:"hide_complete"});
    }
}

export function showCertification(){
    return function(dispatch){
        dispatch({type:"show_certification"});

    }
}

export function hideCertification(){
    return function(dispatch){
        dispatch({type:"hide_certification"});
    }
}

export function initOptionalList(){
    return function(dispatch){
        var optionalList_local = systemApi.getValue("optional_list") || "[\"XAUUSD.\",\"EURUSD.\",\"USDJPY.\",\"GBPUSD.\",\"AUDUSD.\",\"USDCAD.\",\"USDCHF.\"]";
        
        optionalList_local = JSON.parse(optionalList_local);
        dispatch({type:"INIT_OPTIONAL_LIST",data:optionalList_local });
    }
}

export function updateOptionalList(optList){
    return function(dispatch){
        var dataStr = JSON.stringify(optList);
        systemApi.setValue("optional_list",dataStr);
        dispatch({type:"INIT_OPTIONAL_LIST",data:optList });
    }
}

export function initProductList(callback){
    return function(dispatch){
        var productList_local = systemApi.getValue("product_list") || "{\"1\":[{\"volumeStep\":0.01,\"prodName\":\"美日\",\"prodSize\":100000,\"minstDec\":0,\"maxVolume\":50,\"prodCode\":\"USDJPY.\",\"categoryId\":\"1\",\"marginPercentage\":0.005,\"minVolume\":0.01,\"digits\":3},{\"volumeStep\":0.01,\"prodName\":\"美加\",\"prodSize\":100000,\"minstDec\":0,\"maxVolume\":50,\"prodCode\":\"USDCAD.\",\"categoryId\":\"1\",\"marginPercentage\":0.005,\"minVolume\":0.01,\"digits\":5},{\"volumeStep\":0.01,\"prodName\":\"美瑞\",\"prodSize\":100000,\"minstDec\":0,\"maxVolume\":50,\"prodCode\":\"USDCHF.\",\"categoryId\":\"1\",\"marginPercentage\":0.005,\"minVolume\":0.01,\"digits\":5},{\"volumeStep\":0.01,\"prodName\":\"镑美\",\"prodSize\":100000,\"minstDec\":0,\"maxVolume\":50,\"prodCode\":\"GBPUSD.\",\"categoryId\":\"1\",\"marginPercentage\":0.005,\"minVolume\":0.01,\"digits\":5},{\"volumeStep\":0.01,\"prodName\":\"欧美\",\"prodSize\":100000,\"minstDec\":0,\"maxVolume\":50,\"prodCode\":\"EURUSD.\",\"categoryId\":\"1\",\"marginPercentage\":0.005,\"minVolume\":0.01,\"digits\":5}],\"2\":[{\"volumeStep\":0.01,\"prodName\":\"黄金美元\",\"prodSize\":100,\"minstDec\":0,\"maxVolume\":50,\"prodCode\":\"XAUUSD.\",\"categoryId\":\"2\",\"marginPercentage\":0.005,\"minVolume\":0.01,\"digits\":2}],\"3\":[],\"4\":[]}";
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


export function getAppConfig(component,url,cb,failCb){
    return function(dispatch, state){
        var time =  (new Date()).getTime();
        component.requestJSON("loginregister/version",{time,version:h5version,phoneType:systemApi.isAndroid?0:1},null,{tempurl:url,needToken:false}).done((data)=>{
            cb && cb(data); 

        }).fail((data)=>{
           // dispatch(showMessage(ERROR, data.message));failCb
           failCb && failCb();
        });
    }
}

export function showUpdateDialog(data){
    return function(dispatch, state){

        dispatch({type:"show_update_dialog",data:data});

    }
}


export function closeUpdateDialog(component,cb){
    return function(dispatch, state){
       
        dispatch({type:"close_update_dialog"});
       
    }
}


export function clearStore(){
    return function(dispatch, state){
       
        dispatch({type:"clear_store"});
       
    }
}

