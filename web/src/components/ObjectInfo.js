import React, { Component } from 'react'

export default class ObjectInfo extends Component {
    render() {
        const style = {
            width: '100%',
            height: "100%",
            "backgroundColor": "hsl(0, 0%, 100%)"
        }        
        return (
            <div><h5/>
                <h2 className="ui teal header"><strong>Information</strong></h2>
                <table className="ui table" style={style}>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.props.name}</td> 
                        </tr>
                        <tr>    
                            <td>IMEI</td>
                            <td>{this.props.imei} </td> 
                        </tr>
                        <tr>    
                            <td>Speed</td>
                            <td>{this.props.speed} </td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
