import React, { useState } from 'react';
import { List,TextField,Button, ListItem, ListItemIcon, ListItemText, Divider, Grid, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Stack from '@mui/material/Stack';
import Paper from '@mui/icons-material/Assignment';
import Avatar from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Navigate } from 'react-router-dom';

const MyAccountContent = ({ handleUpdate }) => {
  const contentStyle = {
    
    backgroundColor: 'pink',
    padding: '26px', 
    borderRadius: '8px', 
  };

  const buttonStyle = {
    width: '100px',
  };

  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Stack spacing={2} style={contentStyle}>
      <Typography variant="h5" gutterBottom>
        My Account Detail
      </Typography>
      <Avatar fontSize="large" />
      <TextField
        variant="standard"
        label="Name"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        variant="standard"
        label="Email"
        value={email}
        onChange={handleEmailChange}
      />
    
      <Button
        variant="contained"
        color="primary"
        disabled
        onClick={() => handleUpdate({ name, email })}
        style={buttonStyle}
      >
        Update Profile
      </Button>
    </Stack>
  );
};

const MyProfileContent = () => (
  <Typography variant="h5" gutterBottom>
    Coming soon....
  </Typography>
);

const MyOrdersContent = () => (
  <Typography variant="h5" gutterBottom>
     Coming soon....
  </Typography>
);

const MyAddressContent = () => (
  <Typography variant="h5" gutterBottom>
       Coming soon....
  </Typography>
);

const MyWishlistContent = () => (
  <Typography variant="h5" gutterBottom>
    My Wishlist
  </Typography>
);

const LoyaltyPointsContent = () => (
  <Typography variant="h5" gutterBottom>
     Coming soon....
  </Typography>
);

const MyCreditContent = () => (
  <Typography variant="h5" gutterBottom>
     Coming soon....
  </Typography>
);

const DashboardMenu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  function logout(){
    localStorage.clear()
    window.location.href="/"
  }
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'my-account':
        return <MyAccountContent />;
      case 'my-profile':
        return <MyProfileContent />;
      case 'my-orders':
        return <MyOrdersContent />;
      case 'my-address':
        return <MyAddressContent />;
      case 'my-wishlist':
        return <MyWishlistContent />;
      case 'loyalty-points':
        return <LoyaltyPointsContent />;
      case 'my-credit':
        return <MyCreditContent />;
      default:
        return <MyAccountContent />;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
          <List>
            <ListItem button onClick={() => handleMenuItemClick('my-account')}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('my-profile')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('my-orders')}>
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('my-address')}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="My Address" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('my-wishlist')}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="My Wishlist" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('loyalty-points')}>
              <ListItemIcon>
                <LoyaltyIcon />
              </ListItemIcon>
              <ListItemText primary="Loyalty Points" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick('my-credit')}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="My Credit" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleMenuItemClick(null)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" onClick={logout} />
            </ListItem>
          </List>
        </div>
      </Grid>
      <Grid item xs={12} sm={9}>
        {/* Render the selected content */}
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default DashboardMenu;
