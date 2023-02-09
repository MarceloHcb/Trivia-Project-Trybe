import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/gamepage" component={ GamePage } />
          <Route exact path="/settings" component={ SettingsPage } />
        </Switch>
      </header>
    </div>
  );
}
