import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const TradeDetailPage = require('../../pages/trade/TradeDetailPage');
        var reducer = require('../../reducers/trade/tradeReducer');
        injectReducer(store, {trade: reducer});
        cb(null, TradeDetailPage);
    }, 'TradeDetailPag');
}
