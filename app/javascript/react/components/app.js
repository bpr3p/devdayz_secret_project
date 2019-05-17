import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import WordTile from './WordTile'
import WordsIndexContainer from '../containers/WordsIndexContainer'
import AdminContainer from '../containers/AdminContainer'
import MapsContainer from '../containers/MapsContainer'

class App extends Component {

  render() {
    // Removes Devise flash message from page
    $(function () {
      var flashDurationInSeconds = 5;
      var flashContainerId = 'flash-notice';

      function removeFlashMessages() {
        if ($('.' + flashContainerId).innerText != "") {
          $('.' + flashContainerId).remove();
        }
      }

      setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
    })

    return (
      <Router history={browserHistory}>
        <Route path='/games/index'>
          <IndexRoute component={WordsIndexContainer} />
          <Route path='/words' component={WordTile} />
        </Route>
        <Route path='/admin/index'>
          <IndexRoute component={AdminContainer} />
        </Route>
        <Route path='/maps/index'>
          <IndexRoute component={MapsContainer} />
        </Route>
      </Router>
    )
  }
}

export default App;
