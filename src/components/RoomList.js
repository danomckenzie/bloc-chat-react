import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
      rooms: [],
      newRoomName: '',
      activeRoom: ''
  };
  this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  createNewRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({newRoomName: ''});
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  deleteRoom(room){
    this.roomsRef.child(room.key).remove();
      const index = this.state.rooms.indexOf(room);
      this.state.rooms.splice(index, 1);
      this.setState({rooms: this.state.rooms})
  }

  render() {
    return (

      <div className="room-list">
        {this.state.rooms.map((room, index) =>
        <div key={index} onClick={ () => this.props.handleRoomClick(room)}>{room.name}
        <button className="DeleteButton" onClick={ () => this.deleteRoom(room)}>Delete</button>
        </div>
      )}

        <div className="newRoom-button">
        <form onSubmit={ (e) => {
          e.preventDefault();
          this.createNewRoom(this.state.newRoomName) } }>

        <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e)}/>
        <input type="submit"/>
        </form>
        </div>
      </div>
    );
  }
}

export default RoomList;
