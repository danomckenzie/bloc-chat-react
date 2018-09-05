import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: [{
        username: '',
        content: '',
        roomId: '',
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      }]
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    //console.log(this.props.activeRoom);
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  render() {
  return (
    <div className="message_room">
      <h2>{this.props.activeRoom ? this.props.activeRoom.name: " "}</h2>
        <ul className="message_list">
          {this.state.messages.map((message, index) =>
          <div key={index}>
            <li>{message.username}</li>
            <li>{message.content}</li>
            <li>{message.sentAt}</li>
          </div>
          )}
        </ul>
      </div>
      );
  }
}

export default MessageList;
