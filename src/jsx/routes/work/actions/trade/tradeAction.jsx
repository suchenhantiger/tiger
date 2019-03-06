import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取持仓信息
export function getPositionInfo(component, params, update){
    return function(dispatch, state){
        component.requestJSON("users/saveRealAccMt4",params).done((data)=>{
            update && update(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取持仓全部订单
export function getPositionAllOrder(component, params, update){
    return function(dispatch, state){
        
    }
}

//获取持仓自主订单
export function getPositionOwnList(component, params, update){
    return function(dispatch, state){
        
    }
}

//获取持仓挂单交易
export function getOnwayList(component, params, update){
    return function(dispatch, state){
        
    }
}

//获取历史信息
export function getHistoryInfo(component, params, update){
    return function(dispatch, state){
        component.requestJSON("users/saveRealAccMt4",params).done((data)=>{
            update && update(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取历史记录
export function getHistoryList(component, params, update){
    return function(dispatch, state){
        component.requestJSON("users/saveRealAccMt4",params).done((data)=>{
            update && update(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}