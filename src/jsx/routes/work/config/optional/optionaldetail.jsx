module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const optionalDetailPage = require('../../pages/optional/OptionalDetailPage');
        cb(null, optionalDetailPage);
    }, 'optionalDetailPage');
}
