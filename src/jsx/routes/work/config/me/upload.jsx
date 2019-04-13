module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const AddCertificatePage = require('../../pages/me/AddCertificatePage');
        cb(null, AddCertificatePage);
    }, 'AddCertificatePage');
}
