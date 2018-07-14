import React, { Component } from 'react'
import { Switch, Router, Route, Redirect } from 'react-router-dom'

import Header from '../components/Header'

import history from '../history'
import Home from './Home'
import HomeHeader from './../components/HomeHeader';
import Register from './../components/register';

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
                <Route style={box} path="/home" component={Home} />
              </Switch>
            </div>
          </section> 
      </div>
    )
  }
}

export default App