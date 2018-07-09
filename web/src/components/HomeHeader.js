import React, { Component } from "react"
import image from "../image/bg.jpg"
import Login from './Login'
import Register from './register';

export default class HomeHeader extends Component{
    constructor(){
        super()
        this.state = {tabindex: 0}
    }

    changepageRegister = () => {
        this.setState({tabindex:1})
    }

    changepageLogin = () => {
        this.setState({tabindex:0})
    }

    render(){
        const box = {
            marginTop: "10%"
        }

        const cursor = {
            cursor: "pointer"
        }

        const styleleft ={
            width: '30rem',
            height: '20rem',
            paddingRight: "2rem",
            paddingLeft: "2rem",
            marginTop: "3rem"
        }

        const boxRight = {
            width: '30rem',
            height: '20rem',
        }

        const background = {
            backgroundImage: `url(${image})`,
            "position": "fixed", 
            "top": "0",
            "left": "0",
            minWidth: "100%",
            minHeight: "100%"
        }

        return(
            <div className="ui raised segment" style={background}>                          
                <div className="ui container">
                    <div className="ui grid" style={box}>                
                        <div className="left floated left aligned six wide column">
                            <div style={styleleft}>
                                <div className="ui center grid">
                                    <h1 className="ui blue inverted header">Simplicity at scale.</h1>
                                    <h3 className="ui gray inverted header">Our cloud computing platform was built with simplicity at the forefront, so managing infrastructure is easy, whether your business is running one virtual machine or ten thousand. DigitalOcean gets out of your way so teams can build, deploy, and scale cloud applications faster and more efficiently.</h3>
                                </div>
                            </div>
                        </div>
                        <div className="right floated left aligned six wide column" style={boxRight}>  
                            {
                                !this.state.tabindex.valueOf(1) && (
                                    <div>
                                        <Login/> 
                                        <a className="ui grey inverted tiny header" style={cursor} onClick={this.changepageRegister}>Don't have an account? <u> SIGN UP</u></a>
                                    </div>
                                )
                            }  
                            {
                                this.state.tabindex.valueOf(1) && (
                                    <div>
                                        <Register/>
                                        <a className="ui grey inverted tiny header" style={cursor} onClick={this.changepageLogin}>Already have an account? <u>SIGN IN</u></a>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>           
            </div>        
        )
    }
}