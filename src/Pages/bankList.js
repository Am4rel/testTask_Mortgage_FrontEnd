import React, { Component } from 'react';
import BankList from "../utils/bankList";
import fetch from '../utils/fetch';

class BanksList extends Component {
    state = {
        banks: []
    };

    async componentDidMount() {
        try {
            const response = await fetch("allBanks");
            this.setState({banks: response.data.data});
        } catch (error) {
            alert("Something went wrong, try again");
        };
    };

    deleteBank = async (e) => {
        e.preventDefault();
        try {
            const id = e.target.parentElement.parentElement.id;
            await fetch("delete", null, id);

            const response = await fetch("allBanks");
            this.setState({banks: response.data.data});
        } catch (error) {
            alert("Something went wrong, try again");
        };
    };

    render() {
        const {banks} = this.state;
        return (
        <>
            <h1 className="title">List of the available bank loan programs:</h1>
            {banks.length > 0 ? <BankList banks={banks} onBankDelete={this.deleteBank}/> : <h3 className="title">There is no bank loan programs in our database yet. Be the first to add one!</h3>}
        </>
    )}
}

export default BanksList;