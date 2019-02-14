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
          <IndexRedirect to="work"/>
          <Route path="/work" getComponent={require('./routes/work/work')(store)}>
              <IndexRedirect to="home"/>
              <Route path="home" getComponent={require('./routes/work/config/home/welcome')(store)}></Route>
              <Route path="attendance" getComponent={require('./routes/work/config/attendance/attendance')(store)}>
              </Route>
          </Route>
          </Route>
      </Router>
    </Provider>
  ,document.getElementById("main")
);
