import {injectReducer} from '../../../../store/reducers';
module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const loginPage = require('../../pages/login/LoginPage');
        var reducer = require('../../reducers/login/loginReducer');
        injectReducer(store, {login: reducer});
        cb(null, loginPage);
    }, 'loginPage');
}
