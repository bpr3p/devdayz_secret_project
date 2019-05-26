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
      nb_clues: [],
      clicked_clues: [],
      audioPlaying: false,
      cancelOption: false,
      confetti: false
    }
    this.handleClueClick = this.handleClueClick.bind(this)
    this.playSong = this.playSong.bind(this)
    this.stopSong = this.stopSong.bind(this)
    this.setCancellable = this.setCancellable.bind(this)
    this.setConfetti = this.setConfetti.bind(this)
  }

  audio = new Audio('/sounds/countdown.mp3')

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
     this.setState({ easy_clues: body["clues"]["easy"], medium_clues: body["clues"]["medium"], hard_clues: body["clues"]["hard"], nb_clues: body["clues"]["nailBiter"] })
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 handleClueClick(event) {
   let int = parseInt(event.target.id)
   let clues = []
   let audioPlaying = this.state.audioPlaying
   let cancellable = this.state.cancelOption
   let old_clicked = this.state.clicked_clues


   if (!audioPlaying && !cancellable) {
     audioPlaying = true
     this.playSong()
     this.setCancellable()
   }
   setTimeout(function(){
     old_clicked.push(int)
     this.setState({ audioPlaying: audioPlaying, clicked_clues: old_clicked, cancelOption: false });
   }.bind(this),8400)
 }

 playSong() {
   this.audio.play()

   setTimeout(function(){
     this.setState({ audioPlaying: false, cancelOption: false });
   }.bind(this),77000)
 }

 setCancellable() {
   this.setState({ cancelOption: true })
 }

 stopSong() {
   this.audio.pause()
   this.audio.currentTime = 0
   this.setConfetti()
   this.setState({ audioPlaying: false, cancelOption: false });
 }

 setConfetti() {
   this.setState({ confetti: true })
   setTimeout(function(){
     this.setState({ confetti: false });
   }.bind(this),3500)
 }

  render() {
    let stopButton;
    let cancelButton;
    let easy_words;
    let medium_words;
    let hard_words;
    let nb_words;
    let cluesById = this.state.clicked_clues

    if (this.state.audioPlaying == true) {
      stopButton = <button id="stopButton" onClick={this.stopSong}>STOP THE MUSIC<br/>- WE WON!</button>
    }
    if (this.state.cancelOption == true) {
      cancelButton = <button id="cancelButton" onClick={this.stopSong}>CANCEL</button>
    }
    if (this.state.confetti == true) {
      document.body.classList.add('confetti')
    } else {
      document.body.classList.remove('confetti')
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

    if (this.state.nb_clues) {
      nb_words = this.state.nb_clues.map((clue) => {
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
          <div className="easy-column">
            <div className="row-header">EASY</div>
            {easy_words}
          </div>
          <div className="medium-column">
            <div className="row-header">MEDIUM</div>
            {medium_words}
          </div>
          <div className="hard-column">
            <div className="row-header">HARD</div>
              {hard_words}
          </div>
          <div className="nb-column">
            <div className="row-header">NAIL BITER</div>
              {nb_words}
          </div>
          <div className="ButtonDiv">
          {stopButton}
          {cancelButton}
          </div>
        </div>
      </div>
    )
  }
}


export default WordsIndexContainer;
