import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const mePage = require('../../pages/me/MePage');
        var reducer = require('../../reducers/me/meReducer');
        injectReducer(store, {me: reducer});
        cb(null, mePage);
    }, 'mePage');
}
