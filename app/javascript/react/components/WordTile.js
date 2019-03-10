import React, { Component } from 'react'
import { Link } from 'react-router'

class WordTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div>
          <a href={`clues/${this.props.id}`}>
            {this.props.word}
          </a> - <a href={`difficulties/${this.props.difficulty_id}`}>
            {this.props.difficulty}
          </a>
        </div>
      </div>
    );
  };
}

export default WordTile;
