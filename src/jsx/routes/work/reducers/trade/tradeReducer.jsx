module.exports = function tradeReducer(state,action){
    var {type} = action;
    state = state || {
        infoEquity: {},
        floatTrade:[],
    };
    if(type == "QUERY_POSITION_DATA"){
        return Object.assign({},state,{
            infoEquity:action.data
        });
        
      }else if(type == "QUERY_POSITION_LIST_DATA"){
        return Object.assign({},state,{
            floatTrade:action.data
        });

      }
    return state;
};
