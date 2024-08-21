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
    backgroundColor: "#F5F5F5", // Background color consistent with theme
  };

  useEffect(() => {
    document.body.style.backgroundColor = bodyStyle.backgroundColor;
  }, [bodyStyle.backgroundColor]);

  const id = useParams().id;
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
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
        width: "100%",
        maxWidth: "1552px",
      }}
    >
      <Card
        sx={{
          border: "2px solid #e0e0e0",
          borderRadius: "15px",
          marginTop: 2,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: "#FFFFFF", // White card background
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={singleflat?.data?.imgUrl || "https://via.placeholder.com/400"}
              alt={singleflat?.data?.society?.name || "Property Image"}
              sx={{
                objectFit: "cover",
                height: "100%",
                maxHeight: "400px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                align="left"
                fontFamily={"Montserrat, Arial, sans-serif"}
                sx={{ color: "#00274D" }} // Navy Blue text
              >
                {singleflat?.data?.society?.name || "Property Name"}
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                gutterBottom
                align="left"
                fontFamily={"Montserrat, Arial, sans-serif"}
              >
                ${singleflat?.data?.price || "Price"} - All inclusive
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="left"
                fontFamily={"Montserrat, Arial, sans-serif"}
                sx={{ marginTop: 2 }}
              >
                Prime Location: {singleflat?.data?.location}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="left"
                fontFamily={"Montserrat, Arial, sans-serif"}
              >
                Furnishing: {singleflat?.data?.interiorType}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                align="left"
                fontFamily={"Montserrat, Arial, sans-serif"}
              >
                Status: {singleflat?.data?.status}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Card
        sx={{
          border: "2px solid #e0e0e0",
          borderRadius: "15px",
          marginTop: 2,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: "#FFFFFF", // White card background
        }}
      >
        <CardContent>
          <Typography variant="h3" component="div" fontFamily={"Montserrat, Arial, sans-serif"} sx={{ color: "#00274D" }}>
            More Details
          </Typography>
          <Divider sx={{ marginY: 2, backgroundColor: "#D4AF37" }} /> {/* Gold divider */}
          <Typography
            variant="h5"
            color="textSecondary"
            paragraph
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Price Breakup: {singleflat?.data?.price}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Prime Location: {singleflat?.data?.location}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Furnishing: {singleflat?.data?.interiorType}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Status: {singleflat?.data?.status}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            No of Floors: {singleflat?.data?.society?.floors}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Construction Status: {singleflat?.data?.society?.constructionStatus}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Property Age: {singleProperty?.data?.yearsOld} years
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Parking Area: {singleflat?.data?.society?.parkingArea}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            marginTop={2}
            fontFamily={"Montserrat, Arial, sans-serif"}
          >
            Garden Area: {singleflat?.data?.society?.gardenArea} sqft
          </Typography>
          <CardActions>
            <Button
              style={{
                padding: '10px 10px',
                marginLeft: '.7rem',
                borderRadius: "3px",
                fontSize: '16px',
                cursor: 'pointer',
                color: 'white',
                backgroundColor: '#00274D', // Navy Blue button
                border: 'none',
              }}
              onClick={handleShow}
            >
              Contact Owner
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton  style={{
                        backgroundColor: '#00274D', // Navy Blue header
                        borderBottom: '2px solid #D4AF37', // Gold border at the bottom
                        color: '#FFFFFF', // White text
                    }}>
                <Modal.Title>Owner Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>OWNER NAME: {singleflat.data?.user?.fullname || "No Name Available"}</Modal.Body>
              <Modal.Body>Contact No: {singleflat?.data?.user?.mobileNo || "No Contact Available"}</Modal.Body>
              <Modal.Body>Area: {singleflat?.data?.location} , {singleflat?.data?.interiorType}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}  style={{
                            backgroundColor: '#D4AF37', // Gold background
                            borderColor: '#D4AF37', // Gold border
                            color: '#00274D', // Navy Blue text
                            fontFamily: 'Montserrat, Arial, sans-serif',
                        }}>
                  Contact
                </Button>
                <Button variant="primary" onClick={handleClose}  style={{
                            backgroundColor: '#00274D', // Navy Blue background
                            borderColor: '#00274D', // Navy Blue border
                            color: '#FFFFFF', // White text
                            fontFamily: 'Montserrat, Arial, sans-serif',
                        }}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </CardActions>
        </CardContent>
      </Card>

      <Card
        sx={{
          border: "2px solid #e0e0e0",
          borderRadius: "15px",
          marginTop: 2,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: "#FFFFFF", // White card background
        }}
      >
        <CardContent>
          <Typography variant="h3" component="div" fontFamily={"Montserrat, Arial, sans-serif"} sx={{ color: "#00274D" }}>
            About Project
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <BuildingIcon sx={{ marginRight: 1, color: "#D4AF37" }} /> {/* Gold icon */}
            <Link
              href={`/society/${singleflat?.data?.society?.id}`}
              variant="h5"
              color="primary"
              fontFamily={"Montserrat, Arial, sans-serif"}
              underline="hover"
            >
              {singleflat?.data?.society?.name || "Society Name"}
            </Link>
            <Typography
              variant="h5"
              color="textSecondary"
              fontFamily={"Montserrat, Arial, sans-serif"}
              sx={{ marginLeft: 2, borderLeft: "2px solid #00274D", paddingLeft: "20px" }}
            >
              Property Age:
              <div style={{ fontWeight: 600 }}>{singleProperty?.data?.yearsOld || "Unknown"} years old</div>
            </Typography>
            <Typography
              variant="h5"
              color="textSecondary"
              fontFamily={"Montserrat, Arial, sans-serif"}
              sx={{ marginLeft: 2, borderLeft: "2px solid #00274D", paddingLeft: "20px" }}
            >
              Units:
              <div style={{ fontWeight: 600 }}>{singleProperty?.data?.units || "Unknown"} Units</div>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyDetail;
