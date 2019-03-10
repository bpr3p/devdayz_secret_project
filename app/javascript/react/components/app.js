// import React from 'react'
//
// export const App = (props) => {
//   return (<h1>Make It So React</h1>)
// }
//
// export default App
//


import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import WordTile from './WordTile'
import WordsIndexContainer from '../containers/WordsIndexContainer'

class App extends Component {


  render() {
    // Removes Devise flash message from page
    $(function(){
      var flashDurationInSeconds = 5;
      var flashContainerId = 'flash-messages';

      function removeFlashMessages() {
        if ($('#' + flashContainerId)[0].innerText != "") {
          $('#' + flashContainerId).remove();
        }
      }

      setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
    })

    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={WordsIndexContainer} />
          <Route path='/words' component={WordTile} />
        </Route>
      </Router>
    )
  }
}

export default App;
