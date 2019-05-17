import React, { Component } from 'react'

class WordTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let clueDiv
    if (this.props.word == null) {
      clueDiv = <div className="blank-clue-block" id={this.props.id} onClick={this.props.handleClueClick}>REVEAL</div>
    } else {
      clueDiv = <div className="clue-block" id={this.props.id} onClick={this.props.handleClueClick}>
        {this.props.word}
      </div>
    }
    return (
      clueDiv
    );
  };
}

export default WordTile;
