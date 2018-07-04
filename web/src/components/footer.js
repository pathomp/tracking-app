import React, { Component } from 'react'

export default class footer extends Component {
    render() {
        const style = {
            paddingLeft: "1em"
        }
        return (
             <div className="ui inverted vertical footer segment">
                {/* <div className="ui container"> */}
                    <div className="ui left aligned footer" style={style}>
                            @pttdigital 2018
                    </div>
                {/* </div> */}
            </div>
        )
    }
}