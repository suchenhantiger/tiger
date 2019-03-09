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