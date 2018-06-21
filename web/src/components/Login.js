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

        var details = {
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
        fetch('http://192.168.99.100:3001/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        .then((response) => response.json())
        .then(json => {           
            localStorage.setItem('token', json)
            window.location = "http://localhost:3000/home";
        });
    }

    componentWillMount(){ 
        // history.replace('/')
    }

    render(){
        return(
        <div className="columns">
            <div className="column is-two-fifths is-offset-one-quarter">
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-12">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <div className="box">
                                    <p className="title">Sign In</p>
                                        <div className="field">
                                            <label className="label">Email:</label>
                                            <p className="control has-icons-left has-icons-right">
                                                <input name="email" type="email" className="input is-info" 
                                                    placeholder="youremail@email.com" onChange={this.handlechange} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <label className="label">Password:</label>
                                            <p className="control has-icons-left">
                                                <input name="password" type="password" className="input is-info" 
                                                    placeholder="Password" onChange={this.handlechange}/> 
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                            </p>
                                        </div> 
                                        <div className="field">
                                            <p className="control">
                                                <span className="level-item has-text-centered level-right">
                                                    <br/><br/>
                                                    <a to="/home" className="button is-info" type="button" onClick={this.handlesubmit}>
                                                        Sign in
                                                    </a>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login