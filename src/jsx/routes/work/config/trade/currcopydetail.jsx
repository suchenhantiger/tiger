module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const CurrCopyDetailPage = require('../../pages/trade/CurrCopyDetailPage');
        cb(null, CurrCopyDetailPage);
    }, 'CurrCopyDetailPage');
}
