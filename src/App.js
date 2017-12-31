import React, { Component } from 'react';
import './App.css';
import Results from './Results';
import VoteForm from './VoteForm';
import FullResult from './FullResult';
import {Grid, Row} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="http://www.industrialui.com/wp-content/uploads/2016/12/256x256.png" className="App-logo" alt="logo" />
          <h1 className="App-title">WELCOME TO SURVEYAPP</h1>
        </header>
        <br/>
        <FullResult />


      </div>
    );
  }
}

export default App;
