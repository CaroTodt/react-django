import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './views/Home';
import Login from './views/Session/Login';
import Activate from './views/Session/Activate';
import ResetPassword from './views/Session/ResetPassword';
import ResetPasswordConfirm from './views/Session/ResetPasswordConfirm';
import SignUp from './views/Session/SignUp';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route exact path='/activate/:uid/:token' component={Activate} />
          </Switch>
        </Layout>
      </Router>
      </Provider>
  );
}

export default App;
