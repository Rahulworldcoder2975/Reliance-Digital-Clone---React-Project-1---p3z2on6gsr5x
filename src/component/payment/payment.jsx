import React, { useState } from 'react';
import {
  Button,
  Typography,
  Divider,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import DebitCardIcon from '@mui/icons-material/Dialpad';
import CreditCardEmiIcon from '@mui/icons-material/LocalAtm';
import NetBankingIcon from '@mui/icons-material/AccountBalance';
import UpiIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletsIcon from '@mui/icons-material/AccountBalanceWallet';
import CashOnDeliveryIcon from '@mui/icons-material/MoneyOff';

const Payment = () => {
  // State variables for managing form inputs
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankHolderName, setBankHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [emiMonths, setEmiMonths] = useState(3);
  const [isAgreed, setIsAgreed] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [interestRate, setInterestRate] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState();
  const [walletId, setWalletId] = useState();

  // Event handler for payment method change
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Event handler for EMI months change
  const handleEmiMonthsChange = (event) => {
    setEmiMonths(event.target.value);
  };

  // Event handler for agreement checkbox change
  const handleAgreementChange = () => {
    setIsAgreed(!isAgreed);
  };

  // Event handler for payment button click
  const handlePayment = () => {
    // Implement payment processing logic here
    alert('Payment processed successfully!');
    // Add your logic to redirect or show a success message
  };

  return (
    <Container style={{ padding: '16px', marginTop: '16px', border: '1px solid #ccc', backgroundColor: '#f8f8f8' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pay Securely
      </Typography>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
        {/* Left side: Payment Methods */}
        <Paper elevation={3} style={{ width: '40%', padding: '16px', marginRight: '10px', backgroundColor: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            Payment Methods
          </Typography>
          {/* Radio button group for payment options */}
          <FormControl fullWidth style={{ marginBottom: '16px' }}>
            <RadioGroup
              aria-label="payment-options"
              name="payment-options"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel
                value="creditCard"
                control={<Radio />}
                label={
                  <>
                    <CreditCardIcon fontSize="small" /> Credit Card
                  </>
                }
              />
              <FormControlLabel
                value="debitCard"
                control={<Radio />}
                label={
                  <>
                    <DebitCardIcon fontSize="small" /> Debit Card
                  </>
                }
              />
              <FormControlLabel
                value="creditCardEmi"
                control={<Radio />}
                label={
                  <>
                    <CreditCardEmiIcon fontSize="small" /> Credit Card EMI
                  </>
                }
              />
              <FormControlLabel
                value="netBanking"
                control={<Radio />}
                label={
                  <>
                    <NetBankingIcon fontSize="small" /> Net Banking
                  </>
                }
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <>
                    <UpiIcon fontSize="small" /> UPI
                  </>
                }
              />
              <FormControlLabel
                value="wallets"
                control={<Radio />}
                label={
                  <>
                    <WalletsIcon fontSize="small" /> Wallets
                  </>
                }
              />
              <FormControlLabel
                value="cashOnDelivery"
                control={<Radio />}
                label={
                  <>
                    <CashOnDeliveryIcon fontSize="small" /> Cash on Delivery
                  </>
                }
              />
            </RadioGroup>
          </FormControl>
        </Paper>

        {/* Right side: Payment Details */}
        <Paper elevation={3} style={{ width: '50%', padding: '16px', backgroundColor: '#fff' }}>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>

          {/* Render payment form based on selected payment method */}
          {paymentMethod === 'creditCard' && (
            <>
              <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="credit-card-bank-label">Select Bank</InputLabel>
                <Select
                  labelId="credit-card-bank-label"
                  id="credit-card-bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <MenuItem value="bank1">Bank 1</MenuItem>
                  <MenuItem value="bank2">Bank 2</MenuItem>
                  {/* Add more banks as needed */}
                </Select>
              </FormControl>
              <TextField
                label="Card Holder Name"
                variant="outlined"
                fullWidth
                value={bankHolderName}
                onChange={(e) => setBankHolderName(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
            
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}
          {paymentMethod === 'debitCard' && (
            <>
              <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="debit-card-bank-label">Select Bank</InputLabel>
                <Select
                  labelId="debit-card-bank-label"
                  id="debit-card-bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <MenuItem value="bank1">Bank 1</MenuItem>
                  <MenuItem value="bank2">Bank 2</MenuItem>
                  {/* Add more banks as needed */}
                </Select>
              </FormControl>
              <TextField
                label="Card Holder Name"
                variant="outlined"
                fullWidth
                value={bankHolderName}
                onChange={(e) => setBankHolderName(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="IFSC Code"
                variant="outlined"
                fullWidth
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}
          {paymentMethod === 'creditCardEmi' && (
            <>
              <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="emi-bank-label">Select Bank</InputLabel>
                <Select
                  labelId="emi-bank-label"
                  id="emi-bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <MenuItem value="bank1">Bank 1</MenuItem>
                  <MenuItem value="bank2">Bank 2</MenuItem>
                  {/* Add more banks as needed */}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="emi-months-label">Select EMI Months</InputLabel>
                <Select
                  labelId="emi-months-label"
                  id="emi-months"
                  value={emiMonths}
                  onChange={handleEmiMonthsChange}
                >
                  <MenuItem value={3}>3 months</MenuItem>
                  <MenuItem value={6}>6 months</MenuItem>
                  <MenuItem value={9}>9 months</MenuItem>
                  <MenuItem value={12}>12 months</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Interest Rate (%)"
                variant="outlined"
                fullWidth
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}
          {paymentMethod === 'netBanking' && (
            <>
              <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="net-bank-label">Select Bank</InputLabel>
                <Select
                  labelId="net-bank-label"
                  id="net-bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <MenuItem value="bank1">Bank 1</MenuItem>
                  <MenuItem value="bank2">Bank 2</MenuItem>
                  {/* Add more banks as needed */}
                </Select>
              </FormControl>
              <TextField
                label="User ID"
                variant="outlined"
                fullWidth
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}
          {paymentMethod === 'upi' && (
            <>
              <TextField
                label="UPI ID"
                variant="outlined"
                fullWidth
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}
          {paymentMethod === 'wallets' && (
            <>
              <TextField
                label="Wallet ID"
                variant="outlined"
                fullWidth
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}
          {paymentMethod === 'cashOnDelivery' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                  label="I agree to the terms and conditions"
                />
              </div>
            </>
          )}

          {/* Continue rendering other payment methods... */}
          {/* Debit Card, Credit Card EMI, Net Banking, UPI, Wallets, Cash on Delivery */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              disabled={!isAgreed}
            >
              Continue to Pay ${/* Add your total amount here */}
            </Button>
          </div>
        </Paper>
      </div>
    </Container>
  );
};

export default Payment;
