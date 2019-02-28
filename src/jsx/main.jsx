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
                <Route path="login" getComponent={require('./routes/work/config/login/login')(store)}>
                    <Route path="forget" getComponent={require('./routes/work/config/login/forget')(store)}></Route>
                    <Route path="agreement" getComponent={require('./routes/work/config/login/agreement')(store)}></Route>
                    <Route path="area" getComponent={require('./routes/work/config/login/area')(store)}></Route>
                </Route>
                <Route path="/work" getComponent={require('./routes/work/work')(store)}>
                    <Route path="home" getComponent={require('./routes/work/config/home/welcome')(store)}></Route>
                    <Route path="optional" getComponent={require('./routes/work/config/optional/optional')(store)}>
                        <Route path="add" getComponent={require('./routes/work/config/optional/add')(store)}></Route>
                        <Route path="detail" getComponent={require('./routes/work/config/optional/optionaldetail')(store)}></Route>
                    </Route>
                    <Route path="documentary" getComponent={require('./routes/work/config/documentary/documentary')(store)}></Route>
                    <Route path="trade" getComponent={require('./routes/work/config/trade/trade')(store)}></Route>
                    <Route path="me" getComponent={require('./routes/work/config/me/me')(store)}></Route>

                </Route>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById("main")
);
