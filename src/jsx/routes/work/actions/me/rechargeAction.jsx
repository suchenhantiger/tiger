import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取系统消息列表
export function getToUploadList(component, params, update){
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

//获取系统消息列表
export function getApprovalList(component, params, update){
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

//获取系统消息列表
export function getApprovedList(component, params, update){
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