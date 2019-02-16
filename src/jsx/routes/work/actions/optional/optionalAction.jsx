import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取自选列表
export function getOptionalList(component, params, updateList, cb){
    return function(dispatch, state){
        component.requestJSON("clientview/brokerclient/list",params).done((data)=>{
            var {rows} = data;
            updateList(rows);
            cb && cb(null, false);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
