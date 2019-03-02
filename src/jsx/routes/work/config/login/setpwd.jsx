module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const ModifyPwdPage = require('../../pages/login/ModifyPwdPage');
        cb(null, ModifyPwdPage);
    }, 'ModifyPwdPage');
}
