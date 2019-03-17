module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const IntroPage = require('../../pages/optional/IntroPage');
        cb(null, IntroPage);
    }, 'IntroPage');
}
