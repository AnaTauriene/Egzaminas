import React from 'react';
import MainView from './containers/MainView';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NewClientRegView from './containers/NewClientRegView';
import MeniuView from './containers/MeniuView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainView} />
        <Route exact path="/newclient" component={NewClientRegView} />
        <Route exact path="/meniu" component={MeniuView} />
      </Switch>
    </Router>
  );
}

export default App;
