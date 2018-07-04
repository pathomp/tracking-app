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

      var details = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
      }
      var formBody = [];
      for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetch('http://10.195.2.131/auth/register',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
      })
      .then((response) => response.json())
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
                        className={
                          this.state.checkpass ? "input is-success" : "input is-danger"
                        }
                        placeholder="Confirm Password"
                        onChange={this.handlechange}
                      />
                    </div>
                  </div>
                </div>
                  <div className="ui fluid large blue submit button" onClick={this.handlesubmit}>
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


/* <div className="ui middle aligned center aligned grid"> 
                <div className="ui three column centered grid">
                    <div className="column">                        
                        <form className="ui large form">
                            <div className="ui stacked segment">
                                <h1 className="ui teal header">
                                    <div className="content">
                                        Sign Up
                                    </div>
                                </h1>
                                <div className="field">
                                    <label className="ui left aligned header">Name</label>
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input name="Username" type="text" 
                                            placeholder="name" onChange={this.handlechange} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="ui left aligned header">Email</label>
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input name="email" type="email" 
                                            placeholder="E-mail address" onChange={this.handlechange} />
                                    </div>
                                </div>
                                <div className="two field">
                                <div className="field">
                                    <label className="ui left aligned header">Password</label>
                                    <div className="ui left icon input">
                                        <i className="lock icon"></i>
                                        <input name="password" type="password" className="input is-info" 
                                            placeholder="Password" onChange={this.handlechange}/>
                                    </div>
                                </div>
                                
                                    <div className="ui left icon input">
                                        <i className="lock icon"></i>
                                        <input name="password" type="password" className="input is-info" 
                                            placeholder="Confirm Password" onChange={this.handlechange}/>
                                    </div>
                                </div>
                                <div className="ui fluid large teal submit button"  to="/home" onClick={this.handlesubmit}>Sign Up</div>
                            </div>
                            <div className="ui error message"></div>
                        </form>
                    </div>
                </div>  
            </div> */
    )
  }
}

export default register;
