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
<<<<<<< HEAD
                <Route exact path="/" component={HomeHeader}/>
                <Route style={box} path="/home" component={Home} />
=======
                <Route exact path="/" component={HomePage}/>
                <Route path="/home" component={Home} />
                <Route path="/setting" component={AddCar}/>
                <Route path="/check" component={notification}/>
>>>>>>> 42f7df8f2585157d826535ef3e3c7de7d975fcb8
              </Switch>
            {/* </div> */}
          {/* </section>  */}
      </div>
    )
  }
}

export default App