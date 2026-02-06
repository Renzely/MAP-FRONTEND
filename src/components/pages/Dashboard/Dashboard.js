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
        filtered = employees.filter((a) => a.remarks === "resign");
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

  const [year, setYear] = useState("All");
  const yearOptions = [
    "All",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
  ];
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const companyClientsMap = {
    "BMPOWER HUMAN RESOURCES CORPORATION": [
      "BMPOWER HUMAN RESOURCES CORPORATION",
      "CONVIENCE STORE",
      "ECOSSENTIAL FOODS CORP",
      "ECOSSENTIAL FOODS CORP-COORDINATORS",
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

  const bmpowerBarData = getClientBarDataForLegend(
    "BMPOWER HUMAN RESOURCES CORPORATION",
  );
  const marabouBarData = getClientBarDataForLegend(
    "MARABOU EVERGREEN RESOURCES INC",
  );

  useEffect(() => {
    if (company === "All") {
      // Combine all clients from all companies
      const allClients = Object.values(companyClientsMap).flat();
      setClientList(allClients);
      setSelectedClient(""); // reset
    } else {
      setClientList(companyClientsMap[company] || []);
      setSelectedClient("");
    }
  }, [company]);

  // Set client list when company changes
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);

        const recentEmployeesCount = employees.filter(
          (a) => a.createdAt && isRecent(a.createdAt),
        ).length;

        setSummary({
          employed: 0,
          resign: 0,
          applicant: 0,
          terminate: 0,
          endContract: 0,
          recent: recentEmployeesCount,
        });

        setMonthlyData([]);

        let url = `http://192.168.68.50:3001/get-merch-accounts-dashboard`;
        const params = [];

        if (company !== "All") {
          params.push(`company=${encodeURIComponent(company.trim())}`);
        }

        if (year !== "All") {
          params.push(`year=${year}`);
        }

        if (selectedClient) {
          params.push(
            `clientAssigned=${encodeURIComponent(selectedClient.trim())}`,
          );
        }

        if (params.length) {
          url += `?${params.join("&")}`;
        }

        console.log("Fetching URL:", url);

        const response = await axios.get(url);
        const data = response.data;

        if (!Array.isArray(data)) return;

        const normalizedData = data.map((a) => ({
          ...a,
          remarks: a.remarks?.toLowerCase(),
          dateHired: a.dateHired ? new Date(a.dateHired) : null,
          dateResigned: a.dateResigned ? new Date(a.dateResigned) : null,
        }));

        setEmployees(normalizedData);

        // SUMMARY COUNTS
        setSummary({
          employed: normalizedData.filter((a) => a.remarks === "employed")
            .length,
          resign: normalizedData.filter((a) => a.remarks === "resign").length,
          applicant: normalizedData.filter((a) => a.remarks === "applicant")
            .length,
          terminate: normalizedData.filter((a) => a.remarks === "terminate")
            .length,
          endContract: normalizedData.filter(
            (a) => a.remarks === "end of contract",
          ).length,
        });

        // MONTHLY GRAPH
        const monthCounts = Array.from({ length: 12 }, () => ({
          employed: 0,
          resign: 0,
          applicant: 0,
          terminate: 0,
          endContract: 0,
        }));

        normalizedData.forEach((a) => {
          if (a.dateHired instanceof Date && !isNaN(a.dateHired)) {
            const monthIndex = a.dateHired.getMonth();
            if (monthCounts[monthIndex][a.remarks] !== undefined) {
              monthCounts[monthIndex][a.remarks]++;
            }
          }
        });

        setMonthlyData(
          monthCounts.map((data, i) => ({
            month: new Date(0, i).toLocaleString("default", { month: "short" }),
            ...data,
          })),
        );
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [company, selectedClient, year]);

  const getExportData = async () => {
    try {
      const response = await axios.post(
        "http://192.168.68.50:3001/export-merch-accounts",
        {
          //remarks: selectedRemarks, // optional filter
          // clientAssigned: "CARMENS BEST",
        },
      );

      const headers = [
        "#",
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
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="All">All Companies</MenuItem>
                {Object.keys(companyClientsMap).map((c) => (
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
                disabled={company === "All"}
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              >
                <MenuItem value="All Client">All Client</MenuItem>
                {clientList.map((c) => (
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
                    md: "repeat(5, 1fr)",
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
                          fill={bmpowerBarData.colors[index]}
                          name={
                            client.length > 20
                              ? `${client.substring(0, 20)}...`
                              : client
                          }
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
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
                          fill={marabouBarData.colors[index]}
                          name={
                            client.length > 20
                              ? `${client.substring(0, 20)}...`
                              : client
                          }
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
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
                  {modalData.length === 0 ? (
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
                            "&:last-child": {
                              borderBottom: "none",
                            },
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

                          {/* EMPLOYED */}
                          {modalTitle === "Employed" && emp.dateHired && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Hired Date:{" "}
                              {new Date(emp.dateHired)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {/* RESIGNED */}
                          {modalTitle === "Resigned" && emp.dateResigned && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Resigned Date:{" "}
                              {new Date(emp.dateResigned)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {/* TERMINATED */}
                          {modalTitle === "Terminated" && emp.dateResigned && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Terminated Date:{" "}
                              {new Date(emp.dateResigned)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {/* END OF CONTRACT */}
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
                          {/* APPLICANTS */}
                          {modalTitle === "Applicants" && emp.dateHired && (
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Applied Date:{" "}
                              {new Date(emp.dateHired)
                                .toISOString()
                                .slice(0, 10)}
                            </Typography>
                          )}
                          {/* RECENT EMPLOYEES */}
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
