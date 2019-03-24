module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const personalInfoPage = require('../../pages/me/PersonalInfoPage');
        cb(null, personalInfoPage);
    }, 'personalInfoPage');
}
