import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

import JSEncrypt from 'jsencrypt';

export function uploadCertificate(component, params,cb){
    return function(dispatch, state){
        // dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("bank/uploadCertificate",params).done((data)=>{

            cb && cb(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}
export function addBankCard(component, params,cb){
    return function(dispatch, state){
        // dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("bank/addBankCard",params).done((data)=>{

            cb && cb(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function queryBankCard(component, params,cb){
    return function(dispatch, state){
        // dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("bank/queryBankCard",params).done((data)=>{

            cb && cb(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function getMt4Message(component, params,cb){
    return function(dispatch, state){
        // dispatch(showLoading());
        var {queryType} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/getMt4Message",params).done((data)=>{
            if(queryType==1){
                var {infoBalance={}}=data;
                cb && cb(infoBalance);
            }else{
                var {infoEquity={}}=data;
                cb && cb(infoEquity);
            }
       
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}
export function openMt4Acc(component,nickName,cb){
    return function(dispatch, state){
        dispatch(showLoading());
        var params={};
        params.clientId=systemApi.getValue("clientId");
        params.mt4AccType=1;
        if(nickName) params.nickName = nickName;
        component.requestJSON("users/openMt4Acc",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function updateAcc(component, params,cb){
    return function(dispatch, state){
        // dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId=clientId;
        component.requestJSON("users/updateAcc",params).done((data)=>{
         cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
} 
export function upLoadImage(component, file,type,cb){
    return function(dispatch, state){
        if(!postNative){
            file = encodeURIComponent(file);
        }
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("users/uploadIdCardOrHead",{clientId,file,type}).done((data)=>{
         cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            
        });
    }
}

export function upLoadAllImage(component, file,cb){
    return function(dispatch, state){
        if(!postNative){
            file = encodeURIComponent(file);
        }
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("sys/uploadAttachment",{clientId,file}).done((data)=>{
            var {attachmentId} =data;
         cb && cb(attachmentId);
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

//获取每日汇评列表
export function getDailyReportList(component, params, update){
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

export function getPaySelect(component, update){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("bank/queryPayChannel",{queryType:3,clientId}).done((data)=>{
          
            update && update(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

export function getAccounts(component, update){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("users/getMt4Message",{queryType:3,clientId}).done((data)=>{
            var {mt4Info} = data;
            update && update(mt4Info);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

export function getPersonInfo(component, update){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("users/getMt4Message",{queryType:3,clientId}).done((data)=>{
            update && update(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

export function withdraw(component, params, cb){
    return function(dispatch, state){
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        component.requestJSON("bank/addAccFundRecord",params).done((data)=>{
        dispatch(showMessage(SUCCESS, "提现申请已提交"));
        cb && cb();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
