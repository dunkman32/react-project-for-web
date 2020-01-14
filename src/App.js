import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './pages/main';
import './App.css';
import _404 from './pages/404';
import Single from './pages/single';
import Amplify from 'aws-amplify'
import config from './config'

const hist = createBrowserHistory();

Amplify.configure({
  Auth: {
    mandatorySingedId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    // identityPoolId: config.cognito.USER_POOL_ID,
    mandatorySignIn: false,
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: 'pitshi.kupikona.com',
      // OPTIONAL - Cookie path
      path: '/pirshi',
      // OPTIONAL - Cookie expiration in days
      expires: 1,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: true
    },

  }
})

function App () {
  return (
    <div className="App" style={{ fontFamily: '\'Lobster\', cursive' }}>
      <Router history={hist}>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/single/:name" component={Single}/>
          <Route component={_404}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
