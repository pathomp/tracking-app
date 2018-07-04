import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import decode from 'jwt-decode';


class Header extends Component {
  constructor(){
    super()
    this.state = {
      name : "abc"
    }
  }

  signout = () =>{
    localStorage.removeItem('token')
    window.location = "http://localhost:3000"
  }

  componentDidMount = () => {
    console.log("abc")
    if(localStorage.getItem('token') !== null){
      const name = decode(localStorage.getItem('token'))
      this.setState({name:name.email})
    }
  }

  render() {
    const style = {
      "fontFamily":
        "Sailec-Medium,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif",
      "fontSize" : ".5cm"
      }

    // const nav = {
    //   "backgroundColor" : "#00aeef"
    // }
    return (
        <div className="ui  inverted segment">
          <nav className="ui inverted huges menu top fixed"> {/* aria-label="main navigation" style={nav}*/}
              <div className="item">
                <a href="/" style={style}>
                  <strong>TRACKING</strong> 
                </a>
              </div>
              {/* {
                !localStorage.getItem('token') && (
                  <div className="right menu">
                      <div className="item">
                        <a className="ui secondary button" href="/register">
                          Sign Up
                        </a>
                      </div>
                  </div>
                )
              } */}
              {
                localStorage.getItem('token') && (
                  <div className="right menu">
                      <div className="item">
                        <p>Email {" "} {this.state.name}</p>
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