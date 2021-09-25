import React, {Component} from 'react';

import fetch from '../utils/fetch';
import calculatePayment from '../utils/calculatePayment';

class Calculator extends Component {
    state = {
        name: "",
        initialLoan: 0,
        downPayment: 0,
        banksList: [],
        bankSearch: false,
        monthlyPayment: null,
    };

    onInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value, monthlyPayment: null, bankSearch: false});
    }
    
    onSubmitBtnClick = async (e) => {
        e.preventDefault()
        const {initialLoan, downPayment} = this.state
        const id = e.target[3].options[e.target[3].selectedIndex].value;
        const sumOfdebt = parseFloat(initialLoan) - parseFloat(downPayment);

        try {
            const {data: {data}} = await fetch("getBank", null, id);
            const {interestRate, loanTerm, name, maximumLoan, minimumDownPayment, calculationHistory} = data;

            const result = calculatePayment(sumOfdebt, loanTerm, interestRate);

            this.setState({monthlyPayment: result, name});
            const calculationHistoryToWrite = [...calculationHistory, {
                initialLoan: +initialLoan, 
                downPayment: +downPayment, 
                monthlyPayment: Math.round(result*100)/100, 
                date: new Date(),
            }];
            const body = {
                interestRate, 
                loanTerm, 
                maximumLoan, 
                name, 
                minimumDownPayment, 
                calculationHistory: calculationHistoryToWrite,
            };
            await fetch("editBank", body, id);
        } catch (error) {
            alert(error.message);
        };
    };

    onConfirmBtnClick = async () => {
        const {data: {data}} = await fetch("allBanks");
        const {downPayment, initialLoan} = this.state;

        const banks = data.filter(({minimumDownPayment, maximumLoan}) => {
            const calculatedDownPayment = parseFloat(downPayment) / parseFloat(initialLoan);
            return maximumLoan >= initialLoan && minimumDownPayment <= calculatedDownPayment;
        });
        this.setState({banksList: banks, bankSearch: true});
    }

    render(){
        const {state: {bankSearch, initialLoan, downPayment, banksList, monthlyPayment,name}, onSubmitBtnClick, onInput, onConfirmBtnClick} = this;
        const list = banksList.length > 0 ?
        <>
            <label className="bank_dropdown box">
                Choose a bank to calculate monthly payment sum:
                <select name="bank">
                    {banksList.map(bank => {
                        const {name, interestRate, loanTerm} = bank;
                        return (
                            <option key={bank._id} value={bank._id}>{`${name} - Interest rate: ${interestRate*100}% Term of loan: ${loanTerm === 1 ? `${loanTerm} year` : `${loanTerm} years`}`}</option>
                        )})
                    }
                </select>
            </label>

            <button type="submit" className="button">Calculate monthly payment</button>
        </> :
        <p className="bank_dropdown box">{`There is no bank that can give a $${initialLoan} loan with $${downPayment} down payment. Check the available loan programs at the Banks page.`}</p>

        return (
            <>
            <h3 className="title">Find out how much will you pay monthly for the loan:</h3>
            <form onSubmit={onSubmitBtnClick} className="calculator">
                <label className="calculator-item"> 
                    <p>Initial loan, $:</p>
                    <input
                        type="number"
                        name="initialLoan"
                        min="0"
                        title="Must be greater or equal to 0"
                        onChange={onInput}
                        value={initialLoan}
                        required
                    />
                </label>
                
                <label className="calculator-item"> 
                    <p>Minimum dowm payment, $:</p>
                    <input
                        type="number"
                        name="downPayment"
                        min="0"
                        max={initialLoan}
                        title="Must be greater or equal to 0"
                        onChange={onInput}
                        value={downPayment}
                        required
                    />
                </label>

                <button type="button" onClick={onConfirmBtnClick} className="button calculator-item">Find a bank that can give me a loan</button>

                {bankSearch && list}

                {monthlyPayment && <h3 className="title">{`Your monthy payment for the loan at ${name} will be $${Math.round(monthlyPayment*100)/100}`}</h3>}
            </form>
            </>
    )}
}

export default Calculator;