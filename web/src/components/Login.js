import React, { Component } from 'react'
import history from '../history'
import { Link } from 'react-router-dom'

const request = require('supertest')

class Login extends Component {
    constructor(props) {
        super(props)
        this.handlechange = this.handlechange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    handlechange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handlesubmit(e){
        e.preventDefault()

        //http://localhost:5000/api/v1/users  http://10.195.2.131/auth/basic
        fetch('http://192.168.99.100:8080/auth/basic',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        })
        .then((response) => response.json())
        .then(json => {           
            localStorage.setItem('token', json.access_token)
            window.location = "http://localhost:3000/home";
        });
    }

    componentWillMount(){ 
        // history.replace('/')
    }

    render(){
        return(
            // <div className="ui middle aligned center aligned grid"> 
            //     <div className="ui three column centered grid">
            //         <div className="column">                        
            //             <form className="ui large form">
            //                 <div className="ui stacked segment">
            //                     <h1 className="ui teal header">
            //                         <div className="content">
            //                             Sign In
            //                         </div>
            //                     </h1>
            //                     <div className="field">
            //                         <label className="ui left aligned header">Email</label>
            //                         <div className="ui left icon input">
            //                             <i className="user icon"></i>
            //                             <input name="email" type="email" className="input is-info" 
            //                                 placeholder="E-mail address" onChange={this.handlechange} />
            //                         </div>
            //                     </div>
            //                     <div className="field">
            //                         <label className="ui left aligned header">Password</label>
            //                         <div className="ui left icon input">
            //                             <i className="lock icon"></i>
            //                             <input name="password" type="password" className="input is-info" 
            //                                 placeholder="Password" onChange={this.handlechange}/>
            //                         </div>
            //                     </div>
            //                     <div className="ui fluid large teal submit button"  to="/home" onClick={this.handlesubmit}>Login</div>
            //                 </div>
            //                 <div className="ui error message"></div>
            //             </form>
            //         </div>
            //     </div>  
            // </div>   

            <div className="ui inverted segment">
            <div className="ui form ">
                <h1 className="ui left aligned dividing inverted header">Sign In</h1>
                <div className="field inverted segment">
                  <label className="ui left aligned header">Email</label>
                  <div className="ui left icon input">
                    <i className="envelope icon" />
                    <input name="email" type="email" placeholder="E-mail address" onChange={this.handlechange}/>                  </div>
                </div>
                <div className="field inverted segment">
                <label className="ui left aligned header">Password</label>
                <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handlechange}
                    />
                </div>
                </div>
                </div>
                <br/>
                  <div className="ui fluid large blue submit button"  to="/home" onClick={this.handlesubmit}>Login</div>
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
        )
    }
}

export default Login