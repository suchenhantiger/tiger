module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const forgetPwdPage = require('../../pages/login/ForgetPwdPage');
        cb(null, forgetPwdPage);
    }, 'forgetPwdPage');
}
