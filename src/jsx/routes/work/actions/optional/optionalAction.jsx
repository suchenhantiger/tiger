import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

export function updatePrice(newPrice){
    return function(dispatch, state){
       
       dispatch({type:"UPDATE_PRICE",data:newPrice});
        
    }
}

//websocket 异常时采用轮训方式而使用的接口
export function getRealKline(component, cb){
    return function(dispatch, state){

        // cb && cb();
        // var clientId=systemApi.getValue("clientId");
        // component.requestJSON("optionalstock/getProduct",{clientId}).done((data)=>{
        //     // console.log(data);
        //     if(data["1"] || data["2"] || data["3"] ||data["4"]){
        //         dispatch({type:"INIT_PRODUCT_LIST",data});
        //         systemApi.setValue("product_list",JSON.stringify(data));
        //     }
        // }).fail((data)=>{
        //     //dispatch(showMessage(ERROR, data.message));
        //     //cb && cb();
        // });
    }
}
export function updateProduct(component, cb){
    return function(dispatch, state){

        cb && cb();
        if(systemApi.hasLoadPro)
            return;
        var clientId=systemApi.getValue("clientId");
        component.requestJSON("optionalstock/getProduct",{clientId}).done((data)=>{
            systemApi.hasLoadPro=true;
            // console.log(data);
            if(data["1"] || data["2"] || data["3"] ||data["4"]){
                dispatch({type:"INIT_PRODUCT_LIST",data});
                systemApi.setValue("product_list",JSON.stringify(data));
            }
        }).fail((data)=>{
            //dispatch(showMessage(ERROR, data.message));
            //cb && cb();
        });
    }
}

export function getProdInfo(component,params, cb){
    return function(dispatch, state){

        params.clientId = systemApi.getValue("clientId");
        component.requestJSON("optionalstock/getProductByProdCode",params).done((data)=>{
            // console.log(data);
            if(data && data.length>0){
                cb && cb (data[0]);
            }
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            //cb && cb();
        });
    }
}

export function getOptionalList(component, params,updateList, cb){
    return function(dispatch, state){
        updateList(false, []);
        cb && cb(null, false);
        return;
        var {pagesize} = params;
        component.requestJSON("optionalstock/getOptionalStock",params).done((data)=>{
            // console.log(data);
            var rows = data,
                hasMore = rows.length==pagesize;
            updateList(false, rows);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取历史k线
export function getHistoryKList(component,params,cb ){
    return function(dispatch, state){
        var {pageSize} = params;
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;

        component.requestJSON("optionalstock/historyMarket",params).done((data)=>{
            var {list} = data;
            for(var i=0;i<list.length;i++){
                list[i].date= new Date(list[i].opentime*1000);
            }
            var hasmore = (pageSize<=list.length);
            // console.log(list);
            cb && cb(list,hasmore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
          //  cb && cb();
        });
    
    }
}



///deal/openOrder
//开仓
export function openOrder(component,params,cb ){
    return function(dispatch, state){
        dispatch(showLoading());
        var clientId=systemApi.getValue("clientId");
        params.clientId =clientId;
        params.syntoken = systemApi.getValue("syntoken");
        component.requestJSON("deal/openOrder",params).done((data)=>{
            dispatch(hideLoading());
            //dispatch(showMessage(SUCCESS, "下单成功"));
            cb && cb(true);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
            cb && cb(false);
        });
    
    }
}




