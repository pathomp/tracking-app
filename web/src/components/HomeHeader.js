import React, { Component } from "react";
import Register from "./register";
import image from "../image/bg.jpg"
export default class HomeHeader extends Component{
    render(){
        const box = {
            marginTop: "4rem",
            marginBottom: ".9rem"
          }

          const styleleft ={
            width: '30rem',
            height: '30rem',
            paddingRight: "2rem",
            paddingLeft: "2rem",
            marginTop: "5rem"
          }

          const background = {
            backgroundImage: `url(${image})`
          }
        return(
            <div className="ui segment" style={background}>             
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
                        <div className="right floated left aligned six wide column">                    
                            <Register />
                        </div>
                    </div>
                </div>               
            </div>
        
        )
    }
}