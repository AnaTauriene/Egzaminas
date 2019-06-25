import React, { Component } from 'react';
import Registration from '../components/Registration/Registration';
import MainButton from '../components/MainButton/MainButton';

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
                <MainButton/>
                <h1>Naujo kliento registracija</h1>
                <Registration/>
            </div>
        );
    }
}

export default NewClientRegView;