import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

<script src="https://www.gstatic.com/firebasejs/5.4.0/firebase.js"></script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAoOgZua1LZdw0PGDIlRm445RvhWGYbOts",
    authDomain: "bloc-chat-c808b.firebaseapp.com",
    databaseURL: "https://bloc-chat-c808b.firebaseio.com",
    projectId: "bloc-chat-c808b",
    storageBucket: "bloc-chat-c808b.appspot.com",
    messagingSenderId: "264848437570"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
