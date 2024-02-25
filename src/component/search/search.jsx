import { Box, CardActionArea, CardContent,CardMedia, Grid,Card, Typography, Rating, TextField, FormGroup, FormControlLabel, Button, Checkbox, Pagination } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ViewDetail from '../product/viewDetail';

export default function Search({search}) {
    let [product, setProduct]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProduct, setTotalProduct]=useState(0)
    const [minPrice, setMinPrice] = useState(30);
    const [maxPrice, setMaxPrice] = useState(20000);
    const [categories, setCategories] = useState([
        "ac",
        "audio",
        "health",
        "kitchenappliances",
        "laptop",
        "mobile",
        "refrigerator",
        "tablet",
        "travel",
        "tv",
        "washingMachine"
      ]);
      const [selectedBrands, setSelectedBrands] = useState([]);
      const [selectedCategories, setSelectedCategories] = useState(['tv']);
      let navigate=useNavigate()
    let productsPerPage=20
    useEffect(()=>{
        const url = "https://academics.newtonschool.co/api/v1/ecommerce/electronics/products";
        const searchQuery = encodeURIComponent(JSON.stringify({ name: search }));
        const fil=encodeURIComponent(JSON.stringify({subCategory:selectedCategories}))
  fetch(`${url}?search=${searchQuery}&&limit=${1000}&filter=${fil}`, {
  method: 'GET',
  headers: {
    projectID:"f104bi07c490"
  },
        })
  .then(response => response.json())
    .then((res)=>{
    setTotalProduct(res?.data)
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
     setProduct(res?.data?.slice(startIndex, endIndex));
    }
    )
    .catch((err)=>console.log("something went wrong", err))
},[search, currentPage, productsPerPage,selectedCategories])
    function handleProductClick(id){
        console.log(id,'++++++++++++++++++++++++++++++++');
        navigate(`/product/${id}`);
      }
      const handlePageChange = (event, value) => {
        console.log(value, event)
        setCurrentPage(value);
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
         setProduct(totalProduct?.slice(startIndex, endIndex));
      };
      console.log("seearchig value= =]===============", search, totalProduct)
   const applyFilter=(e)=>{
    e.preventDefault();
    const filteredProducts = totalProduct?.filter(product => 
        product.price >= minPrice &&
        product.price <= maxPrice
      );
      console.log(filteredProducts, "filter products",selectedCategories)
   }

const handleCategoryChange = (category) => {
    // Check if the category is already selected
    if (selectedCategories.includes(category)) {
      // If selected, remove it from the list
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else {
      // If not selected, add it to the list
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };
  const handleBrandChange = (brand) => {
    setSelectedBrands(prevSelectedBrands => {
      const updatedBrands = prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter(selectedBrand => selectedBrand !== brand)
        : [...prevSelectedBrands, brand];
      return updatedBrands;
    });
  };
return (
    <div style={{ display: 'flex', margin: '30px' }}>
      {/* Sidebar for filters - 30% width */}
      <div style={{ flexBasis: '30%', paddingRight: '20px' }}>
        {/* Add your filter components here */}
        <h2>Filters</h2>
        {/* Add filter components here */}
        <div style={{ flexBasis: '30%', paddingRight: '20px', borderRight: '1px solid #ccc', padding: '20px' }}>
        {/* Add your filter components here */}
  
        {/* Price Range */}
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1">Price Range</Typography>
          <div style={{ display: 'flex' }}>
            <TextField
              label="Min Price"
              type="number"
              defaultValue={minPrice}
              style={{ marginRight: '10px' }}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <TextField
              label="Max Price"
              type="number"
              defaultValue={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}

            />
          </div>
        </div>
        {/* <div style={{ marginBottom: '20px' }}>
          <Typography variant="subtitle1">Price Range</Typography>
          <TextField
            label="Min Price"
            type="number"
            defaultValue="500"
            // value={filters.minPrice}
            // onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            style={{ marginRight: '10px' }}
          /><br/>
          <TextField
            label="Max Price"
            type="number"
            defaultValue="200000"
            // value={filters.maxPrice}
            // onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div> */}


        {/* Categories Filter */}
        <div style={{ marginBottom: '20px' }}>
      <Typography variant="subtitle1">Categories</Typography>
      <FormGroup>
        {categories?categories.map((category, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        )):<Typography variant="subtitle1"></Typography>}
      </FormGroup>
    </div>

  {/* Brand Filter */}
  <div style={{ marginBottom: '20px' }}>
          <Typography variant="subtitle1">Brands</Typography>
          <FormGroup>
            {product?Array.from(new Set(product.map(product => product.brand))).map((brand, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            )):
            <Typography variant="subtitle1"></Typography>}
          </FormGroup>
        </div>
        {/* Apply Filters Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilter}
          style={{ borderRadius: '5px' }}
        >
          Apply Filters
        </Button>
      </div>

      {/* Product display - 70% width */}
      <div style={{ flexBasis: '70%' }}>
        {/* ... (Product display code) */}
      </div>
      </div>

      {/* Product display - 70% width */}
      <div style={{ flexBasis: '70%' }}>
        <Grid container spacing={3}>
          {product?product.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} onClick={() => handleProductClick(product._id)}>
              <Card sx={{ maxWidth: 345, border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
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
                  <p>M.R.P: {parseInt(Math.random() * 999999) > product.price ? parseInt(Math.random() * 999999) : product.price * 1.2}</p>
                  <Rating name="ratings" value={product.ratings} />
                </CardContent>
                <Box display="flex" justifyContent="center" padding={2}></Box>
              </Card>
            </Grid>
          )):<div>No Product found.</div>}
        </Grid>
        {/* Add pagination component here */}\
         <Pagination
          count={Math.ceil(totalProduct?.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '20px', alignSelf: 'center' }}
        />
      </div>
    </div>
  );
}
