import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
import Search from '../components/MapSearch'
import Footer from './../components/footer'
class Home extends Component {
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
        return (
            <div style={box}>
                <div className="ui stackable two column grid" style={style}>
                        <div className="four wide column"> 
                            <Search onFilter={this.onFilter} />
                        </div>
                        <div className="twelve wide column" style={styleMap}>                    
                            <MapContainer google={this.props.google}/>                      
                        </div>
                        <div>
                            <Footer/>
                        </div>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(Home)