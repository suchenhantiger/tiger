module.exports = function optionalReducer(state,action){
    var {type} = action;
    state = state || {

    };

    return state;
};
