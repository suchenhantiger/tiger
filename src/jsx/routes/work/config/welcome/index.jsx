
import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const WelcomePage = require('../../pages/welcome/WelcomePage');
        var reducer = require('../../reducers/welcome/welcomeReducer');
        injectReducer(store, {welcome: reducer});
        cb(null, WelcomePage);
    }, 'WelcomePage');
}