import React, { Component } from 'react';
import Registration from '../components/Registration/Registration';

class NewClientRegView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token
        }
    }

    render() {
        return (
            <div className="NewClientRegView">
                <Registration/>
            </div>
        );
    }
}

export default NewClientRegView;