module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const documentarDetailPage = require('../../pages/documentary/DocumentarDetailPage');
        cb(null, documentarDetailPage);
    }, 'documentarDetailPage');
}
