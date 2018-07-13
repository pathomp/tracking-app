import React, { Component } from 'react'
import { Button, Header, Modal,Icon } from 'semantic-ui-react'

export default class editProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: props.open,
            modalOpen: false
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    close = () => this.setState({ open: false })

    handlechange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    
    componentWillReceiveProps = (props) =>{
        this.setState({open:props.open})
    }
    
    render () {
        const { open } = this.state
        return(
            <div>
                <Modal open={open} onClose={this.close} size="small">
                    <Modal.Header>Profile</Modal.Header>
                    <Modal.Content>
                        <form className="ui form ">
                            <div className="two fields">
                                <div className="field">
                                    <label className="ui left aligned header">Name</label>
                                    <div className="ui left icon input">
                                        <i className="user icon" />
                                        <input name="username" type="text" placeholder="name" onChange={this.handlechange}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="ui left aligned header">Email</label>
                                    <div className="ui left icon input">
                                        <i className="envelope icon" />
                                        <input name="email" type="email" placeholder="E-mail address" onChange={this.handlechange}/>                  </div>
                                </div>
                            </div>

                            <h5 className="ui dividing header">Change Password</h5>
                            <div className="eight wide field"> 
                                <label className="ui left aligned header">Old Password</label>                                   
                                <div className="ui left icon input">
                                    <i className="lock icon" />
                                    <input
                                        name="oldpassword"
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.checkpassword}
                                    />
                                </div>
                            </div>
                            <div className="two fields">                           
                                <div className="field">
                                    <label className="ui left aligned header">News Password</label>
                                    <div className="ui left icon input">
                                        <i className="lock icon" />
                                        <input
                                            name="prevpassword"
                                            type="password"                                            
                                            placeholder="New Password"
                                            onChange={this.handlechange}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="ui left aligned header">New Password</label>
                                    <div className="ui left icon input">
                                        <i className="lock icon" />
                                        <input
                                            name="newpassword"
                                            type="password"                                            
                                            placeholder="Confirm new Password"
                                            onChange={this.handlechange}
                                        />
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
                        <Button color="black" content="Cancle" onClick={this.close}/>
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