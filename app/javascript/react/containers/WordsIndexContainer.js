import React, { Component } from 'react'
import { Link } from 'react-router'
import WordTile from '../components/WordTile'
import CategoryComponent from '../components/CategoryComponent'

class WordsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clues: [],
      categories: [],
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
   let categories = [];
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
     categories = body
     console.log(body)
     this.setState({ categories: categories })
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

 componentDidUpdate() {
   if (this.state.time == 0) {
     clearInterval(this.timer)
   }
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
    clearTimeout(this.timeout)
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
     this.timeout = setTimeout(function(){
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
    let timer;
    let cluesById = this.state.clicked_clues;
    let categoriesAndClues;

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

    if (this.state.categories.length > 0) {
      categoriesAndClues = this.state.categories.map((category) => {
        return (
          <CategoryComponent
          key = {category.id}
          id = {category.id}
          categoryName = {category.name}
          clues = {category.clues}
          handleClueClick = {this.handleClueClick}
          resetWord = {this.resetWord}
          cluesById = {cluesById}
          />
        )
      })
    }

    return (
      <div className="parent-div">
        <div className="grid-container">
          {categoriesAndClues}
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
