module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const ModifyBankPage = require('../../pages/me/ModifyBankPage');
        cb(null, ModifyBankPage);
    }, 'ModifyBankPage');
}
