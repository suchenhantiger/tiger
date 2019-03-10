import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取持仓挂单交易
export function getSysNoticeList(component, params, update){
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