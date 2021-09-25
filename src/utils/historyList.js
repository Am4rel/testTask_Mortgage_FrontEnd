import React from 'react';
import "../index.css"

const HistoryList = (props) => {
    const {bank} = props;
    return (
        <table className="history-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Initial loan, $</th>
                    <th>Down payment, $</th>
                    <th>Monthly payment sum, $</th>
                </tr>
            </thead>
            <tbody>
                {bank.calculationHistory.map((data) => {
                    const {initialLoan, downPayment, monthlyPayment, date} = data;
                    const newDate = new Date(date);
                    const dateFormatted = newDate.toLocaleDateString("ru-RU")
                    return (
                        <tr key={date}>
                            <td>{dateFormatted}</td>
                            <td>{initialLoan}</td>
                            <td>{downPayment}</td>
                            <td>{monthlyPayment}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default HistoryList;   