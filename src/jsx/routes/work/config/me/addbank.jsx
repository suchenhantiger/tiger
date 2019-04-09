module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const addBankPage = require('../../pages/me/AddBankPage');
        cb(null, addBankPage);
    }, 'addBankPage');
}
