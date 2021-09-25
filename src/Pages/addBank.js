import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import fetch from '../utils/fetch';

class AddBank extends Component {
    state = {
        name: "",
        interestRate: 0,
        maximumLoan: 0,
        minimumDownPayment: 0,
        loanTerm: 0,
        redirect: false,
    };

    onInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    
    onSubmitBtnClick = async (e) => {
        e.preventDefault()

        const {name, interestRate, maximumLoan, minimumDownPayment, loanTerm} = this.state

        const body = {
            name,
            interestRate: parseFloat(interestRate) / 100,
            maximumLoan,
            minimumDownPayment: parseFloat(minimumDownPayment) / 100,
            loanTerm,
        };

        try {
            await fetch("addBank", body);
            this.setState({name: "", interestRate: 0, maximumLoan: 0, minimumDownPayment: 0, loanTerm: 0, redirect: true});
        } catch (error) {
            alert("Something went wrong, try again")
        }
    }

    render(){
        const {state: {name, interestRate, maximumLoan, minimumDownPayment, loanTerm}, onSubmitBtnClick, onInput} = this;

        if (this.state.redirect){
            return <Redirect to="/banks"/>;
        };

        return (
            <>
            <h3 className="title">Add your bank loan program:</h3>
            <form onSubmit={onSubmitBtnClick} className="box">
            <label> 
                <p>Bank name:</p>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я0-9]+(([' -][a-zA-Zа-яА-Я0-9 ])?[a-zA-Zа-яА-Я0-9]*)*$"
                    title="Name can contain letters, numbers, dashes and apostrophe."
                    onChange={onInput}
                    value={name}
                    required
                />
            </label>

            <label> 
                <p>Bank interest rate, %:</p>
                <input
                    type="number"
                    name="interestRate"
                    min="0"
                    max="100"
                    title="Can be in range from 0% to 100%"
                    onChange={onInput}
                    value={interestRate}
                    required
                />
            </label>
            
            <label> 
                <p>Maximum loan, $:</p>
                <input
                    type="number"
                    name="maximumLoan"
                    min="0"
                    max="100000000"
                    title="Can be in range from $0 to $100000000"
                    onChange={onInput}
                    value={maximumLoan}
                    required
                />
            </label>
            
            <label> 
                <p>Minimum down payment, %:</p>
                <input
                    type="number"
                    name="minimumDownPayment"
                    min="0"
                    max="100"
                    title="Can be in range from 0% to 100%"
                    onChange={onInput}
                    value={minimumDownPayment}
                    required
                />
            </label>
            
            <label> 
                <p>Loan term, years:</p>
                <input
                    type="number"
                    name="loanTerm"
                    min="0"
                    max="100"
                    title="Can be in range from 0 to 100 years"
                    onChange={onInput}
                    value={loanTerm}
                    required
                />
            </label>

            <button type="submit" className="button">Add a bank</button>
        </form>
        </>
    )}
}

export default AddBank;