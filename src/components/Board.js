import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';


class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      errors: undefined,
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
      });
    })

    .catch((error) => {
      let { errors } = this.state
      errors.push(error.message)

      this.setState({
        errors: errors
      })
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
      // let deletedCard = response.data.card

      this.setState({
        errorMessage: `Card Deleted`,
      })
    })
    .catch((error) => {
      let { errors } = this.state
      errors.push(error.message)

      this.setState({
        errors: errors
      })
    })
  }

  addCard = (newCard) => {

    const apiPayload = `text=${newCard.text}&emoji=${newCard.emoji}`

    axios.post(this.props.url+this.props.boardName+'/cards?' + apiPayload)
    .then((response) => {

      let { cards } = this.state;
      const newCard = response.data.card;

      cards.push(newCard)

      this.setState({
        cards: cards,
        errorMessage: `Card Added`
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
      <section className="board">
      <section className="errorMessages">
        {this.state.errors ? `${this.state.errors}` : ""}
      </section>
      <section>
      <NewCardForm addCardCallback={this.addCard}/>
      </section>
      {this.displayCards()}
      </section>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
