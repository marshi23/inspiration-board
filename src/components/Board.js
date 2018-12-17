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
      cards: [],
      otherCardsList: []
    }
  };

  componentDidMount() {

    axios.get(this.props.url+this.props.boardName+'/cards')
    .then((response) => {
      const cards = response.data.map((card) => {

        const newCard = {
          ...card.card
        };
        return newCard;
      });

      this.setState({
        cards: cards,
        otherCardsList: cards
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
      deleteCardCallback={this.removeCard}
      />
    });
  }

  removeCard = (cardId) => {
    console.log('where deleting happends')
    let deleteIndex = -1;
    const { cards } = this.state

    cards.forEach((card, index) => {
      if (cardId === card.id) {
        deleteIndex = index;
      }
    })

    cards.splice(deleteIndex, 1);
    this.setState({
      cards
    })


    const url = 'https://inspiration-board.herokuapp.com/cards/'
    axios.delete(url + cardId)
    .then((response) => {
      let deletedCard = response.data.card
      console.log(`${deletedCard.text} has been deleted`)
    })
    .catch((error) => {

      this.setState({
        errorMessage: `Failure to delete card: ${error.messsage}`,
      })
    })
  }

  addCard = (newCard) => {
    console.log('I made it to addCard')
    const apiPayload = {
      ...newCard
    }


    axios.post(this.props.url+this.props.boardName+'/cards', apiPayload)
    .then((response) => {

      let { cards } = this.state;
      const myNewCard = response.data.card;
      apiPayload.text = myNewCard.text
      apiPayload.emoji = myNewCard.emoji

      cards.push(myNewCard)

      this.setState({
        cards: cards
      });
    })
    .catch((error) => {
      this.setState({
        errorMessage: `Failure ${error.message}`
      });
    })
  }

  render() {

    return (
      <div className="board">
      <section><NewCardForm addCardCallback={this.addCard}/></section>
      {this.displayCards()}
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
