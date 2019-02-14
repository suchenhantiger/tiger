import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const documentarylPage = require('../../pages/documentary/DocumentaryPage');
        var reducer = require('../../reducers/documentary/documentaryReducer');
        injectReducer(store, {documentary: reducer});
        cb(null, documentarylPage);
    }, 'documentarylPage');
}
