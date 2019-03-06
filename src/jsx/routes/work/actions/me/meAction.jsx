import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

import JSEncrypt from 'jsencrypt';

export function getMt4Message(component, params,cb){
    return function(dispatch, state){

        // queryType
        // floatTrade
        // ticket
        // mt4Id
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/getMt4Message",params).done((data)=>{
         var {infoEquity={}}=data;
         console.log(data);
         cb && cb(infoEquity);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function upLoadImage(component, file,type,cb){
    return function(dispatch, state){
        file = encodeURIComponent(file);
        console.log(file);
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("users/uploadIdCardOrHead",{clientId,type}).done((data)=>{
            console.log(data);
         cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}


export function saveRealAccMt4(component, params,cb){
    return function(dispatch, state){

        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/saveRealAccMt4",params).done((data)=>{
         console.log(data);
         dispatch(showMessage(SUCCESS, "实名认证信息已提交"));
         hashHistory.goBack();
         cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

