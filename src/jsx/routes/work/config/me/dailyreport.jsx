module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const dailyReporyPage = require('../../pages/me/DailyReporyPage');
        cb(null, dailyReporyPage);
    }, 'dailyReporyPage');
}
