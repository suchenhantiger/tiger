module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const CertificationPage = require('../../pages/me/CertificationPage');
        cb(null, CertificationPage);
    }, 'CertificationPage');
}
