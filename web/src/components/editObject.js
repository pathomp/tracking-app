import React, { Component } from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'

export default class editObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: props.open,
            modalOpen: false
        }
    }
    close = () => this.setState({ open: false })
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    componentWillReceiveProps = (props) =>{
        this.setState({open:props.open})
    }
    
    render () {
        const { open } = this.state
        return(
            <div>
                <Modal size="tiny" open={open} onClose={ () => this.setState({ open: false })}>
                    <Modal.Header>Edit Object</Modal.Header>
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
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                content="Yep, that's me"
                                onClick={this.handleOpen}
                        />
                        <Button color="black" content="Cancle" onClick={() => this.setState({ open: false },console.log("close",this.state.open))}/>
                    </Modal.Actions>
                </Modal>

                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size='tiny'
                >
                    <Header icon='browser' content='Cookies policy' />
                    <Modal.Content>
                        <h3>This website uses cookies to ensure the best user experience.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> Got it
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}