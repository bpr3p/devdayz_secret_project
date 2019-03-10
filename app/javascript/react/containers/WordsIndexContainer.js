import React, { Component } from 'react'
import { Link } from 'react-router'
import WordTile from '../components/WordTile'

class WordsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clues: []
    }
  }

  componentDidMount() {
   fetch(`/api/v1/clues`, {
     credentials: 'same-origin'
   })
   .then(response => {
     if (response.ok) {
       return response;
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
       throw(error);
     }
   })
   .then(response => response.json())
   .then(body => {
     this.setState({ clues: body })
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

  render() {
    let words;
    if (this.state.clues) {
      words = this.state.clues.map((clue) => {
        return (
          <WordTile
          key = {clue.id}
          id = {clue.id}
          word = {clue.word}
          difficulty = {clue.difficulty.name}
          difficulty_id = {clue.difficulty.id}
          />
        )
      })
    }

    return (
      <div>
        {words}
      </div>
    )
  }
}


export default WordsIndexContainer;
