import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

export default class addObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            addObject: false,
            name : "",
            IMEI : "",
        }
        this.handlechange = this.handlechange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
    }
    
    componentWillReceiveProps = (props) =>{
        this.setState({addObject:props.addObject})
    }

    handlechange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handlesubmit = (e) => {
        e.preventDefault()

        fetch('',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:this.state.name,
                IMEI:this.state.IMEI               
            })
        })
        .then((response) => {response.json() 
            alert("Add Object Success")
            window.location = ""})
    }
    
    render () {
        const { addObject} = this.state
        return(
            <Modal size="tiny" open={addObject} onClose={() => this.setState({ addObject: false })}>
                <Modal.Header>Add Object</Modal.Header>
                <Modal.Content>
                    <form className="ui form">
                        <div className="field">
                            <div className="two fields">
                                <div className="field">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Name" onChange={this.handlechange}/>
                                </div>
                                <div className="field">
                                    <label>IMEI</label>
                                    <input type="text" name="IMEI" placeholder="IMEI" onChange={this.handlechange}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='blue'
                        icon='checkmark'
                        labelPosition='right'
                        content="Add Object"
                        // onClick={() => this.setState({ addObject: false },console.log("closeaddobject",this.state.addObject))}
                        onClick={this.handlesubmit}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}