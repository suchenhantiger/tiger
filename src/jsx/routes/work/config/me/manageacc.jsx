module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const accountManagePage = require('../../pages/me/AccountManagePage');
        cb(null, accountManagePage);
    }, 'accountManagePage');
}
