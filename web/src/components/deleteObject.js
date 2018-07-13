import React, { Component } from 'react'
import { Button, Header, Modal, Icon } from 'semantic-ui-react'

export default class editObject extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalOpen: props.delete
        }
    }
    close = () => this.setState({ open: false })

    handleClose = () => this.setState({ modalOpen: false })

    componentWillReceiveProps = (props) =>{
        this.setState({modalOpen:props.delete})
    }
    
    render () {
        const { modalOpen } = this.state
        return(
            <Modal open={modalOpen} onClose={this.handleClose} basic size='tiny'
            >
                <Header icon='warning' content='Warning' />
                <Modal.Content>
                    <p style={{fontSize:"1.5rem"}}>    
                        Do you want to continue delete object
                        <Icon name="question"/>
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted>
                        <Icon name='remove' /> Cancle
                    </Button>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> 
                        continue
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}