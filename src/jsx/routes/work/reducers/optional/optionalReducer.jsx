module.exports = function optionalReducer(state,action){
    var {type} = action;
    state = state || {
        productList:{}
    };
    if(type == "QUERY_PRODUCT_DATA"){
        return Object.assign({},state,{
            productList:action.data
        });
      }

    return state;
};
