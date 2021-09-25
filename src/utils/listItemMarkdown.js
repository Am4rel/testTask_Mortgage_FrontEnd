import React from 'react';
import { NavLink } from 'react-router-dom';
import "../index.css"

const listItemMarkdown = (data, onBankDelete) => {
    const {_id, name, interestRate, maximumLoan, minimumDownPayment, loanTerm } = data;
    return (
        <li key={_id} id={_id} className="bankList box">
            <NavLink to={`banks/${_id}`} id={_id}  className="box-item link">
                <h3 className="box-item">Name: {name}</h3>
                <div className="box-item middle">
                    <p>Interest rate: {interestRate * 100}%</p>
                    <p>Maximum loan sum: ${maximumLoan}</p>
                    <p>Minimum down payment: {minimumDownPayment * 100}%</p>
                    <p>Loan term: {loanTerm === 1 ? `${loanTerm} year` : `${loanTerm} years`}</p>
                </div>
            </NavLink>
            <div className="box-item">
                <button type="button" className="button" onClick={onBankDelete}>Delete</button>
                <NavLink to={`/banks/${_id}/edit`} className="button">Edit bank</NavLink>
            </div>
            
        </li>
        );
    };

export default listItemMarkdown;