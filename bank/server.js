const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
let accounts = [];
app.use(bodyParser.json());
// View All Accounts
app.get('/addAccount', (req, res) => {
  const { accountNumber, balance } = req.body || {};
  const newAccount = { accountNumber, balance };
  accounts.push(newAccount);
  res.send(`Account ${accountNumber} added successfully`);
});
app.delete('/deleteAccount/:accountNumber', (req, res) => {
  const accountNumber = req.params.accountNumber;
  accounts = accounts.filter(account => account.accountNumber !== accountNumber);
  res.send('Account deleted successfully');
});
app.get('/viewAccount/:accountNumber', (req, res) => {
  const accountNumber = req.params.accountNumber;
  const account = accounts.find(acc => acc.accountNumber === accountNumber);
  if (account) {
    res.json(account);
  } else {
    res.status(404).send('Account not found');
  }
});

// Send Money
app.get('/sendMoney', (req, res) => {
  const { senderAccountNumber, receiverAccountNumber, amount } = req.body;

  const senderAccount = accounts.find(acc => acc.accountNumber === senderAccountNumber);
  const receiverAccount = accounts.find(acc => acc.accountNumber === receiverAccountNumber);

  if (senderAccount && receiverAccount && senderAccount.balance >= amount) {
    senderAccount.balance -= amount;
    receiverAccount.balance += amount;
    res.send('Money sent successfully');
  } else {
    res.status(400).send('Invalid transaction');
  }
});
// View All Accounts
app.get('/viewAllAccounts', (req, res) => {
  res.json(accounts);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Bank Server');
});
 
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});