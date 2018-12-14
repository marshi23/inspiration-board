import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: CARD_DATA.cards.map((card, i) => {
        return <Card
          key={i}
          text={card.text}
          emoji={card.emoji || card.Emoji}
        />
      }),
    };
  };

  render() {

    return (
      <div className="board">
        {this.state.cards}
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
