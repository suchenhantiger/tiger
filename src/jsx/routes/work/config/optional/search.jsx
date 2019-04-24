import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const SearchPage = require('../../pages/optional/SearchPage');
        var reducer = require('../../reducers/optional/optionalReducer');
        injectReducer(store, {optional: reducer});
        cb(null, SearchPage);
    }, 'SearchPage');
}
