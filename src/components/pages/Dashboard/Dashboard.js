import "./Dashboard.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { MenuItem, TextField, Box, CircularProgress } from "@mui/material";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function Admin() {
  const [company, setCompany] = useState("BMPOWER HUMAN RESOURCES CORPORATION");
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [summary, setSummary] = useState({
    employed: 0,
    resign: 0,
    applicant: 0,
    terminate: 0,
    endContract: 0,
  });

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

  // Set client list when company changes
  useEffect(() => {
    setClientList(companyClientsMap[company] || []);
    setSelectedClient("");
  }, [company]);

  // MAIN FETCH: summary + graph
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);

        setSummary({
          employed: 0,
          resign: 0,
          applicant: 0,
          terminate: 0,
          endContract: 0,
        });

        setMonthlyData([]);

        let url = `https://api-map.bmphrc.com/get-merch-accounts-dashboard?company=${encodeURIComponent(
          company.trim()
        )}`;

        if (year !== "All") {
          url += `&year=${year}`;
        }

        if (selectedClient) {
          url += `&clientAssigned=${encodeURIComponent(selectedClient.trim())}`;
        }

        console.log("Fetching URL:", url);

        const response = await axios.get(url);
        const data = response.data;

        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          return;
        }

        const normalizedData = data.map((a) => ({
          ...a,
          remarks: a.remarks?.toLowerCase(),
          dateHired: a.dateHired ? new Date(a.dateHired) : null,
        }));

        // SUMMARY COUNTS
        const summaryCounts = {
          employed: normalizedData.filter((a) => a.remarks === "employed")
            .length,
          resign: normalizedData.filter((a) => a.remarks === "resign").length,
          applicant: normalizedData.filter((a) => a.remarks === "applicant")
            .length,
          terminate: normalizedData.filter((a) => a.remarks === "terminate")
            .length,
          endContract: normalizedData.filter(
            (a) => a.remarks === "end of contract"
          ).length,
        };

        setSummary(summaryCounts);

        // MONTHLY GRAPH DATA
        const monthCounts = Array(12)
          .fill(null)
          .map(() => ({
            employed: 0,
            resign: 0,
            applicant: 0,
            terminate: 0,
            endContract: 0,
          }));

        normalizedData.forEach((a) => {
          if (a.dateHired instanceof Date && !isNaN(a.dateHired)) {
            const monthIndex = a.dateHired.getMonth();

            switch (a.remarks) {
              case "employed":
                monthCounts[monthIndex].employed++;
                break;
              case "resign":
                monthCounts[monthIndex].resign++;
                break;
              case "terminate":
                monthCounts[monthIndex].terminate++;
                break;
              case "applicant":
                monthCounts[monthIndex].applicant++;
                break;
              case "end of contract":
                monthCounts[monthIndex].endContract++;
                break;
            }
          }
        });

        const monthly = monthCounts.map((data, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          ...data,
        }));

        setMonthlyData(monthly);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [company, selectedClient, year]);

  return (
    <div className="account">
      <Topbar />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />

        <Box
          sx={{
            flexGrow: 1,
            padding: { xs: "10px", sm: "20px" },
            overflow: "auto",
            backgroundColor: "#003554",
            color: "#fff",
            minHeight: "100vh",
          }}
        >
          {/* Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              select
              label="Select Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "#fff" }}
            >
              {Object.keys(companyClientsMap).map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select Client"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="">All</MenuItem>
              {clientList.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* SUMMARY CARDS */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                  mb: 4,
                }}
              >
                <SummaryCard title="Employed" value={summary.employed} />
                <SummaryCard title="Resigned" value={summary.resign} />
                <SummaryCard title="Applicants" value={summary.applicant} />
                <SummaryCard title="Terminated" value={summary.terminate} />
                <SummaryCard
                  title="End of Contract"
                  value={summary.endContract}
                />
              </Box>

              {/* GRAPH */}
              <Box sx={{ background: "#fff", p: 2, borderRadius: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <h3 style={{ color: "#000", marginBottom: "10px" }}>
                    Headcount Overview
                  </h3>

                  <TextField
                    select
                    label="Year"
                    size="small"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{ width: 140 }}
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
                      type="monotone"
                      dataKey="employed"
                      name="Employed"
                      stroke="#19d251"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="resign"
                      name="Resigned"
                      stroke="#d32f2f"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="applicant"
                      name="Applicants"
                      stroke="#0288d1"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="terminate"
                      name="Terminated"
                      stroke="#f57c00"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="endContract"
                      name="End of Contract"
                      stroke="#7b1fa2"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <Box
      sx={{
        background: "#fff",
        color: "#000",
        padding: 3,
        borderRadius: 2,
        textAlign: "center",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <h1 style={{ margin: 0, fontSize: "2.5rem" }}>{value}</h1>
    </Box>
  );
}
