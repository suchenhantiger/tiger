import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取客户列表
export function getOptionalList(params, isAppend, cb, component, updateList){
    return function(dispatch, state){
        var {pagesize} = params;
        component.requestJSON("clientview/brokerclient/list",params).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==pagesize;
            updateList(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
