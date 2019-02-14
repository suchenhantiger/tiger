import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const tradePage = require('../../pages/trade/TradePage');
        var reducer = require('../../reducers/trade/tradeReducer');
        injectReducer(store, {me: reducer});
        cb(null, tradePage);
    }, 'tradePage');
}
