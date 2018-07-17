import React, { Component } from 'react'
import Search from '../components/MapSearch'
import Footer from './../components/footer'
import Map from '../components/Map/Map'
import axios from 'axios'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            objects : []
        }
    }

    componentDidMount = () => {
        axios.get('http://10.195.2.163:3002/objects') //http://localhost:5000/api/v1/objects   
            .then(response =>{
                this.setState({
                    objects: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentWillReceiveProps = (props) =>{
        this.setState({visible:props.visible})
    }

    render() {        
        const box = {
            marginTop: "1rem"
        }
        const style = {
            "backgroundColor": "#ebebe0", //#F5F5DC #F5F5F5  ebebe0 f5f5f0
            paddingTop: "1em",
            paddingLeft: ".5em",
            paddingRight: ".5em",
            // paddingBottom: "1.5em",
            // "position": "fixed", 
            // "left": "0",
            // minWidth: "100%",
            // minHeight: "100%"
        }
        // const footer = {
        //     "position": "fixed",
        //     "left": 0,
        //     "bottom": 0,
        //     "width": "100%",
        //     "color": "black"
        // }
        const styleMap = {
            width: '100%', 
            height: '86vh'
        }
        const layout = {
            "display": "flex",
            "minHeight": "90vh",
            "flexDirection": "column",
            "margin": "0 1px 0 1px",
            "width": "100vw"
        }
        return (
            <div style={box}>
                <div className="ui stackable two column grid" style={style}>
                        <div className="four wide column"> 
                            <Search onFilter={this.onFilter} objects={this.state.objects}/>
                        </div>
                        <div className="twelve wide column" style={styleMap}>                    
                        <div style={{ height: '100%', width: '100%' }}>
                                <Map objects={this.state.objects}/>
                            </div>                 
                        </div>
                        <div>
                            <Footer/>
                        </div>
                </div>
            </div>
        )
    }
}

export default Home