import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardActionArea,List, CardMedia, CardContent, Typography, Grid, Rating, Button, Box, Slider, TextField, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
 const [review, setReview]=useState();
 let [rating, setRating]=useState([]);
 const [isInWishlist, setIsInWishlist] = useState(false);
let navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`, {
          headers: {
            projectID: "f104bi07c490"
          }
        });
        setData(response?.data?.data);
        let res=await axios.get(`https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`,{
            headers:{
                projectID: "f104bi07c490"
            }
        });
        setReview(res?.data?.data)
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
    if (!data || !review) {
      fetchData();
    }
    if(review){
        let v1=0,v2=0,v3=0,v4=0,v5=0;
        for(let val of review){
            if(val.ratings===1) v1++;
            else if(val.ratings===2)v2++;
            else if(val.ratings===3) v3++;
            else if(val.ratings===4)v4++;
            if(val.ratings===5 || val.ratings===4) v5++;
    
        }
        setRating([v5,v4,v3,v2,v1])
      }
  }, [data, id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  const handleAddToCart = () => {
    navigate(`/cart/${id}`)
  };

  const handleBuyNow = () => {
   navigate('/payment')
  };
  const handleToggleWishlist = () => {
    // Implement your Wishlist logic here
    setIsInWishlist(!isInWishlist);
  };

  console.log('product details=================', data, id);
  console.log("rating data===========", rating)
  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img" 
                height="400"
                image={data?.images[currentIndex]}
                alt={data?.name}
                style={{ objectFit: 'cover', width: '100%' }}
              />
            </CardActionArea>
            {data && data?.images?.length > 1 && (
              <Box display="flex" justifyContent="space-between" padding={2}>
                <Button variant="contained" onClick={handlePrev} disabled={currentIndex === 0}>
                  Previous
                </Button>
                <Slider
                  value={currentIndex}
                  max={data.images.length - 1}
                  onChange={(event, newValue) => setCurrentIndex(newValue)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(index) => (
                    <img
                      src={data.images[index]}
                      alt={`${data.name} - Thumbnail ${index + 1}`}
                      style={{ width: '50px', height: 'auto', cursor: 'pointer' }}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  )}
                />
                <Button variant="contained" onClick={handleNext} disabled={currentIndex === data.images.length - 1}>
                  Next
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {data?.name || "not specified"}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {data?.seller?.name || "not specified"}
              </Typography>
              <Typography variant="h5" color="primary">
                Price: ${data?.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Brand: {data?.brand}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {data?.category}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Subcategory: {data?.subCategory}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Seller Tag: {data?.sellerTag}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Color: {data?.color || 'Not specified'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created At: {new Date(data?.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Warranty: {data?.warranty || 'Not specified'}
              </Typography>
              <Rating name="product-rating" value={data?.ratings} precision={0.1} readOnly />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="contained" color="secondary" onClick={handleBuyNow} style={{ marginLeft: '10px' }}>
                  Buy Now
                </Button>
                <Button
  variant="outlined"
  onClick={handleToggleWishlist}
  style={{
    marginLeft: '10px',
    background: 'transparent', 
    color: isInWishlist ? 'red' : '#bfa8a6', 
  }}
>
  <FavoriteIcon />
</Button>

              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Features:
          </Typography>
          <ul>
            {data?.features.map((feature, index) => (
              <Typography key={index} variant="body2" component="li">
                {feature}
              </Typography>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Images:
          </Typography>
          <Grid container spacing={2}>
            {data?.images.map((imageUrl, index) => (
              <Grid key={index} item xs={6} md={4}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100"
                      image={imageUrl}
                      alt={`${data?.name} - Image ${index + 1}`}
                      style={{ objectFit: 'cover', width: '100%' }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Videos:
          </Typography>
          <Grid container spacing={2}>
            {data?.videos.map((videoUrl, index) => (
              <Grid key={index} item xs={12} md={6}>
                <video width="100%" height="240" controls>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

        <Card style={{ background: 'rgba(255, 255, 255, 0.8)', marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Rating Distribution:
          </Typography>
          <Box display="flex" alignItems="center">
            {rating?.map((ratingValue,idx) => (
              <Box key={ratingValue} flex="1" textAlign="center" marginRight="8px">
                <Typography variant="h6" style={{ marginBottom: '8px' }}>
                  {ratingValue} Review
                </Typography>
                <Rating name="read-only" value={idx==0?5:idx==1?4:idx==2?3:idx==3?2:1} readOnly />
                <Typography variant="body2">{/* Display count for each ratingValue here */}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Card style={{ background: 'rgba(255, 255, 255, 0.8)', marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Customer Reviews: {data?.name}
          </Typography>
          <List>
            {review?.map((review) => (
              <ListItem key={review._id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        Rating:
                      </Typography>
                      <Rating name="read-only" value={review.ratings} readOnly />
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {review.text}
                      </Typography>
                      {/* Add more secondary information if needed */}
                    </>
                  }
                />
                 <Button variant="outlined" color="error"
                //  onClick={() => handleDeleteReview(review._id)}
                 >
                  Delete Review
                </Button>
              </ListItem>
            ))}
          </List>
          <Box mt={2}>
            <Typography variant="h6">Add Your Review:</Typography>
            <Rating
              name="new-review-rating"
            //   value={newReview.ratings}
            //   onChange={(event, newValue) => setNewReview({ ...newReview, ratings: newValue })}
            />
            <TextField
              label="Your Review"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            //   value={newReview.text}
            //   onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <Button variant="contained" color="primary"
            //  onClick={handleSubmitReview}
             >
              Submit Review
            </Button>
          </Box>
        </CardContent>
      </Card>
    
    </div>
  );
};

export default ProductDetail;
