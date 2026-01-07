import * as React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";
import logoHD from "./HireDesk.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#384959", // Primary theme color
    },
    background: {
      default: "#384959", // Base background color
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      emailAddress: data.get("email"),
      password: data.get("password"),
    };

    if (!body.emailAddress || !body.password) {
      Swal.fire({
        title: "Unable to Proceed",
        text: "Please input your credentials",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com/login-admin",
        body
      );
      const data = await response.data;

      if (data.status === 200) {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
        }).then(() => {
          const fullName = `${data.data.firstName} ${data.data.lastName}`;
          // Store user details in localStorage
          localStorage.setItem("isLoggedIn", "admin");
          localStorage.setItem("adminFullName", fullName);

          localStorage.setItem("roleAccount", data.data.roleAccount);
          localStorage.setItem("outlet", data.data.outlet);
          localStorage.setItem("adminEmail", data.data.emailAddress);

          // Redirect to accounts view
          window.location.href = "/view-dashboard";
        });
      } else {
        Swal.fire({
          title: "Login Failed!",
          text: data.data,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Login Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          height: "100vh",
          background:
            "linear-gradient(135deg, #4d7aa3ff, #BDDDFC, #1f507eff, #0f2a44)", // Three-color gradient background
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <CssBaseline />

        {/* Floating Box Container */}
        <Box
          sx={{
            display: "flex",
            width: { xs: "90%", sm: "80%", md: "70%" },
            height: { xs: "90%", sm: "75%", md: "65%" },
            borderRadius: 5,
            overflow: "hidden",
            boxShadow: 10,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Light transparency
          }}
        >
          {/* Left side - Image */}
          <Grid
            item
            xs={false} // Hides this on extra-small screens (mobile)
            sm={6} // Shows this on small screens and above
            sx={{
              backgroundImage: `url(${logoHD})`,
              backgroundSize: "99% 99%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "100%",
              display: { xs: "none", sm: "block" }, // Hide on mobile, show on larger screens
            }}
          />

          {/* Right side - Login Form */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
            }}
          >
            <Container maxWidth="xs">
              <Box
                component="form"
                noValidate
                sx={{ mt: 2 }}
                onSubmit={handleSubmit}
              >
                {/* Center the logo
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <img src={logoHD} alt="Logo" style={{ width: "80px" }} />
                </Box> */}

                {/* Center the LOGIN text */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Typography
                    component="h1"
                    variant="h5"
                    fontWeight="bold"
                    color="#0f2a44"
                  >
                    LOGIN
                  </Typography>
                </Box>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#0f2a44",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#2b567eff",
                    },
                  }}
                >
                  LOGIN
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="/forgotpassword"
                      variant="body2"
                      color="#384959"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
