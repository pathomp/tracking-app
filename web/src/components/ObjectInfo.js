import React, { Component } from 'react'

export default class ObjectInfo extends Component {
    render() {
        const style = {
            width: '100%',
            height: "100%",
            "backgroundColor": "hsl(0, 0%, 100%)",
            fontSize: ".8rem"
        }        
        return (
            <div><br/>
                <h3 className="ui teal header"><strong>Information</strong></h3>
                <table className="ui small table" style={style}>
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
