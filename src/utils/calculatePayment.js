const calculatePayment = (sumOfLoan, numOfYears, iterestRate) => {
    const monthlyInterestRate = parseFloat(iterestRate) / 12;
    const numOfmonthes = parseFloat(numOfYears) * 12;
    const result = (sumOfLoan * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numOfmonthes)) / (Math.pow((1 + monthlyInterestRate), numOfmonthes) - 1)
    return result;
}

export default calculatePayment;