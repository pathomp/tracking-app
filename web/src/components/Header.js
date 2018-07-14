import React, { Component } from 'react'
import decode from 'jwt-decode'
import logo from "../image/logoh1.png"
import { Dropdown } from 'semantic-ui-react'
import EditProfile from './editProfile';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      name : "ABCD",
      addCar: false,
      onclickprofile : false
    }
  }

  signout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('login')
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

  addCar = () => {
    this.setState({addCar:true})
  }

  render() {
    const sizeLogo = {
      width: "100px",
      height: "30px",
    }
    
    return (
        <div className="ui  inverted segment">
          <nav className="ui inverted huges menu top fixed">
              <a className="item" href="/home">
                <img src={logo} alt="logo" style={sizeLogo} />
              </a>              
              {
                 localStorage.getItem('login') && (
                  <div className="right menu">
                    <Dropdown text={this.state.name} item>
                      <Dropdown.Menu>
                        <Dropdown.Item icon="user" text={this.state.name} onClick={() => this.setState({onclickprofile:true})}/>
                        <Dropdown.Item icon="sliders horizontal" text="Setting" href="/setting"/>
                        <Dropdown.Divider />
                        <Dropdown.Item icon="sign out alternate" text="Sign Out" onClick={this.signout}/>
                      </Dropdown.Menu>
                    </Dropdown>
                      {/* <div className="item">
                        <button className="ui inverted black button" onClick={this.signout}>
                          <i className="sign out alternate icon"/>
                            Sign Out                          
                        </button>                        
                      </div> */}
                  </div> 
                 ) 
              } 
          </nav>
          <EditProfile open={this.state.onclickprofile}/>
      </div>
    )
  }
}

export default Header