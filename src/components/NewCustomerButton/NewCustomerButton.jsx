import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './NewCustomerButton.css';

class NewCustomerButton extends Component {

    nextPath = (path)=>{
        this.props.history.push(path);
      }

    render() {
        return (
            <div>
                <Button className="b" variant="dark" onClick={() =>this.nextPath(`/newclient`)}>UŽREGISTRUOTI NAUJĄ KLIENTĄ</Button>
            </div>
        );
    }
}

export default withRouter(NewCustomerButton);