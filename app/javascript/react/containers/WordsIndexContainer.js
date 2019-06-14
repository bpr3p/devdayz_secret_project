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
      confetti: false,
      time: 60,
      timerOn: false
    }
    this.handleClueClick = this.handleClueClick.bind(this)
    this.playSong = this.playSong.bind(this)
    this.stopSongWin = this.stopSongWin.bind(this)
    this.stopSongCancel = this.stopSongCancel.bind(this)
    this.setCancellable = this.setCancellable.bind(this)
    this.setConfetti = this.setConfetti.bind(this)
    this.resetWord = this.resetWord.bind(this)
    this.stopCheerConfetti = this.stopCheerConfetti.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  audio = new Audio('/sounds/countdown.mp3')
  cheer = new Audio('/sounds/cheer.mp3')

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

  startTimer() {
    this.setState({ timerOn: true })
    this.timer = setInterval(() => this.setState({
      time: this.state.time - 1
    }), 1000);
  }

  resetTimer() {
    this.setState({time: 60, timerOn: false});
    clearInterval(this.timer)
  }

 handleClueClick(event) {
   let int = parseInt(event.target.id)
   let audioPlaying = this.state.audioPlaying
   let cancellable = this.state.cancelOption
   let old_clicked = this.state.clicked_clues
   this.cheer.pause()
   this.cheer.currentTime = 0

   if (!audioPlaying && !cancellable) {
     audioPlaying = true
     this.playSong()
     this.setCancellable()
     setTimeout(function(){
       this.startTimer()
     }.bind(this), 7500)
     old_clicked.push(int)
     this.setState({ audioPlaying: audioPlaying, clicked_clues: old_clicked, confetti: false })
   }
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

 stopSongWin() {
   this.audio.pause()
   this.audio.currentTime = 0
   this.cheer.play()
   this.resetTimer()
   this.setConfetti()
   this.setState({ audioPlaying: false, cancelOption: false });
 }

 stopSongCancel() {
   this.audio.pause()
   this.resetTimer()
   this.audio.currentTime = 0
   this.setState({ audioPlaying: false, cancelOption: false });
 }

 stopCheerConfetti() {
   this.cheer.pause()
   this.cheer.currentTime = 0
   this.setState({ confetti: false })
 }

 resetWord(event) {
   let old_clicked = this.state.clicked_clues
   let int = parseInt(event.target.id)
   let index = old_clicked.indexOf(int)
   old_clicked.splice(index, 1)
   this.stopSongCancel()
   this.stopCheerConfetti()
   this.resetTimer()
   clearTimeout(this.confetti)
   this.setState({ clicked_clues: old_clicked })
 }

 setConfetti() {
   this.setState({ confetti: true })
   this.confetti = setTimeout(function(){
     this.setState({ confetti: false });
   }.bind(this),7500)
 }

  render() {
    let winButton;
    let cancelButton;
    let easy_words;
    let medium_words;
    let hard_words;
    let nb_words;
    let timer;
    let cluesById = this.state.clicked_clues

    if (this.state.audioPlaying == true) {
      winButton = <button id="winButton" onClick={this.stopSongWin}>WE WON!</button>
    }
    if (this.state.cancelOption == true) {
      cancelButton = <button id="cancelButton" onClick={this.stopSongCancel}>CANCEL</button>
    }
    if (this.state.confetti == true) {
      document.body.classList.add('confetti')
    } else {
      document.body.classList.remove('confetti')
    }
    if (this.state.timerOn == true) {
      timer = <h3>Time remaining: {this.state.time}s</h3>
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
          resetWord = {this.resetWord}
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
          resetWord = {this.resetWord}
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
          resetWord = {this.resetWord}
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
          resetWord = {this.resetWord}
          difficulty_id = {clue.difficulty_id}
          />
        )
      })
    }

    return (
      <div className="parent-div">
        <div className="grid-container">
          <div className="easy-column">
            <div className="row-header"><div className="emoji-container"><span className="emoji-animation-1" role="img" aria-label="baby">👶</span></div>&nbsp;<div className="header-label">EASY</div></div>
            {easy_words}
          </div>
          <div className="medium-column">
            <div className="row-header"><div className="emoji-container"><span className="emoji-animation-2" role="img" aria-label="grimacing face">😬</span></div>&nbsp;<div className="header-label">MEDIUM</div></div>
            {medium_words}
          </div>
          <div className="hard-column">
            <div className="row-header"><div className="emoji-container"><span className="emoji-animation-1" role="img" aria-label="skull">💀</span></div>&nbsp;<div className="header-label">HARD</div></div>
            {hard_words}
          </div>
          <div className="nb-column">
            <div className="row-header"><div className="emoji-container"><span className="emoji-animation-2" role="img" aria-label="japanese ogre">👹</span></div>&nbsp;<div className="header-label">NAIL BITER</div></div>
            {nb_words}
          </div>
          <div className="cancelButtonDiv">
            {cancelButton}
          </div>
          <div className="winButtonDiv">
            {winButton}
          </div>
          <div className="timerDiv">
            {timer}
          </div>
        </div>
      </div>
    )
  }
}


export default WordsIndexContainer;
