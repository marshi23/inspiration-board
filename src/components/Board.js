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
      cards: []


      // cards: CARD_DATA.cards.map((card, i) => {
      //   return <Card
      //     key={i}
      //     text={card.text}
      //     emoji={card.emoji || card.Emoji}
      //   />
      // }),
    }
  };

componentDidMount() {
  let url = this.props.url + this.props.name + '/cards'
  console.log(url)
axios.get(this.props.url+this.props.name+'/cards')

  .then((response) => {
    const cards = response.data.map((card) => {

      const newCard = {
        key: card.card.id,
        text: card.card.text,
        emoji: card.card.emoji
        // ...card.card
      };
      return newCard;
    });

    console.log(cards)
    this.setState({
      cards: cards
    });
  })
  .catch(() => {
    console.log('where to catch errors')
  })
}

displayCards = () => {
  return this.state.cards.map((card, i) => {
    return <Card
      key={i}
      id={card.id}
      text={card.text}
      emoji={card.emoji}
      />
  });
}

  render() {

    return (
      <div className="board">
        {this.displayCards()}
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
