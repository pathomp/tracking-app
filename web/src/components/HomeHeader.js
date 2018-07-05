import React, { Component } from "react"
import image from "../image/bg.jpg"
import Login from './Login'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import Register from './register';

export default class HomeHeader extends Component{
    constructor(){
        super()
        this.state = {tabindex: 0}
    }
    render(){
        const box = {
            marginTop: "2%"
          }

          const cursor = {
            cursor: "pointer"
          }

          const styleleft ={
            width: '30rem',
            height: '30rem',
            paddingRight: "2rem",
            paddingLeft: "2rem",
            marginTop: "3rem"
          }

          const boxRight = {
            width: '30rem',
            height: '30rem',
          }

          const background = {
            backgroundImage: `url(${image})`,
            height:"93.5vh"
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
                        <div className="right floated left aligned six wide column" style={boxRight}> 
                            <Tabs defaultIndex={0} onSelect={tabindex => this.setState({tabindex})} >                                
                                <TabPanel>
                                    <div>
                                        <Login />
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <Register/>
                                    </div>
                                </TabPanel>  
                                <TabList className="ui center aligned tiny header">
                                    <Tab>
                                    {
                                        this.state.tabindex.valueOf(1) && (                                            
                                            <a className="ui grey inverted centered tiny header" style={cursor}>Already have an account? <u>SIGN IN</u></a>
                                        )
                                    }
                                    </Tab>
                                    <Tab>
                                    {
                                        !this.state.tabindex.valueOf(1) && (
                                            <a className="ui grey inverted tiny header" style={cursor}>Don't have an account? <u> SIGN UP</u></a>
                                        )
                                    }
                                    </Tab>                                        
                                </TabList>                                  
                            </Tabs>
                        </div>
                    </div>
                </div>               
            </div>
        
        )
    }
}