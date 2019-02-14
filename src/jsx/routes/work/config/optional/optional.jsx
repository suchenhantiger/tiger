import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const optionalPage = require('../../pages/optional/OptionalPage');
        var reducer = require('../../reducers/optional/optionalReducer');
        injectReducer(store, {optional: reducer});
        cb(null, optionalPage);
    }, 'optionalPage');
}
