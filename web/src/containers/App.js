import React, { Component } from 'react'
import { Switch, Router, Route, Redirect } from 'react-router-dom'

import Header from '../components/Header'

import Login from '../components/Login'
import history from '../history'
import Home from './Home'
import HomeHeader from './../components/HomeHeader';

class App extends Component {
  render() {
    const box = {
      marginTop: "2.5rem"
    }
    
    const style = {
      "backgroundColor": "#ebebe0",
      "height": "100vh"
  }
    return (
      <div style={style}>
        <Header />
         <section >
            <div>
              <Switch>
                <Route exact path="/" component={HomeHeader}/>
                <div style={box}>
                  <Route path="/login" component={Login} />
                  <Route path="/home" component={Home} />
                </div>
              </Switch>
            </div>
          </section> 
      </div>
    )
  }
}

export default App