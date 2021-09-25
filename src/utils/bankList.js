import React from 'react';

import listItemMarkdown from './listItemMarkdown';

import "../index.css"

const BankList = (props) => {
    const {banks, onBankDelete} = props;

    if (Array.isArray(banks)){
        return (
            <ul className="listBox">
                {banks.map((data) => listItemMarkdown(data, onBankDelete))}
            </ul>
        );
    }else{
        return (
            <ul className="listBox">
                {listItemMarkdown(banks, onBankDelete)}
            </ul>
        );
    };
};

export default BankList;   