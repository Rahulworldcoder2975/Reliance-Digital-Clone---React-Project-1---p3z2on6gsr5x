import { MenuItem, Popover, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Menu = () => {
  const [value, setValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  let [category, setCategory]=useState([])
  const handleChange = (event, newValue) => 
  {
    console.log(newValue)
    setValue(newValue);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  useEffect(()=>{
    let data=axios({url:'https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories',method:"GET",headers:{
      projectID:"f104bi07c490"
    }})
    data
    .then((data)=>{
      if(data?.data?.status=='success'){setCategory(data?.data?.data)}
    })
    .catch((err)=>console.log("something went wrong",err))
      
  },[])
  
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        style={{ backgroundColor: 'blue', color: 'white' }}
      >
           
        {
          category?.map((name,idx)=>(
            <Tab
            label={name}
            style={{ color: 'white' }}
          />
          ))
        }
      </Tabs>
      <Popover
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            backgroundColor: '#003399',
            color:'white',
            width:"600px"
          },
        }}
      >
        <MenuItem onClick={handleClose}>Item 1</MenuItem>
        <MenuItem onClick={handleClose}>Item 2</MenuItem>
      </Popover>
    </div>
  );
};

export default Menu;


