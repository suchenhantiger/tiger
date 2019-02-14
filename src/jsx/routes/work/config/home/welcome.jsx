import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const welcomePage = require('../../pages/home/WelcomePage');
        var reducer = require('../../reducers/home/homeReducer');
        injectReducer(store, {welcomePage: reducer});
        cb(null, welcomePage);
    }, 'welcomePage');
}

