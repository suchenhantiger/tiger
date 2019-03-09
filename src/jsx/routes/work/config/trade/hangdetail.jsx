import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const HangDetailPage = require('../../pages/trade/HangDetailPage');
        var reducer = require('../../reducers/trade/tradeReducer');
        injectReducer(store, {me: reducer});
        cb(null, HangDetailPage);
    }, 'HangDetailPage');
}
