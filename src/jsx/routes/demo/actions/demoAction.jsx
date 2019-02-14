import {showLoading, hideLoading, showMessage, SUCCESS, ERROR} from '../../../store/actions';

export function showToast(component, callback){
    return function(dispatch){
        dispatch(showMessage(SUCCESS, "成功打开demo页"));
        callback && callback();
    }
}

export function demoRequest(component, callback){
    return function(dispatch){
        dispatch(showLoading());
        //发送请求
        component.requestJSON("renderbill/QueryTopLineAction.do",{}).done((data)=>{
            dispatch(hideLoading());
            callback && callback(data.list);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.info_detail));
        });
    }
}
