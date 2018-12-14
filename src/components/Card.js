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

          <button type="button" className="card__delete"></button>
        </section>
      </div>
    )
  }


Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string
};

export default Card;
