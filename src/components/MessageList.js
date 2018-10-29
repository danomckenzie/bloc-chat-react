import React, { Component } from 'react';
import Timestamp from 'react-timestamp';

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
      userName: this.props.user.displayName,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({newMessage: ''});
  }

   formatTime(time) {
    let date = new Date(time);
    let minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
  } 

  deleteMessage(message){
    this.messagesRef.child(message.key).remove()
      const index = this.state.messages.indexOf(message);
      this.state.messages.splice(index, 1);
      this.setState({messages: this.state.messages})
  }

  render() {
  return (
    <div className="message_room">
      <h2 className="room-name">{this.props.activeRoom ? this.props.activeRoom.name: " "}</h2>

        <ul className="message_list">
          {this.state.messages.filter(message => message.roomId == this.props.activeRoom.key).map((message, index) =>
          <div key={index}>
            <li className="user-name">{message.userName}</li>
            <li className="message-content">{message.content}</li>
            <li className="message-time"><Timestamp time={(message.sentAt)} />
            <button className="DeleteButton" onClick={ () => this.deleteMessage(message)}>Delete</button>
            </li>
          </div>
          )}
        <div className="message-submit">
          <div className="newMessage-button">
            <form onSubmit={ (e) => {
              e.preventDefault();
              this.createNewMessage() } }>

            <input type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e)}/>
            <input type="submit"/>
            </form>
          </div>
        </div>
        </ul>

      </div>
      );
  }
}

export default MessageList;
