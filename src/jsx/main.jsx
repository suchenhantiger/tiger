import {Route,Router,hashHistory,IndexRedirect} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import {getStoreConfig} from './store/storeConfig';

injectTapEventPlugin();

const store = getStoreConfig();

//动态路由
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={require('react-router!./routes/base/pages/BasePage')}>
                <IndexRedirect to="login"/>
                <Route path="login" getComponent={require('./routes/work/config/login/login')(store)}>
                    <Route path="improve" getComponent={require('./routes/work/config/login/improve')(store)}></Route>
                    <Route path="forget" getComponent={require('./routes/work/config/login/forget')(store)}></Route>
                    <Route path="setpwd" getComponent={require('./routes/work/config/login/setpwd')(store)}></Route>
                    <Route path="agreement" getComponent={require('./routes/work/config/login/agreement')(store)}></Route>
                    <Route path="area" getComponent={require('./routes/work/config/login/area')(store)}></Route>
                </Route>
                <Route path="/work" getComponent={require('./routes/work/work')(store)}>
                    <IndexRedirect to="documentary"/>
                    <Route path="optional" getComponent={require('./routes/work/config/optional/optional')(store)}>
                        <Route path="add" getComponent={require('./routes/work/config/optional/add')(store)}></Route>
                        <Route path="detail" getComponent={require('./routes/work/config/optional/optionaldetail')(store)}></Route>
                    </Route>
                    <Route path="documentary" getComponent={require('./routes/work/config/documentary/documentary')(store)}></Route>
                    <Route path="trade" getComponent={require('./routes/work/config/trade/trade')(store)}>
                        <Route path="flatdetail" getComponent={require('./routes/work/config/trade/flatdetail')(store)}></Route>
                        <Route path="hangdetail" getComponent={require('./routes/work/config/trade/hangdetail')(store)}></Route>
                        
                    </Route>
                    <Route path="me" getComponent={require('./routes/work/config/me/me')(store)}>
                        <Route path="recharge" getComponent={require('./routes/work/config/me/recharge')(store)}></Route>
                        <Route path="improve" getComponent={require('./routes/work/config/login/improve')(store)}></Route>
                        <Route path="certification" getComponent={require('./routes/work/config/login/certification')(store)}></Route>
                        {/* <Route path="checking" getComponent={require('./routes/work/config/me/checking')(store)}></Route> */}

                    </Route>

                </Route>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById("main")
);
