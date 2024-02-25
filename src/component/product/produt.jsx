import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Rating,
  Paper,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Product = () => {

  const [activeStep, setActiveStep] = useState(0);
  let [product, setProduct]=useState([])
  const products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description for Product 1',
      image: 'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description for Product 2',
      image: 'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
    },
    {
                id:3 ,
                title: 'Product 3',
                description: 'Description for Product 1',
                image: 'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
              },
              {
                id: 4,
                title: 'Product 4',
                description: 'Description for Product 2',
                image: 'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
              },
              {
                id: 5,
                title: 'Product 5',
                description: 'Description for Product 1',
                image: 'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
              },
              {
                id: 6,
                title: 'Product 6',
                description: 'Description for Product 2',
                image: 'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
              },
  ];
  const navigate=useNavigate()
  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => (prevStep - 1 + products.length) % products.length);
  };
  useEffect(()=>{
    let data=axios({url:"https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=102",
    method:"GET",
    headers:{
    projectID:"f104bi07c490"
  }
    });
  data 
  .then((res)=>setProduct(res?.data?.data))
  .catch((err)=>console.log("something went wrong", err))
  },[])
  function handleProductClick(id){
    console.log(id,'++++++++++++++++++++++++++++++++');
    navigate(`/product/${id}`);
  }
 
  console.log(product, '==============')
  return (
    <div style={{margin:'30px'}} className='container'>
        <h3>Lowest price for today <Button variant="contained" color="primary">View All</Button></h3>
    <Grid container spacing={3} marginTop={2} marginBottom={2} >
            <Card sx={{ maxWidth: 445, border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', margin:"30px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image='https://www.shutterstock.com/image-vector/best-price-sale-grunge-rubber-600nw-2262495703.jpg'
                alt='hello'
                style={{ objectFit: 'cover', width: '100%', minHeight: '200px' }}
              />
            </CardActionArea>
          </Card> 
          {product.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} onClick={() => handleProductClick(product._id)}>
          <Card sx={{ maxWidth: 345, border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', height:'500px', }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={product.displayImage}
                alt={product.name}
                style={{ objectFit: 'cover', width: '100%', minHeight: '200px' }}
              />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <h5>{product.name}</h5>
                </Typography>
                <p>Offer Price: <b>{product.price}</b></p>
                <p>M.R.P: {parseInt(Math.random()*999999)>product.price?parseInt(Math.random()*999999):product.price*1.2}</p>
                <Rating
  name="ratings"
  value={product.ratings}
/>
              </CardContent>
            <Box display="flex" justifyContent="center" padding={2}>
      
            </Box>
          </Card>
        </Grid>
      ))}
    
    </Grid> 

    </div>
  );
};

export default Product;

