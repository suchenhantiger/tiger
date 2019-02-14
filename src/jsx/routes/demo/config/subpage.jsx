module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const subPage = require('../pages/SubPage');
        cb(null, subPage)
    }, 'subPage');
}
