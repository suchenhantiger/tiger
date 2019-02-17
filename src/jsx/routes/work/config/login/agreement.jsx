module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const agreementPage = require('../../pages/login/AgreementPage');
        cb(null, agreementPage);
    }, 'agreementPage');
}
