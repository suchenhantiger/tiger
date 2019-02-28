module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const reChargePage = require('../../pages/me/ReChargePage');
        cb(null, reChargePage);
    }, 'reChargePage');
}
