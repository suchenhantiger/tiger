module.exports = function login(state,action){
    var {type} = action;
    state = state || {
          annualBillInfo:{}
        };

    if (type == "GET_ANNUAL_BILL") {
      var {billInfo} = action;
      return Object.assign({}, state, {
        annualBillInfo: billInfo
      });
    }

    return state;
};
