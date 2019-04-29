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
        f_floatPL:0
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
            console.log(accuracyDate);
        return Object.assign({}, state, {
            accuracyDate:accuracyDate.list,
            incomeDate:incomeDate.list,
            steadyDate:steadyDate.list
        });
    }else if(type == "UPDATE_ALL_LIST"){
        var {hanglist=[], couplist =[], orderlist =[]} =action.data;
        return Object.assign({}, state, {
            hanglist,couplist,orderlist,floatPL:0,f_floatPL:0
        });
    }else if(type == "UPDATE_COUPLIST"){
        var {couplist =[]} =action.data;
        return Object.assign({}, state, {
           couplist
        });
    }else if(type == "QUERY_POSITION_DATA"){
       // console.log(action.data);
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
                if(prodCode == tmpO.symbol){

                    couplist[i] = Object.assign({}, couplist[i],tmpO);
                    var {ask,bid,marketPrice,buySell,
                        openPrice,prodSize,exchangeRate,
                        tradedQty,swaps,commission} = couplist[i] ;
                    var netProfit = 0;
                    if(ask && bid){
                        marketPrice = buySell==1?ask:bid;
                        var pl = buySell==0?(marketPrice-openPrice):(openPrice-marketPrice);
                        netProfit = (pl)*exchangeRate*prodSize*tradedQty+swaps+commission;
                        couplist[i].marketPrice = marketPrice;
                    }
                    couplist[i].netProfit=netProfit;
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
                if(prodCode == tmpO.symbol){
                    orderlist[i] = Object.assign({}, orderlist[i],tmpO);
                    var {ask,bid,marketPrice,buySell,
                        openPrice,prodSize,exchangeRate,
                        tradedQty,swaps,commission} = orderlist[i] ;
                    var netProfit = 0;
                    if(ask && bid){
                        marketPrice = buySell==1?ask:bid;
                        var pl = buySell==0?(marketPrice-openPrice):(openPrice-marketPrice);
                        netProfit = (pl)*exchangeRate*prodSize*tradedQty+swaps+commission;
                    }
                    orderlist[i].netProfit=netProfit;
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
