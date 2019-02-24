module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const areaPage = require('../../pages/login/AreaPage');
        cb(null, areaPage);
    }, 'areaPage');
}
