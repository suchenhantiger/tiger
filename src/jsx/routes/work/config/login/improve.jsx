module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const ImprovePage = require('../../pages/login/ImprovePage');
        cb(null, ImprovePage);
    }, 'ImprovePage');
}
