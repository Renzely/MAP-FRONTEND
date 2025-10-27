import React, { useState } from "react";
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
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";

export default function AccountCreation() {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    company: "",
    status: "",
    remarks: "",
    employeeNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
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
      "lastName",
      "contact",
      "email",
      "birthday",
      "position",
      "dateHired",
      "homeAddress",
      "clientAssigned",
      "silBalance",
    ];

    // Identify missing fields
    const errors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    // convert dates
    const formattedData = {
      ...formData,
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
        alert("Account successfully created!");
        setFormData({
          company: "",
          status: "",
          remarks: "",
          employeeNo: "",
          firstName: "",
          middleName: "",
          lastName: "",
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
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again.");
    }
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
                  label="Email Address"
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
                  >
                    <MenuItem value="ASIAN STREAK BROKERAGE CO">
                      ASIAN STREAK BROKERAGE CO
                    </MenuItem>
                    <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                      BMPOWER HUMAN RESOURCES CORPORATION
                    </MenuItem>
                    <MenuItem value="CARMENS BEST">CARMENS BEST</MenuItem>
                    <MenuItem value="ECOSSENTIAL FOODS CORP">
                      ECOSSENTIAL FOODS CORP
                    </MenuItem>
                    <MenuItem value="ECOSSENTIAL FOODS CORP-HEAD OFFICE">
                      ECOSSENTIAL FOODS CORP-HEAD OFFICE
                    </MenuItem>
                    <MenuItem value="ENGKANTO">ENGKANTO</MenuItem>
                    <MenuItem value="J-GYU INC">J-GYU INC</MenuItem>
                    <MenuItem value="LONG TABLE GROUP INC.- MASAJIRO">
                      LONG TABLE GROUP INC. - MASAJIRO
                    </MenuItem>
                    <MenuItem value="MAGIS DISTRIBUTION INC.">
                      MAGIS DISTRIBUTION INC.
                    </MenuItem>
                    <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                      MARABOU EVERGREEN RESOURCES INC
                    </MenuItem>
                    <MenuItem value="MCKENZIE DISTRIBUTION CO.">
                      MCKENZIE DISTRIBUTION CO.
                    </MenuItem>
                    <MenuItem value="METRO PACIFIC DAIRY FARM">
                      METRO PACIFIC DAIRY FARM
                    </MenuItem>
                    <MenuItem value="METRO PACIFIC FRESH FARM">
                      METRO PACIFIC FRESH FARM
                    </MenuItem>
                    <MenuItem value="PLDT TELESCOOP">PLDT TELESCOOP</MenuItem>
                    <MenuItem value="RC">RC SALES AGENT</MenuItem>
                    <MenuItem value="ROYAL CANIN PHILS.">
                      ROYAL CANIN PHILS.
                    </MenuItem>
                    <MenuItem value="SHELFMATE">SHELFMATE</MenuItem>
                    <MenuItem value="SPX EXPRESS">SPX EXPRESS</MenuItem>
                    <MenuItem value="UNIVERSAL HARVESTER DAIRY FARM INC">
                      UNIVERSAL HARVESTER DAIRY FARM INC
                    </MenuItem>
                  </Select>
                </FormControl>
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
                  error={!!formErrors.sss}
                  helperText={formErrors.sss}
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
                  error={!!formErrors.philhealth}
                  helperText={formErrors.philhealth}
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
                  error={!!formErrors.hdmf}
                  helperText={formErrors.hdmf}
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
                  error={!!formErrors.tin}
                  helperText={formErrors.tin}
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
    </div>
  );
}
