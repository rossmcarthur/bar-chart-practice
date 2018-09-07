import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import UserPage from './components/user_page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserPage/>
      </div>
    );
  }
}

export default connect()(App);
