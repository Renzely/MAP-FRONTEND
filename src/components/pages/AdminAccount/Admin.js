import "./admin.css";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Checkbox, Autocomplete } from "@mui/material";
import axios from "axios";
import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        p: 2,
        backgroundColor: "#f8f9fa",
        borderBottom: "2px solid #e0e0e0",
      }}
    >
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Admin() {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [updateStatus, setUpdateStatus] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const requestBody = { isVerified: updateStatus, emailAddress: userEmail };

  const [showPassword, setShowPassword] = useState(false);

  const [otpCode, setOtpCode] = useState();
  const [inputOtpCode, setInputOtpCode] = useState();
  const [inputOtpCodeError, setInputOtpCodeError] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [adminSelectedRole, setSelectedRole] = useState("");
  const [adminSelectedBranch, setSelectedBranch] = useState([]);
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminMiddleName, setAdminMiddleName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminConfirmPassword, setAdminConfirmPassword] = useState("");

  const [adminRoleError, setAdminRoleError] = useState("");
  const [adminFirstNameError, setAdminFirstNameError] = useState("");
  const [adminMiddleNameError, setAdminMiddleNameError] = useState("");
  const [adminLastNameError, setAdminLastNameError] = useState("");
  const [adminEmailError, setAdminEmailError] = useState("");
  const [adminPhoneError, setAdminPhoneError] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [adminConfirmPasswordError, setAdminConfirmPasswordError] =
    useState("");

  const [adminViewBranch, setAdminViewBranch] = useState("");
  const [adminViewFullName, setAdminViewFullName] = useState("");
  const [adminViewEmail, setAdminViewEmail] = useState("");
  const [adminViewPhone, setAdminViewPhone] = useState("");

  const [selectedBranches, setSelectedBranches] = useState(
    adminViewBranch || [],
  );
  const [modalEmail, setModalEmail] = useState("");

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

  const handleBranchSave = async (email) => {
    try {
      const response = await axios.put(
        "https://api-map.bmphrc.com//update-admin-outlet",
        {
          emailAddress: email,
          outlet: selectedBranches,
        },
      );

      const updatedUserData = userData.map((user) => {
        if (user.emailAddress === email) {
          return {
            ...user,
            outlet: selectedBranches.join(", "),
          };
        }
        return user;
      });

      setUserData(updatedUserData);
      handleViewCloseModal();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(
        "Error updating user branches:",
        error.response?.data || error.message,
      );
      handleViewCloseModal();
    }
  };

  const outlets = ["BMPOWER OFFICE"];

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setSelectedBranch(newValue);
  };

  const handleFirstNameChange = (e) => {
    setAdminFirstName(e.target.value);
    if (e.target.value.length < 2) {
      setAdminFirstNameError("Please enter valid name");
    } else {
      setAdminFirstNameError(false);
    }
  };

  const handleMiddleNameChange = (e) => {
    setAdminMiddleName(e.target.value);
    if (e.target.value.length < 2) {
      setAdminMiddleNameError("Please enter valid name");
    } else {
      setAdminMiddleNameError(false);
    }
  };

  const handleLastNameChange = (e) => {
    setAdminLastName(e.target.value);
    if (e.target.value.length < 2) {
      setAdminLastNameError("Please enter valid name");
    } else if (e.target.value.length > 20) {
      setAdminLastNameError("Name must be less than 20 characters long");
    } else if (!/^[a-zA-Z ]+$/.test(e.target.value)) {
      setAdminLastNameError("Name must contain only letters and spaces");
    } else {
      setAdminLastNameError(false);
    }
  };

  const handleEmailChange = (e) => {
    setAdminEmail(e.target.value);
    if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(e.target.value)) {
      setAdminEmailError("Invalid email address");
    } else {
      setAdminEmailError(false);
    }
  };

  const handlePhoneChange = (e) => {
    if (e.target.value.length > 11) return;
    setAdminPhone(e.target.value);
    if (e.target.value.length < 2) {
      setAdminPhoneError("Please enter valid phone number");
    } else {
      setAdminPhoneError(false);
    }
  };

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
    if (e.target.value.length < 2) {
      setAdminPasswordError("Please enter valid password");
    } else {
      setAdminPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setAdminConfirmPassword(e.target.value);
    if (e.target.value !== adminPassword) {
      setAdminConfirmPasswordError("Password does not match!");
    } else {
      setAdminConfirmPasswordError(false);
    }
  };

  const handleOtpCodeChange = (e) => {
    if (e.target.value.length > 4) return;
    setInputOtpCode(e.target.value);
  };

  const handleOpenDialog = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCloseDialog = () => {
    setOpenModal(false);
  };

  const handleCloseOtpDialog = () => {
    setOpenDialog(false);
  };

  const handleStatusCloseDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleViewCloseModal = () => {
    setOpenViewModal(false);
  };

  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "roleAccount",
      headerName: "Role",
      width: 200,
    },
    // {
    //   field: "outlet",
    //   headerName: "Outlet",
    //   width: 200,
    // },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "middleName",
      headerName: "Middle name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "emailAddress",
      headerName: "Email",
      width: 250,
    },
    {
      field: "contactNum",
      headerName: "Contact Number",
      width: 150,
    },
    {
      field: "isVerified",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const status = params.row.isVerified;
        const rowEmail = params.row.emailAddress;
        const onClick = (e) => {
          setUpdateStatus(!status);
          setUserEmail(rowEmail);
          setOpenStatusDialog(true);
        };

        return status ? (
          <Chip
            label="Active"
            color="success"
            size="small"
            onClick={onClick}
            sx={{ fontWeight: 600, cursor: "pointer" }}
          />
        ) : (
          <Chip
            label="Inactive"
            color="error"
            size="small"
            onClick={onClick}
            sx={{ fontWeight: 600, cursor: "pointer" }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          let rFullname;
          let rMiddleName = params.row.middleName;
          let rEmail = params.row.emailAddress;
          let rPhone = params.row.contactNum;
          let rOutlet = params.row.outlet;

          if (rMiddleName === "Null") {
            rFullname = params.row.firstName + " " + params.row.lastName;
          } else {
            rFullname =
              params.row.firstName +
              " " +
              params.row.middleName +
              " " +
              params.row.lastName;
          }
          setAdminViewBranch(rOutlet);
          setAdminViewFullName(rFullname);
          setAdminViewEmail(rEmail);
          setAdminViewPhone(rPhone);
          setOpenViewModal(true);
        };

        return (
          <Button
            variant="outlined"
            size="small"
            onClick={onClick}
            sx={{
              borderColor: "#2e6385ff",
              color: "#2e6385ff",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(46, 99, 133, 0.08)",
                borderColor: "#0c2e3fff",
              },
            }}
          >
            View
          </Button>
        );
      },
    },
  ];

  async function getUser() {
    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com//get-admin-user",
        requestBody,
      );
      const data = response.data.data;

      const newData = data.map((user, index) => ({
        count: index + 1,
        roleAccount: user.roleAccount,
        remarks: user.remarks || "None",
        firstName: user.firstName,
        middleName: user.middleName || "Null",
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        contactNum: user.contactNum,
        username: user.username,
        outlet: user.outlet || [],
        type: user.type ?? null,
        isVerified: user.isVerified,
      }));

      setUserData(newData);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  }

  async function setStatus() {
    await axios
      .put("https://api-map.bmphrc.com//update-admin-status", requestBody)
      .then(async (response) => {
        window.location.reload();
      });
  }

  async function sendOtp() {
    if (adminSelectedRole === "") {
      Swal.fire({
        title: "Unable to proceed",
        text: "Please select Role!",
        icon: "error",
      });
      return;
    }

    if (adminSelectedBranch.length === 0) {
      Swal.fire({
        title: "Unable to proceed",
        text: "Please select Branch!",
        icon: "error",
      });
      return;
    }

    await axios
      .post("https://api-map.bmphrc.com//send-otp", {
        email: adminEmail,
      })
      .then(async (response) => {
        const data = await response.data;

        if (data.status === 200) {
          setOtpCode(data.code);
          setOpenDialog(true);
        } else {
          Swal.fire({
            title: "Unable to proceed",
            text: "Sending OTP failed!",
            icon: "error",
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          Swal.fire({
            title: "Unable to proceed",
            text: error.response.data,
            icon: "error",
          });
          return;
        } else if (error.request) {
          Swal.fire({
            title: "Unable to proceed",
            text: error.request,
            icon: "error",
          });
          return;
        } else {
          Swal.fire({
            title: "Unable to proceed",
            text: error.message,
            icon: "error",
          });
          return;
        }
      });
  }

  async function confirmOtp() {
    if (otpCode === inputOtpCode) {
      const userDetails = {
        roleAccount: adminSelectedRole,
        outlet: adminSelectedBranch,
        firstName: adminFirstName,
        middleName: adminMiddleName,
        lastName: adminLastName,
        contactNum: adminPhone,
        emailAddress: adminEmail,
        password: adminPassword,
      };

      axios
        .post("https://api-map.bmphrc.com//register-user-admin", userDetails)
        .then(async (response) => {
          const data = response.data;

          if (data.status === 200) {
            Swal.fire({
              title: "Success",
              text: "User created successfully!",
              icon: "success",
              confirmButtonColor: "#2e6385ff",
            }).then((result) => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Unable to proceed",
              text: "Saving user Error!",
              icon: "error",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (otpCode !== inputOtpCode) {
      setInputOtpCodeError("OTP code does not match.");
    } else if (inputOtpCode.length < 4) {
      setInputOtpCodeError("Input must be 4 digits.");
    }
    return;
  }

  useEffect(() => {
    getUser();
    if (adminViewBranch && Array.isArray(adminViewBranch)) {
      setSelectedBranches(adminViewBranch);
    }
  }, [adminViewBranch]);

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
              p: 3,
              mb: 3,
              background:
                "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    width: 56,
                    height: 56,
                  }}
                >
                  <SupervisorAccountIcon
                    sx={{ fontSize: 32, color: "white" }}
                  />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    Admin Accounts
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    Manage administrator users and permissions
                  </Typography>
                </Box>
              </Box>

              <Button
                onClick={handleOpenDialog}
                variant="contained"
                startIcon={<PersonAddAlt1Icon />}
                sx={{
                  backgroundColor: "white",
                  color: "#2e6385ff",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  py: 1.5,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                  },
                }}
              >
                Add User
              </Button>
            </Box>
          </Paper>

          {/* DataGrid Section */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fafafa",
                borderBottom: "2px solid #e0e0e0",
                fontSize: "14px",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8f9fa",
              },
            }}
          >
            <DataGrid
              rows={userData}
              columns={columns}
              autoHeight // This makes the grid expand to fit all rows
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slots={{ toolbar: CustomToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              loading={!userData.length}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              pageSizeOptions={[5, 10, 20, 50]}
              getRowId={(row) => row.count}
              disableRowSelectionOnClick
            />
          </Paper>

          {/* OTP Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseOtpDialog}
            PaperProps={{
              sx: {
                borderRadius: "12px",
                minWidth: "400px",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#2e6385ff",
                color: "white",
                fontWeight: 600,
              }}
            >
              Enter OTP Code
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                Please enter the 4-digit OTP code sent to your email.
              </Typography>
              <TextField
                fullWidth
                value={inputOtpCode}
                error={!!inputOtpCodeError}
                helperText={inputOtpCodeError}
                type="number"
                placeholder="Enter 4-digit code"
                onChange={handleOtpCodeChange}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleCloseOtpDialog}
                sx={{
                  color: "#666",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmOtp}
                variant="contained"
                sx={{
                  backgroundColor: "#2e6385ff",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#0c2e3fff",
                  },
                }}
              >
                Create User
              </Button>
            </DialogActions>
          </Dialog>

          {/* Status Change Dialog */}
          <Dialog
            open={openStatusDialog}
            onClose={handleStatusCloseDialog}
            PaperProps={{
              sx: {
                borderRadius: "12px",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#2e6385ff",
                color: "white",
                fontWeight: 600,
              }}
            >
              Account Activation
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <DialogContentText>
                {updateStatus
                  ? "Are you sure you want to set this user as active?"
                  : "Are you sure you want to set this user as inactive?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleStatusCloseDialog}
                sx={{
                  color: "#666",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={setStatus}
                variant="contained"
                sx={{
                  backgroundColor: "#2e6385ff",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#0c2e3fff",
                  },
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* View Modal */}
          <Modal open={openViewModal} onClose={handleViewCloseModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: "70%", md: "600px" },
                maxHeight: "90vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#555",
                  },
                },
              }}
            >
              {/* Modal Header */}
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
                  p: 3,
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  Admin Details
                </Typography>
              </Box>

              {/* Modal Body */}
              <Box sx={{ p: 3 }}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Full Name"
                    value={adminViewFullName}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    value={adminViewEmail}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                  <TextField
                    label="Contact Number"
                    value={adminViewPhone}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                  <TextField
                    label="Outlets"
                    value={
                      Array.isArray(adminViewBranch)
                        ? adminViewBranch.join(", ")
                        : adminViewBranch || ""
                    }
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />

                  <Autocomplete
                    multiple
                    options={outlets}
                    value={selectedBranches}
                    onChange={(event, newValue) =>
                      setSelectedBranches(newValue)
                    }
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Outlet"
                        placeholder="Select Outlet"
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                  />

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      onClick={() => setSelectedBranches(outlets)}
                      variant="outlined"
                      sx={{
                        borderColor: "#2e6385ff",
                        color: "#2e6385ff",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(46, 99, 133, 0.08)",
                          borderColor: "#0c2e3fff",
                        },
                      }}
                    >
                      Select All
                    </Button>
                    <Button
                      onClick={() => setSelectedBranches([])}
                      variant="outlined"
                      sx={{
                        borderColor: "#d32f2f",
                        color: "#d32f2f",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(211, 47, 47, 0.08)",
                          borderColor: "#c62828",
                        },
                      }}
                    >
                      Remove All
                    </Button>
                  </Stack>

                  <Button
                    onClick={() => handleBranchSave(adminViewEmail)}
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#2e6385ff",
                      color: "white",
                      textTransform: "none",
                      fontWeight: 600,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#0c2e3fff",
                      },
                    }}
                  >
                    Save Outlet Changes
                  </Button>

                  <Button
                    onClick={handleViewCloseModal}
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: "#666",
                      color: "#666",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#333",
                      },
                    }}
                  >
                    Close
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Modal>

          {/* Add User Modal */}
          <Modal open={openModal} onClose={handleCloseDialog}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: "70%", md: "600px" },
                maxHeight: "90vh",
                overflowY: "auto",
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#555",
                  },
                },
              }}
            >
              {/* Modal Header */}
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
                  p: 3,
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  Add New Admin User
                </Typography>
              </Box>

              {/* Modal Body */}
              <Box sx={{ p: 3 }}>
                <Stack spacing={2.5}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={adminSelectedRole}
                      onChange={handleRoleChange}
                      label="Role"
                    >
                      <MenuItem value="EXECUTIVE DIRECTOR">
                        EXECUTIVE DIRECTOR
                      </MenuItem>
                      <MenuItem value="HR HEAD">HR HEAD</MenuItem>
                      <MenuItem value="HR OFFICER">HR OFFICER</MenuItem>
                      <MenuItem value="HR COORDINATOR SPECIALIST">
                        HR COORDINATOR SPECIALIST
                      </MenuItem>
                      <MenuItem value="HR COMPENSATION AND BENEFITS">
                        HR COMPENSATION AND BENEFITS
                      </MenuItem>
                      <MenuItem value="HR SPECIALIST">HR SPECIALIST</MenuItem>
                    </Select>
                  </FormControl>

                  <Autocomplete
                    multiple
                    options={outlets}
                    value={adminSelectedBranch}
                    onChange={handleChange}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          checked={selected}
                          style={{ marginRight: 8 }}
                        />
                        {option}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Branches"
                        placeholder="Select Branch"
                      />
                    )}
                  />

                  <TextField
                    label="First Name *"
                    value={adminFirstName}
                    onChange={handleFirstNameChange}
                    error={!!adminFirstNameError}
                    helperText={adminFirstNameError}
                    autoComplete="off"
                    fullWidth
                  />

                  <TextField
                    label="Middle Name"
                    value={adminMiddleName}
                    onChange={handleMiddleNameChange}
                    error={!!adminMiddleNameError}
                    helperText={adminMiddleNameError}
                    autoComplete="off"
                    fullWidth
                  />

                  <TextField
                    label="Last Name *"
                    value={adminLastName}
                    onChange={handleLastNameChange}
                    error={!!adminLastNameError}
                    helperText={adminLastNameError}
                    autoComplete="off"
                    fullWidth
                  />

                  <TextField
                    label="Email *"
                    value={adminEmail}
                    onChange={handleEmailChange}
                    error={!!adminEmailError}
                    helperText={adminEmailError}
                    autoComplete="off"
                    fullWidth
                  />

                  <TextField
                    label="Contact Number *"
                    value={adminPhone}
                    onChange={handlePhoneChange}
                    error={!!adminPhoneError}
                    type="number"
                    sx={{
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          display: "none",
                        },
                      "& input[type=number]": {
                        MozAppearance: "textfield",
                      },
                    }}
                    helperText={adminPhoneError}
                    autoComplete="off"
                    fullWidth
                  />

                  <TextField
                    label="Password *"
                    value={adminPassword}
                    onChange={handlePasswordChange}
                    error={!!adminPasswordError}
                    helperText={adminPasswordError}
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />

                  <TextField
                    label="Confirm Password *"
                    value={adminConfirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!adminConfirmPasswordError}
                    helperText={adminConfirmPasswordError}
                    type="password"
                    autoComplete="off"
                    fullWidth
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 2 }}
                  >
                    <Button
                      onClick={handleClose}
                      sx={{
                        color: "#666",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={sendOtp}
                      variant="contained"
                      sx={{
                        backgroundColor: "#2e6385ff",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 4,
                        "&:hover": {
                          backgroundColor: "#0c2e3fff",
                        },
                      }}
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
