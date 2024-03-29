import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//获取系统消息列表
export function getToUploadList(params, isAppend, cb, component,updateList){
    return function(dispatch, state){
        console.log(component);
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        dispatch(showLoading());
        component.requestJSON("bank/queryPayCertificate",params).done((data)=>{
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
