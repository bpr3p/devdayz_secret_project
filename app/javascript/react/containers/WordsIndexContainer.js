import React, { Component } from 'react'
import { Link } from 'react-router'
import WordTile from '../components/WordTile'

class WordsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      easy_clues: [],
      medium_clues: [],
      hard_clues: [],
      clicked_clues: [],
      audioPlaying: false
    }
    this.handleClueClick = this.handleClueClick.bind(this)
    this.playSong = this.playSong.bind(this)
    this.stopSong = this.stopSong.bind(this)
  }

  audio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2014/10/Jeopardy-theme-song.mp3")

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
     this.setState({ easy_clues: body["clues"]["easy"], medium_clues: body["clues"]["medium"], hard_clues: body["clues"]["hard"] })
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 handleClueClick(event) {
   let int = parseInt(event.target.id)
   let old_clicked = this.state.clicked_clues
   let audioPlaying = this.state.audioPlaying

   if (!old_clicked.includes(int)) {
     old_clicked.push(int)
   }

   if (!audioPlaying) {
     audioPlaying = true
     this.playSong()
   }

   this.setState({ clicked_clues: old_clicked, audioPlaying: audioPlaying })
 }

 playSong() {
   this.audio.play()

   setTimeout(function(){
     this.setState({ audioPlaying: false });
   }.bind(this),33000)
 }

 stopSong() {
   this.audio.pause()
   this.audio.currentTime = 0

   this.setState({ audioPlaying: false });
 }

  render() {
    let stopButton
    let easy_words;
    let medium_words;
    let hard_words;
    let cluesById = this.state.clicked_clues

    if (this.state.audioPlaying == true) {
      stopButton = <button id="stopButton" onClick={this.stopSong}>STOP THE MUSIC<br/>- WE WON!</button>
    }

    if (this.state.easy_clues) {
      easy_words = this.state.easy_clues.map((clue) => {
        let word = null
        if (cluesById.includes(clue.id)) {
          word = clue.word
        }
        return (
          <WordTile
          key = {clue.id}
          id = {clue.id}
          word = {word}
          handleClueClick = {this.handleClueClick}
          difficulty_id = {clue.difficulty_id}
          />
        )
      })
    }

    if (this.state.medium_clues) {
      medium_words = this.state.medium_clues.map((clue) => {
        let word = null
        if (cluesById.includes(clue.id)) {
          word = clue.word
        }
        return (
          <WordTile
          key = {clue.id}
          id = {clue.id}
          word = {word}
          handleClueClick = {this.handleClueClick}
          difficulty_id = {clue.difficulty_id}
          />
        )
      })
    }

    if (this.state.hard_clues) {
      hard_words = this.state.hard_clues.map((clue) => {
        let word = null
        if (cluesById.includes(clue.id)) {
          word = clue.word
        }
        return (
          <WordTile
          key = {clue.id}
          id = {clue.id}
          word = {word}
          handleClueClick = {this.handleClueClick}
          difficulty_id = {clue.difficulty_id}
          />
        )
      })
    }

    return (
      <div className="parent-div">
        <div className="grid-container">
          <div className="easy-column grid-item1">
            <div className="row-header">EASY</div>
            {easy_words}
          </div>
          <div className="medium-column grid-item2">
            <div className="row-header">MEDIUM</div>
            {medium_words}
          </div>
          <div className="hard-column grid-item3">
            <div className="row-header">HARD</div>
              {hard_words}
          </div>
          <div className="stopButtonDiv grid-item4">
          {stopButton}
          </div>
        </div>
      </div>
    )
  }
}


export default WordsIndexContainer;
