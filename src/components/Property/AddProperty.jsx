import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
// import { pink } from "@mui/material/colors";
import React from "react";

export default function AddProperty() {
//  Radio Button logic start 
//   const [selectedValue, setSelectedValue] = React.useState('a');

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//   };
//   const controlProps = (item) => ({
//     checked: selectedValue === item,
//     onChange: handleChange,
//     value: item,
//     name: 'color-radio-button-demo',
//     inputProps: { 'aria-label': item },
//   });
//  Radio Button logic end 

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Add Property
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={10.5} sm={4.5}>
          <TextField
            required
            id="Price"
            name="Price"
            label="Price"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={10.5} sm={4.5}>
          <TextField
            required
            id="sqrft"
            name="sqrft"
            label="Carpet Area"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={10.5} sm={4.5}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={10.5} sm={4.5}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={10.5} sm={4.5}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        {/* <Grid item xs={10.5} sm={4.5}>
          <Radio {...controlProps("a")} />2bhk
          <Radio {...controlProps("b")} color="secondary" />3bhk
          <Radio {...controlProps("c")} color="success" />4bhk
        </Grid> */}
        <Grid item xs={10.5} sm={4.5}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Grid>
    </React.Fragment>
  );
}
