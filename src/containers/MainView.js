import React, { Component } from 'react';
import NewCustomerButton from '../components/NewCustomerButton/NewCustomerButton';
import CustomerList from '../components/CustomerList/CustomerList';
import MeniuButton from '../components/MeniuButton/MeniuButton';

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token
        }
    }

    render() {
        return (
            <div className="MainView">
                <h1>Klientų sąrašas</h1>
                <CustomerList token={ this.state.token }/>  
                <NewCustomerButton/>
                <MeniuButton/>              
            </div>
        );
    }
}

export default MainView;