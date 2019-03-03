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

