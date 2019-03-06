module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const CheckingPage = require('../../pages/me/CheckingPage');
        cb(null, CheckingPage);
    }, 'CheckingPage');
}
