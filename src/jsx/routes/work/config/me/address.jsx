module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const AddressImgPage = require('../../pages/login/AddressImgPage');
        cb(null, AddressImgPage);
    }, 'AddressImgPage');
}
