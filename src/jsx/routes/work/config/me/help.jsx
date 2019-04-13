module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const helpPage = require('../../pages/me/HelpPage');
        cb(null, helpPage);
    }, 'helpPage');
}
