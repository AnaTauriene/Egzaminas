import React, { Component } from 'react';
import NewCustomerButton from '../components/NewCustomerButton/NewCustomerButton';
import CustomerList from '../components/CustomerList/CustomerList';
import MeniuButton from '../components/MeniuButton/MeniuButton';
import MainButton from '../components/MainButton/MainButton';
import CustomerInfo from '../components/CustomerInfo/CustomerInfo';
import '../components/CustomerInfo/CustomerInfo.css';

class ClientInformationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token
        }
    }

    render() {
        return (
            <div className="ClientInformationView">
                <MainButton/>
                <h1>Kliento informacija</h1>
                <CustomerInfo token={ this.state.token }/>     
                <MeniuButton/>                    
            </div>
        );
    }
}

export default ClientInformationView;