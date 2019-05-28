import React, { Component } from 'react'

class YearSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: this.props
    }
  }

  render() {
    let yearDiv
    yearDiv = <div className="blank-clue-block" id={this.props.id} onClick={this.props.handleClueClick}>REVEAL</div>

    return (
      yearDiv
    );
  };
}

export default YearSelector
