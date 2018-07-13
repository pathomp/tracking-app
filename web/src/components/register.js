import React, { Component } from "react";

class register extends Component {
  constructor() {
    super();
    this.state = {
      checkpass: true
    };
    this.checkpassword = this.checkpassword.bind(this);
    this.handlechange = this.handlechange.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)
  }

  checkpassword(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.password !== this.state.prevpassword) {
      return this.setState({ checkpass: false });
    } else {
      return this.setState({ checkpass: true });
    }
  }

  handlechange(e){
      this.setState({[e.target.name]: e.target.value})
  }

  handlesubmit(e){
      e.preventDefault()

      fetch('http://138.197.72.169:3000/auth/register',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        })
      })
      .then((response) => {response.json() 
        alert("Register Success")
        window.location = "http://localhost:3000/home"})
      
  }

  componentWillMount(){ 
      // history.replace('/')
  }

  render() {
    return (
          <div className="ui inverted segment">
            <div className="ui form ">
                <h1 className="ui left aligned dividing inverted header">Sign Up</h1> 
                <div className="field inverted segment">
                  <label className="ui left aligned header">Name</label>
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input name="username" type="text" placeholder="name" onChange={this.handlechange}/>
                  </div>
                </div>
                <div className="field inverted segment">
                  <label className="ui left aligned header">Email</label>
                  <div className="ui left icon input">
                    <i className="envelope icon" />
                    <input name="email" type="email" placeholder="E-mail address" onChange={this.handlechange}/>                  </div>
                </div>
              
                <div className="two field inverted segment">
                  <div className="field">
                    <label className="ui left aligned header">Password</label>
                    <div className="ui left icon input">
                      <i className="lock icon" />
                      <input
                        name="prevpassword"
                        type="password"
                        placeholder="Password"
                        onChange={this.checkpassword}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon" />
                      <input
                        name="password"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={this.handlechange}
                      />
                    </div>
                  </div>
                </div>
                  <div className="ui fluid large blue submit button" onClick={this.handlesubmit} href="/">
                      Sign Up
                  </div>
                  {/* <hr/>
                  <div className="field">
                    <div className="ui action left icon facebook">
                        <div className="ui fluid large blue submit button">
                          <i className="facebook icon"/>
                            Sign Up with Facebook
                        </div>                        
                    </div>
                  </div> */}              
            </div>
          </div>
    )
  }
}

export default register;
