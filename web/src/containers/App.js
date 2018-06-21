import React, { Component } from 'react'
import { Switch, Router, Route, Redirect } from 'react-router-dom'

import Header from '../components/Header'

import Login from '../components/Login'
import history from '../history'
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
              <Route path="/login" component={Login} />
              <Route path="/" component={Home} />
            </Switch>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App