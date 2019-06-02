import { combineReducers } from 'redux';
import {SHOW_LOADING, HIDE_LOADING, SHOW_MESSAGE, HIDE_MESSAGE} from './actions';

export function injectReducer(store, reducers){
    reducers = Object.assign(reducers, {
        base:baseReducer
    });
    store.replaceReducer(combineReducers(reducers));
}

function baseReducer(state,action){
    var {type} = action;
    state = state || {
        loading:false,
        complete:false,
        completeMsg:"",
        certification:false,
        messageshow:false,
        message:"",
        msgType:"",
        ProductList:{},
        OptionalList:[],
        OptionalListData:[],
        accountArr:[],
        accuracyDate:[],
        incomeDate:[],
        steadyDate:[],
        hanglist: [], couplist : [], orderlist :[],
        infoEquity: {},
        floatPL:0,
        f_floatPL:0,
        showUpdate:false,  //0:不暂时，1:展示，2强制更新
        showfresh:1,
        confirming:false,
        confirmCb:null
    };

    if(type == SHOW_LOADING){
        return Object.assign({}, state, {loading:true});
    }
    else if(type == HIDE_LOADING){
        return Object.assign({}, state, {loading:false});
    }else if(type == "show_certification"){
        return Object.assign({}, state, {certification:true});
    }
    else if(type == "hide_certification"){
        return Object.assign({}, state, {certification:false});
    }else if(type == "show_complete"){
        var {completeMsg} = action;
        return Object.assign({}, state, {complete:true,completeMsg});
    }
    else if(type == "hide_complete"){
        return Object.assign({}, state, {complete:false});
    }
    else if(type == SHOW_MESSAGE){
        var {message,msgType} = action;
        return Object.assign({}, state, {messageshow:true,msgType,message});
    }
    else if(type == HIDE_MESSAGE){
        var {message} = action;
        return Object.assign({}, state, {messageshow:false});
    }else if(type == "show_update_dialog"){
        var {data} = action;
        //"vsRemark":"222","downUrl":"222","appType":2,"serverUrl":"11","version":"22222"
        var {vsRemark,downUrl,serverUrl,version,appType} = data;
        var showUpdate = false;
        if(appType>0) showUpdate =true;
        return Object.assign({}, state, {vsRemark,downUrl,serverUrl,version,appType,showUpdate});

    }else if(type == "close_update_dialog"){
      
        return Object.assign({}, state, {showUpdate:false});
    }else if(type == "close_confirm"){
          return Object.assign({}, state, {confirming:false,confirmCb:null});
          
    }else if(type == "show_confirm"){
        var {message,confirmCb} = action;
        return Object.assign({}, state, {confirming:true,message,confirmCb});
          
    }else if(type == "INIT_OPTIONAL_LIST"){
        var {ProductList}=state;
        var tmpOptionalList= action.data.slice();
        if(ProductList["1"]!=null || ProductList["2"]!=null || ProductList["3"]!=null || ProductList["4"]!=null){

            var optionalListData =[];
            for(var i=0;i<tmpOptionalList.length;i++){
                var breakFlag=false;
                if(ProductList["1"]!=null){
                    for(var j=0;j<ProductList["1"].length;j++){
                        if(tmpOptionalList[i]==ProductList["1"][j].prodCode){
                            optionalListData.push(ProductList["1"][j]);
                            breakFlag=true;
                            break;
                        }
                    }
                }
                if(breakFlag) continue;
                if(ProductList["2"]!=null){
                    for(var j=0;j<ProductList["2"].length;j++){
                        if(tmpOptionalList[i]==ProductList["2"][j].prodCode){
                            optionalListData.push(ProductList["2"][j]);
                            breakFlag=true;
                            break;
                        }
                    }
                }
                if(breakFlag) continue;
                if(ProductList["3"]!=null){
                    for(var j=0;j<ProductList["3"].length;j++){
                        if(tmpOptionalList[i]==ProductList["3"][j].prodCode){
                            optionalListData.push(ProductList["3"][j]);
                            breakFlag=true;
                            break;
                        }
                    }
                    
                }
                if(breakFlag) continue;
                if(ProductList["4"]!=null){
                    for(var j=0;j<ProductList["4"].length;j++){
                        if(tmpOptionalList[i]==ProductList["4"][j].prodCode){
                            optionalListData.push(ProductList["4"][j]);
                            breakFlag=true;
                            break;
                        }
                    }
                } 
                if(breakFlag==false) action.data.splice(i,1);
            }
            return Object.assign({}, state, {
                OptionalList:action.data.slice(),
                OptionalListData:optionalListData
            });
        }else{
            return Object.assign({}, state, {
                OptionalList:action.data.slice(),
            });
        }
        
    }else if(type == "INIT_PRODUCT_LIST"){
        return Object.assign({}, state, {
            ProductList:action.data
        });
    }
    else if(type == "UPDATE_PRICE"){
        var newPrice = action.data;
        var {OptionalListData,OptionalList} = state;
        var updateflag = false;
      
        for(var i=0;i<newPrice.length;i++){
            var tmpObj = newPrice[i];
            if(typeof(tmpObj)=="string")
            {
                tmpObj = JSON.parse(tmpObj);
            }

            let prodCode = tmpObj.symbol;
            let index = OptionalList.indexOf(prodCode);
            // console.log(OptionalListData);
            if(index!=-1){
                // console.log(index);
                // console.log(OptionalListData[index]);
                updateflag = true;
               
                var tmp = tmpObj;
                OptionalListData[index].ask = tmp.ask;
                OptionalListData[index].bid = tmp.bid;
                OptionalListData[index].isClose = tmp.isClose;
            }
        }
        if(updateflag)
        return Object.assign({}, state, {
            OptionalListData:OptionalListData.slice()
        });
    }else if(type == "UPDATE_ACCOUNT_List"){
        return Object.assign({}, state, {
            accountArr:action.data.slice()
        });
    }else if(type == "UPDATE_5_MASTER"){
        var {accuracyDate,
            incomeDate,
            steadyDate} = action.data;
        return Object.assign({}, state, {
            accuracyDate:accuracyDate.list,
            incomeDate:incomeDate.list,
            steadyDate:steadyDate.list
        });
    }else if(type == "UPDATE_ALL_LIST"){
        var {hanglist=[], couplist =[], orderlist =[]} =action.data;
        var {showfresh} = state;
       // couplist.push.apply(couplist,orderlist);
     //   orderlist.push.apply(orderlist,couplist);
        var {couplist:oldCoup, orderlist:oldOrder} =state;
        var floatPL = 0;
        for(var i=0,l1=orderlist.length;i<l1;i++){//保留orderlist的浮动盈亏
            var {ticket} = orderlist[i];
            for(var j=0,l2=oldOrder.length;j<l2;j++){
                var {ticket:oldT,netProfit=0} = oldOrder[j];
                if(ticket==oldT){
                    orderlist[i].netProfit = netProfit;
                    
                    break;
                }
            }
            floatPL+=orderlist[i].netProfit;
        }
        var f_floatPL = 0;
        for(var i=0,l1=couplist.length;i<l1;i++){//保留couplist的浮动盈亏
            var {ticket} = couplist[i];
            for(var j=0,l2=oldCoup.length;j<l2;j++){
                var {ticket:oldT,netProfit=0} = oldCoup[j];
                if(ticket==oldT){
                    couplist[i].netProfit = netProfit;
                   
                    break;
                }
            }
            f_floatPL+=couplist[i].netProfit;
        }
        showfresh=  showfresh+1;
        return Object.assign({}, state, {
            hanglist,couplist,orderlist,floatPL,f_floatPL,showfresh
        });
    }else if(type == "UPDATE_COUPLIST"){
        var {couplist =[]} =action.data;
        return Object.assign({}, state, {
           couplist
        });
    }else if(type == "clear_store"){
        return Object.assign({}, state, {
            hanglist: [], couplist : [], orderlist :[],
            infoEquity: {},
            floatPL:0,
            f_floatPL:0,
        });
    }else if(type == "QUERY_POSITION_DATA"){

  
            return Object.assign({},state,{
                infoEquity:action.data
            });
        
      }else if(type == "QUERY_POSITION_LIST_DATA"){
        var floatTrade = action.data;
     
        var {hanglist,couplist,orderlist}=state;

        for(var i=0,l=hanglist.length;i<l;i++){
            var prodCode = hanglist[i].prodCode;
            for(var j=0,l2=floatTrade.length;j<l2;j++){
                var tmpO = floatTrade[j];
                if(typeof(tmpO)=='string') tmpO = JSON.parse(tmpO);
                if(prodCode == tmpO.symbol){
                    hanglist[i] = Object.assign({}, hanglist[i],tmpO);     
                    break;
                }
            }

        }
        var f_floatPL = 0;
        let l=couplist.length;
        for(var i=0;i<l;i++){
            var prodCode = couplist[i].prodCode;
            for(var j=0,l2=floatTrade.length;j<l2;j++){
                var tmpO = floatTrade[j];
                if(typeof(tmpO)=='string') tmpO = JSON.parse(tmpO);
                let {marketTime} = couplist[i];
                let {ctm} = tmpO;
                if(prodCode == tmpO.symbol && ctm > marketTime){
                    systemApi.log("sch prodCode:"+prodCode+"ctm :"+ ctm+" markettime: "+ marketTime);
                    couplist[i] = Object.assign({}, couplist[i],tmpO);
                    var {ask,bid,marketPrice,buySell,
                        openPrice,prodSize,exchangeRate,grossProfit,
                        tradedQty,swaps,commission} = couplist[i] ;
                    var netProfit = 0;
                    if(ask && bid){
                        marketPrice = buySell==1?ask:bid;
                        var pl = buySell==0?(marketPrice-openPrice):(openPrice-marketPrice);
                        grossProfit =(pl)*exchangeRate*prodSize*tradedQty;
                        netProfit = grossProfit+swaps+commission;
                        couplist[i].marketPrice = marketPrice;
                    }
                    couplist[i].netProfit=Math.round(netProfit * 100)/ 100;
                    couplist[i].grossProfit= Math.round(grossProfit * 100)/ 100;

                    break;
                }
            }
            f_floatPL +=couplist[i].netProfit;
        }
        var floatPL = 0;
        for(var i=0,l=orderlist.length;i<l;i++){
            var prodCode = orderlist[i].prodCode;
            for(var j=0,l2=floatTrade.length;j<l2;j++){
                var tmpO = floatTrade[j];
                if(typeof(tmpO)=='string') tmpO = JSON.parse(tmpO);
                let {marketTime} = orderlist[i];
                let {ctm} = tmpO;
                if(prodCode == tmpO.symbol && ctm > marketTime){
                   // systemApi.log("sch prodCode:"+prodCode+"ctm :"+ ctm+" markettime: "+ marketTime);
                    orderlist[i] = Object.assign({}, orderlist[i],tmpO);

                    var {ask,bid,marketPrice,buySell,
                        openPrice,prodSize,exchangeRate,grossProfit,
                        tradedQty,swaps,commission} = orderlist[i] ;
                    var netProfit = 0;
                  
                    if(ask && bid){
                        marketPrice = buySell==1?ask:bid;
                        var pl = buySell==0?(marketPrice-openPrice):(openPrice-marketPrice);
                        grossProfit= (pl)*exchangeRate*prodSize*tradedQty;
                        netProfit = grossProfit+swaps+commission;
                    
                    }
                  //  console.log("sch 1111 netProfit:"+netProfit+"   grossProfit:"+grossProfit+"swaps:"+swaps+"commission:"+commission);
                    orderlist[i].grossProfit= Math.round(grossProfit * 100)/ 100;
                    orderlist[i].netProfit= Math.round(netProfit * 100)/ 100;
                    break;
                }
            }
            if(orderlist[i].netProfit!=null)
            floatPL += orderlist[i].netProfit;

        }

        return Object.assign({},state,{
            hanglist:hanglist.slice(),
            couplist:couplist.slice(),
            orderlist:orderlist.slice(),
            floatPL:floatPL,
            f_floatPL:f_floatPL
        });

      }

    return state;
}
