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
           {/* <Tab
          label="MOBILES & TABLETS"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          style={{ color: 'white' }}
        /> */}
        {
          category?.map((name,idx)=>(
            <Tab
            label={name}
            style={{ color: 'white' }}
          />
          ))
        }
        {
        /* <Tab
          label="MOBILES & TABLETS"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          style={{ color: 'white' }}
        />
      
        
        <Tab
          label="AUDIO"
          style={{ color: 'white' }}
        />
        <Tab
          label="HOME APPLIANCES"
          style={{ color: 'white' }}
        />
        <Tab
          label="COMPUTERS"
          style={{ color: 'white' }}
        />
        <Tab
          label="CAMERAS"
          style={{ color: 'white' }}
        />
        <Tab
          label="KITCHEN APPLIANCES"
          style={{ color: 'white' }}
        />
        <Tab
          label="PERSONAL CARE"
          style={{ color: 'white' }}
        />
        <Tab
          label="ACCESSORIES"
          style={{ color: 'white' }}
        /> */}
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

//testing purpose
// const MyTabs = () => {
//   const [value, setValue] = useState(null);
//   const [anchorEl1, setAnchorEl1] = useState(null);
//   const [anchorEl2, setAnchorEl2] = useState(null);
//   // Add more state variables for additional Popovers

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     // Set the correct anchorEl based on the selected tab
//     if (newValue === 0) {
//       setAnchorEl1(event.currentTarget);
//       // Reset other Popover states if needed
//       setAnchorEl2(null);
//       // Reset other Popover state variables if needed
//     } else if (newValue === 1) {
//       setAnchorEl2(event.currentTarget);
//       // Reset other Popover states if needed
//       setAnchorEl1(null);
//       // Reset other Popover state variables if needed
//     }
//     // Add conditions for more tabs and Popovers
//   };

//   const handleClose = () => {
//     // Close the correct Popover based on the selected tab
//     if (value === 0) {
//       setAnchorEl1(null);
//     } else if (value === 1) {
//       setAnchorEl2(null);
//     }
//     // Add conditions for more Popovers
//   };

//   return (
//     <div>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         textColor="secondary"
//         indicatorColor="secondary"
//         variant="scrollable"
//         scrollButtons="auto"
//         style={{ backgroundColor: 'blue', color: 'white' }}
//       >
//         <Tab label="Tab 1" aria-controls="popover-tab1" aria-haspopup="true" style={{ color: 'white' }} />
//         <Tab label="Tab 2" aria-controls="popover-tab2" aria-haspopup="true" style={{ color: 'white' }} />
//         {/* Add more tabs as needed */}
//       </Tabs>

//       <Popover
//         id="popover-tab1"
//         anchorEl={anchorEl1}
//         keepMounted
//         open={Boolean(anchorEl1)}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         {/* Content for Tab 1 */}
//         <MenuItem onClick={handleClose}>Item 1 for Tab 1</MenuItem>
//         <MenuItem onClick={handleClose}>Item 2 for Tab 1</MenuItem>
//       </Popover>

//       <Popover
//         id="popover-tab2"
//         anchorEl={anchorEl2}
//         keepMounted
//         open={Boolean(anchorEl2)}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         {/* Content for Tab 2 */}
//         <MenuItem onClick={handleClose}>Item 1 for Tab 2</MenuItem>
//         <MenuItem onClick={handleClose}>Item 2 for Tab 2</MenuItem>
//       </Popover>

//       {/* Add more Popovers for additional tabs */}
//     </div>
//   );
// };

