import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './MeniuButton.css';

class MeniuButton extends Component {

    nextPath = (path)=>{
        this.props.history.push(path);
      }

    render() {
        return (
            <div>
                <Button className="b" onClick={() =>this.nextPath(`/meniu`)}>RESTORANO MENIU</Button>
            </div>
        );
    }
}

export default withRouter(MeniuButton);