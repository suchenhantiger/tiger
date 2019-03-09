import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取持仓信息
export function getPositionInfo(component,params,loading, update){
    return function(dispatch, state){
        if(loading) dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("users/getMt4Message",params).done((data)=>{
            if(loading) dispatch(hideLoading());
            var {infoEquity} = data;
            update && update(infoEquity);
        }).fail((data)=>{
            if(loading) dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取持仓全部订单
export function getPositionAllOrder(component, params, update){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("users/queryPositionList",params).done((data)=>{
            dispatch(hideLoading());
            console.log(data);
            update && update(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
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
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("users/getMt4Message",params).done((data)=>{
            dispatch(hideLoading());
            var {infoBalance} = data;
            update && update(infoBalance);
        }).fail((data)=>{
            dispatch(hideLoading());
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



//获取详情列表
export function getNewsList(params, isAppend, cb, component, updateList){
    var {pageSize} = params;
    return function(dispatch, state){
        component.requestJSON("firstpage/newslist",params).done((data)=>{
            var {list} = data,
                hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//平仓
///deal/flatOrder
export function flatOrder(component,params,cb ){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("deal/flatOrder",params).done((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS, "下单成功"));
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    
    }
}

//修改开仓的信息
////
export function updateOrder(component,params,cb ){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("deal/updateOrder",params).done((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS, "下单成功"));
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    
    }
}
