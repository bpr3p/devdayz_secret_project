import React, { Component } from 'react'
import WordTile from '../components/WordTile'

class CategoryComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let emojis = ["👶", "😬", "💀", "👹", "💥","💫","💦","💨","🐵","🐒","🦍","🐶","🐕","🐩","🐺","🦊","🦝","🐱","🐈","🦁","🐯","🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿", "🦔", "🦇", "🐻", "🐨", "🐼", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊", "🦅", "🦆", "🦢", "🦉", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🐟", "🐠", "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🐞", "🦗", "🕷", "🕸", "🦂", "🦟", "🦠", "💐", "🌸", "💮", "🏵", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "🍀", "🍁", "🍂", "🍃", "🍄", "🌰", "🦀", "🦞", "🦐", "🦑", "🌚", "🌛", "🌜", "🌝", "🌞"]
    let words = this.props.clues.map((clue) => {
      let word = null
      if (this.props.cluesById.includes(clue.id)) {
        word = clue.word
      }
      return (
        <WordTile
        key = {clue.id}
        id = {clue.id}
        word = {word}
        handleClueClick = {this.props.handleClueClick}
        resetWord = {this.props.resetWord}
        category_id = {clue.category_id}
        />
      )
    })

    return (
      <div className="clue-column">
        <div className="row-header">
          <div className="emoji-container">
            <span className="emoji-animation-1" role="img" aria-label="baby">
              {emojis[Math.floor(Math.random()*emojis.length)]}
            </span>
          </div>&nbsp;
          <div className="header-label">
            {this.props.categoryName}
          </div>
        </div>
        {words}
      </div>
    );
  };
}

export default CategoryComponent;
