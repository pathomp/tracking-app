import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'
import Header from '../components/Header'
import Home from './Home'
import AddCar from './../components/settings'
import HomePage from '../components/HomePage'
import notification from './../components/notification';

class App extends Component {
  render() {    
    const style = {
      "backgroundColor": "#ebebe0",
      "height": "100vh"
  }
    return (
      <div style={style}>
        <Header />
         {/* <section > */}
            {/* <div> */}
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/home" component={Home} />
                <Route path="/setting" component={AddCar}/>
                <Route path="/check" component={notification}/>
              </Switch>
            {/* </div> */}
          {/* </section>  */}
      </div>
    )
  }
}

export default App