import {showLoading, hideLoading,showConfirm, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取跟随列表
export function myfollowers(component, showload,params, update){
    return function(dispatch, state){


        if(showload) dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("follower/myfollowers",params).done((data)=>{
            if(showload) dispatch(hideLoading());
            systemApi.log(data);
            update && update(data);
        }).fail((data)=>{
            if(showload) dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取持仓信息
export function getPositionInfo(component,params,loading, update,fail){
    return function(dispatch, state){
        if(loading) dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("users/getMt4Message",params).done((data)=>{
            if(loading) dispatch(hideLoading());
            var {infoEquity} = data;
           // update && update(data);
           update && update();
           dispatch({type:"QUERY_POSITION_DATA",data:infoEquity});
        }).fail((data)=>{
            if(loading) dispatch(hideLoading());
            fail && fail();
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
export function synMt4List(data){
    return function(dispatch, state){

        dispatch({type:"SYN_MT4_LIST",data});

    }
}
export function synMt4Info(data){
    return function(dispatch, state){

        dispatch({type:"SYN_MT4_INFO",data});

    }
}
export function updatePositionInfo(data){
    return function(dispatch, state){

        dispatch({type:"QUERY_POSITION_DATA",data});

    }
}

export function updatePositionList(data){
    return function(dispatch, state){


        dispatch({type:"QUERY_POSITION_LIST_DATA",data});

    }
}


//获取持仓全部订单
export function getPositionAllOrder(component, showload,params, update){
    return function(dispatch, state){
        if(showload) dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("users/queryPositionList",params).done((data)=>{
            if(showload) dispatch(hideLoading());
            var {hanglist = [], couplist = [], orderlist = [] } = data;
            var prodList=[];
            for(var i=0,l=orderlist.length;i<l;i++){
                var {prodCode}=orderlist[i];
                prodList.push(prodCode);
            }
            for(var i=0,l=hanglist.length;i<l;i++){
                var {prodCode}=hanglist[i];
                prodList.push(prodCode);
            }
            for(var i=0,l=couplist.length;i<l;i++){
                var {prodCode}=couplist[i];
                prodList.push(prodCode);
            }
            dispatch({type:"UPDATE_ALL_LIST",data});
            update && update(prodList);
        }).fail((data)=>{
            if(showload) dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });

    }
}

//获取持仓自主订单
export function getPositionOwnList(component, params, update){
    return function(dispatch, state){
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
}

//获取持仓挂单交易
export function getOnwayList(component, params, update){
    return function(dispatch, state){
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
}


//获取详情列表
export function getCommissionList(component, params, isAppend, updateList,cb){
    var {pageSize} = params;
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("follower/commission",params).done((data)=>{
            var {list} = data,
                hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list,hasMore);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
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

//获取详情列表
export function getHistoryList(component, params, isAppend, updateList,cb){
    var {pageSize} = params;
    return function(dispatch, state){
        component.requestJSON("users/queryTradeList",params).done((data)=>{
            var {list} = data,
                hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list,hasMore);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取资金记录列表
export function getFundRecordList(component, params, isAppend, updateList,cb){
    var {pageSize} = params;
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("bank/queryAccFundRecord",params).done((data)=>{
            dispatch(hideLoading());
            var {list} = data,
                hasMore = list.length==pageSize;
            updateList && updateList(isAppend, list);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
export function flatOrder(component,params,cb ){
    return function(dispatch, state){
        dispatch(showLoading());
        var {tradeType} =params; 
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        params.syntoken = systemApi.getValue("syntoken");
        component.requestJSON("deal/flatOrder",params).done((data)=>{
            dispatch(hideLoading());
            if(tradeType!=0)
                dispatch(showMessage(SUCCESS, "删除成功"));
            cb && cb();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            //cb && cb();
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
        params.syntoken = systemApi.getValue("syntoken");
        component.requestJSON("deal/updateOrder",params).done((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS, "修改成功"));
            cb && cb();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
          //  cb && cb();
        });
    
    }
}

export function getTradeFeeInfo(component, params, update){
    return function(dispatch, state){
        component.requestJSON("users/saveRealAccMt4",params).done((data)=>{
            update && update(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
export function addAccFundRecord(component, params, cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        params.syntoken= systemApi.getValue("syntoken");
        component.requestJSON("bank/addAccFundRecord",params).done((data)=>{
       // dispatch(showMessage(SUCCESS, "充值申请已提交"));
        cb && cb(data);
        }).fail((data)=>{
          //  dispatch(showMessage(ERROR, data.message));
          dispatch(showConfirm(data.message));
        });
    }
}

export function confirmRecharge(component, params, cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("bank/confirmRecharge",params).done((data)=>{
        cb && cb(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

