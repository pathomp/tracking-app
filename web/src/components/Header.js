import React, { Component } from 'react'
import decode from 'jwt-decode';
import logo from "../image/logoh1.png"


class Header extends Component {
  constructor(){
    super()
    this.state = {
      name : ""
    }
  }

  signout = () =>{
    localStorage.removeItem('token')
    window.location = "http://localhost:3000"
  }

  componentDidMount = () => {
    try {
      if(localStorage.getItem('token') !== null){
        const name = decode(localStorage.getItem('token'))
        this.setState({name:name.username})
      }      
    } catch (error) {
      
    }    
  }

  render() {
    const sizeLogo = {
      width: "100px",
      height: "30px",
    }
    return (
        <div className="ui  inverted segment">
          <nav className="ui inverted huges menu top fixed"> {/* aria-label="main navigation" style={nav}*/}
              <div className="item">
                <img src={logo} alt="logo" style={sizeLogo}/>
              </div>              
              {
                localStorage.getItem('token') && (
                  <div className="right menu">
                      <div className="item">
                        <p>Hello {" "} {this.state.name}</p>
                      </div>
                      <div className="item">
                        <a className="ui red button" onClick={this.signout}>
                          Sign Out
                        </a>
                      </div>
                  </div>
                )
              }        
          </nav>
      </div>
    )
  }
}

export default Header