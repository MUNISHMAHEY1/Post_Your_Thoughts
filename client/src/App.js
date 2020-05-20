import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MenuBar from './components/MenuBar';

function App() {
  return (
      <Router>
          <MenuBar></MenuBar>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/register" component={ Register }/>
      </Router>
  );
}

export default App;
