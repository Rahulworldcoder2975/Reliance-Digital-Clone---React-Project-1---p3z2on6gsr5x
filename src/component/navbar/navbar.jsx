import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Button, Box,Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, LocationOn as LocationOnIcon, ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Search from '../search/search';

const Navbar = ({ search, handleChange }) => {
  const [auth,setAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  // let [search, setSerach]=useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the '/search' route when the user performs a search
    navigate('/search');
  };

  console.log("searching value", search)
    return (<>
      <AppBar position="static"  sx={{ backgroundColor: 'red' }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight: 'bold', letterSpacing: '1px', color: 'white' }}>
         <Link to="/"> <img src={'https://th.bing.com/th/id/R.246d7ea5e0111f70c4f269b7fefbd198?rik=xkMXqhnLkRhDIA&riu=http%3a%2f%2fwww.pngimagesfree.com%2fLOGO%2fR%2fReliance-Digital%2fReliance-Digital-Logo-PNG-HD.png&ehk=zslh0NhyMHqTej06GDP3Ye%2bOIAIvgm2rVB9S7AV6HEQ%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'} alt="YourLogo" style={{ height: '50px', width: 'auto' }} />
         </Link></Typography>
  
          {/* Search Bar */}
          <div sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
  <div sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
    <InputBase placeholder="Find your favorite products" sx={{ paddingLeft: '1rem', backgroundColor: 'white', borderRadius: '13px' }} 

    value={search}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            // Call handleSearch when Enter key is pressed
            handleSearch();
          }
        }}
    />
   
  </div>
</div>
          {/* Location */}
          <IconButton color="inherit" sx={{paddingLeft:'1rem', marginRight: 1, fontSize:'15px' }}>
           Selct you pin code <LocationOnIcon />
          </IconButton>
  
          {/* Cart */}
          <IconButton color="inherit" sx={{ marginRight: 1, fontSize: '15px' }}>
      {localStorage.getItem('token') ? (
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          <ShoppingCartIcon />cart
        </Link>
      ) : (
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
             <ShoppingCartIcon />cart
        </Link>
      )}
    </IconButton>
          {localStorage.getItem("token") ? (
  <IconButton
    color="inherit"
    aria-controls={open ? 'demo-positioned-menu' : undefined}
    sx={{
      fontSize: '15px',
      '&:hover': {
        backgroundColor: 'transparent', 
      },
    }}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
  >
    {localStorage.getItem("name")}
  </IconButton>
) : (
  <IconButton color="inherit"  sx={{
    fontSize: '15px',
    '&:hover': {
      backgroundColor: 'transparent', 
    },
  }}>
   <Link to="/login"><AccountCircleIcon /></Link> 
  </IconButton>
)}

        </Toolbar>
        
      </AppBar>
      <div >
     
      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
              style: {
                backgroundColor: '#003399',
                color:'white',
              },
            }}
      >
        <MenuItem onClick={handleClose}>My Wishlist</MenuItem>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
  <MenuItem onClick={handleClose} style={{ color: 'white', backgroundColor: 'transparent', textDecoration: 'none' }}>
    View Profile
  </MenuItem>
</Link>
        <MenuItem onClick={handleClose} >Logout</MenuItem>
      </Menu>
    </div>

</>      
    );
  };

export default Navbar;
