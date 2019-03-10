module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const bankPage = require('../../pages/me/BankPage');
        cb(null, bankPage);
    }, 'bankPage');
}
