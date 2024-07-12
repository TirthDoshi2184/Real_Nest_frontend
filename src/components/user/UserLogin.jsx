import { Box, Container, FormControl, FormHelperText, Input, InputLabel, ThemeProvider, Typography, createTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { UserDashboard } from "./UserDashboard";

export const UserLogin = () => {
    const constant = {
        backgroundColor: "rgb(0, 82, 204)",
    };
    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: constant.backgroundColor, // Change this to your desired color
            },
        },
    });
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography align="right" variant="h3"> Welcome to Real Est8 </Typography>

                    <Typography>
                        <FormControl>
                            <InputLabel htmlFor="" margin="dense" size="medium">Email Address</InputLabel>
                            <Input id="" aria-describedby="" />
                        </FormControl>
                        <br></br><br></br>
                        <FormControl>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input id="my-input" aria-describedby="my-helper-text" />
                        </FormControl>
                        <FormControl>
                            <Link>Go to Signup</Link>
                        </FormControl>
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
