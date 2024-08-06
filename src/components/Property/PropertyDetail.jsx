import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Divider,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import BuildingIcon from '@mui/icons-material/Apartment';
import { Modal } from "react-bootstrap";

// Styled Grid for Image Gallery
const ImageGallery = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PropertyDetail = () => {
  const bodyStyle = {
    backgroundColor: "#F5F5F5", // Replace with your desired color
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = bodyStyle.backgroundColor;
  }, [bodyStyle.backgroundColor]);

  const id = useParams().id;
  console.log("id..", id);
  const [singleProperty, setSingleProperty] = useState({});
  const [singleflat, setsingleflat] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const societyResponse = await axios.get(
          "http://localhost:3000/society/singlesociety/" + id
        );
        setSingleProperty(societyResponse.data);

        const flatResponse = await axios.get(
          `http://localhost:3000/flat/singleflat/${id}`
        );
        setsingleflat(flatResponse.data);
        console.log(flatResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const { images = [] } = singleflat?.data || {};

  return (
    <Box
      sx={{
        marginLeft: "10%",
        width: "100%", // Set the desired width
        maxWidth: "1552px", // Optionally, set a max width
      }}
    >
      <Card sx={{ border: "2px black solid", borderRadius: "10px", marginTop: 2 }}>
        <CardContent>
        <Typography
        variant="h2"
        gutterBottom
        align="center"
        fontFamily={"inherit"}
      >
        {singleflat?.data?.society?.name || "Property Name"}
      </Typography>
      <Typography
        variant="h4"
        color="textSecondary"
        gutterBottom
        align="center"
        fontFamily={"monospace"}
      >
        ${singleflat?.data?.price || "Price"} - All inclusive
      </Typography>
      <Grid container spacing={2}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={singleflat.data?.imgUrl} // Ensure `img.url` is the correct path to the image
                  alt={`Property Image ${index + 1}`}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Image {index + 1}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No images available
          </Typography>
        )}
      </Grid>

        </CardContent>
      </Card>
      {/* Property Title and Price */}
     
      {/* Property Description */}
      <Card sx={{ border: "2px black solid", borderRadius: "10px", marginTop: 2 }}>
        {/* Displaying property image */}
        {/* <CardMedia
          component="img"
          // height="200"
          image={singleflat?.data?.imgUrl} // Assuming `image` has `
        /> */}

        <CardContent >
          <Typography variant="h3" component="div" fontFamily={"inherit"}>
            More Details
          </Typography>
          <br />
          <Typography
            variant="h5"
            color="textSecondary"
            paragraph
            fontFamily={"monospace"}
          >
            Price Breakup : {singleflat?.data?.price}
          </Typography>

          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Prime Location: {singleflat?.data?.location}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Furnishing : {singleflat?.data?.interiorType}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Status : {singleflat?.data?.status}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            No of Floors : {singleflat?.data?.society?.floors}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Construction Status: {singleflat?.data?.society?.constructionStatus}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Property Old: {singleProperty?.data?.yearsOld} years
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Parking Area: {singleflat?.data?.society?.parkingArea}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"monospace"}
          >
            Garden Area: {singleflat?.data?.society?.gardenArea} sqrft
          </Typography>
          <CardActions>
          <Button style={{ padding: '10px 10px', marginLeft: '.7rem', borderRadius: "3px", fontSize: '16px', cursor: 'pointer', color: 'white', backgroundColor: 'blue', border: 'none' }} onClick={handleShow}>
            Contact Owner
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Owner Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>OWNER NAME : {singleflat.data?.user?.fullname || "No Name Available"}</Modal.Body>
            <Modal.Body>Contact No: {singleflat?.data?.user?.mobileNo || "No Contact Available"}</Modal.Body>
            <Modal.Body>Area : {singleflat?.data?.location} , {singleflat?.data?.interiorType}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Contact 
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

            {/* Add more actions if needed */}
          </CardActions>
        </CardContent>
      </Card>
      <Card sx={{ border: "2px black solid", borderRadius: "10px", marginTop: 2 }}>
        <CardContent>
          <Typography variant="h3" component="div" fontFamily={"inherit"}>
            About Project
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <BuildingIcon sx={{ marginRight: 1 }} />
            <Link
              href={`/society/${singleflat?.data?.society?.id}`}
              variant="h5"
              color="primary"
              fontFamily={"monospace"}
              underline="hover"
            >
              {singleflat?.data?.society?.name || "Society Name"}
            </Link>
            <Typography
              variant="h5"
              color="textSecondary"
              fontFamily={"monospace"}
              sx={{ marginLeft: 2 , borderLeft:"2px black solid", paddingLeft:"20px"}}
            >
            {singleProperty?.data?.yearsOld || "Unknown"} years old
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyDetail;
