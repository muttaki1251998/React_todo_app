import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder } from '../actions';
import { bindActionCreators } from 'redux';
import './App.css';

class App extends Component{

constructor(props){
  super(props);
  this.state = {
    text: ''
  }
}

addReminder(){
  this.props.addReminder(this.state.text);
}

deleteReminder(id){
  // console.log('deleting reminder', id);
  // console.log('this.props', this.props);
  this.props.deleteReminder(id);
}

renderReminders(){
const { reminders } = this.props;
  return(
    <div>
      <br></br>
        <ul className="list-group lists reminder-form">
          {
            reminders.map(reminder => {
              return(
                <li key={reminder.id} className="list-group-item">
                  <div className="list-item">{reminder.text}</div>
                <div className="list-item delete-button"
                      onClick={() => this.deleteReminder(reminder.id)}>
                      X
                </div>
                </li>
              )
            })
          }
        </ul>
    </div>
  )
}


  render(){
    // console.log("this.props", this.props);
    return(
      <div className="App">
        <div className="Title">
          Remind me
        </div>
        <div className="form-inline ">
          <div className="form-group ">
            <input
              className = "form-control"
              placeholder = "I have to .. "
              onChange = {event => this.setState({text: event.target.value})}
              onKeyPress = {event => {
                if(event.key === 'Enter'){
                  this.renderReminders()
                }
              }}
            />
          </div>

          <button
            onClick={() => this.addReminder()}
            type = "submit"
            className = "btn btn-light"
          >
          Enter
        </button><br />
        </div>
          { this.renderReminders() }
      </div>
    );
  }
}

function mapStateToProps(state){
  //console.log('state', state);
  return{
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder }) (App);
