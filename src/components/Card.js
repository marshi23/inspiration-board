import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';


// class Card extends Component {
const Card = (props) => {

    return (
      <div className="card">
        <section className="card__content">
          <p className="card__content-text">{props.text}</p>

          {props.emoji && (
              <p className="card__content-emoji">
              {emoji.getUnicode(props.emoji)}
              </p>)}

          <button onClick={() => props.deleteCardCallback(props.id)} type="button" className="card__delete">X</button>
        </section>
      </div>
    )
  }


Card.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  emoji: PropTypes.string,
  deleteCardCallback: PropTypes.func,
};

export default Card;
