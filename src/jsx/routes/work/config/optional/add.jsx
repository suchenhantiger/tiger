module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const addPage = require('../../pages/optional/AddPage');
        cb(null, addPage);
    }, 'addPage');
}
