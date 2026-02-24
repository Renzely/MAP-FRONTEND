import * as React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Fade,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Visibility,
  VisibilityOff,
  Email,
  VpnKey,
  LockReset,
  ArrowBack,
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

const steps = ["Enter Email", "Verify OTP", "Reset Password"];

export default function ForgotPassword() {
  const [step, setStep] = React.useState("email");
  const [activeStep, setActiveStep] = React.useState(0);
  const [otpCode, setOtpCode] = React.useState("");
  const [verifyOtpCode, setVerifyOtpCode] = React.useState("");
  const [resetEmail, setResetEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    const emailAddress = event.currentTarget.email.value;

    if (!emailAddress) {
      Swal.fire({
        title: "Unable to Proceed",
        text: "Please input your email",
        icon: "warning",
        confirmButtonColor: "#2e6385ff",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com/send-otp-forgotpassword",
        { emailAddress: emailAddress },
      );
      const res = response.data;
      if (res.status === 200) {
        setVerifyOtpCode(res.code);
        setResetEmail(res.emailAddress);
        setStep("otp");
        setActiveStep(1);
        Swal.fire({
          title: "OTP Sent!",
          text: "Please check your email for the verification code",
          icon: "success",
          confirmButtonColor: "#2e6385ff",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res.data,
          icon: "error",
          confirmButtonColor: "#d32f2f",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonColor: "#d32f2f",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = (event) => {
    event.preventDefault();
    if (otpCode === verifyOtpCode) {
      setStep("reset");
      setActiveStep(2);
    } else {
      Swal.fire({
        title: "Invalid OTP",
        text: "The code you entered does not match",
        icon: "error",
        confirmButtonColor: "#d32f2f",
      });
    }
  };

  const handleSubmitResetPassword = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setLoading(true);

    const body = {
      emailAddress: resetEmail,
      password: password,
    };

    try {
      const response = await axios.put(
        "https://api-map.bmphrc.com/forgot-password-reset",
        body,
      );
      const res = response.data;
      if (res.status === 200) {
        Swal.fire({
          title: "Password Reset Successful!",
          text: "You can now login with your new password",
          icon: "success",
          confirmButtonColor: "#2e6385ff",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: res.data,
          icon: "error",
          confirmButtonColor: "#d32f2f",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
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
              minHeight: { xs: "auto", md: "600px" },
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left side - Branding */}
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
                <LockReset
                  sx={{
                    fontSize: 80,
                    color: "white",
                    mb: 3,
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    mb: 2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Password Recovery
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 400,
                    mb: 4,
                  }}
                >
                  Reset your password in 3 easy steps
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

            {/* Right side - Form */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: { xs: 3, sm: 4, md: 6 },
                backgroundColor: "white",
              }}
            >
              {/* Back to Login Button */}
              <Box sx={{ mb: 2 }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => (window.location.href = "/")}
                  sx={{
                    color: "#666",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>

              {/* Stepper */}
              <Box sx={{ mb: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Form Container */}
              <Container
                maxWidth="xs"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Step 1: Email */}
                {step === "email" && (
                  <Fade in timeout={500}>
                    <Box component="form" onSubmit={handleSubmitEmail}>
                      <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Email
                          sx={{
                            fontSize: 60,
                            color: "#2e6385ff",
                            mb: 2,
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: "#2e6385ff",
                            mb: 1,
                          }}
                        >
                          Forgot Password?
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                          }}
                        >
                          Enter your email address and we'll send you a
                          verification code
                        </Typography>
                      </Box>

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        startIcon={
                          loading && (
                            <CircularProgress size={20} color="inherit" />
                          )
                        }
                        sx={{
                          mt: 3,
                          py: 1.5,
                          backgroundColor: "#2e6385ff",
                          borderRadius: "12px",
                          fontWeight: 600,
                          fontSize: "16px",
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                          "&:hover": {
                            backgroundColor: "#0c2e3fff",
                            transform: "translateY(-2px)",
                          },
                          "&:disabled": {
                            backgroundColor: "#ccc",
                          },
                        }}
                      >
                        {loading ? "Sending..." : "Send Verification Code"}
                      </Button>
                    </Box>
                  </Fade>
                )}

                {/* Step 2: OTP */}
                {step === "otp" && (
                  <Fade in timeout={500}>
                    <Box component="form" onSubmit={handleSubmitOtp}>
                      <Box sx={{ textAlign: "center", mb: 4 }}>
                        <VpnKey
                          sx={{
                            fontSize: 60,
                            color: "#2e6385ff",
                            mb: 2,
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: "#2e6385ff",
                            mb: 1,
                          }}
                        >
                          Enter Verification Code
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                          }}
                        >
                          We've sent a code to {resetEmail}
                        </Typography>
                      </Box>

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter OTP Code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        inputProps={{
                          maxLength: 4,
                          style: {
                            textAlign: "center",
                            fontSize: "24px",
                            letterSpacing: "8px",
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          py: 1.5,
                          backgroundColor: "#2e6385ff",
                          borderRadius: "12px",
                          fontWeight: 600,
                          fontSize: "16px",
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                          "&:hover": {
                            backgroundColor: "#0c2e3fff",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Verify Code
                      </Button>
                    </Box>
                  </Fade>
                )}

                {/* Step 3: Reset Password */}
                {step === "reset" && (
                  <Fade in timeout={500}>
                    <Box component="form" onSubmit={handleSubmitResetPassword}>
                      <Box sx={{ textAlign: "center", mb: 4 }}>
                        <LockReset
                          sx={{
                            fontSize: 60,
                            color: "#2e6385ff",
                            mb: 2,
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: "#2e6385ff",
                            mb: 1,
                          }}
                        >
                          Create New Password
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                          }}
                        >
                          Your new password must be different from previous
                          passwords
                        </Typography>
                      </Box>

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="New Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError("");
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm New Password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setConfirmPasswordError("");
                        }}
                        error={!!confirmPasswordError}
                        helperText={confirmPasswordError}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        startIcon={
                          loading && (
                            <CircularProgress size={20} color="inherit" />
                          )
                        }
                        sx={{
                          mt: 3,
                          py: 1.5,
                          backgroundColor: "#2e6385ff",
                          borderRadius: "12px",
                          fontWeight: 600,
                          fontSize: "16px",
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(46, 99, 133, 0.3)",
                          "&:hover": {
                            backgroundColor: "#0c2e3fff",
                            transform: "translateY(-2px)",
                          },
                          "&:disabled": {
                            backgroundColor: "#ccc",
                          },
                        }}
                      >
                        {loading ? "Resetting..." : "Reset Password"}
                      </Button>
                    </Box>
                  </Fade>
                )}
              </Container>
            </Box>
          </Paper>
        </Fade>
      </Grid>
    </ThemeProvider>
  );
}
