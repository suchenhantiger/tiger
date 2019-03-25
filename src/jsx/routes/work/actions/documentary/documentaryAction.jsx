import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';


export function queryFollReportProd(component, params,cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollReportProd",params).done((data)=>{
            cb && cb(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function applyFollower(component, params,cb){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/applyFollower",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data);
            dispatch(showMessage(SUCCESS, "跟单成功"));
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function getMasterDetail(component, params,cb){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/getFollowerByFollowerId",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function getMasterList(component, params,cb){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollower",params).done((data)=>{
        dispatch(hideLoading());
        dispatch({type:"UPDATE_5_MASTER",data:data});
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}



//获取收益高手列表
export function getBenefitList(params, isAppend, cb, component,updateList ){
    return function(dispatch, state){
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollower",params).done((data)=>{
            var {incomeDate={}} = data,
            {list=[]} = incomeDate,
            hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
            
        });
    }
}


//获取稳健高手列表

export function getSteadyList(params, isAppend, cb, component,updateList ){
    return function(dispatch, state){
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollower",params).done((data)=>{
            var {steadyDate={}} = data,
            {list=[]} = steadyDate,
            hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
            
        });
    }
}

//获取常在高手列表
export function getAlwaysList(params, isAppend, cb, component,updateList ){
    return function(dispatch, state){
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollower",params).done((data)=>{
            var {accuracyDate={}} = data,
            {list=[]} = accuracyDate,
            hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
            
        });
    }
}


export function getCurTradeList(component, params, isAppend, updateList ){
    return function(dispatch, state){
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollowerPositionList",params).done((data)=>{
            // var {accuracyDate={}} = data,
            //     {list=[]} = accuracyDate;
            updateList && updateList(isAppend, data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取常在高手列表
export function getHisTradeList(component, params, isAppend, updateList ){
    return function(dispatch, state){
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("follower/queryFollowerTradeList",params).done((data)=>{
             var {list=[]} = data;
            //     {list=[]} = accuracyDate;
            updateList && updateList(isAppend, list);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}