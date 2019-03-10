module.exports = function tradeReducer(state,action){
    var {type} = action;
    state = state || {
        infoEquity: {},
        floatTrade:[],
    };
    if(type == "QUERY_POSITION_DATA"){
        var {infoEquity,floatTrade} =action.data;
        if(infoEquity && floatTrade){
            return Object.assign({},state,{
                infoEquity:infoEquity,
                floatTrade:floatTrade
            });
        }else{
            return Object.assign({},state,{
                infoEquity:infoEquity
            });
        }
        
      }
    return state;
};
