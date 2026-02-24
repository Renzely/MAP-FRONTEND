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
  Paper,
  Divider,
  Chip,
  Card,
  CardContent,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import "./AccountCreationEmployee.css";

export default function AccountCreationEnhanced() {
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

  // Listen to sidebar state from localStorage (same as admin component)
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

  const OUTLET_CLIENT = "ECOSSENTIAL FOODS CORP";
  const HUB_CLIENT = "SPX EXPRESS";

  const ACCOUNT_TYPES = ["WALTERMART", "BALANCE"];
  const REGION_TYPES = [
    "NCR 1 South",
    "NCR 2 East",
    "NCR 3 Central",
    "NCR 4 North",
  ];

  const OUTLETS_BY_ACCOUNT = {
    WALTERMART: [
      "WALTERMART SUPERMARKET INC. - SUCAT",
      "WALTERMART SUPERMARKET INC. - BICUTAN",
      "WALTERMART SUPERMARKET INC. - MUNTINLUPA WEST",
    ],
    BALANCE: [
      "LANDMARK - ALABANG",
      "TROPICAL HUT - FTI",
      "TROPICAL HUT - PANAY",
      "SOUTH - GROCERS BF",
      "ULTRAMEGA - TAGUIG",
    ],
  };

  const OUTLETS = [
    ...OUTLETS_BY_ACCOUNT.WALTERMART,
    ...OUTLETS_BY_ACCOUNT.BALANCE,
  ];

  const HUBS_BY_REGION = {
    "NCR 1 South": [
      "Apelo Hub",
      "Arnaiz Hub",
      "Bagumbayan Hub",
      "CAA Hub",
      "Cupang Hub",
      "Dasa Hub",
      "FTI Hub",
      "Las Pinas Hub",
      "Makati Hub",
      "Makati-Magallanes Hub",
      "Manuyo Uno Hub",
      "Marcelo Green Hub",
      "Pasay Hub",
      "Tambo Hub",
      "Tunasan Hub",
    ],

    "NCR 2 East": [
      "Angono Hub",
      "Antipolo Hub",
      "Baltao Hub",
      "Baras Hub",
      "Binangonan Hub",
      "Cainta Hub",
      "Mambugan Hub",
      "Morong Rizal Hub",
      "Q Plaza Hub",
      "Redgold Hub",
      "Rodriguez Hub",
      "San Isidro Rodriguez Hub",
      "San Mateo Hub",
      "Tanay Hub",
      "Taytay Hub",
      "Teresa Rizal Hub",
      "Upper Antipolo Hub",
      "Payatas Hub",
      "Cubao Hub",
      "Lower QC Hub",
      "Tandang Sora Hub",
      "West QC Hub",
      "Batasan Hub",
      "Culiat Hub",
      "East QC Hub",
      "Holy Spirit Hub",
      "M.Balara Hub",
      "Wack Wack Hub",
      "San Juan Hub",
    ],

    "NCR 3 Central": [
      "Escoda Hub",
      "Jaboneros Hub",
      "Paco Hub",
      "Palanca Hub",
      "Pandacan Hub",
      "Tondo Hub",
      "Vitas Tondo Hub",
      "Mandaluyong Hub",
      "Malaya Ibaba Hub",
      "Daanghari Navotas Hub",
      "MINI Hub Lavezares",
      "Navotas Hub",
      "Second Avenue Hub",
      "Marikina Hub",
      "Upper Marikina Hub",
      "Pasig Hub",
      "Pasig-Rosario Hub",
      "Maybunga Hub",
      "Amang Rodriguez Hub",
      "Bambang Pasig Hub",
      "Congressional Hub",
      "Del Monte Ave Hub",
      "Reliance Hub",
    ],

    "NCR 4 North": [
      "North East Caloocan Hub",
      "Upper QC Hub",
      "West Grace Park Hub",
      "M Lozada",
      "Pateros Hub",
      "Ruhale Hub",
      "Camanava Hub",
      "Canumay East Hub",
      "Caybiga Hub",
      "Coloong Hub",
      "Malabon Hub",
      "South Caloocan Hub",
      "Tinajeros Hub",
      "Valenzuela Hub",
      "Viente Reales Hub",
      "Balingasa Hub",
      "Amparo Hub",
      "Bagumbong Hub",
      "Caloocan Hub",
      "Northwest Caloocan Hub",
      "Tala Hub",
    ],
  };

  const POSITIONS_BY_CLIENT = {
    // BMPower Clients
    "BMPOWER HUMAN RESOURCES CORPORATION": [
      "Executive Director",
      "Operation Director",
      "Operation Head",
      "Account Supervisor",
      "Operations Admin",
      "Data Analyst",
      "Utility",
      "Treasury Head",
      "Treasury Officer",
      "Treasury Assistant",
      "Billing Officer",
      "Billing Specialist",
      "Payroll Specialist",
      "Assistant Payroll Specialist",
      "HR Officer",
      "HR Coordinator",
      "Recruitment Specialist",
      "SPX Head",
      "Agency Coordinator",
    ],

    "ECOSSENTIAL FOODS CORP": ["Merchandiser", "CVS Merchandiser", "Repacker"],
    "ECOSSENTIAL FOODS CORP-COORDINATORS": [
      "Tactical Coordinator",
      "Account Coordinator",
    ],
    "ECOSSENTIAL FOODS CORP-HEAD OFFICE": ["MHE Operator", "Fleet Operator"],
    "MCKENZIE DISTRIBUTION CO.": [
      "Merchandiser",
      "Account Coordinator",
      "Brand Ambassador",
      "Tactical Coordinator",
      "Encoder",
    ],
    "UNION GALVASTEEL CO": [
      "Project In-Charge",
      "Rigger",
      "Telehandler Operator",
      "Crane Operator",
      "Welder",
      "Sales Assistant",
      "Machine Operator",
      "Utility",
      "Data Encoder",
    ],
    "MAGIS DISTRIBUTION INC.": [
      "Saturator Salesman",
      "Driver",
      "Van Route Salesman – Junior",
      "Van Route Salesman – Senior",
      "Beverage Developer",
    ],
    MANDOM: ["Brand Ambassador"],
    ENGKANTO: ["Tactical Coordinator"],
    "ASIAN STREAK BROKERAGE CO": [
      "Messenger",
      "Driver",
      "Shipping Coordinator",
      "Accountant",
      "Declarant",
    ],
    "PLDT TELESCOOP": ["Utility"],
    "SPX EXPRESS": [
      "Backroom Personnel",
      "2-Wheel Delivery Rider",
      "3-Wheel Delivery Rider",
      "4-Wheel Delivery Rider",
      "Walker",
    ],
    "DEL MONTE": ["Push Girl", "Cook", "Helper", "Coordinator", "Team Leader"],
    // Marabou Clients
    "MARABOU EVERGREEN RESOURCES INC": [
      "Software Engineer",
      "Payroll Specialist",
      "Assistant Payroll Specialist",
      "Hub Coordinator",
      "HR Officer",
      "HR Coordinator",
      "Recruitment Specialist",
    ],
    "LONG TABLE GROUP INC.- MASAJIRO": [
      "Dining Staff / Cashier",
      "Kitchen Staff",
      "Baker",
      "Kitchen Supervisor / Cashier",
      "Utility / Messenger",
      "Admin Officer",
      "Finance Officer",
      "FOH Team Leader",
    ],
    "J-GYU INC": ["Admin Officer / Purchasing Staff", "Production Staff"],
    "CARMENS BEST": ["Tactical Coordinator", "Account Coordinator"],
    "METRO PACIFIC FRESH FARM": ["General Farmer"],
    "METRO PACIFIC DAIRY FARM": ["Feeder"],
    "UNIVERSAL HARVESTER DAIRY FARM INC": ["Tactical Coordinator"],
    "COSMETIQUE ASIA": ["Brand Ambassador", "Account Coordinator"],
  };

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
    dateResigned: null,
    homeAddress: "",
    silBalance: "",
    clientAssigned: "",
    region: "",
    account: "",
    outlet: "",
  });

  // const isOutletClient = formData.clientAssigned === OUTLET_CLIENT;
  const isHubClient = formData.clientAssigned === HUB_CLIENT;

  const outletHubOptions =
    //  isOutletClient
    //   ? OUTLETS_BY_ACCOUNT[formData.account] || []
    //   :
    isHubClient ? HUBS_BY_REGION[formData.region] || [] : [];

  const accountMaxLengths = {
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

  const handleChange = (field, value) => {
    setFormData((prev) => {
      let updated = { ...prev, [field]: value };

      // Auto-calculate age
      if (field === "birthday") {
        const birthDate = dayjs(value);
        const age = dayjs().diff(birthDate, "year");
        updated.age = age;
      }

      // Reset client when company changes
      if (field === "company") {
        updated.clientAssigned = "";
      }

      // Handle remarks logic
      if (field === "remarks") {
        if (value !== "Resign") {
          updated.dateResigned = null;
        }
      }

      if (field === "status") {
        if (value === "Applicant") {
          updated.remarks = "Applicant";
          updated.employeeNo = "";
          updated.dateHired = null;
          updated.silBalance = "";
          updated.modeOfDisbursement = "";
          updated.accountNumber = "";
        } else {
          // If status is Active/Inactive, keep remarks as is or clear if it was "Applicant"
          if (prev.remarks === "Applicant") {
            updated.remarks = ""; // allow user to select new remarks
          }
        }
      }

      if (field === "clientAssigned") {
        // Always reset outlet/hub when client changes
        updated.outlet = "";
        updated.account = "";
        updated.region = "";
        updated.position = "";
      }

      if (field === "account") {
        updated.outlet = "";
      }

      if (field === "region") {
        updated.outlet = "";
      }

      return updated;
    });

    setFormErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      // Remove error for the current field if value exists
      if (value && newErrors[field]) {
        delete newErrors[field];
      }

      // Handle remarks logic
      if (field === "remarks") {
        if (value === "Resign") {
          if (!formData.dateResigned) {
            newErrors.dateResigned =
              "Date Resigned is required when employee resigns.";
          }
        } else {
          // Clear dateResigned error if remarks is not Resign
          delete newErrors.dateResigned;
        }
      }

      // If user updates dateResigned, remove its error
      if (field === "dateResigned" && value) {
        delete newErrors.dateResigned;
      }

      return newErrors;
    });
  };

  const isApplicant = formData.status === "Applicant";

  const CLIENT_VALIDATION = {
    "SPX EXPRESS": { region: true, outlet: true, outletLabel: "Hub" },
    "ECOSSENTIAL FOODS CORP": {
      region: false,
      outlet: false,
      outletLabel: "Outlet",
    },
    // Add future clients here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = isApplicant
      ? [
          "company",
          "status",
          "remarks",
          "clientAssigned",
          "firstName",
          "lastName",
          "contact",
          "birthday",
          "position",
          "homeAddress",
        ]
      : [
          "company",
          "status",
          "remarks",
          "employeeNo",
          "firstName",
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

    // ---------------- Required Fields ----------------
    requiredFields.forEach((field) => {
      if (field === "accountNumber" && formData.modeOfDisbursement === "TBA")
        return;

      if (!formData[field] || formData[field].toString().trim() === "") {
        errors[field] = "This field is required";
      }
    });

    // ---------------- SPX Specific Validation ----------------
    if (formData.clientAssigned === "SPX EXPRESS") {
      if (!formData.region) errors.region = "Please select a region";
      if (!formData.outlet) errors.outlet = "Please select a hub";
    }

    // ---------------- Other Validations ----------------
    if (!errors.contact && formData.contact.length !== 11) {
      errors.contact = "Contact number must be exactly 11 digits";
    }

    if (formData.email && !errors.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        errors.email = "Invalid email address";
    }

    if (formData.remarks === "Resign" && !formData.dateResigned) {
      errors.dateResigned =
        "Date Resigned is required when remarks is 'Resign'";
    }

    const accountRequiredLengths = {
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

    if (
      !isApplicant &&
      formData.modeOfDisbursement !== "TBA" &&
      !errors.accountNumber
    ) {
      const requiredLength =
        accountRequiredLengths[formData.modeOfDisbursement];
      if (requiredLength && formData.accountNumber.length !== requiredLength) {
        errors.accountNumber = `Account number must be exactly ${requiredLength} characters`;
      }
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "warning",
      });
      return;
    }

    // ---------------- Duplicate Checks ----------------
    try {
      const duplicateCheck = await axios.post(
        "http://192.168.68.51:3001/check-duplicate-ids",
        {
          sss: formData.sss,
          philhealth: formData.philhealth,
          hdmf: formData.hdmf,
          tin: formData.tin,
        },
      );

      if (duplicateCheck.status === 409) {
        const dupErrors = duplicateCheck.data.duplicates || {};
        setFormErrors(dupErrors);
        setSnackbar({
          open: true,
          message: "Duplicate numbers found. Please check highlighted fields.",
          severity: "error",
        });
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

    // ---------------- Prepare Data for Backend ----------------
    const formattedData = {
      ...formData,
      createdBy: adminFullName,
      employeeNo: isApplicant ? null : formData.employeeNo,
      accountNumber:
        isApplicant || formData.modeOfDisbursement === "TBA"
          ? null
          : formData.accountNumber,
      dateHired: isApplicant ? null : formData.dateHired,
      silBalance: isApplicant ? null : formData.silBalance,
      region: formData.region || null,
      outlet: formData.outlet || null,
      requirementsImages: uploadedImageUrls.map((file) =>
        typeof file === "string" ? file : file.url,
      ),
      birthday: formData.birthday
        ? dayjs(formData.birthday).toDate().toISOString()
        : null,
      dateHired: formData.dateHired
        ? dayjs(formData.dateHired).toDate().toISOString()
        : null,
      dateResigned: formData.dateResigned
        ? dayjs(formData.dateResigned).toDate().toISOString()
        : null,
    };

    // ---------------- Submit to Backend ----------------
    try {
      const response = await axios.post(
        "http://192.168.68.51:3001/create-merch-account",
        formattedData,
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "Account successfully created!",
          severity: "success",
        });
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
          dateResigned: null,
          homeAddress: "",
          silBalance: "",
          clientAssigned: "",
          region: "",
          outlet: "",
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

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSnackbar({
        open: true,
        message:
          "Invalid file type. Please upload images, PDF, or Word files only.",
        severity: "error",
      });
      return;
    }

    try {
      setUploading(true);

      // Generate unique filename to prevent overwrites
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}_${file.name}`;

      const response = await axios.post(
        "http://192.168.68.51:3001/save-requirements-images",
        {
          fileName: uniqueFileName,
          fileType: file.type,
        },
      );

      const { url } = response.data;

      // Upload file with original quality (no compression)
      await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
          "Content-Disposition": `inline; filename="${file.name}"`,
        },
      });

      const s3FileUrl = `https://mmp-portal-docs.s3.ap-southeast-1.amazonaws.com/${uniqueFileName}`;

      // Store file with metadata
      setUploadedImageUrls((prev) => [
        ...prev,
        {
          url: s3FileUrl,
          name: file.name,
          type: file.type,
          size: file.size,
        },
      ]);

      setSnackbar({
        open: true,
        message: "File uploaded successfully!",
        severity: "success",
      });
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
      "ECOSSENTIAL FOODS CORP-COORDINATORS",
      "ECOSSENTIAL FOODS CORP-HEAD OFFICE",
      "MCKENZIE DISTRIBUTION CO.",
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
              background: "linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)",
              borderRadius: 3,
              p: 4,
              mb: 3,
              color: "white",
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
                <PersonAddIcon sx={{ fontSize: 40 }} />
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Employee Registration
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Create and manage employee accounts
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
              }}
            >
              {/* Company & Employment Section */}
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
                    Company & Employment Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Client Assigned *</InputLabel>
                        <Select
                          value={formData.clientAssigned}
                          label="Client Assigned *"
                          onChange={(e) =>
                            handleChange("clientAssigned", e.target.value)
                          }
                          disabled={!formData.company}
                          error={!!formErrors.clientAssigned}
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

                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Status *</InputLabel>
                        <Select
                          value={formData.status}
                          label="Status *"
                          onChange={(e) =>
                            handleChange("status", e.target.value)
                          }
                          error={!!formErrors.status}
                        >
                          <MenuItem value="Active">
                            <Chip
                              label="Active"
                              size="small"
                              color="success"
                              sx={{ fontWeight: 600 }}
                            />
                          </MenuItem>
                          <MenuItem value="Inactive">
                            <Chip
                              label="Inactive"
                              size="small"
                              color="error"
                              sx={{ fontWeight: 600 }}
                            />
                          </MenuItem>
                          <MenuItem value="Applicant">
                            <Chip
                              label="Applicant"
                              size="small"
                              color="default"
                              sx={{ fontWeight: 600 }}
                            />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Remarks *</InputLabel>
                        <Select
                          value={formData.remarks}
                          disabled={isApplicant} // only disable if status is Applicant
                          onChange={(e) =>
                            handleChange("remarks", e.target.value)
                          }
                        >
                          <MenuItem value="Applicant">Applicant</MenuItem>
                          <MenuItem value="Employed">Employed</MenuItem>
                          <MenuItem value="Resign">Resign</MenuItem>
                          <MenuItem value="Terminate">Terminate</MenuItem>
                          <MenuItem value="End of Contract">
                            End of Contract
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <TextField
                        label="Employee No. *"
                        disabled={isApplicant}
                        fullWidth
                        size="small"
                        value={formData.employeeNo}
                        onChange={(e) =>
                          handleChange("employeeNo", e.target.value)
                        }
                        error={!!formErrors.employeeNo}
                        helperText={formErrors.employeeNo}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Personal Information Section */}
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
                    Personal Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={3}>
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

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Email Address (Optional)"
                        type="email"
                        fullWidth
                        size="small"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Birthday *"
                          value={formData.birthday}
                          onChange={(newValue) =>
                            handleChange("birthday", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!formErrors.birthday,
                              helperText: formErrors.birthday,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <TextField
                        label="Age"
                        fullWidth
                        size="small"
                        value={formData.age}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Position *</InputLabel>
                        <Select
                          value={formData.position}
                          label="Position *"
                          onChange={(e) =>
                            handleChange("position", e.target.value)
                          }
                          disabled={!formData.clientAssigned}
                          error={!!formErrors.position}
                        >
                          {(
                            POSITIONS_BY_CLIENT[formData.clientAssigned] || []
                          ).map((pos) => (
                            <MenuItem key={pos} value={pos}>
                              {pos}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText error={!!formErrors.position}>
                          {formErrors.position
                            ? formErrors.position
                            : !formData.clientAssigned
                              ? "Select a Client first"
                              : ""}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Home Address *"
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        value={formData.homeAddress}
                        onChange={(e) =>
                          handleChange("homeAddress", e.target.value)
                        }
                        error={!!formErrors.homeAddress}
                        helperText={formErrors.homeAddress}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Government IDs Section */}
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
                    Government IDs (Optional)
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        label="SSS No."
                        fullWidth
                        size="small"
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
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        label="PHIC No."
                        fullWidth
                        size="small"
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
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        label="HDMF No."
                        fullWidth
                        size="small"
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
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        label="TIN No."
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
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Employment Details Section */}
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
                    Employment Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disabled={isApplicant}
                          label="Date Hired *"
                          value={formData.dateHired}
                          onChange={(newValue) =>
                            handleChange("dateHired", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!formErrors.dateHired,
                              helperText: formErrors.dateHired,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date Resigned"
                          value={formData.dateResigned}
                          disabled={formData.remarks !== "Resign"}
                          onChange={(newValue) =>
                            handleChange("dateResigned", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              error: !!formErrors.dateResigned,
                              helperText: formErrors.dateResigned,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        label="SIL Balance *"
                        type="number"
                        disabled={isApplicant}
                        fullWidth
                        size="small"
                        value={formData.silBalance}
                        onChange={(e) =>
                          handleChange("silBalance", e.target.value)
                        }
                        error={!!formErrors.silBalance}
                        helperText={formErrors.silBalance}
                        inputProps={{
                          min: 0,
                          inputMode: "numeric",
                        }}
                      />
                    </Grid>

                    {/* Region dropdown - only for SPX EXPRESS */}
                    {isHubClient && (
                      <Grid item xs={12} md={3}>
                        <FormControl
                          fullWidth
                          size="small"
                          disabled={isApplicant}
                        >
                          <InputLabel>Region *</InputLabel>
                          <Select
                            value={formData.region}
                            label="Region *"
                            onChange={(e) =>
                              handleChange("region", e.target.value)
                            }
                            error={!!formErrors.region}
                          >
                            {REGION_TYPES.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                          {formErrors.region && (
                            <FormHelperText error>
                              {formErrors.region}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )}

                    {/* Hub dropdown - shown once a Region is selected */}
                    {isHubClient && (
                      <Grid item xs={12} md={3}>
                        <Autocomplete
                          disabled={isApplicant || !formData.region}
                          options={outletHubOptions}
                          value={formData.outlet || null}
                          onChange={(event, newValue) => {
                            handleChange("outlet", newValue || "");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Hub *"
                              size="small"
                              error={!!formErrors.outlet}
                              helperText={
                                !formData.region
                                  ? "Select a Region first"
                                  : formErrors.outlet
                              }
                            />
                          )}
                        />
                      </Grid>
                    )}

                    {/* {isOutletClient && (
                      <Grid item xs={12} md={3}>
                        <FormControl
                          fullWidth
                          size="small"
                          disabled={isApplicant}
                        >
                          <InputLabel>Account *</InputLabel>
                          <Select
                            value={formData.account}
                            label="Account *"
                            onChange={(e) =>
                              handleChange("account", e.target.value)
                            }
                            error={!!formErrors.account}
                          >
                            {ACCOUNT_TYPES.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                          {formErrors.account && (
                            <FormHelperText error>
                              {formErrors.account}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    )} */}

                    {/* {isOutletClient && (
                      <Grid item xs={12} md={3}>
                        <Autocomplete
                          multiple
                          disabled={isApplicant || !formData.account}
                          options={outletHubOptions}
                          value={
                            formData.outlet
                              ? formData.outlet.split(", ").filter((v) => v)
                              : []
                          }
                          onChange={(event, newValue) => {
                            const uniqueValues = [...new Set(newValue)];
                            handleChange("outlet", uniqueValues.join(", "));
                          }}
                          getOptionDisabled={(option) => {
                            const currentValues = formData.outlet
                              ? formData.outlet.split(", ").filter((v) => v)
                              : [];
                            return currentValues.includes(option);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option === value
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Outlets *"
                              size="small"
                              error={!!formErrors.outlet}
                              helperText={
                                !formData.account
                                  ? "Select an Account first"
                                  : formErrors.outlet
                              }
                            />
                          )}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                label={option}
                                size="small"
                                {...getTagProps({ index })}
                                sx={{
                                  backgroundColor: "#2c5282",
                                  color: "white",
                                  "& .MuiChip-deleteIcon": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                    "&:hover": { color: "white" },
                                  },
                                }}
                              />
                            ))
                          }
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "100%",
                                  opacity: selected ? 0.5 : 1,
                                }}
                              >
                                {option}
                                {selected && (
                                  <CheckCircleIcon
                                    sx={{
                                      ml: "auto",
                                      fontSize: 18,
                                      color: "#10b981",
                                    }}
                                  />
                                )}
                              </Box>
                            </li>
                          )}
                        />
                      </Grid>
                    )} */}

                    {/* Placeholder for other clients */}
                    {
                      // !isOutletClient &&
                      !isHubClient && (
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="Outlet / Hub"
                            fullWidth
                            size="small"
                            disabled
                            value=""
                            helperText="Select ECOSSENTIAL FOODS CORP or SPX EXPRESS"
                          />
                        </Grid>
                      )
                    }
                  </Grid>
                </CardContent>
              </Card>

              {/* Bank Details Section */}
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
                    Bank Account Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Mode of Disbursement *</InputLabel>
                        <Select
                          value={formData.modeOfDisbursement}
                          label="Mode of Disbursement *"
                          disabled={isApplicant}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleChange("modeOfDisbursement", value);
                            handleChange("accountNumber", "");
                          }}
                          error={!!formErrors.modeOfDisbursement}
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
                          <MenuItem value="SECURITY BANK">
                            SECURITY BANK
                          </MenuItem>
                          <MenuItem value="UNIONBANK">UNIONBANK</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Account Number *"
                        fullWidth
                        size="small"
                        value={formData.accountNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            "",
                          );
                          const maxLength =
                            accountMaxLengths[formData.modeOfDisbursement] ||
                            20;

                          if (
                            formData.modeOfDisbursement === "TBA" ||
                            value.length <= maxLength
                          ) {
                            handleChange("accountNumber", value);
                          }
                        }}
                        disabled={
                          isApplicant ||
                          !formData.modeOfDisbursement ||
                          formData.modeOfDisbursement === "TBA"
                        }
                        inputProps={{
                          inputMode: "text",
                          pattern: "[A-Za-z0-9]*",
                        }}
                        error={Boolean(formErrors.accountNumber)}
                        helperText={
                          isApplicant
                            ? "Account number is not required for applicants."
                            : formErrors.accountNumber
                              ? formErrors.accountNumber
                              : formData.modeOfDisbursement === "TBA"
                                ? "No account number required for TBA."
                                : !formData.modeOfDisbursement
                                  ? "Select Mode of Disbursement first"
                                  : `Must be ${
                                      accountMaxLengths[
                                        formData.modeOfDisbursement
                                      ]
                                    } characters`
                        }
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Document Upload Section */}
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
                    Document Upload
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
                      accept="image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                        Upload documents (Images, PDF, or Word files)
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
                          View All Files
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
                  Create Employee Account
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Modal for viewing photos */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: 900,
                maxHeight: "85vh",
                overflow: "auto",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Uploaded Files ({uploadedImageUrls.length})
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                {uploadedImageUrls.map((file, index) => {
                  const isImage =
                    typeof file === "string"
                      ? true
                      : file.type?.startsWith("image/");
                  const fileUrl = typeof file === "string" ? file : file.url;
                  const fileName =
                    typeof file === "string" ? `File ${index + 1}` : file.name;
                  const fileType =
                    typeof file === "string" ? "image" : file.type;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        sx={{
                          position: "relative",
                          border: "1px solid #e2e8f0",
                          borderRadius: 2,
                          overflow: "hidden",
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        {isImage ? (
                          <img
                            src={fileUrl}
                            alt={fileName}
                            style={{
                              width: "100%",
                              height: "220px",
                              objectFit: "contain", // Prevents compression/cropping
                              backgroundColor: "#ffffff",
                              padding: "8px",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "220px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 1,
                            }}
                          >
                            {fileType?.includes("pdf") ? (
                              <PictureAsPdfIcon
                                sx={{ fontSize: 56, color: "#ef4444" }}
                              />
                            ) : (
                              <DescriptionIcon
                                sx={{ fontSize: 56, color: "#2563eb" }}
                              />
                            )}
                            <Typography
                              variant="body2"
                              sx={{
                                px: 2,
                                textAlign: "center",
                                fontWeight: 500,
                                color: "#1e3a5f",
                              }}
                            >
                              {fileName}
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              href={fileUrl}
                              target="_blank"
                              sx={{ mt: 1 }}
                            >
                              View File
                            </Button>
                          </Box>
                        )}

                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 1)",
                              color: "#ef4444",
                            },
                          }}
                          onClick={() => {
                            setUploadedImageUrls((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>

                        {/* File name tooltip for images */}
                        {isImage && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: "rgba(0, 0, 0, 0.7)",
                              color: "white",
                              px: 1,
                              py: 0.5,
                            }}
                          >
                            <Typography variant="caption" noWrap>
                              {fileName}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
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
