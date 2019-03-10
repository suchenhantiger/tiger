module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const stopProfitPage = require('../../pages/trade/StopProfitPage');
        cb(null, stopProfitPage);
    }, 'stopProfitPage');
}
