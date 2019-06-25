import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './MainButton.css';

class MeniuButton extends Component {

    nextPath = (path)=>{
        this.props.history.push(path);
      }

    render() {
        return (
            <div>
                <Button className="b" onClick={() =>this.nextPath(`/`)}>GRĮŽTI</Button>
            </div>
        );
    }
}

export default withRouter(MeniuButton);