import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      emoji: ""
    };
  }

  resetState = () => {
    this.setState({
      text: "",
      emoji: "",
    })
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value

    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState)
  }

  onNewCardSubmit = (event) => {
    console('tried to submit from - form')
    event.preventDefault();

    // const { text, emoji } = this.state;
    // if (text === '' || emoji === '') return;

    this.props.addCardCallback(this.state);
    this.resetState();

  }

  printEmojiOptions = () => {
    const list = EMOJI_LIST.map((emoji) => {
      return <option>{emoji}</option>
    })
    return list
  }


  render() {
    return (
      <form className="new-card-form" onSubmit={this.onNewCardSubmit}>
      <header className="form-header">Add inspiration Card</header>

      <div>
      <label className="form-label" htmlFor="text"></label>
      </div>
      <textarea className="form-textarea" placeholder="Text" name="text" onChange={this.onFormChange} value={this.state.text}></textarea>

      <div>
      <label className="form-label">Emoji</label>
      </div>
      <select className="form-select">
        {this.printEmojiOptions()}
      </select>

      <input className="form-button" type="submit" value="Add Card"/>
      </form>
    );
  }
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
