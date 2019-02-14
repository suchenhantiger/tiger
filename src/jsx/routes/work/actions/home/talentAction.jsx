import {showLoading, hideLoading, showMessage} from '../../../../store/actions';

export function getConfig(component, success_cb){
    return function(dispatch, state){
        component.requestJSON("renderbill/QueryQuizAction.do",{
            access_token:[systemApi.getValue(systemApi.getKey().TOKEN),0],
            querytype:['userinfo',1],
            kick:["1", 0]
        }).done((data)=>{
            success_cb && success_cb(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.info_detail));
        });
    }
}
