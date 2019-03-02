import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const addPage = require('../../pages/optional/AddPage');
        var reducer = require('../../reducers/optional/optionalReducer');
        injectReducer(store, {optional: reducer});
        cb(null, addPage);
    }, 'addPage');
}
