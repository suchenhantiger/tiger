import {Route,Router,hashHistory,IndexRedirect} from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import {getStoreConfig} from './store/storeConfig';

// injectTapEventPlugin();
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const store = getStoreConfig();

//动态路由
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={require('react-router!./routes/base/pages/BasePage')}>
                <IndexRedirect to="welcome"/>
                <Route path="welcome" getComponent={require('./routes/work/config/welcome/index')(store)}></Route>
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
                        <Route path="add" getComponent={require('./routes/work/config/optional/add')(store)}>
                            <Route path="search" getComponent={require('./routes/work/config/optional/search')(store)}></Route>
                        </Route>
                        <Route path="detail" getComponent={require('./routes/work/config/optional/optionaldetail')(store)}>
                            <Route path="intro" getComponent={require('./routes/work/config/optional/intro')(store)}></Route>
                        </Route>
                    </Route>
                    <Route path="documentary" getComponent={require('./routes/work/config/documentary/documentary')(store)}>
                        <Route path="detail" getComponent={require('./routes/work/config/documentary/detail')(store)}></Route>
                    </Route>
                    <Route path="trade" getComponent={require('./routes/work/config/trade/trade')(store)}>
                        <Route path="flatdetail" getComponent={require('./routes/work/config/trade/flatdetail')(store)}>
                            <Route path="stopprofit" getComponent={require('./routes/work/config/trade/stopprofit')(store)}></Route>
                        </Route>
                        <Route path="hangdetail" getComponent={require('./routes/work/config/trade/hangdetail')(store)}></Route>
                        <Route path="historydetail" getComponent={require('./routes/work/config/trade/historydetail')(store)}></Route>
                        <Route path="currcopydetail" getComponent={require('./routes/work/config/trade/currcopydetail')(store)}>
                            <Route path="master" getComponent={require('./routes/work/config/documentary/detail')(store)}></Route>
                        </Route>
                    </Route>
                    <Route path="me" getComponent={require('./routes/work/config/me/me')(store)}>
                        <Route path="recharge" getComponent={require('./routes/work/config/me/recharge')(store)}>
                            <Route path="upload/:certificateid" getComponent={require('./routes/work/config/me/upload')(store)}></Route>
                        </Route>
                        
                        <Route path="certification" getComponent={require('./routes/work/config/login/certification')(store)}></Route>
                        <Route path="checking" getComponent={require('./routes/work/config/me/checking')(store)}></Route> 
                        <Route path="setting" getComponent={require('./routes/work/config/me/setting')(store)}>
                            <Route path="personal" getComponent={require('./routes/work/config/me/personal')(store)}>
                                <Route path="address" getComponent={require('./routes/work/config/me/address')(store)}></Route>
                            </Route>
                            <Route path="setpwd" getComponent={require('./routes/work/config/login/setpwd')(store)}></Route>
                            <Route path="about"  getComponent={require('./routes/work/config/login/agreement')(store)}></Route>
                        </Route>
                        <Route path="notice" getComponent={require('./routes/work/config/me/notice')(store)}></Route>
                        <Route path="dailyreport" getComponent={require('./routes/work/config/me/dailyreport')(store)}></Route>
                        <Route path="bank" getComponent={require('./routes/work/config/me/bank')(store)}>
                            <Route path="add" getComponent={require('./routes/work/config/me/addbank')(store)}></Route>
                        </Route>
                        <Route path="server" getComponent={require('./routes/work/config/login/agreement')(store)}></Route>
                        <Route path="help" getComponent={require('./routes/work/config/login/agreement')(store)}></Route>
                    </Route>
                    <Route path="manageacc" getComponent={require('./routes/work/config/me/manageacc')(store)}></Route>
                    <Route path="improve" getComponent={require('./routes/work/config/login/improve')(store)}></Route>

                </Route>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById("main")
);
