import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import BankList from '../utils/bankList';
import HistoryList from '../utils/historyList';
import fetch from '../utils/fetch';

class BankPage extends Component {
    state = {
        bank: {},
        redirect: false,
    }

    async componentDidMount() {
        const {bankId} = this.props.match.params;
        try {
            const result = await fetch("getBank", null, bankId);
            this.setState({bank: result.data.data});
        } catch (error) {
            alert("Something went wrong, try again")
        }
    }

    deleteBank = async (e) => {
        e.preventDefault();
        try {
            const id = this.state.bank._id;
            await fetch("delete", null, id);

            this.setState({redirect: true});
        } catch (error) {
            alert("Something went wrong, try again");
        };
    };

    render() {
        const {bank} = this.state;
        const {calculationHistory = []} = bank;

        if (this.state.redirect){
            return <Redirect to="/banks"/>;
        };

        return (
            <>
                <h1 className="title">{`History of mortgage calculations for ${bank.name}`}:</h1>
                {bank && <BankList banks={bank} onBankDelete={this.deleteBank}/>}
                {calculationHistory.length && <HistoryList bank={bank}/>}
            </>
        )
    }
} 

export default BankPage