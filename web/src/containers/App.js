import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from '../components/Header'

import Home from './Home'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <section className="section">
          <div className="hero-body">
            <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Redirect to="/" />
            </Switch>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App