import "./Dashboard.css";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  MenuItem,
  TextField,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { OUTLET_DATA } from "../../pages/Outlets/Outletlist";
import { HUBS_BY_REGION } from "../../pages/Outlets/SPXHub";
import axios from "axios";
import dayjs from "dayjs";

export default function Admin() {
  const XLSX = require("sheetjs-style");
  const [company, setCompany] = useState("All");
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateResignedError, setDateResignedError] = useState(false);
  const [outletSummary, setOutletSummary] = useState({
    withMerchandiser: 0,
    withoutMerchandiser: 0,
  });
  const [hubsSummary, setHubsSummary] = useState({
    withRider: 0,
    withoutRider: 0,
  });
  const role = localStorage.getItem("roleAccount");

  const POSITIONS_BY_CLIENT = {
    // BMPower Clients
    "BMPOWER HUMAN RESOURCES CORPORATION": [
      "Executive Director",
      "Operation Director",
      "Operation Head",
      "Sr. Account Supervisor",
      "Jr. Account Supervisor",
      "Account Supervisor",
      "Operation Officer",
      "Operation Admin",
      "Data Analyst",
      "Utility",
      "Treasury Head",
      "OIC Treasury",
      "Treasury Officer",
      "Treasury Assistant",
      "OIC Payroll and Billing",
      "Billing Officer",
      "Payroll Officer",
      "Payroll and Billing Officer",
      "Billing Specialist",
      "Billing Assistant",
      "Payroll Specialist",
      "HR Head",
      "HR Officer",
      "HR Coordinator",
      "HR Admin",
      "HR Liaison",
      "HR Recruitment Specialist",
      "HR Compensastion & Benefits Specialist",
      "Logistic Head",
      "SPX Coordinator",
      "Agency Coordinator",
      "Software Engineer",
      "Tech Support",
    ],

    "ECOSSENTIAL FOODS CORP": [
      "Merchandiser",
      "CVS Merchandiser",
      "Repacker",
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
    "BROLLEE EXCLUSIVE": ["Merchandiser"],
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
      "Delivery Helper",
      "PMS Booking",
      "HBR JR",
    ],
    MANDOM: ["Brand Ambassador"],
    ENGKANTO: ["Tactical Coordinator"],
    "ASIAN STREAK BROKERAGE CO": [
      "Messenger",
      "Driver",
      "Shipping Coordinator",
      "Accountant",
      "Declarant",
      "Processor",
    ],
    "PLDT TELESCOOP": ["Utility", "Office Staff"],
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
      "Executive Director",
      "Operation Director",
      "Operation Head",
      "Sr. Account Supervisor",
      "Jr. Account Supervisor",
      "Account Supervisor",
      "Operation Officer",
      "Operation Admin",
      "Data Analyst",
      "Utility",
      "Treasury Head",
      "OIC Treasury",
      "Treasury Officer",
      "Treasury Assistant",
      "OIC Payroll and Billing",
      "Billing Officer",
      "Payroll Officer",
      "Payroll and Billing Officer",
      "Billing Specialist",
      "Billing Assistant",
      "Payroll Specialist",
      "HR Head",
      "HR Officer",
      "HR Coordinator",
      "HR Admin",
      "HR Liaison",
      "HR Recruitment Specialist",
      "HR Compensastion & Benefits Specialist",
      "Logistic Head",
      "Agency Coordinator",
      "Software Engineer",
      "Tech Support",
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
      "Utility / Helper",
    ],
    "J-GYU INC": ["Admin Officer / Purchasing Staff", "Production Staff"],
    "CARMENS BEST": ["Tactical Coordinator", "Account Coordinator"],
    "METRO PACIFIC FRESH FARM": ["General Farmer"],
    "METRO PACIFIC DAIRY FARM": ["Feeder"],
    "UNIVERSAL HARVESTER DAIRY FARM INC": ["Tactical Coordinator"],
    "COSMETIQUE ASIA": ["Brand Ambassador", "Account Coordinator"],
  };

  const allowedRoles = [
    "HR HEAD",
    "HR SPECIALIST",
    "HR COMPENSATION AND BENEFITS",
    "HR COORDINATOR SPECIALIST",
    "MIS",
  ];

  const canEdit = allowedRoles.includes(role);

  // Listen to sidebar state from localStorage
  useEffect(() => {
    const checkSidebarState = () => {
      const isOpen = localStorage.getItem("sidebarOpen") === "true";
      setSidebarOpen(isOpen);
    };

    checkSidebarState();

    // Listen for storage changes
    window.addEventListener("storage", checkSidebarState);

    // Poll for changes (since localStorage doesn't trigger storage event in same window)
    const interval = setInterval(checkSidebarState, 100);

    return () => {
      window.removeEventListener("storage", checkSidebarState);
      clearInterval(interval);
    };
  }, []);

  const [summary, setSummary] = useState({
    employed: 0,
    resign: 0,
    applicant: 0,
    terminate: 0,
    endContract: 0,
    recent: 0,
  });

  const isRecent = (date) => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return new Date(date) >= sevenDaysAgo;
  };

  const handleOpenModal = (type) => {
    setModalTitle(type);

    let filtered = [];

    const matchType = type.toLowerCase();

    switch (matchType) {
      case "employed":
        filtered = employees.filter((a) => a.remarks === "employed");
        break;
      case "resigned":
        filtered = employees.filter((a) => a.remarks === "resigned"); // ← was "Resigned"
        break;
      case "applicants":
        filtered = employees.filter((a) => a.remarks === "applicant");
        break;
      case "terminated":
        filtered = employees.filter((a) => a.remarks === "terminate");
        break;
      case "end of contract":
        filtered = employees.filter((a) => a.remarks === "end of contract");
        break;
      case "recent employees":
        filtered = employees
          .filter((a) => a.createdAt && isRecent(a.createdAt))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setModalData(filtered);
    setOpenModal(true);
  };

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [yearOptions, setYearOptions] = useState([
    new Date().getFullYear().toString(),
  ]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyClientsMap = {
    "BMPOWER HUMAN RESOURCES CORPORATION": [
      "BMPOWER HUMAN RESOURCES CORPORATION",
      "PLDT TELESCOOP",
      "ECOSSENTIAL FOODS CORP",

      "BROLLEE EXCLUSIVE",
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

  // Generate unique colors for each client
  const generateColors = (count) => {
    const colors = [
      "#1976d2",
      "#2e7d32",
      "#d32f2f",
      "#f57c00",
      "#7b1fa2",
      "#512da8",
      "#303f9f",
      "#1976d2",
      "#0288d1",
      "#0097a7",
      "#00796b",
      "#388e3c",
      "#689f38",
      "#afb42b",
      "#fbc02d",
      "#ffa000",
      "#f57c00",
      "#e64a19",
      "#5d4037",
      "#616161",
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  };

  const getClientBarDataForLegend = (companyName) => {
    const clients = companyClientsMap[companyName] || [];
    const colors = generateColors(clients.length);

    // Create a single data object with each client as a separate property
    const dataObject = { category: companyName };

    clients.forEach((client, index) => {
      const headcount = employees.filter(
        (e) =>
          e.remarks === "employed" &&
          e.clientAssigned &&
          e.clientAssigned.trim().toLowerCase() === client.trim().toLowerCase(),
      ).length;

      dataObject[client] = headcount;
    });

    return {
      data: [dataObject],
      clients: clients,
      colors: colors,
    };
  };

  const [bmpowerBarData, setBmpowerBarData] = useState({
    data: [],
    clients: [],
    colors: [],
  });
  const [marabouBarData, setMarabouBarData] = useState({
    data: [],
    clients: [],
    colors: [],
  });

  const isSPXUser =
    role === "SPX COORDINATOR" ||
    role === "SPX HR SPECIALIST" ||
    role === "SPX OPERATION HEAD & LOGISTICS" ||
    role === "SPX ACCOUNT SUPERVISOR";

  const allowedCompany = isSPXUser
    ? ["BMPOWER HUMAN RESOURCES CORPORATION"]
    : Object.keys(companyClientsMap);

  const allowedClients = isSPXUser ? ["SPX EXPRESS"] : clientList;

  useEffect(() => {
    if (isSPXUser) {
      setCompany("BMPOWER HUMAN RESOURCES CORPORATION");
      setSelectedClient("SPX EXPRESS");
    }
  }, [isSPXUser]);

  useEffect(() => {
    if (company === "All") {
      const allClients = Object.values(companyClientsMap).flat();
      setClientList(allClients);

      // only reset if NOT SPX user
      if (!isSPXUser) {
        setSelectedClient("");
      }
    } else {
      setClientList(companyClientsMap[company] || []);

      // only reset if NOT SPX user
      if (!isSPXUser) {
        setSelectedClient("");
      }
    }
  }, [company]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setMonthlyData([]);

        const normalize = (v) => (v || "").toString().trim().toUpperCase();

        // ─────────────────────────────
        // SPX LOCK
        // ─────────────────────────────
        const finalCompany = isSPXUser
          ? "BMPOWER HUMAN RESOURCES CORPORATION"
          : company;

        const finalClient = isSPXUser ? "SPX EXPRESS" : selectedClient;

        // ─────────────────────────────
        // BUILD URL
        // ─────────────────────────────
        let url = `https://api-map.bmphrc.com/get-merch-accounts-dashboard`;
        const params = [];

        if (finalCompany !== "All") {
          params.push(`company=${encodeURIComponent(finalCompany.trim())}`);
        }

        if (year !== "All") {
          params.push(`year=${year}`);
        }

        if (finalClient) {
          params.push(
            `clientAssigned=${encodeURIComponent(finalClient.trim())}`,
          );
        }

        if (params.length) {
          url += `?${params.join("&")}`;
        }

        console.log("Fetching URL:", url);

        const response = await axios.get(url);
        const data = response.data;

        if (!Array.isArray(data)) return;

        // ─────────────────────────────
        // NORMALIZE
        // ─────────────────────────────
        const normalizedData = data.map((a) => ({
          ...a,
          remarks: normalize(a.remarks),
          _company: normalize(a.company),
          _client: normalize(a.clientAssigned),
          dateHired: a.dateHired ? new Date(a.dateHired) : null,
          dateResigned: a.dateResigned ? new Date(a.dateResigned) : null,
        }));

        setEmployees(normalizedData);

        const bmpowerData = normalizedData.filter(
          (emp) =>
            emp._company === "BMPOWER HUMAN RESOURCES CORPORATION" &&
            emp.remarks === "EMPLOYED",
        );
        const bmpowerClientMap = {};

        bmpowerData.forEach((emp) => {
          const client = emp._client || "UNKNOWN";

          bmpowerClientMap[client] = (bmpowerClientMap[client] || 0) + 1;
        });

        setBmpowerBarData({
          data: [{ category: "BMPOWER", ...bmpowerClientMap }],
          clients: Object.keys(bmpowerClientMap),
          colors: generateColors(Object.keys(bmpowerClientMap).length),
        });

        const marabouData = normalizedData.filter(
          (emp) =>
            emp._company === "MARABOU EVERGREEN RESOURCES INC" &&
            emp.remarks === "EMPLOYED",
        );

        const marabouClientMap = {};

        marabouData.forEach((emp) => {
          const client = emp.clientAssigned || "UNKNOWN";

          marabouClientMap[client] = (marabouClientMap[client] || 0) + 1;
        });

        setMarabouBarData({
          data: [{ category: "MARABOU", ...marabouClientMap }],
          clients: Object.keys(marabouClientMap),
          colors: generateColors(Object.keys(marabouClientMap).length),
        });

        // ─────────────────────────────
        // FILTER LOGIC (FIXED CORE ISSUE)
        // ─────────────────────────────
        const selectedCompany = normalize(company);
        const selectedClientNorm = normalize(selectedClient);

        const filteredData = normalizedData.filter((emp) => {
          const matchCompany =
            selectedCompany === "ALL" || emp._company === selectedCompany;

          const matchClient =
            selectedClientNorm === "ALL CLIENT" ||
            selectedClientNorm === "" ||
            emp._client === selectedClientNorm;

          return matchCompany && matchClient;
        });

        // ─────────────────────────────
        // RECENT EMPLOYEES
        // ─────────────────────────────
        const recentEmployeesCount = filteredData.filter(
          (a) => a.createdAt && isRecent(a.createdAt),
        ).length;

        // ─────────────────────────────
        // YEAR OPTIONS
        // ─────────────────────────────
        const years = [
          ...new Set(
            filteredData
              .flatMap((a) => [a.dateHired, a.dateResigned])
              .filter((d) => d instanceof Date && !isNaN(d))
              .map((d) => d.getFullYear().toString()),
          ),
        ].sort((a, b) => b - a);

        setYearOptions(["All", ...years]);

        // ─────────────────────────────
        // SUMMARY CARDS
        // ─────────────────────────────
        setSummary({
          employed: filteredData.filter((a) => a.remarks === "EMPLOYED").length,
          resign: filteredData.filter((a) => a.remarks === "RESIGNED").length,
          applicant: filteredData.filter((a) => a.remarks === "APPLICANT")
            .length,
          terminate: filteredData.filter((a) => a.remarks === "TERMINATE")
            .length,
          endContract: filteredData.filter(
            (a) => a.remarks === "END OF CONTRACT",
          ).length,
          recent: recentEmployeesCount,
        });

        // ─────────────────────────────
        // EFC OUTLETS
        // ─────────────────────────────
        const efcMerchandisers = filteredData.filter(
          (emp) =>
            emp.clientAssigned === "ECOSSENTIAL FOODS CORP" &&
            emp.remarks === "EMPLOYED",
        );

        const assignedOutlets = new Set();

        efcMerchandisers.forEach((emp) => {
          emp.outletsAssigned?.forEach((o) => assignedOutlets.add(o));
        });

        setOutletSummary({
          withMerchandiser: assignedOutlets.size,
          withoutMerchandiser: OUTLET_DATA.length - assignedOutlets.size,
        });

        // ─────────────────────────────
        // SPX HUBS
        // ─────────────────────────────
        const spxRiders = filteredData.filter(
          (emp) =>
            emp.clientAssigned === "SPX EXPRESS" && emp.remarks === "EMPLOYED",
        );

        const assignedHubs = new Set();

        spxRiders.forEach((emp) => {
          emp.outletsAssigned?.forEach((h) => assignedHubs.add(h));

          if (emp.outlet) {
            assignedHubs.add(emp.outlet);
          }
        });

        const totalHubs = Object.values(HUBS_BY_REGION).flat().length;

        setHubsSummary({
          withRider: assignedHubs.size,
          withoutRider: totalHubs - assignedHubs.size,
        });

        // ─────────────────────────────
        // MONTHLY GRAPH
        // ─────────────────────────────
        const monthCounts = Array.from({ length: 12 }, () => ({
          employed: 0,
          resign: 0,
          applicant: 0,
          terminate: 0,
          endContract: 0,
        }));

        filteredData.forEach((a) => {
          const relevantDate =
            a.remarks === "RESIGNED" ||
            a.remarks === "TERMINATE" ||
            a.remarks === "END OF CONTRACT"
              ? a.dateResigned
              : a.remarks === "APPLICANT"
                ? a.createdAt
                  ? new Date(a.createdAt)
                  : null
                : a.dateHired;

          if (relevantDate instanceof Date && !isNaN(relevantDate)) {
            const monthIndex = relevantDate.getMonth();

            const key =
              a.remarks === "RESIGNED"
                ? "resign"
                : a.remarks === "END OF CONTRACT"
                  ? "endContract"
                  : a.remarks.toLowerCase();

            if (monthCounts[monthIndex][key] !== undefined) {
              monthCounts[monthIndex][key]++;
            }
          }
        });

        const currentYear = new Date().getFullYear().toString();
        const currentMonth = new Date().getMonth();

        setMonthlyData(
          monthCounts.map((data, i) => ({
            month: new Date(0, i).toLocaleString("default", {
              month: "short",
            }),
            ...(year === currentYear && i > currentMonth
              ? {
                  employed: null,
                  resign: null,
                  applicant: null,
                  terminate: null,
                  endContract: null,
                }
              : data),
          })),
        );
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [company, selectedClient, year, isSPXUser]);

  const getExportData = async () => {
    try {
      const response = await axios.post(
        "https://api-map.bmphrc.com/export-merch-accounts",
        {
          //remarks: selectedRemarks, // optional filter
          // clientAssigned: "CARMENS BEST",
        },
      );

      const headers = [
        // "#",
        "Company",
        "Client",
        "EmployeeNo",
        "Fullname",
        "Status",
        "Remarks",
        "Position",
        "Contact",
        "Email",
        "Birthday",
        "Age",
        "DateHired",
        "DateResigned",
        "HomeAddress",
        "ModeOfDisbursement",
        "AccountNumber",
        "SSS",
        "PhilHealth",
        "HDMF",
        "Tin",
      ];

      const newData = response.data.data;

      // Generate XLSX file
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);

      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
      XLSX.utils.sheet_add_json(ws, newData, {
        origin: "A2",
        skipHeader: true,
        header: headers,
      });

      // Auto width
      ws["!cols"] = headers.map((h) => ({
        wch:
          Math.max(
            h.length,
            ...newData.map((row) => (row[h] || "").toString().length),
          ) + 4,
      }));

      // Header styling
      headers.forEach((_, col) => {
        const cell = XLSX.utils.encode_cell({ r: 0, c: col });
        if (ws[cell])
          ws[cell].s = {
            font: { bold: true },
            alignment: { horizontal: "center", vertical: "center" },
          };
      });

      XLSX.utils.book_append_sheet(wb, ws, "Employees");

      const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      alert(`Successfully exported ${newData.length} records!`);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `MASTERLIST_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Export failed. Please try again.");
    }
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
          paddingTop: "64px", // Account for fixed topbar
        }}
      >
        <Box
          sx={{
            p: 3,
            maxWidth: "1800px",
            margin: "0 auto",
          }}
        >
          {/* FILTERS */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              mb: 3,
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr auto",
                },
                gap: 2,
                alignItems: "center",
              }}
            >
              {/* COMPANY DROPDOWN */}
              <TextField
                select
                label="Select Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                fullWidth
                disabled={isSPXUser}
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="All">All Companies</MenuItem>

                {allowedCompany.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>

              {/* CLIENT DROPDOWN */}
              <TextField
                select
                label="Select Client"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                fullWidth
                disabled={isSPXUser || company === "All"}
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="All Client">All Client</MenuItem>

                {allowedClients.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>

              {/* EXPORT BUTTON */}
              <Button
                variant="contained"
                onClick={getExportData}
                sx={{
                  height: 56,
                  px: 3,
                  whiteSpace: "nowrap",
                  backgroundColor: "#2e6385ff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#0c2e3fff",
                  },
                }}
              >
                Export All
              </Button>
            </Box>
          </Paper>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress sx={{ color: "#2e6385ff" }} />
            </Box>
          ) : (
            <>
              {/* SUMMARY CARDS */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(auto-fit, minmax(180px, 1fr))",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                <SummaryCard
                  title="EMPLOYED"
                  value={summary.employed}
                  onClick={() => handleOpenModal("Employed")}
                  color="#4caf50"
                />
                <SummaryCard
                  title="APPLICANTS"
                  value={summary.applicant}
                  onClick={() => handleOpenModal("Applicants")}
                  color="#2196f3"
                />
                <SummaryCard
                  title="RESIGNED"
                  value={summary.resign}
                  onClick={() => handleOpenModal("Resigned")}
                  color="#ff9800"
                />
                <SummaryCard
                  title="TERMINATED"
                  value={summary.terminate}
                  onClick={() => handleOpenModal("Terminated")}
                  color="#f44336"
                />
                <SummaryCard
                  title="END OF CONTRACT"
                  value={summary.endContract}
                  onClick={() => handleOpenModal("End of Contract")}
                  color="#9c27b0"
                />
                {selectedClient === "SPX EXPRESS" && (
                  <>
                    <SummaryCard
                      title="HUBS WITH RIDER"
                      value={hubsSummary.withRider}
                      color="#00897b"
                    />

                    <SummaryCard
                      title="HUBS WITHOUT RIDER"
                      value={hubsSummary.withoutRider}
                      color="#e53935"
                    />
                  </>
                )}

                {/* Show only when EFC OUTLETS is selected */}
                {selectedClient === "ECOSSENTIAL FOODS CORP" && (
                  <>
                    <SummaryCard
                      title="OUTLETS WITH MERCHANDISER"
                      value={outletSummary.withMerchandiser}
                      color="#00897b"
                    />

                    <SummaryCard
                      title="OUTLETS WITHOUT MERCHANDISER"
                      value={outletSummary.withoutMerchandiser}
                      color="#e53935"
                    />
                  </>
                )}
              </Box>

              {/* GRAPH + RECENT EMPLOYEES */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "3fr 1.5fr",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                {/* HEADCOUNT OVERVIEW */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
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
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#2e6385ff",
                        fontWeight: 600,
                      }}
                    >
                      Headcount Overview
                    </Typography>

                    <TextField
                      select
                      label="Year"
                      size="small"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      sx={{
                        width: 140,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    >
                      {yearOptions.map((y) => (
                        <MenuItem key={y} value={y}>
                          {y === "All" ? "All Years" : y}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />

                      <Line
                        name="Employed"
                        type="monotone"
                        dataKey="employed"
                        stroke="#4caf50"
                        strokeWidth={3}
                      />
                      <Line
                        name="Resigned"
                        type="monotone"
                        dataKey="resign"
                        stroke="#ff9800"
                        strokeWidth={3}
                      />
                      <Line
                        name="Applicant"
                        type="monotone"
                        dataKey="applicant"
                        stroke="#2196f3"
                        strokeWidth={3}
                      />
                      <Line
                        name="Terminated"
                        type="monotone"
                        dataKey="terminate"
                        stroke="#f44336"
                        strokeWidth={3}
                      />
                      <Line
                        name="End of Contract"
                        type="monotone"
                        dataKey="endContract"
                        stroke="#9c27b0"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>

                {/* RECENT EMPLOYEES */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                    maxHeight: "400px",
                    overflowY: "auto",
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#2e6385ff",
                        fontWeight: 600,
                      }}
                    >
                      Recent Employees
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleOpenModal("Recent Employees")}
                      sx={{
                        color: "#2e6385ff",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      View All
                    </Button>
                  </Box>

                  {employees
                    .filter((e) => e.createdAt && isRecent(e.createdAt))
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .slice(0, 5)
                    .map((emp, i) => (
                      <Box
                        key={i}
                        sx={{
                          borderBottom: "1px solid #e0e0e0",
                          py: 1.5,
                          "&:last-child": {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#000",
                          }}
                        >
                          {emp.lastName}, {emp.firstName}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: 13,
                            color: "#555",
                            mt: 0.5,
                          }}
                        >
                          Created by: {emp.createdBy}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: 12,
                            color: "#777",
                          }}
                        >
                          {new Date(emp.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))}
                </Paper>
              </Box>

              {/* CLIENT HEADCOUNT BARCHARTS */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                {/* BMPOWER */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2e6385ff",
                      fontWeight: 600,
                      mb: 2,
                      fontSize: "14px",
                    }}
                  >
                    BMPOWER HUMAN RESOURCES CORPORATION - EMPLOYED PER CLIENT
                  </Typography>

                  {bmpowerBarData.clients.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={bmpowerBarData.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                          wrapperStyle={{ fontSize: "10px" }}
                          iconType="rect"
                        />

                        {bmpowerBarData.clients.map((client, index) => (
                          <Bar
                            key={client}
                            dataKey={client}
                            fill={
                              bmpowerBarData.colors[
                                index % bmpowerBarData.colors.length
                              ]
                            }
                            name={
                              client.length > 20
                                ? `${client.substring(0, 20)}...`
                                : client
                            }
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Typography sx={{ textAlign: "center", mt: 3 }}>
                      No BMPOWER data available
                    </Typography>
                  )}
                </Paper>

                {/* MARABOU */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2e6385ff",
                      fontWeight: 600,
                      mb: 2,
                      fontSize: "14px",
                    }}
                  >
                    MARABOU EVERGREEN RESOURCES INC - EMPLOYED PER CLIENT
                  </Typography>

                  {marabouBarData.clients.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={marabouBarData.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                          wrapperStyle={{ fontSize: "10px" }}
                          iconType="rect"
                        />

                        {marabouBarData.clients.map((client, index) => (
                          <Bar
                            key={client}
                            dataKey={client}
                            fill={
                              marabouBarData.colors[
                                index % marabouBarData.colors.length
                              ]
                            }
                            name={
                              client.length > 20
                                ? `${client.substring(0, 20)}...`
                                : client
                            }
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Typography sx={{ textAlign: "center", mt: 3 }}>
                      No Marabou data available
                    </Typography>
                  )}
                </Paper>
              </Box>

              {/* MODAL */}
              <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                fullWidth
                maxWidth="md"
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
                  {modalTitle}
                </DialogTitle>
                <DialogContent dividers>
                  {modalTitle === "Outlets With Merchandiser" ||
                  modalTitle === "Outlets Without Merchandiser" ? (
                    modalData.length === 0 ? (
                      <Typography sx={{ textAlign: "center", py: 3 }}>
                        No outlets found.
                      </Typography>
                    ) : (
                      modalData.map((outlet, i) => (
                        <Box
                          key={i}
                          sx={{
                            borderBottom: "1px solid #e0e0e0",
                            py: 1.5,
                            "&:last-child": { borderBottom: "none" },
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {outlet.outletName || outlet.name || outlet}
                          </Typography>
                          {outlet.address && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              {outlet.address}
                            </Typography>
                          )}
                        </Box>
                      ))
                    )
                  ) : modalData.length === 0 ? (
                    <Typography sx={{ textAlign: "center", py: 3 }}>
                      No employees found.
                    </Typography>
                  ) : (
                    modalData
                      .slice()
                      .sort((a, b) => {
                        let dateA, dateB;
                        switch (modalTitle) {
                          case "Employed":
                          case "Applicants":
                            dateA = a.dateHired;
                            dateB = b.dateHired;
                            break;
                          case "Resigned":
                          case "Terminated":
                          case "End of Contract":
                            dateA = a.dateResigned;
                            dateB = b.dateResigned;
                            break;
                          case "Recent Employees":
                            dateA = a.createdAt;
                            dateB = b.createdAt;
                            break;
                          default:
                            return 0;
                        }
                        return new Date(dateB) - new Date(dateA);
                      })
                      .map((emp, i) => (
                        <Box
                          key={emp._id || i}
                          sx={{
                            borderBottom: "1px solid #e0e0e0",
                            py: 2,
                            "&:last-child": { borderBottom: "none" },
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            {emp.lastName}, {emp.firstName} {emp.middleName}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#666" }}>
                            Client Assigned: {emp.clientAssigned}
                          </Typography>
                          {modalTitle === "Employed" && emp.dateHired && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Hired Date:{" "}
                              {new Date(emp.dateHired)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {modalTitle === "Resigned" && emp.dateResigned && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Resigned Date:{" "}
                              {new Date(emp.dateResigned)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {modalTitle === "Terminated" && emp.dateResigned && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Terminated Date:{" "}
                              {new Date(emp.dateResigned)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {modalTitle === "End of Contract" &&
                            emp.dateResigned && (
                              <Typography
                                variant="body2"
                                sx={{ color: "#666" }}
                              >
                                End Contract Date:{" "}
                                {new Date(emp.dateResigned)
                                  .toISOString()
                                  .slice(0, 10)}
                              </Typography>
                            )}
                          {modalTitle === "Applicants" && emp.dateHired && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Applied Date:{" "}
                              {new Date(emp.dateHired)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {modalTitle === "Recent Employees" && (
                            <>
                              <Typography
                                variant="body2"
                                sx={{ color: "#666" }}
                              >
                                Created By: {emp.createdBy}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "#666" }}
                              >
                                Date Created:{" "}
                                {new Date(emp.createdAt)
                                  .toISOString()
                                  .slice(0, 10)}
                              </Typography>
                            </>
                          )}
                        </Box>
                      ))
                  )}
                </DialogContent>

                <DialogActions>
                  <Button
                    onClick={() => setOpenModal(false)}
                    sx={{
                      color: "#2e6385ff",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

function SummaryCard({ title, value, onClick, color }) {
  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "12px",
        textAlign: "center",
        border: "1px solid #e0e0e0",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: color,
        },
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#666",
          fontSize: "14px",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: color,
          fontSize: "3rem",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}
