module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const noticePage = require('../../pages/me/NoticePage');
        cb(null, noticePage);
    }, 'noticePage');
}
