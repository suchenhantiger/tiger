import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const demoPage = require('../pages/DemoPage');
        var reducer = require('../reducers/demoReducer');
        injectReducer(store, {demo:reducer});
        cb(null, demoPage)
    }, 'demoPage');
}
