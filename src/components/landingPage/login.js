import * as React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  Paper,
  Fade,
  CircularProgress,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import logoHD from "./HireDesk.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e6385ff",
    },
    background: {
      default: "#f5f7fa",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
  },
});

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 🔹 Frontend validation (works fine)
    if (!email && !password) {
      Swal.fire({
        title: "Missing Credentials",
        text: "Please enter your email address and password.",
        icon: "warning",
        confirmButtonColor: "#2e6385ff",
      });
      return;
    }

    if (!email) {
      Swal.fire({
        title: "Email Required",
        text: "Please enter your email address.",
        icon: "warning",
        confirmButtonColor: "#2e6385ff",
      });
      return;
    }

    if (!password) {
      Swal.fire({
        title: "Password Required",
        text: "Please enter your password.",
        icon: "warning",
        confirmButtonColor: "#2e6385ff",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com//login-admin",
        {
          emailAddress: email,
          password: password,
        },
      );

      // ✅ SUCCESS (only runs on 200)
      Swal.fire({
        title: "Login Success!",
        text: "Welcome back!",
        icon: "success",
        confirmButtonColor: "#2e6385ff",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        const fullName = `${response.data.data.firstName} ${response.data.data.lastName}`;
        localStorage.setItem("isLoggedIn", "admin");
        localStorage.setItem("adminFullName", fullName);
        localStorage.setItem("roleAccount", response.data.data.roleAccount);
        localStorage.setItem("outlet", response.data.data.outlet);
        localStorage.setItem("adminEmail", response.data.data.emailAddress);
        window.location.href = "/view-dashboard";
      });
    } catch (error) {
      // ✅ HANDLE BACKEND ERRORS HERE
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong.";

      let title = "Login Failed";

      if (status === 401) {
        title = "Incorrect Password";
      } else if (status === 404) {
        title = "Email Not Found";
      } else if (status === 400) {
        title = "Missing Information";
      }

      Swal.fire({
        title,
        text: message,
        icon: "error",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #0c2e3fff 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
          },
        }}
      >
        <CssBaseline />

        {/* Floating Box Container */}
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              width: { xs: "95%", sm: "85%", md: "900px" },
              height: { xs: "auto", md: "600px" },
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left side - Image/Branding */}
            <Box
              sx={{
                flex: 1,
                background:
                  "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${logoHD})`,
                  backgroundSize: "80%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  opacity: 0.15,
                },
              }}
            >
              <Box
                sx={{ position: "relative", zIndex: 1, textAlign: "center" }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 1,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Welcome to
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontWeight: 700,
                    mb: 4,
                    letterSpacing: "0.3px",
                  }}
                >
                  NEXUS DESK
                </Typography>

                <Box
                  sx={{
                    width: "80px",
                    height: "4px",
                    background: "white",
                    margin: "0 auto",
                    borderRadius: "2px",
                  }}
                />
              </Box>
            </Box>

            {/* Right side - Login Form */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: { xs: 3, sm: 4, md: 6 },
                backgroundColor: "white",
              }}
            >
              <Container maxWidth="xs">
                <Box component="form" noValidate onSubmit={handleSubmit}>
                  {/* Mobile Logo */}
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    <img
                      src={logoHD}
                      alt="Logo"
                      style={{ width: "120px", height: "auto" }}
                    />
                  </Box>

                  {/* Login Header */}
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                      component="h1"
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#2e6385ff",
                        mb: 1,
                      }}
                    >
                      Login
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                      }}
                    >
                      Enter your credentials to access your account
                    </Typography>
                  </Box>

                  {/* Email Field */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: "#2e6385ff",
                        },
                      },
                    }}
                  />

                  {/* Password Field */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "&:hover fieldset": {
                          borderColor: "#2e6385ff",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Login Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <LoginIcon />
                      )
                    }
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      backgroundColor: "#2e6385ff",
                      borderRadius: "12px",
                      fontWeight: 600,
                      fontSize: "16px",
                      textTransform: "none",
                      boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                      "&:hover": {
                        backgroundColor: "#0c2e3fff",
                        boxShadow: "0 6px 16px rgba(46, 99, 133, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      "&:disabled": {
                        backgroundColor: "#ccc",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  {/* Forgot Password Link */}
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Link
                      href="/forgotpassword"
                      variant="body2"
                      sx={{
                        color: "#2e6385ff",
                        textDecoration: "none",
                        fontWeight: 600,
                        "&:hover": {
                          textDecoration: "underline",
                          color: "#0c2e3fff",
                        },
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Paper>
        </Fade>
      </Grid>
    </ThemeProvider>
  );
}
