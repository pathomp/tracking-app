import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'
import Header from '../components/Header'
import Home from './Home'
import HomeHeader from './../components/HomeHeader'

class App extends Component {
  render() {    
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
                  <Route path="/home" component={Home} />
              </Switch>
            </div>
          </section> 
      </div>
    )
  }
}

export default App