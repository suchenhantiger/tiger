module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const settingPage = require('../../pages/me/SettingPage');
        cb(null, settingPage);
    }, 'settingPage');
}
