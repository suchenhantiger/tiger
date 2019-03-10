import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取收益高手列表
export function getBenefitList(component, params, update){
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

//获取稳健高手列表
export function getSteadyList(component, params, update){
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

//获取常在高手列表
export function getAlwaysList(component, params, update){
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