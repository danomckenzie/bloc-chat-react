import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js'
import MessageList from './components/MessageList.js'
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
    constructor(props) {
      super(props);
      this.state = {
        activeRoom: ''
    };
  }

  handleRoomClick = (room) => {
    this.setState({ activeRoom: room });
    console.log(room);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="app_title">Bloc Chat</h1>
        </header>
        <div>
          <RoomList firebase = {firebase} activeRoom = {this.state.activeRoom} handleRoomClick = {this.handleRoomClick.bind(this)}/>
          <MessageList firebase = {firebase} activeRoom = {this.state.activeRoom}/>
        </div>
      </div>
    );
  }
}

export default App;
