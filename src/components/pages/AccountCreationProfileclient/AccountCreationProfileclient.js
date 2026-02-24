import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Modal,
  IconButton,
  Snackbar,
  Alert,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormHelperText,
  Paper,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function ClientProfileCreationEnhanced() {
  const adminFullName = localStorage.getItem("adminFullName");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const fileInputRef = useRef(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Listen to sidebar state from localStorage
  useEffect(() => {
    const checkSidebarState = () => {
      const isOpen = localStorage.getItem("sidebarOpen") === "true";
      setSidebarOpen(isOpen);
    };

    checkSidebarState();
    window.addEventListener("storage", checkSidebarState);
    const interval = setInterval(checkSidebarState, 100);

    return () => {
      window.removeEventListener("storage", checkSidebarState);
      clearInterval(interval);
    };
  }, []);

  const [formData, setFormData] = useState({
    company: "",
    businessType: "",
    clientProfile: "",
    clientAddress: "",
    primaryContact: "",
    firstName: "",
    middleName: "",
    lastName: "",
    jobTitle: "",
    clientDepartment: "",
    contact: "",
    email: "",
    tin: "",
    billingAddress: "",
    paymentTerm: "",
    contractSD: null,
    contractED: null,
    clientWebsite: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      let updated = { ...prev, [field]: value };

      if (field === "company") {
        updated.clientDepartment = "";
      }

      return updated;
    });

    setFormErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      if (value && newErrors[field]) {
        delete newErrors[field];
      }

      return newErrors;
    });
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
      setUploading(true);

      const response = await axios.post(
        "https://api-map.bmphrc.com//save-requirements-images-client",
        { fileName: file.name, fileType: file.type },
      );

      const { url } = response.data;

      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
      });

      const s3FileUrl = `https://mmp-portal-docs-client.s3.ap-southeast-1.amazonaws.com/${file.name}`;

      setUploadedImageUrls((prev) => [...prev, s3FileUrl]);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: "Failed to upload file. Please try again",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "company",
      "businessType",
      "clientProfile",
      "clientAddress",
      "primaryContact",
      "firstName",
      "middleName",
      "lastName",
      "jobTitle",
      "clientDepartment",
      "contact",
      "email",
      "tin",
      "billingAddress",
      "paymentTerm",
      "contractSD",
      "contractED",
    ];

    const errors = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        errors[field] = "This field is required";
      }
    });

    if (!errors.contact && formData.contact.length !== 11) {
      errors.contact = "Contact number must be exactly 11 digits";
    }

    if (!formData.tin || formData.tin.trim() === "") {
      errors.tin = "This field is required";
    } else if (formData.tin.length !== 12) {
      errors.tin = "TIN number must be exactly 12 digits";
    }

    if (!formData.primaryContact) {
      errors.primaryContact = "Please select contact type";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields correctly.",
        severity: "warning",
      });
      return;
    }

    const formattedData = {
      ...formData,
      createdBy: adminFullName,
      requirementsImages: uploadedImageUrls,
      contractSD: formData.contractSD ? formData.contractSD.toDate() : null,
      contractED: formData.contractED ? formData.contractED.toDate() : null,
    };

    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com//create-client-profile",
        formattedData,
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Client profile created successfully!",
          severity: "success",
        });

        setFormData({
          company: "",
          businessType: "",
          clientProfile: "",
          clientAddress: "",
          primaryContact: "",
          firstName: "",
          middleName: "",
          lastName: "",
          jobTitle: "",
          clientDepartment: "",
          contact: "",
          email: "",
          tin: "",
          billingAddress: "",
          paymentTerm: "",
          contractSD: null,
          contractED: null,
          clientWebsite: "",
        });
        setFormErrors({});
        setUploadedImageUrls([]);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error creating client profile:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          setFormErrors({
            [data.message.split(":")[1]?.trim() || ""]: "Duplicate",
          });
          setSnackbar({
            open: true,
            message: data.message,
            severity: "error",
          });
        } else if (status === 400) {
          setSnackbar({
            open: true,
            message: data.message,
            severity: "warning",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Failed to create client profile. Try again.",
            severity: "error",
          });
        }
      }
    }
  };

  const clientsByCompany = {
    "BMPOWER HUMAN RESOURCES CORPORATION": [
      "BMPOWER HUMAN RESOURCES CORPORATION",
      "ECOSSENTIAL FOODS CORP",
      "ECOSSENTIAL FOODS CORP-COORDINATORS",
      "MCKENZIE DISTRIBUTION CO.",
      "ECOSSENTIAL FOODS CORP-HEAD OFFICE",
      "MAGIS DISTRIBUTION INC.",
      "ASIAN STREAK BROKERAGE CO",
      "PLDT TELESCOOP",
      "MANDOM",
      "ENGKANTO",
      "DEL MONTE",
      "SPX EXPRESS",
      "UNION GALVASTEEL CO",
    ],
    "MARABOU EVERGREEN RESOURCES INC": [
      "MARABOU EVERGREEN RESOURCES INC",
      "CARMENS BEST",
      "METRO PACIFIC DAIRY FARM",
      "METRO PACIFIC FRESH FARM",
      "UNIVERSAL HARVESTER DAIRY FARM INC",
      "LONG TABLE GROUP INC.- MASAJIRO",
      "J-GYU INC",
      "COSMETIQUE ASIA",
    ],
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <Box
        sx={{
          marginLeft: { xs: 0, md: sidebarOpen ? "280px" : "70px" },
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          backgroundColor: "#f5f7fa",
          paddingTop: "64px",
        }}
      >
        <Box
          sx={{
            p: 3,
            maxWidth: "1800px",
            margin: "0 auto",
          }}
        >
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              background:
                "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BusinessIcon sx={{ fontSize: 40, color: "white" }} />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "white", mb: 0.5 }}
                >
                  Client Profile Registration
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  Create and manage client information
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Form Section */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
              {/* Company & Business Information */}
              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "#1e3a5f",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        backgroundColor: "#2c5282",
                        borderRadius: 1,
                      }}
                    />
                    Company & Business Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Company *</InputLabel>
                        <Select
                          value={formData.company}
                          label="Company *"
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          error={!!formErrors.company}
                        >
                          <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                            MARABOU EVERGREEN RESOURCES INC
                          </MenuItem>
                          <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                            BMPOWER HUMAN RESOURCES CORPORATION
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Client Profile *</InputLabel>
                        <Select
                          value={formData.clientProfile}
                          label="Client Profile *"
                          onChange={(e) =>
                            handleChange("clientProfile", e.target.value)
                          }
                          disabled={!formData.company}
                          error={!!formErrors.clientProfile}
                        >
                          {formData.company &&
                            clientsByCompany[formData.company]?.map(
                              (client) => (
                                <MenuItem key={client} value={client}>
                                  {client}
                                </MenuItem>
                              ),
                            )}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Business Type *</InputLabel>
                        <Select
                          value={formData.businessType}
                          label="Business Type *"
                          onChange={(e) =>
                            handleChange("businessType", e.target.value)
                          }
                          error={!!formErrors.businessType}
                        >
                          <MenuItem value="Service Business">
                            Service Business
                          </MenuItem>
                          <MenuItem value="Merchandising Business">
                            Merchandising Business
                          </MenuItem>
                          <MenuItem value="Manufacturing Business">
                            Manufacturing Business
                          </MenuItem>
                          <MenuItem value="Other Business">
                            Other Business
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="TIN No. *"
                        fullWidth
                        size="small"
                        value={formData.tin}
                        inputProps={{
                          maxLength: 12,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\s+/g, "")
                            .replace(/[^0-9]/g, "");
                          handleChange("tin", value);
                        }}
                        error={!!formErrors.tin}
                        helperText={formErrors.tin || "Must be 12 digits"}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Client Address *"
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                        value={formData.clientAddress}
                        onChange={(e) =>
                          handleChange("clientAddress", e.target.value)
                        }
                        error={!!formErrors.clientAddress}
                        helperText={formErrors.clientAddress}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Billing Address *"
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                        value={formData.billingAddress}
                        onChange={(e) =>
                          handleChange("billingAddress", e.target.value)
                        }
                        error={!!formErrors.billingAddress}
                        helperText={formErrors.billingAddress}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Website (Optional)"
                        fullWidth
                        size="small"
                        value={formData.clientWebsite}
                        onChange={(e) =>
                          handleChange("clientWebsite", e.target.value)
                        }
                        error={!!formErrors.clientWebsite}
                        helperText={formErrors.clientWebsite}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Contact Person Information */}
              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "#1e3a5f",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        backgroundColor: "#2c5282",
                        borderRadius: 1,
                      }}
                    />
                    Contact Person Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl
                        component="fieldset"
                        error={!!formErrors.primaryContact}
                      >
                        <FormLabel component="legend">Contact Type *</FormLabel>
                        <RadioGroup
                          row
                          value={formData.primaryContact}
                          onChange={(e) =>
                            handleChange("primaryContact", e.target.value)
                          }
                        >
                          <FormControlLabel
                            value="Primary"
                            control={<Radio />}
                            label="Primary Contact"
                          />
                          <FormControlLabel
                            value="Non-Primary"
                            control={<Radio />}
                            label="Non-Primary Contact"
                          />
                        </RadioGroup>
                        {formErrors.primaryContact && (
                          <FormHelperText>
                            {formErrors.primaryContact}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="First Name *"
                        fullWidth
                        size="small"
                        value={formData.firstName}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^A-Za-z\s-]/g,
                            "",
                          );
                          handleChange("firstName", value);
                        }}
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Middle Name *"
                        fullWidth
                        size="small"
                        value={formData.middleName}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^A-Za-z\s-]/g,
                            "",
                          );
                          handleChange("middleName", value);
                        }}
                        error={!!formErrors.middleName}
                        helperText={formErrors.middleName}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Last Name *"
                        fullWidth
                        size="small"
                        value={formData.lastName}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^A-Za-z\s-]/g,
                            "",
                          );
                          handleChange("lastName", value);
                        }}
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Job Title *"
                        fullWidth
                        size="small"
                        value={formData.jobTitle}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^A-Za-z\s-]/g,
                            "",
                          );
                          handleChange("jobTitle", value);
                        }}
                        error={!!formErrors.jobTitle}
                        helperText={formErrors.jobTitle}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Client Department *</InputLabel>
                        <Select
                          value={formData.clientDepartment}
                          label="Client Department *"
                          onChange={(e) =>
                            handleChange("clientDepartment", e.target.value)
                          }
                          error={!!formErrors.clientDepartment}
                        >
                          <MenuItem value="Finance Department">
                            Finance Department
                          </MenuItem>
                          <MenuItem value="Marketing Department">
                            Marketing Department
                          </MenuItem>
                          <MenuItem value="Human Resource Department">
                            Human Resource Department
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Contact Number *"
                        fullWidth
                        size="small"
                        value={formData.contact}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length <= 11)
                            handleChange("contact", value);
                        }}
                        inputProps={{
                          maxLength: 11,
                          inputMode: "numeric",
                        }}
                        error={Boolean(formErrors.contact)}
                        helperText={
                          formErrors.contact
                            ? formErrors.contact
                            : "Must be exactly 11 digits"
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email Address *"
                        type="email"
                        fullWidth
                        size="small"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Contract Information */}
              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "#1e3a5f",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        backgroundColor: "#2c5282",
                        borderRadius: 1,
                      }}
                    />
                    Contract Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Payment Term *</InputLabel>
                        <Select
                          value={formData.paymentTerm}
                          label="Payment Term *"
                          onChange={(e) =>
                            handleChange("paymentTerm", e.target.value)
                          }
                          error={!!formErrors.paymentTerm}
                        >
                          <MenuItem value="Check">Check</MenuItem>
                          <MenuItem value="Online Payment">
                            Online Payment
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Contract Start Date *"
                          value={formData.contractSD}
                          onChange={(newValue) =>
                            handleChange("contractSD", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!formErrors.contractSD,
                              helperText: formErrors.contractSD,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Contract End Date *"
                          value={formData.contractED}
                          onChange={(newValue) =>
                            handleChange("contractED", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!formErrors.contractED,
                              helperText: formErrors.contractED,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Document Upload */}
              <Card
                elevation={0}
                sx={{
                  mb: 4,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "#1e3a5f",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        backgroundColor: "#2c5282",
                        borderRadius: 1,
                      }}
                    />
                    Document Upload (Optional)
                  </Typography>

                  <Box
                    sx={{
                      border: "2px dashed #cbd5e1",
                      borderRadius: 2,
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "white",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "#2c5282",
                        backgroundColor: "#f8fafc",
                      },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      id="file-upload"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setSelectedFiles(files);
                        files.forEach((file) => handleFileUpload(file));
                      }}
                    />
                    <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                      <CloudUploadIcon
                        sx={{ fontSize: 48, color: "#64748b", mb: 2 }}
                      />
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Click to upload or drag and drop
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Upload contract documents (images only)
                      </Typography>
                    </label>
                  </Box>

                  {uploading && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <Typography color="primary">Uploading...</Typography>
                    </Box>
                  )}

                  {uploadedImageUrls.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CheckCircleIcon sx={{ color: "#10b981", mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {uploadedImageUrls.length} file(s) uploaded
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setOpenModal(true)}
                          sx={{
                            borderColor: "#2c5282",
                            color: "#2c5282",
                            "&:hover": {
                              borderColor: "#1e3a5f",
                              backgroundColor: "#f8fafc",
                            },
                          }}
                        >
                          View All Photos
                        </Button>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to cancel? All unsaved data will be lost.",
                      )
                    ) {
                      window.location.reload();
                    }
                  }}
                  sx={{
                    px: 4,
                    borderColor: "#cbd5e1",
                    color: "#64748b",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    background:
                      "linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1a2f4d 0%, #234167 100%)",
                    },
                  }}
                >
                  Create Client Profile
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Modal for viewing photos */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 3,
                p: 4,
                maxWidth: "90%",
                maxHeight: "85vh",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  pb: 2,
                  borderBottom: "2px solid #e2e8f0",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Uploaded Documents
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                {uploadedImageUrls.map((url, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      elevation={2}
                      sx={{
                        position: "relative",
                        "&:hover": {
                          boxShadow: 6,
                        },
                      }}
                    >
                      <img
                        src={url}
                        alt={`Document ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          Document {index + 1}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          fullWidth
                          sx={{ mt: 1 }}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Remove this document from upload?",
                              )
                            ) {
                              setUploadedImageUrls((prev) =>
                                prev.filter((_, i) => i !== index),
                              );
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Box>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
