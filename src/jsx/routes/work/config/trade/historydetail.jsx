module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const HistoryDetailPage = require('../../pages/trade/HistoryDetailPage');
        cb(null, HistoryDetailPage);
    }, 'HistoryDetailPage');
}
