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
