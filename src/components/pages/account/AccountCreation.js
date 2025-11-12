import React, { useState, useRef } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function AccountCreation() {
  const [formErrors, setFormErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const fileInputRef = useRef(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "warning" | "info"
  });

  const [formData, setFormData] = useState({
    company: "",
    status: "",
    remarks: "",
    employeeNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    modeOfDisbursement: "",
    accountNumber: "",
    contact: "",
    email: "",
    birthday: null,
    age: "",
    sss: "",
    philhealth: "",
    hdmf: "",
    tin: "",
    position: "",
    dateHired: null,
    homeAddress: "",
    silBalance: "",
    clientAssigned: "",
  });

  const handleChange = (field, value) => {
    // If birthday, calculate age
    if (field === "birthday") {
      const birthDate = dayjs(value);
      const age = dayjs().diff(birthDate, "year");
      setFormData((prev) => ({ ...prev, birthday: value, age }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    if (field === "company") {
      setFormData((prev) => ({
        ...prev,
        company: value,
        clientAssigned: "", // Reset client when company changes
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // ✅ Auto-remove the error message for this field if it has value
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value && newErrors[field]) {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "company",
      "status",
      "remarks",
      "employeeNo",
      "firstName",
      "middleName",
      "lastName",
      "modeOfDisbursement",
      "accountNumber",
      "contact",
      "birthday",
      "position",
      "dateHired",
      "homeAddress",
      "clientAssigned",
      "silBalance",
    ];

    const errors = {};
    requiredFields.forEach((field) => {
      // ✅ Skip accountNumber check if mode is TBA
      if (field === "accountNumber" && formData.modeOfDisbursement === "TBA") {
        return;
      }

      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "warning",
      });
      return;
    }

    // ✅ Step 1: Check duplicates first
    try {
      const duplicateCheck = await axios.post(
        "https://api-map.bmphrc.com/check-duplicate-ids",
        {
          sss: formData.sss,
          philhealth: formData.philhealth,
          hdmf: formData.hdmf,
          tin: formData.tin,
        }
      );

      if (duplicateCheck.status === 409) {
        const dupErrors = duplicateCheck.data.duplicates || {};
        setFormErrors(dupErrors);
        alert("Duplicate numbers found. Please check highlighted fields.");
        return;
      }
    } catch (error) {
      if (error.response?.status === 409) {
        const dupErrors = error.response.data.duplicates || {};
        setFormErrors(dupErrors);
        setSnackbar({
          open: true,
          message: "Duplicate numbers found. Please check highlighted fields.",
          severity: "error",
        });
        return;
      }
    }

    // ✅ Step 2: Prepare submission
    const formattedData = {
      ...formData,
      accountNumber:
        formData.modeOfDisbursement === "TBA" ? null : formData.accountNumber, // send null for TBA
      requirementsImages: uploadedImageUrls,
      birthday: formData.birthday
        ? dayjs(formData.birthday).toDate().toISOString()
        : null,
      dateHired: formData.dateHired
        ? dayjs(formData.dateHired).toDate().toISOString()
        : null,
    };

    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com/create-merch-account",
        formattedData
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Account successfully created!",
          severity: "success",
        });
        // ✅ Reset form
        setFormData({
          company: "",
          status: "",
          remarks: "",
          employeeNo: "",
          firstName: "",
          middleName: "",
          lastName: "",
          modeOfDisbursement: "",
          accountNumber: "",
          contact: "",
          email: "",
          birthday: null,
          age: "",
          sss: "",
          philhealth: "",
          hdmf: "",
          tin: "",
          position: "",
          dateHired: null,
          homeAddress: "",
          silBalance: "",
          clientAssigned: "",
        });
        setFormErrors({});
        setUploadedImageUrls([]);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setSnackbar({
        open: true,
        message: "Failed to create account. Please try again.",
        severity: "error",
      });
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    try {
      setUploading(true);

      const response = await axios.post(
        "https://api-map.bmphrc.com/save-requirements-images",
        { fileName: file.name, fileType: file.type }
      );

      const { url } = response.data;

      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
      });

      const s3FileUrl = `https://mmp-portal-docs.s3.ap-southeast-1.amazonaws.com/${file.name}`;

      setUploadedImageUrls((prev) => [...prev, s3FileUrl]); // 👈 append new file
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

  const clientsByCompany = {
    "BMPOWER HUMAN RESOURCES CORPORATION": [
      "BMPOWER HUMAN RESOURCES CORPORATION",
      "ECOSSENTIAL FOODS CORP",
      "MCKENZIE DISTRIBUTION CO.",
      "ECOSSENTIAL FOODS CORP-HEAD OFFICE",
      "MAGIS DISTRIBUTION INC.",
      "ASIAN STREAK BROKERAGE CO",
      "PLDT TELESCOOP",
      "SHELFMATE",
      "ENGKANTO",
      "ROYAL CANIN PHILS.",
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
    ],
  };

  return (
    <div className="accountCreation">
      <Topbar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: "#003554",
            minHeight: "auto",
            color: "#fff",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Create Employee Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              p: 4,
              color: "#000",
              maxWidth: 1700, // wider for landscape
              minHeight: "auto",
              mx: "auto",
            }}
          >
            <Grid container spacing={3}>
              {/* Column 1 */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Company</InputLabel>
                  <Select
                    value={formData.company}
                    label="Company"
                    onChange={(e) => handleChange("company", e.target.value)}
                    error={!!formErrors.company}
                    helperText={formErrors.company}
                  >
                    <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                      MARABOU EVERGREEN RESOURCES INC
                    </MenuItem>
                    <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                      BMPOWER HUMAN RESOURCES CORPORATION
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => handleChange("status", e.target.value)}
                    error={!!formErrors.status}
                    helperText={formErrors.status}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel>Remarks</InputLabel>
                  <Select
                    value={formData.remarks}
                    label="Remarks"
                    onChange={(e) => handleChange("remarks", e.target.value)}
                    error={!!formErrors.remarks}
                    helperText={formErrors.remarks}
                  >
                    <MenuItem value="Applicant">Applicant</MenuItem>
                    <MenuItem value="Employed">Employed</MenuItem>
                    <MenuItem value="Resign">Resign</MenuItem>
                    <MenuItem value="Terminate">Terminate</MenuItem>
                    <MenuItem value="End of Contract">End of Contract</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Employee No."
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.employeeNo}
                  onChange={(e) => handleChange("employeeNo", e.target.value)}
                  error={!!formErrors.employeeNo}
                  helperText={formErrors.employeeNo}
                />

                <TextField
                  label="First Name"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />

                <TextField
                  label="Middle Name"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.middleName}
                  onChange={(e) => handleChange("middleName", e.target.value)}
                  error={!!formErrors.middleName}
                  helperText={formErrors.middleName}
                />

                <TextField
                  label="Last Name"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel>Mode of Disbursement</InputLabel>
                  <Select
                    value={formData.modeOfDisbursement}
                    label="Mode of Disbursement"
                    onChange={(e) => {
                      const value = e.target.value;
                      handleChange("modeOfDisbursement", value);
                      handleChange("accountNumber", ""); // reset account number when mode changes
                    }}
                    error={!!formErrors.modeOfDisbursement}
                    helperText={formErrors.modeOfDisbursement}
                  >
                    <MenuItem value="TBA">TBA</MenuItem>
                    <MenuItem value="AUB (Hello Money)">
                      AUB (Hello Money)
                    </MenuItem>
                    <MenuItem value="BDO NETWORK">BDO NETWORK</MenuItem>
                    <MenuItem value="BDO UNIBANK">BDO UNIBANK</MenuItem>
                    <MenuItem value="BPI">BPI</MenuItem>
                    <MenuItem value="CEBUANA">CEBUANA</MenuItem>
                    <MenuItem value="CHINABANK">CHINABANK</MenuItem>
                    <MenuItem value="EASTWEST">EASTWEST</MenuItem>
                    <MenuItem value="GCASH">GCASH</MenuItem>
                    <MenuItem value="LANDBANK">LANDBANK</MenuItem>
                    <MenuItem value="METROBANK">METROBANK</MenuItem>
                    <MenuItem value="PNB">PNB</MenuItem>
                    <MenuItem value="RCBC">RCBC</MenuItem>
                    <MenuItem value="SECURITY BANK">SECURITY BANK</MenuItem>
                    <MenuItem value="UNIONBANK">UNIONBANK</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Column 2 */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  value={formData.contact}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,11}$/.test(value)) {
                      handleChange("contact", value);
                    }
                  }}
                  inputProps={{
                    maxLength: 11,
                    inputMode: "numeric",
                  }}
                  error={!!formErrors.contact}
                  helperText={formErrors.contact}
                />

                <TextField
                  label="Email Address (Optional)"
                  type="email"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Birthday"
                    value={formData.birthday}
                    onChange={(newValue) => handleChange("birthday", newValue)}
                    sx={{ width: "100%", mt: 3 }}
                    slotProps={{
                      textField: {
                        error: !!formErrors.birthday,
                        helperText: formErrors.birthday,
                      },
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  label="Age"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.age}
                  InputProps={{ readOnly: true }}
                />

                <TextField
                  label="Position"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  error={!!formErrors.position}
                  helperText={formErrors.position}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date Hired"
                    value={formData.dateHired}
                    onChange={(newValue) => handleChange("dateHired", newValue)}
                    sx={{ width: "100%", mt: 3 }}
                    slotProps={{
                      textField: {
                        error: !!formErrors.dateHired,
                        helperText: formErrors.dateHired,
                      },
                    }}
                  />
                </LocalizationProvider>

                <FormControl fullWidth sx={{ mt: 3 }}>
                  <InputLabel>Client Assigned</InputLabel>
                  <Select
                    value={formData.clientAssigned}
                    label="Client Assigned"
                    onChange={(e) =>
                      handleChange("clientAssigned", e.target.value)
                    }
                    disabled={!formData.company} // Disable if no company selected
                    error={!!formErrors.clientAssigned}
                    helperText={formErrors.clientAssigned}
                  >
                    {formData.company &&
                      clientsByCompany[formData.company]?.map((client) => (
                        <MenuItem key={client} value={client}>
                          {client}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Account Number"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, ""); // allow alphanumeric
                    const maxLengths = {
                      "AUB (Hello Money)": 12,
                      "BDO NETWORK": 12,
                      "BDO UNIBANK": 12,
                      BPI: 12,
                      CEBUANA: 11,
                      CHINABANK: 12,
                      EASTWEST: 12,
                      GCASH: 11,
                      LANDBANK: 10,
                      METROBANK: 13,
                      PNB: 12,
                      RCBC: 10,
                      "SECURITY BANK": 13,
                      UNIONBANK: 12,
                    };

                    const maxLength =
                      maxLengths[formData.modeOfDisbursement] || 20;

                    // ✅ Only apply limit if mode isn't TBA
                    if (
                      formData.modeOfDisbursement === "TBA" ||
                      value.length <= maxLength
                    ) {
                      handleChange("accountNumber", value);
                    }
                  }}
                  disabled={
                    !formData.modeOfDisbursement ||
                    formData.modeOfDisbursement === "TBA"
                  }
                  inputProps={{
                    inputMode: "text",
                    pattern: "[A-Za-z0-9]*",
                  }}
                  error={
                    formData.modeOfDisbursement !== "TBA" &&
                    !!formData.accountNumber &&
                    formData.accountNumber.length > 0 &&
                    formData.accountNumber.length <
                      {
                        "AUB (Hello Money)": 12,
                        "BDO NETWORK": 12,
                        "BDO UNIBANK": 12,
                        BPI: 12,
                        CEBUANA: 11,
                        CHINABANK: 12,
                        EASTWEST: 12,
                        GCASH: 11,
                        LANDBANK: 10,
                        METROBANK: 13,
                        PNB: 12,
                        RCBC: 10,
                        "SECURITY BANK": 13,
                        UNIONBANK: 12,
                      }[formData.modeOfDisbursement]
                  }
                  helperText={
                    formData.modeOfDisbursement === "TBA"
                      ? "No account number required for TBA."
                      : !formData.modeOfDisbursement
                      ? "Select Mode of Disbursement first"
                      : formData.accountNumber.length > 0 &&
                        formData.accountNumber.length <
                          {
                            "AUB (Hello Money)": 12,
                            "BDO NETWORK": 12,
                            "BDO UNIBANK": 12,
                            BPI: 12,
                            CEBUANA: 11,
                            CHINABANK: 12,
                            EASTWEST: 12,
                            GCASH: 11,
                            LANDBANK: 10,
                            METROBANK: 13,
                            PNB: 12,
                            RCBC: 10,
                            "SECURITY BANK": 13,
                            UNIONBANK: 12,
                          }[formData.modeOfDisbursement]
                      ? `Account Number must be ${
                          {
                            "AUB (Hello Money)": 12,
                            "BDO NETWORK": 12,
                            "BDO UNIBANK": 12,
                            BPI: 12,
                            CEBUANA: 11,
                            CHINABANK: 12,
                            EASTWEST: 12,
                            GCASH: 11,
                            LANDBANK: 10,
                            METROBANK: 13,
                            PNB: 12,
                            RCBC: 10,
                            "SECURITY BANK": 13,
                            UNIONBANK: 12,
                          }[formData.modeOfDisbursement]
                        } characters long`
                      : `Must be ${
                          {
                            "AUB (Hello Money)": 12,
                            "BDO NETWORK": 12,
                            "BDO UNIBANK": 12,
                            BPI: 12,
                            CEBUANA: 11,
                            CHINABANK: 12,
                            EASTWEST: 12,
                            GCASH: 11,
                            LANDBANK: 10,
                            METROBANK: 13,
                            PNB: 12,
                            RCBC: 10,
                            "SECURITY BANK": 13,
                            UNIONBANK: 12,
                          }[formData.modeOfDisbursement]
                        } characters`
                  }
                />
              </Grid>

              {/* Column 3 */}
              <Grid item xs={12} md={4}>
                <TextField
                  label="SSS No."
                  fullWidth
                  value={formData.sss}
                  inputProps={{
                    maxLength: 10,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\s+/g, "")
                      .replace(/[^0-9]/g, "");
                    handleChange("sss", value);
                  }}
                  error={
                    !!formData.sss &&
                    formData.sss.length > 0 &&
                    formData.sss.length < 10
                  }
                  helperText={
                    formData.sss &&
                    formData.sss.length > 0 &&
                    formData.sss.length < 10
                      ? "SSS number must be 10 digits"
                      : ""
                  }
                />

                <TextField
                  label="PHIC No."
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.philhealth}
                  inputProps={{
                    maxLength: 12,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\s+/g, "")
                      .replace(/[^0-9]/g, "");
                    handleChange("philhealth", value);
                  }}
                  error={
                    !!formData.philhealth &&
                    formData.philhealth.length > 0 &&
                    formData.philhealth.length < 12
                  }
                  helperText={
                    formData.philhealth &&
                    formData.philhealth.length > 0 &&
                    formData.philhealth.length < 12
                      ? "PhilHealth number must be 12 digits"
                      : ""
                  }
                />

                <TextField
                  label="HDMF No."
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.hdmf}
                  inputProps={{
                    maxLength: 12,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\s+/g, "")
                      .replace(/[^0-9]/g, "");
                    handleChange("hdmf", value);
                  }}
                  error={
                    !!formData.hdmf &&
                    formData.hdmf.length > 0 &&
                    formData.hdmf.length < 12
                  }
                  helperText={
                    formData.hdmf &&
                    formData.hdmf.length > 0 &&
                    formData.hdmf.length < 12
                      ? "HDMF number must be 12 digits"
                      : ""
                  }
                />

                <TextField
                  label="TIN No."
                  fullWidth
                  sx={{ mt: 3 }}
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
                  error={
                    !!formData.tin &&
                    formData.tin.length > 0 &&
                    formData.tin.length < 12
                  }
                  helperText={
                    formData.tin &&
                    formData.tin.length > 0 &&
                    formData.tin.length < 12
                      ? "TIN number must be 12 digits"
                      : ""
                  }
                />

                <TextField
                  label="Home Address"
                  fullWidth
                  multiline
                  rows={4.4}
                  sx={{ mt: 3 }}
                  value={formData.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  error={!!formErrors.homeAddress}
                  helperText={formErrors.homeAddress}
                />

                <TextField
                  label="SIL Balance"
                  fullWidth
                  sx={{ mt: 3 }}
                  value={formData.silBalance}
                  onChange={(e) => handleChange("silBalance", e.target.value)}
                  error={!!formErrors.silBalance}
                  helperText={formErrors.silBalance}
                />
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1">
                    Upload Requirements (Softcopy)
                  </Typography>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ marginTop: "8px" }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setSelectedFiles(files);
                      files.forEach((file) => handleFileUpload(file));
                    }}
                  />

                  {uploading && (
                    <Typography sx={{ mt: 1 }}>Uploading...</Typography>
                  )}

                  {uploadedImageUrls.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">Uploaded Files:</Typography>

                      {/* 👇 Button to view all uploaded images in modal */}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mt: 3,
                          backgroundColor: "#0A21C0",
                          color: "#fff",
                          "&:hover": { backgroundColor: "#081B80" },
                        }}
                        onClick={() => setOpenModal(true)}
                      >
                        View Uploaded Photos
                      </Button>
                    </Box>
                  )}

                  {/* 👇 Modal for viewing uploaded photos */}
                  <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="uploaded-photos-modal"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        p: 3,
                        maxWidth: "90%",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        position: "relative",
                      }}
                    >
                      <IconButton
                        sx={{ position: "absolute", top: 10, right: 10 }}
                        onClick={() => setOpenModal(false)}
                      >
                        <CloseIcon />
                      </IconButton>

                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Uploaded Photos
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        {uploadedImageUrls.map((url, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={url}
                              alt={`Uploaded ${index + 1}`}
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "10px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                                marginBottom: "8px",
                              }}
                            />
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => {
                                const confirmRemove = window.confirm(
                                  "Are you sure you want to remove this photo?"
                                );
                                if (confirmRemove) {
                                  const updatedUrls = uploadedImageUrls.filter(
                                    (_, i) => i !== index
                                  );
                                  setUploadedImageUrls(updatedUrls);
                                }
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    backgroundColor: "#0A21C0",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#081B80" },
                  }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
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
    </div>
  );
}
