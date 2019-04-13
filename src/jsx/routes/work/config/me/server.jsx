module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const serverPage = require('../../pages/me/ServerPage');
        cb(null, serverPage);
    }, 'serverPage');
}
