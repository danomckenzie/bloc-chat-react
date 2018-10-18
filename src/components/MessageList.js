import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageContent: "",
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
  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }
  createNewMessage(newMessage) {
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      userName: '',
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    });
  }

  render() {
  return (
    <div className="message_room">
      <h2>{this.props.activeRoom ? this.props.activeRoom.name: " "}</h2>
        <div className="newMessage-button">
        <form onSubmit={ (e) => {
          e.preventDefault();
          this.createNewMessage() } }>

        <input type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e)}/>
        <input type="submit"/>
        </form>
        </div>
        <ul className="message_list">
          {this.state.messages.filter(message => message.roomId == this.props.activeRoom.key).map((message, index) =>
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
