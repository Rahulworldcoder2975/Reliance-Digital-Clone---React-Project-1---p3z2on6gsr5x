import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Container,
  TextField,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link,useParams } from 'react-router-dom';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {id}=useParams()
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const cartItems = [
    { id: 1, name: 'Item 1', price: 20, imageUrl: 'https://example.com/item1.jpg' },
    { id: 2, name: 'Item 2', price: 30, imageUrl: 'https://example.com/item2.jpg' },
    { id: 3, name: 'Item 3', price: 25, imageUrl: 'https://example.com/item3.jpg' },
  ];

  const offers = {
    discount: 0.1,
    freeShipping: true,
    deliveryCharge: 5,
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discount = offers.discount ? subtotal * offers.discount : 0;
    const totalBeforeDelivery = subtotal - discount;
    const totalAmount = totalBeforeDelivery + offers.deliveryCharge;
    return totalAmount.toFixed(2);
  };
  const handleCheckout = () => {
    console.log('Checkout button clicked!');
  };

  const handleCouponCodeChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = () => {
    // Implement coupon code validation and application logic here
    // For demonstration purposes, just set the appliedCoupon state
    setAppliedCoupon(couponCode);
  };

  return (
    <Container style={{ padding: '16px', marginTop: '16px', border: `1px solid ${theme.palette.grey[300]}` }}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: theme.palette.primary.main }}>
        all items
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            style={{
              marginBottom: '16px',
              background: theme.palette.background.paper,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: isMobile ? '60px' : '80px',
                height: '60px',
                marginRight: '16px',
                borderRadius: '4px',
              }}
            />
            <ListItemText
              primary={item.name}
              secondary={`$${item.price}`}
              primaryTypographyProps={{ variant: isMobile ? 'body1' : 'h6' }}
              secondaryTypographyProps={{ variant: isMobile ? 'body2' : 'subtitle1' }}
            />
            <Button>remove</Button>
          </ListItem>
          
        ))}
      </List>
      <Divider />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Coupon Code"
            variant="outlined"
            fullWidth
            value={couponCode}
            onChange={handleCouponCodeChange}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyCoupon}
            disabled={!couponCode} // Disable the button if no coupon code entered
            style={{ marginTop: isMobile ? '8px' : '0px', marginLeft: isMobile ? '0px' : '8px' }}
          >
            Apply Coupon
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          {appliedCoupon && (
            <Typography variant="subtitle1" color="success" style={{ marginTop: isMobile ? '8px' : '0px' }}>
              Applied Coupon: {appliedCoupon}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" style={{ textAlign: isMobile ? 'center' : 'right' }}>
            Subtotal: ${calculateTotalAmount()}
          </Typography>
          {offers.discount && (
            <Typography color="error" style={{ marginTop: '8px', textAlign: isMobile ? 'center' : 'right' }}>
              Discount applied: {offers.discount * 100}%
            </Typography>
          )}
          {offers.freeShipping && (
            <Typography color="primary" style={{ marginTop: '8px', textAlign: isMobile ? 'center' : 'right' }}>
              Free Shipping applied
            </Typography>
          )}
          <Typography style={{ marginTop: '8px', textAlign: isMobile ? 'center' : 'right' }}>
            Delivery Charge: ${offers.deliveryCharge}
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: '16px 0' }} />
      <div style={{ textAlign: isMobile ? 'center' : 'right', marginTop: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
         <Link to="/payment">Checkout</Link> 
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
