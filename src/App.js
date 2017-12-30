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
          <img src="https://cdn2.iconfinder.com/data/icons/vote-reward-badges1/24/Vote-Stamp-512.png" className="App-logo" alt="logo" />
          <h1 className="App-title">WELCOME TO VOTEAPP</h1>
        </header>
        <br/>
        <FullResult />


      </div>
    );
  }
}

export default App;
