import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import emoji from 'emoji-dictionary';
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
    event.preventDefault();

    this.props.addCardCallback(this.state);
    this.resetState();
  }

  render() {

    const emojiOptions = EMOJI_LIST.map((emoji, index) => {
        return <option key={index} value={emoji}>{emoji}</option>
      })

    return (
      <form className="" onSubmit={this.onNewCardSubmit}>
      <header className="form-header">Add Inspiration Card</header>

      <div>
      <label className="" htmlFor="text">Text</label>
      </div>
      <textarea className="" placeholder="Text" name="text" onChange={this.onFormChange} value={this.state.text}></textarea>

      <div>
      <label className="">Emoji</label>
      </div>
      <select name="emoji" onChange={this.onFormChange} className="">
         {emojiOptions}
      </select>

      <section>
        <input className="form-button" type="submit" value="Add Card"/>
      </section>
      </form>
    );
  }
}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
