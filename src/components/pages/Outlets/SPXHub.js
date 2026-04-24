import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Avatar,
  Fade,
  Backdrop,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterListIcon from "@mui/icons-material/FilterList";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import SPXlogo from "../../Images/Bmpower_Logo/BMP - SPX.jpg";

// ── Hubs by Region ────────────────────────────────────────────────────────────
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
  "MIN 2 Caraga": [
    "Surigao Downtown Hub",
    "Surigao Del Norte Hub",
    "Mainit Hub",
    "Cantilan Hub",
    "Butuan Hub",
    "Ampayon Hub",
    "Ambago Hub",
    "Buenavista Hub",
    "Cabadbaran Hub",
    "Bayugan Hub",
    "San Francisco Hub",
    "Taganaan Mobile Hub",
    "Placer Mobile Hub",
    "Malimono Mobile Hub",
    "Hinatuan Mobile Hub",
    "Lingig Mobile Hub",
    "Kitcharao Mobile Hub",
    "MB Crossing Hub",
    "RC Hub",
  ],
};

// ── Flat OUTLET_DATA ──────────────────────────────────────────────────────────
let _idCounter = 1;
export const OUTLET_DATA = Object.entries(HUBS_BY_REGION).flatMap(
  ([region, hubs]) =>
    hubs.map((hub) => ({
      id: _idCounter++,
      account: "SPX EXPRESS",
      region,
      outlet: hub,
    })),
);

// ── Constants ─────────────────────────────────────────────────────────────────
const REGION_COLORS = {
  "NCR 1 South": { bg: "#fff3e0", color: "#e65100" },
  "NCR 2 East": { bg: "#e3f2fd", color: "#1565c0" },
  "NCR 3 Central": { bg: "#f3e5f5", color: "#6a1b9a" },
  "NCR 4 North": { bg: "#e8f5e9", color: "#2e7d32" },
  "MIN 2 Caraga": { bg: "#fce4ec", color: "#880e4f" },
};
const SPX_BLUE = "#2e6385ff";
const SPX_DARK = "#0c2e3fff";

// ── Status category sets ──────────────────────────────────────────────────────
// These drive which date fields are enabled/disabled
const UNDEPLOY_STATUSES = ["Undeployed", "AWOL", "Resigned", "End of Contract"];
const DEPLOY_STATUSES = ["Deployed", "Shadowing training"];

// ── Resolve employee-level fields from deployStatus ───────────────────────────
// status  → "Active" | "Inactive"   (used by Employee Management)
// remarks → human-readable reason   (visible everywhere)
function resolveEmployeeFields(deployStatus) {
  switch (deployStatus) {
    case "Deployed":
    case "Shadowing training":
      return { status: "Active", remarks: "Employed" };
    case "Undeployed":
      return { status: "Inactive", remarks: "Undeployed" };
    case "AWOL":
      return { status: "Inactive", remarks: "AWOL" };
    case "Resigned":
      return { status: "Inactive", remarks: "Resigned" };
    case "End of Contract":
      return { status: "Inactive", remarks: "End of Contract" };
    default:
      return { status: "Active", remarks: "Employed" };
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function todayISO() {
  return new Date().toISOString().split("T")[0];
}
function findHub(outletName) {
  return OUTLET_DATA.find(
    (o) => o.outlet.trim().toLowerCase() === outletName?.trim().toLowerCase(),
  );
}

// ── Build assignment maps ─────────────────────────────────────────────────────
function buildAssignmentMaps(allData) {
  const spxAll = allData.filter(
    (e) => e.clientAssigned?.toUpperCase() === "SPX EXPRESS",
  );
  const activeRiders = spxAll.filter(
    (e) => e.status?.toLowerCase() === "active" && e.outlet,
  );
  const coordinators = spxAll.filter(
    (e) =>
      ["Tactical Coordinator", "Account Coordinator"].includes(e.position) &&
      e.status?.toLowerCase() === "active",
  );

  const hubAssignments = {};
  activeRiders.forEach((emp) => {
    const hub = findHub(emp.outlet);
    if (!hub) return;
    if (!hubAssignments[hub.id]) hubAssignments[hub.id] = { riders: [] };
    hubAssignments[hub.id].riders.push({
      employeeId: emp._id,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      position: emp.position,
      deployStatus: emp.deployStatus || "Undeployed",
      deployDate: emp.deployDate || null,
      undeployDate: emp.undeployDate || null,
    });
  });

  const coordAssignments = {};
  coordinators.forEach((emp) => {
    const hub = findHub(emp.outlet);
    if (hub) {
      coordAssignments[hub.id] = {
        employeeId: emp._id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        status: emp.deployStatus === "Deployed" ? "Active" : "Inactive",
      };
    }
  });

  const floatingRiders = spxAll.filter((e) => {
    if (e.status?.toLowerCase() !== "active") return false;
    if (["Tactical Coordinator", "Account Coordinator"].includes(e.position))
      return false;
    if (!e.outlet) return true;
    return !findHub(e.outlet);
  });

  return {
    activeRiders,
    coordinators,
    hubAssignments,
    coordAssignments,
    floatingRiders,
  };
}

function buildHubSummary(hubAssignments) {
  return Object.entries(hubAssignments).map(([hubId, data]) => {
    const hub = OUTLET_DATA.find((o) => o.id === parseInt(hubId));
    return {
      hubId: parseInt(hubId),
      hubName: hub?.outlet || "Unknown",
      region: hub?.region || "",
      riderCount: data.riders.length,
      deployedCount: data.riders.filter((r) => r.deployStatus === "Deployed")
        .length,
    };
  });
}

// ═════════════════════════════════════════════════════════════════════════════
export default function SPXHubs() {
  const [allSpxData, setAllSpxData] = useState([]);
  const [activeRiders, setActiveRiders] = useState([]);
  const [spxCoordinators, setSpxCoordinators] = useState([]);
  const [hubAssignments, setHubAssignments] = useState({});
  const [coordAssignments, setCoordAssignments] = useState({});
  const [floatingRiders, setFloatingRiders] = useState([]);

  const [filteredOutlets, setFilteredOutlets] = useState(OUTLET_DATA);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterRegion, setFilterRegion] = useState("ALL");

  // Hub modal
  const [openHubModal, setOpenHubModal] = useState(false);
  const [selectedHub, setSelectedHub] = useState(null);
  const [hubRiders, setHubRiders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [assignedCoordId, setAssignedCoordId] = useState("");
  const [coordStatus, setCoordStatus] = useState("Inactive");
  const [addRiderId, setAddRiderId] = useState("");
  const [addDeployDate, setAddDeployDate] = useState(todayISO());
  const [saveError, setSaveError] = useState("");

  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = localStorage.getItem("roleAccount");
  const canEdit = ["COORDINATOR", "MIS"].includes(role);
  const canAccessEdit =
    canEdit ||
    [
      "HR HEAD",
      "HR OFFICER",
      "HR SPECIALIST",
      "HR COORDINATOR SPECIALIST",
    ].includes(role);

  useEffect(() => {
    const check = () =>
      setSidebarOpen(localStorage.getItem("sidebarOpen") === "true");
    check();
    window.addEventListener("storage", check);
    const iv = setInterval(check, 100);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(iv);
    };
  }, []);

  const fetchAndApply = async () => {
    try {
      const { data } = await axios.get(
        "https://api-map.bmphrc.com/get-merch-accounts",
      );
      const { activeRiders, hubAssignments, coordAssignments, floatingRiders } =
        buildAssignmentMaps(data);
      setAllSpxData(
        data.filter((e) => e.clientAssigned?.toUpperCase() === "SPX EXPRESS"),
      );
      setActiveRiders(activeRiders);
      setHubAssignments(hubAssignments);
      setCoordAssignments(coordAssignments);
      setFloatingRiders(floatingRiders);
    } catch (e) {
      console.error("Error fetching:", e);
    }
  };

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const res = await axios.post(
          "https://api-map.bmphrc.com/get-coordinators",
        );
        setSpxCoordinators(res.data.data);
      } catch (err) {
        console.error("Failed to fetch coordinators", err);
      }
    };
    fetchCoordinators();
  }, []);

  useEffect(() => {
    fetchAndApply();
  }, []);

  // ── Filters ───────────────────────────────────────────────────────────────
  const applyFilters = (status, region) => {
    let result = OUTLET_DATA;
    if (region && region !== "ALL")
      result = result.filter((o) => o.region === region);
    if (status === "Has Riders")
      result = result.filter(
        (o) => (hubAssignments[o.id]?.riders?.length || 0) > 0,
      );
    else if (status === "No Riders")
      result = result.filter(
        (o) => (hubAssignments[o.id]?.riders?.length || 0) === 0,
      );
    setFilteredOutlets(result);
  };
  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
    applyFilters(e.target.value, filterRegion);
  };
  const handleRegionFilter = (e) => {
    setFilterRegion(e.target.value);
    applyFilters(filterStatus, e.target.value);
  };

  const handleOpenHub = (row) => {
    const hData = hubAssignments[row.id] || { riders: [] };
    const assignedCoord = spxCoordinators.find((c) =>
      Array.isArray(c.outlet)
        ? c.outlet.some(
            (o) => o.trim().toLowerCase() === row.outlet.trim().toLowerCase(),
          )
        : c.outlet?.trim().toLowerCase() === row.outlet.trim().toLowerCase(),
    );
    setSelectedHub(row);
    setHubRiders(
      hData.riders.map((r) => ({ ...r, _isNew: false, _toRemove: false })),
    );
    setAssignedCoordId(assignedCoord?._id || "");
    setCoordStatus("Active");
    setAddRiderId("");
    setAddDeployDate(todayISO());
    setSaveError("");
    setIsEditing(false);
    setOpenHubModal(true);
  };

  const handleCloseHubModal = () => {
    setOpenHubModal(false);
    setSelectedHub(null);
    setIsEditing(false);
    setAddRiderId("");
    setSaveError("");
  };

  const handleAddRider = () => {
    if (!addRiderId) {
      setSaveError("Please select a rider to add.");
      return;
    }
    if (hubRiders.find((r) => r.employeeId === addRiderId)) {
      setSaveError("This rider is already in this hub.");
      return;
    }
    const emp = allSpxData.find((e) => e._id === addRiderId);
    if (!emp) return;
    setHubRiders((prev) => [
      ...prev,
      {
        employeeId: emp._id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        position: emp.position,
        deployStatus: "Deployed",
        deployDate: addDeployDate,
        undeployDate: null,
        _isNew: true,
        _toRemove: false,
      },
    ]);
    setAddRiderId("");
    setAddDeployDate(todayISO());
    setSaveError("");
  };

  const handleMarkRemove = (empId) => {
    setHubRiders((prev) =>
      prev.map((r) =>
        r.employeeId === empId ? { ...r, _toRemove: !r._toRemove } : r,
      ),
    );
  };

  const handleUpdateDeployDate = (empId, date) => {
    setHubRiders((prev) =>
      prev.map((r) =>
        r.employeeId === empId ? { ...r, deployDate: date } : r,
      ),
    );
  };

  const handleUpdateUndeployDate = (empId, date) => {
    setHubRiders((prev) =>
      prev.map((r) =>
        r.employeeId === empId ? { ...r, undeployDate: date } : r,
      ),
    );
  };

  // ── Status change — clears the irrelevant date automatically ─────────────
  const handleUpdateStatus = (employeeId, newStatus) => {
    setHubRiders((prev) =>
      prev.map((r) => {
        if (r.employeeId !== employeeId) return r;
        const isUndeploy = UNDEPLOY_STATUSES.includes(newStatus);
        const isDeploy = DEPLOY_STATUSES.includes(newStatus);
        return {
          ...r,
          deployStatus: newStatus,
          // When switching to an undeploy status → clear deployDate, keep/set undeployDate
          // When switching to a deploy status   → clear undeployDate, keep/set deployDate
          deployDate: isUndeploy ? null : r.deployDate || addDeployDate,
          undeployDate: isDeploy ? null : r.undeployDate || todayISO(),
        };
      }),
    );
  };

  function resolveEmployeeStatus(deployStatus) {
    switch (deployStatus) {
      case "Deployed":
        return "Active";
      case "Shadowing training":
        return "Active";
      case "Resigned":
        return "Inactive";
      case "End of Contract":
        return "Inactive";
      case "AWOL":
        return "Inacitve";
      case "Undeployed":
        return "Inactive"; // still employed, just not deployed
      default:
        return "Active";
    }
  }

  // ── Save — pushes deployStatus, remarks AND status to DB ─────────────────
  const handleSave = async () => {
    setSaveError("");
    try {
      const adminFullName = localStorage.getItem("adminFullName");
      const today = todayISO();

      // 1. Remove riders marked for removal
      for (const r of hubRiders.filter((r) => r._toRemove && !r._isNew)) {
        await axios.put("https://api-map.bmphrc.com/remove-outlet-assignment", {
          outletName: selectedHub.outlet,
          employeeId: r.employeeId,
          remarks: "Resigned",
          dateResigned: today,
          updatedBy: adminFullName,
        });
      }

      // 2. Add new riders
      for (const r of hubRiders.filter((r) => r._isNew && !r._toRemove)) {
        const isUndeploy = UNDEPLOY_STATUSES.includes(r.deployStatus);
        const { status, remarks } = resolveEmployeeFields(r.deployStatus);

        await axios.put("https://api-map.bmphrc.com/assign-outlet-spx", {
          outletName: selectedHub.outlet,
          region: selectedHub.region,
          employeeId: r.employeeId,
          deployStatus: r.deployStatus || "Deployed",
          deployDate: !isUndeploy ? r.deployDate || today : null,
          undeployDate: isUndeploy ? r.undeployDate || today : null,
          updatedBy: adminFullName,
        });

        await axios.put("https://api-map.bmphrc.com/update-employee-status", {
          employeeId: r.employeeId,
          status: resolveEmployeeStatus(r.deployStatus),
          updatedBy: adminFullName,
        });

        // Sync status (Active / Inactive) + remarks to the employee record
        await axios.put("https://api-map.bmphrc.com/update-employee-remarks", {
          employeeId: r.employeeId,
          status,
          remarks,
          updatedBy: adminFullName,
        });
      }

      // 3. Update existing riders
      for (const r of hubRiders.filter((r) => !r._isNew && !r._toRemove)) {
        const isUndeploy = UNDEPLOY_STATUSES.includes(r.deployStatus);
        const { status, remarks } = resolveEmployeeFields(r.deployStatus);

        await axios.put("https://api-map.bmphrc.com/assign-outlet-spx", {
          outletName: selectedHub.outlet,
          region: selectedHub.region,
          employeeId: r.employeeId,
          deployStatus: r.deployStatus,
          deployDate: !isUndeploy ? r.deployDate || null : null,
          undeployDate: isUndeploy ? r.undeployDate || null : null,
          updatedBy: adminFullName,
        });

        await axios.put("https://api-map.bmphrc.com/update-employee-status", {
          employeeId: r.employeeId,
          status: resolveEmployeeStatus(r.deployStatus),
          updatedBy: adminFullName,
        });

        // Sync status (Active / Inactive) + remarks to the employee record
        await axios.put("https://api-map.bmphrc.com/update-employee-remarks", {
          employeeId: r.employeeId,
          status,
          remarks,
          updatedBy: adminFullName,
        });
      }

      // 4. Coordinator
      if (assignedCoordId) {
        await axios.put(
          "https://api-map.bmphrc.com/assign-coordinator-outlet",
          {
            adminUserId: assignedCoordId,
            outletName: selectedHub.outlet,
          },
        );
      }

      const [, coordRes] = await Promise.all([
        fetchAndApply(),
        axios.post("https://api-map.bmphrc.com/get-coordinators"),
      ]);
      setSpxCoordinators(coordRes.data.data);
      await fetchAndApply();
      alert("Hub assignment updated successfully!");
      handleCloseHubModal();
    } catch (err) {
      console.error("Error saving:", err);
      setSaveError("Failed to save. Please try again.");
    }
  };

  const availableRiders = allSpxData.filter(
    (e) =>
      e.status?.toLowerCase() === "active" &&
      !["Tactical Coordinator", "Account Coordinator"].includes(e.position) &&
      !hubRiders.find((r) => r.employeeId === e._id),
  );

  const totalRiders = activeRiders.length;
  const deployedRiders = activeRiders.filter(
    (r) => r.deployStatus === "Deployed",
  ).length;
  const hubsWithRiders = Object.values(hubAssignments).filter(
    (h) => h.riders.length > 0,
  ).length;

  const statusColors = {
    Deployed: "#2e7d32",
    Undeployed: "#d34005",
    AWOL: "#ed6c02",
    Resigned: "#d32f2f",
    "Shadowing training": "#1976d2",
    "End of Contract": "#8b0000",
  };

  // ── Toolbar ───────────────────────────────────────────────────────────────
  function CustomToolbar() {
    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <GridToolbarQuickFilter
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              borderRadius: "8px",
              "& fieldset": { borderColor: "#d0d0d0" },
              "&:hover fieldset": { borderColor: SPX_BLUE },
            },
          }}
        />
      </Box>
    );
  }

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 55,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "region",
      headerName: "Region",
      width: 155,
      renderCell: (p) => {
        const cfg = REGION_COLORS[p.row.region] || {
          bg: "#f5f5f5",
          color: "#666",
        };
        return (
          <Chip
            label={p.row.region}
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "11px",
              backgroundColor: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.color}40`,
            }}
          />
        );
      },
    },
    { field: "outlet", headerName: "Hub", width: 250 },
    {
      field: "riderCount",
      headerName: "Riders",
      width: 85,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => {
        const count = p.row._riderCount;
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Chip
              icon={<TwoWheelerIcon sx={{ fontSize: "13px !important" }} />}
              label={count}
              size="small"
              sx={{
                fontWeight: 700,
                minWidth: 50,
                backgroundColor: count > 0 ? SPX_BLUE : "#f5f5f5",
                color: count > 0 ? "white" : "#888",
                "& .MuiChip-icon": { color: count > 0 ? "white" : "#aaa" },
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "deployedCount",
      headerName: "Deployed",
      width: 95,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => {
        const count = p.row._deployedCount;
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Chip
              label={count}
              size="small"
              color={count > 0 ? "success" : "default"}
              sx={{ fontWeight: 700, minWidth: 40 }}
            />
          </Box>
        );
      },
    },
    {
      field: "riderNames",
      headerName: "Assigned Riders",
      flex: 1,
      minWidth: 280,
      renderCell: (p) => {
        const rList = p.row._riders || [];
        if (rList.length === 0)
          return (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", fontSize: "12px" }}
            >
              No riders assigned
            </Typography>
          );
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              gap: 0.35,
              py: 0.5,
            }}
          >
            {rList.slice(0, 3).map((r, i) => (
              <Box
                key={i}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <TwoWheelerIcon
                  sx={{
                    fontSize: 11,
                    color: statusColors[r.deployStatus] || "#2e7d32",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontSize: "11px", fontWeight: 500 }}
                >
                  {r.employeeName}
                </Typography>
                <Chip
                  label={r.deployStatus || "Undeployed"}
                  size="small"
                  sx={{
                    height: 13,
                    fontSize: "12px",
                    fontWeight: 600,
                    backgroundColor: statusColors[r.deployStatus]
                      ? `${statusColors[r.deployStatus]}15`
                      : "#2e7d32",
                    color: statusColors[r.deployStatus] || "#ffffff",
                  }}
                />
              </Box>
            ))}
            {rList.length > 3 && (
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "#999", fontStyle: "italic" }}
              >
                +{rList.length - 3} more…
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "coordinator",
      headerName: "Coordinator",
      width: 175,
      renderCell: (p) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          {p.row._coordName ? (
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {p.row._coordName}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic" }}
            >
              No coordinator
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 85,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => (
        <Tooltip title="View / Edit Hub">
          <span>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleOpenHub(p.row)}
              sx={{ "&:hover": { backgroundColor: `rgba(232,54,13,0.1)` } }}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
      ),
    },
  ];

  const rows = filteredOutlets.map((outlet, index) => {
    const hData = hubAssignments[outlet.id] || { riders: [] };
    const coord = spxCoordinators.find((c) =>
      Array.isArray(c.outlet)
        ? c.outlet.some(
            (o) =>
              o.trim().toLowerCase() === outlet.outlet.trim().toLowerCase(),
          )
        : c.outlet?.trim().toLowerCase() === outlet.outlet.trim().toLowerCase(),
    );
    return {
      ...outlet,
      count: index + 1,
      _riderCount: hData.riders.length,
      _deployedCount: hData.riders.filter((r) => r.deployStatus === "Deployed")
        .length,
      _riders: hData.riders,
      _coordName: coord ? `${coord.firstName} ${coord.lastName}` : "",
      _coordStatus: coord ? "Active" : "",
    };
  });

  // ══════════════════════════════════════════════════════════════════════════
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
        <Box sx={{ p: 3, maxWidth: "1800px", margin: "0 auto" }}>
          {/* ── Header ── */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              background: `linear-gradient(135deg, ${SPX_BLUE} 0%, ${SPX_DARK} 100%)`,
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={SPXlogo}
                  alt="SPX Logo"
                  sx={{
                    width: 80,
                    height: 80,
                    "& img": { objectFit: "contain" },
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 32, color: "white" }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: 700, mb: 0.5 }}
                  >
                    HUB LIST
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    SPX EXPRESS — All Regions
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {[
                  { label: "Total Hubs", value: OUTLET_DATA.length },
                  { label: "Hubs Active", value: hubsWithRiders },
                  { label: "Total Riders", value: totalRiders },
                  { label: "Deployed", value: deployedRiders },
                  { label: "Undeployed", value: floatingRiders.length },
                ].map((s) => (
                  <Box
                    key={s.label}
                    sx={{
                      textAlign: "center",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      px: 2.5,
                      py: 1,
                      minWidth: 80,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: "white", fontWeight: 800 }}
                    >
                      {s.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "rgba(255,255,255,0.8)", fontSize: "11px" }}
                    >
                      {s.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* ── Filter Bar ── */}
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
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 2,
              }}
            >
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Region</InputLabel>
                <Select
                  value={filterRegion}
                  onChange={handleRegionFilter}
                  label="Filter by Region"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                  startAdornment={
                    <LocationOnIcon
                      sx={{ color: "#bbb", mr: 1, fontSize: 20 }}
                    />
                  }
                >
                  <MenuItem value="ALL">All Regions</MenuItem>
                  {Object.keys(HUBS_BY_REGION).map((r) => (
                    <MenuItem key={r} value={r}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: REGION_COLORS[r]?.color || "#888",
                          }}
                        />
                        {r}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filter by Riders</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={handleStatusFilter}
                  label="Filter by Riders"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                  startAdornment={
                    <FilterListIcon
                      sx={{ color: "#bbb", mr: 1, fontSize: 20 }}
                    />
                  }
                >
                  <MenuItem value="ALL">All Hubs</MenuItem>
                  <MenuItem value="Has Riders">Has Riders</MenuItem>
                  <MenuItem value="No Riders">No Riders</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Chip
                  icon={<LocationOnIcon />}
                  label={`Showing: ${filteredOutlets.length} hubs`}
                  sx={{
                    height: 40,
                    fontSize: "14px",
                    fontWeight: 600,
                    px: 1,
                    backgroundColor: SPX_BLUE,
                    color: "white",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<PeopleAltIcon />}
                  onClick={() => setOpenSummaryModal(true)}
                  sx={{
                    height: 40,
                    backgroundColor: SPX_DARK,
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    px: 2.5,
                    "&:hover": { backgroundColor: SPX_BLUE },
                  }}
                >
                  Personnel Summary
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* ── DataGrid ── */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fafafa",
                borderBottom: "2px solid #e0e0e0",
                fontSize: "14px",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": { backgroundColor: "#f8f9fa" },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              rowHeight={72}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 20 } },
              }}
              slots={{ toolbar: CustomToolbar }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              pageSizeOptions={[10, 20, 50, 100]}
              disableRowSelectionOnClick
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
            />
          </Paper>

          {/* ══════════════════════════════════════════════════════
               HUB DETAIL MODAL
          ══════════════════════════════════════════════════════ */}
          <Modal
            open={openHubModal}
            onClose={handleCloseHubModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <Fade in={openHubModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: { xs: "95%", sm: "90%", md: "80%", lg: "72%" },
                  maxHeight: "92vh",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  borderRadius: "16px",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "10px",
                  },
                }}
              >
                {/* Modal Header */}
                <Box
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    background: `linear-gradient(135deg, ${SPX_BLUE} 0%, ${SPX_DARK} 100%)`,
                    p: 3,
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <TwoWheelerIcon sx={{ color: "white" }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: 700 }}
                      >
                        Hub Assignment
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        {isEditing ? "Edit Mode" : "View Mode"}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={handleCloseHubModal}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {selectedHub && (
                  <Box sx={{ p: 4 }}>
                    {/* Hub Info */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: SPX_BLUE,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BusinessIcon /> Hub Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Account"
                              fullWidth
                              size="small"
                              value={selectedHub.account || ""}
                              InputProps={{ readOnly: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Region"
                              fullWidth
                              size="small"
                              value={selectedHub.region || ""}
                              InputProps={{ readOnly: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="Hub"
                              fullWidth
                              size="small"
                              value={selectedHub.outlet || ""}
                              InputProps={{ readOnly: true }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Riders Card */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: SPX_BLUE,
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <TwoWheelerIcon />
                            Assigned Riders
                            <Chip
                              label={`${hubRiders.filter((r) => !r._toRemove).length} rider${hubRiders.filter((r) => !r._toRemove).length !== 1 ? "s" : ""}`}
                              size="small"
                              sx={{
                                ml: 1,
                                backgroundColor: SPX_BLUE,
                                color: "white",
                                fontWeight: 700,
                              }}
                            />
                          </Typography>
                          {!isEditing && canAccessEdit && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => setIsEditing(true)}
                              sx={{
                                borderColor: SPX_BLUE,
                                color: SPX_BLUE,
                                fontWeight: 600,
                                textTransform: "none",
                                borderRadius: "8px",
                                "&:hover": {
                                  backgroundColor: "rgba(232,54,13,0.06)",
                                  borderColor: SPX_DARK,
                                },
                              }}
                            >
                              Edit Riders
                            </Button>
                          )}
                        </Box>

                        {hubRiders.length === 0 ? (
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 4,
                              border: "1px dashed #ddd",
                              borderRadius: "10px",
                              backgroundColor: "#fafafa",
                            }}
                          >
                            <TwoWheelerIcon
                              sx={{ fontSize: 40, color: "#ccc", mb: 1 }}
                            />
                            <Typography variant="body2" sx={{ color: "#999" }}>
                              No riders assigned to this hub yet.
                            </Typography>
                          </Box>
                        ) : (
                          <TableContainer
                            component={Paper}
                            elevation={0}
                            sx={{
                              border: "1px solid #e0e0e0",
                              borderRadius: "10px",
                              overflow: "hidden",
                              mb: isEditing ? 2 : 0,
                            }}
                          >
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ backgroundColor: "#fafafa" }}>
                                  {/* # */}
                                  <TableCell
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      borderBottom: "2px solid #e0e0e0",
                                      width: 40,
                                    }}
                                  >
                                    #
                                  </TableCell>
                                  {/* Name */}
                                  <TableCell
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      borderBottom: "2px solid #e0e0e0",
                                    }}
                                  >
                                    Name
                                  </TableCell>
                                  {/* Position */}
                                  <TableCell
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      borderBottom: "2px solid #e0e0e0",
                                    }}
                                  >
                                    Position
                                  </TableCell>
                                  {/* Status */}
                                  <TableCell
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      borderBottom: "2px solid #e0e0e0",
                                      width: 180,
                                    }}
                                  >
                                    Status
                                  </TableCell>
                                  {/* Deploy Date */}
                                  <TableCell
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      borderBottom: "2px solid #e0e0e0",
                                      width: 155,
                                    }}
                                  >
                                    Start Date
                                  </TableCell>
                                  {/* ── NEW: Undeploy Date ── */}
                                  <TableCell
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: "12px",
                                      borderBottom: "2px solid #e0e0e0",
                                      width: 155,
                                    }}
                                  >
                                    End Date
                                  </TableCell>
                                  {/* Remove (edit only) */}
                                  {isEditing && (
                                    <TableCell
                                      sx={{
                                        fontWeight: 700,
                                        fontSize: "12px",
                                        borderBottom: "2px solid #e0e0e0",
                                        width: 70,
                                        textAlign: "center",
                                      }}
                                    >
                                      Remove
                                    </TableCell>
                                  )}
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {hubRiders.map((r, idx) => {
                                  const isUndeployStatus =
                                    UNDEPLOY_STATUSES.includes(r.deployStatus);
                                  const isDeployStatus =
                                    DEPLOY_STATUSES.includes(r.deployStatus);

                                  return (
                                    <TableRow
                                      key={r.employeeId}
                                      sx={{
                                        opacity: r._toRemove ? 0.45 : 1,
                                        backgroundColor: r._toRemove
                                          ? "#ffebee"
                                          : r._isNew
                                            ? "#f0fdf4"
                                            : "white",
                                        "&:last-child td": { borderBottom: 0 },
                                      }}
                                    >
                                      {/* # */}
                                      <TableCell
                                        sx={{ fontSize: "12px", color: "#666" }}
                                      >
                                        {idx + 1}
                                      </TableCell>

                                      {/* Name */}
                                      <TableCell>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.8,
                                          }}
                                        >
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              fontWeight: 600,
                                              fontSize: "12px",
                                              textDecoration: r._toRemove
                                                ? "line-through"
                                                : "none",
                                            }}
                                          >
                                            {r.employeeName}
                                          </Typography>
                                          {r._isNew && !r._toRemove && (
                                            <Chip
                                              label="New"
                                              size="small"
                                              color="success"
                                              sx={{
                                                height: 16,
                                                fontSize: "10px",
                                                fontWeight: 700,
                                              }}
                                            />
                                          )}
                                          {r._toRemove && (
                                            <Chip
                                              label="Will be removed"
                                              size="small"
                                              color="error"
                                              sx={{
                                                height: 16,
                                                fontSize: "9px",
                                                fontWeight: 700,
                                              }}
                                            />
                                          )}
                                        </Box>
                                      </TableCell>

                                      {/* Position */}
                                      <TableCell>
                                        <Typography
                                          variant="caption"
                                          sx={{ color: "#666" }}
                                        >
                                          {r.position || "—"}
                                        </Typography>
                                      </TableCell>

                                      {/* Status dropdown / chip */}
                                      <TableCell>
                                        {isEditing && !r._toRemove ? (
                                          <TextField
                                            select
                                            size="small"
                                            value={r.deployStatus || ""}
                                            onChange={(e) =>
                                              handleUpdateStatus(
                                                r.employeeId,
                                                e.target.value,
                                              )
                                            }
                                            sx={{
                                              minWidth: 170,
                                              "& .MuiInputBase-input": {
                                                fontSize: "12px",
                                                py: 0.6,
                                              },
                                            }}
                                          >
                                            <MenuItem value="">
                                              <em>Select Status</em>
                                            </MenuItem>
                                            <MenuItem value="Shadowing training">
                                              Shadow training
                                            </MenuItem>
                                            <MenuItem value="Deployed">
                                              Start Date
                                            </MenuItem>
                                            <MenuItem value="Undeployed">
                                              End Date
                                            </MenuItem>
                                            <MenuItem value="AWOL">
                                              AWOL
                                            </MenuItem>
                                            <MenuItem value="Resigned">
                                              Resigned
                                            </MenuItem>
                                            <MenuItem value="End of Contract">
                                              End of Contract
                                            </MenuItem>
                                          </TextField>
                                        ) : (
                                          <Chip
                                            label={
                                              r.deployStatus || "Undeployed"
                                            }
                                            size="small"
                                            sx={{
                                              height: 13,
                                              fontSize: "9px",
                                              fontWeight: 600,
                                              backgroundColor: statusColors[
                                                r.deployStatus
                                              ]
                                                ? `${statusColors[r.deployStatus]}15`
                                                : "#f5f5f5",
                                              color:
                                                statusColors[r.deployStatus] ||
                                                "#888",
                                            }}
                                          />
                                        )}
                                      </TableCell>

                                      {/* Deploy Date — disabled when undeploy status selected */}
                                      <TableCell>
                                        {isEditing && !r._toRemove ? (
                                          <Tooltip
                                            title={
                                              isUndeployStatus
                                                ? "Not applicable for this status"
                                                : ""
                                            }
                                          >
                                            <span>
                                              <TextField
                                                type="date"
                                                size="small"
                                                value={
                                                  r.deployDate
                                                    ? r.deployDate.split("T")[0]
                                                    : ""
                                                }
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                                disabled={isUndeployStatus}
                                                onChange={(e) =>
                                                  handleUpdateDeployDate(
                                                    r.employeeId,
                                                    e.target.value,
                                                  )
                                                }
                                                sx={{
                                                  "& .MuiInputBase-input": {
                                                    fontSize: "12px",
                                                    py: 0.6,
                                                  },
                                                  width: 145,
                                                  opacity: isUndeployStatus
                                                    ? 0.38
                                                    : 1,
                                                }}
                                              />
                                            </span>
                                          </Tooltip>
                                        ) : (
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#2e7d32" }}
                                          >
                                            {formatDate(r.deployDate)}
                                          </Typography>
                                        )}
                                      </TableCell>

                                      {/* ── Undeploy Date — disabled when deploy status selected ── */}
                                      <TableCell>
                                        {isEditing && !r._toRemove ? (
                                          <Tooltip
                                            title={
                                              isDeployStatus
                                                ? "Not applicable for this status"
                                                : ""
                                            }
                                          >
                                            <span>
                                              <TextField
                                                type="date"
                                                size="small"
                                                value={
                                                  r.undeployDate
                                                    ? r.undeployDate.split(
                                                        "T",
                                                      )[0]
                                                    : ""
                                                }
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                                disabled={isDeployStatus}
                                                onChange={(e) =>
                                                  handleUpdateUndeployDate(
                                                    r.employeeId,
                                                    e.target.value,
                                                  )
                                                }
                                                sx={{
                                                  "& .MuiInputBase-input": {
                                                    fontSize: "12px",
                                                    py: 0.6,
                                                  },
                                                  width: 145,
                                                  opacity: isDeployStatus
                                                    ? 0.38
                                                    : 1,
                                                }}
                                              />
                                            </span>
                                          </Tooltip>
                                        ) : (
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              color: r.undeployDate
                                                ? "#d34005"
                                                : "#bbb",
                                            }}
                                          >
                                            {formatDate(r.undeployDate)}
                                          </Typography>
                                        )}
                                      </TableCell>

                                      {/* Remove button */}
                                      {isEditing && (
                                        <TableCell sx={{ textAlign: "center" }}>
                                          <Tooltip
                                            title={
                                              r._toRemove ? "Undo" : "Remove"
                                            }
                                          >
                                            <IconButton
                                              size="small"
                                              onClick={() =>
                                                handleMarkRemove(r.employeeId)
                                              }
                                              sx={{
                                                color: r._toRemove
                                                  ? "#2e7d32"
                                                  : "#e53935",
                                                "&:hover": {
                                                  backgroundColor: r._toRemove
                                                    ? "#f0fdf4"
                                                    : "#ffebee",
                                                },
                                              }}
                                            >
                                              <RemoveCircleOutlineIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        </TableCell>
                                      )}
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}

                        {/* Add Rider */}
                        {isEditing && (
                          <Box
                            sx={{
                              border: "1.5px dashed #ccc",
                              borderRadius: "10px",
                              p: 2.5,
                              backgroundColor: "#fafafa",
                              mt: 2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                mb: 1.5,
                                color: "#444",
                                display: "flex",
                                alignItems: "center",
                                gap: 0.8,
                              }}
                            >
                              <AddIcon sx={{ fontSize: 18, color: SPX_BLUE }} />{" "}
                              Add Rider to Hub
                            </Typography>
                            <Grid container spacing={2} alignItems="flex-end">
                              <Grid item xs={12} sm={5}>
                                <FormControl fullWidth size="small">
                                  <InputLabel>Select Rider</InputLabel>
                                  <Select
                                    value={addRiderId}
                                    label="Select Rider"
                                    onChange={(e) => {
                                      setAddRiderId(e.target.value);
                                      setSaveError("");
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>— Select a rider —</em>
                                    </MenuItem>
                                    {availableRiders.length === 0 && (
                                      <MenuItem disabled>
                                        <em>No available riders</em>
                                      </MenuItem>
                                    )}
                                    {availableRiders.map((emp) => (
                                      <MenuItem key={emp._id} value={emp._id}>
                                        <Box>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              fontWeight: 600,
                                              fontSize: "13px",
                                            }}
                                          >
                                            {emp.firstName} {emp.lastName}
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: "#888" }}
                                          >
                                            {emp.position || "No position"}
                                            {emp.region
                                              ? ` · ${emp.region}`
                                              : ""}
                                            {emp.outlet
                                              ? ` · ${emp.outlet}`
                                              : " · No hub"}
                                          </Typography>
                                        </Box>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TextField
                                  label="Deploy Date"
                                  type="date"
                                  fullWidth
                                  size="small"
                                  value={addDeployDate}
                                  InputLabelProps={{ shrink: true }}
                                  onChange={(e) =>
                                    setAddDeployDate(e.target.value)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <EventIcon
                                        sx={{
                                          fontSize: 16,
                                          color: "#2e7d32",
                                          mr: 0.5,
                                        }}
                                      />
                                    ),
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  startIcon={<AddIcon />}
                                  onClick={handleAddRider}
                                  disabled={!addRiderId}
                                  sx={{
                                    backgroundColor: SPX_BLUE,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    "&:hover": { backgroundColor: SPX_DARK },
                                    "&.Mui-disabled": {
                                      backgroundColor: "#b0bec5",
                                      color: "white",
                                    },
                                  }}
                                >
                                  Add Rider
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        )}

                        {saveError && (
                          <Alert
                            severity="error"
                            sx={{ mt: 2, borderRadius: "8px" }}
                          >
                            {saveError}
                          </Alert>
                        )}
                      </CardContent>
                    </Card>

                    {/* Coordinator Card */}
                    <Card
                      elevation={0}
                      sx={{
                        mb: 3,
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "#64748b",
                            borderBottom: "1px solid #e2e8f0",
                            pb: 1,
                            mb: 2,
                          }}
                        >
                          Coordinator Assignment
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth size="small">
                                <InputLabel>Assign Coordinator</InputLabel>
                                <Select
                                  value={assignedCoordId || ""}
                                  label="Assign Coordinator"
                                  onChange={(e) =>
                                    setAssignedCoordId(e.target.value)
                                  }
                                >
                                  <MenuItem value="">
                                    <em>— No Coordinator —</em>
                                  </MenuItem>
                                  {spxCoordinators.map((emp) => (
                                    <MenuItem key={emp._id} value={emp._id}>
                                      {emp.firstName}{" "}
                                      {emp.middleName
                                        ? emp.middleName + " "
                                        : ""}
                                      {emp.lastName}
                                      {emp.position ? ` — ${emp.position}` : ""}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Assigned Coordinator"
                                fullWidth
                                size="small"
                                value={(() => {
                                  if (!assignedCoordId) return "No coordinator";
                                  const e = spxCoordinators.find(
                                    (c) => c._id === assignedCoordId,
                                  );
                                  return e
                                    ? `${e.firstName} ${e.lastName}${e.position ? " — " + e.position : ""}`
                                    : "No coordinator";
                                })()}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl
                                fullWidth
                                size="small"
                                disabled={!assignedCoordId}
                              >
                                <InputLabel>Coordinator Status</InputLabel>
                                <Select
                                  value={
                                    assignedCoordId ? coordStatus : "Inactive"
                                  }
                                  label="Coordinator Status"
                                  onChange={(e) =>
                                    setCoordStatus(e.target.value)
                                  }
                                >
                                  <MenuItem value="Active">Active</MenuItem>
                                  <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Coordinator Status"
                                fullWidth
                                size="small"
                                value={coordStatus || "Inactive"}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    {isEditing && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "center",
                          pt: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                          sx={{
                            backgroundColor: SPX_BLUE,
                            px: 4,
                            py: 1.5,
                            fontSize: "15px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            textTransform: "none",
                            boxShadow: `0 4px 12px ${SPX_BLUE}50`,
                            "&:hover": { backgroundColor: SPX_DARK },
                          }}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => {
                            setIsEditing(false);
                            setSaveError("");
                          }}
                          sx={{
                            borderColor: "#d32f2f",
                            color: "#d32f2f",
                            px: 4,
                            py: 1.5,
                            fontSize: "15px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "rgba(211,47,47,0.08)",
                              borderColor: "#c62828",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Fade>
          </Modal>

          {/* ══════════════════════════════════════════════════════
               PERSONNEL SUMMARY MODAL
          ══════════════════════════════════════════════════════ */}
          <Modal
            open={openSummaryModal}
            onClose={() => setOpenSummaryModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <Fade in={openSummaryModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: { xs: "98%", sm: "90%", md: "80%", lg: "70%" },
                  maxHeight: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                  borderRadius: "16px",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${SPX_BLUE} 0%, ${SPX_DARK} 100%)`,
                    p: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <PeopleAltIcon sx={{ color: "white" }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: 700 }}
                      >
                        Personnel Summary
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        SPX EXPRESS Riders Overview
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => setOpenSummaryModal(false)}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    py: 1.5,
                    backgroundColor: "#f8f9fa",
                    borderBottom: "1px solid #e0e0e0",
                    flexShrink: 0,
                    display: "flex",
                    gap: 1.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    icon={
                      <TwoWheelerIcon sx={{ fontSize: "15px !important" }} />
                    }
                    label={`Total Riders: ${totalRiders}`}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: SPX_BLUE,
                      color: "white",
                      "& .MuiChip-icon": { color: "white" },
                    }}
                  />
                  <Chip
                    icon={
                      <CheckCircleOutlineIcon
                        sx={{ fontSize: "15px !important" }}
                      />
                    }
                    label={`Deployed: ${deployedRiders}`}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    icon={
                      <WarningAmberIcon sx={{ fontSize: "15px !important" }} />
                    }
                    label={`Undeployed: ${floatingRiders.length}`}
                    color="warning"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    label={`Hubs Covered: ${hubsWithRiders}`}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ overflowY: "auto", flex: 1, px: 3, py: 2 }}>
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.5,
                      }}
                    >
                      <TwoWheelerIcon sx={{ color: SPX_BLUE, fontSize: 20 }} />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: SPX_BLUE }}
                      >
                        Riders by Hub
                      </Typography>
                      <Chip
                        label={`${hubsWithRiders} hubs`}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          height: 22,
                          backgroundColor: SPX_BLUE,
                          color: "white",
                        }}
                      />
                    </Box>
                    <TableContainer
                      component={Paper}
                      elevation={0}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#fafafa" }}>
                            {[
                              "#",
                              "Hub",
                              "Region",
                              "Total Riders",
                              "Deployed",
                            ].map((h) => (
                              <TableCell
                                key={h}
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  borderBottom: "2px solid #e0e0e0",
                                }}
                              >
                                {h}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {buildHubSummary(hubAssignments)
                            .sort(
                              (a, b) =>
                                a.region.localeCompare(b.region) ||
                                a.hubName.localeCompare(b.hubName),
                            )
                            .map((h, idx) => {
                              const rCfg = REGION_COLORS[h.region] || {
                                bg: "#f5f5f5",
                                color: "#666",
                              };
                              return (
                                <TableRow
                                  key={h.hubId}
                                  sx={{
                                    "&:hover": { backgroundColor: "#fafafa" },
                                    "&:last-child td": { borderBottom: 0 },
                                  }}
                                >
                                  <TableCell
                                    sx={{ fontSize: "12px", color: "#666" }}
                                  >
                                    {idx + 1}
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 600, fontSize: "12px" }}
                                    >
                                      {h.hubName}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={h.region}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        height: 18,
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        borderColor: rCfg.color,
                                        color: rCfg.color,
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={h.riderCount}
                                      size="small"
                                      sx={{
                                        fontWeight: 700,
                                        height: 20,
                                        backgroundColor: SPX_BLUE,
                                        color: "white",
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={h.deployedCount}
                                      size="small"
                                      color={
                                        h.deployedCount > 0
                                          ? "success"
                                          : "default"
                                      }
                                      sx={{ fontWeight: 600, height: 20 }}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.5,
                      }}
                    >
                      <WarningAmberIcon
                        sx={{ color: "#e65100", fontSize: 20 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: "#e65100" }}
                      >
                        Undeployed Riders
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            ml: 1,
                            color: "#888",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          (no hub or hub not in list)
                        </Typography>
                      </Typography>
                      <Chip
                        label={floatingRiders.length}
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 700, height: 22 }}
                      />
                    </Box>
                    {floatingRiders.length === 0 ? (
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 3,
                          border: "1px dashed #c8e6c9",
                          borderRadius: "10px",
                          backgroundColor: "#f0f7f4",
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{ color: "#2e7d32", fontSize: 36, mb: 1 }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#2e7d32", fontWeight: 600 }}
                        >
                          All riders are assigned to hubs!
                        </Typography>
                      </Box>
                    ) : (
                      <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                          border: "1px solid #ffe0b2",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#fff8f0" }}>
                              {[
                                "#",
                                "Name",
                                "Position",
                                "Current Hub",
                                "Remarks",
                              ].map((h) => (
                                <TableCell
                                  key={h}
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: "12px",
                                    color: "#e65100",
                                    borderBottom: "2px solid #ffcc80",
                                  }}
                                >
                                  {h}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {floatingRiders.map((emp, idx) => (
                              <TableRow
                                key={emp._id}
                                sx={{
                                  "&:hover": { backgroundColor: "#fff8f0" },
                                  "&:last-child td": { borderBottom: 0 },
                                }}
                              >
                                <TableCell
                                  sx={{ fontSize: "12px", color: "#666" }}
                                >
                                  {idx + 1}
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, fontSize: "12px" }}
                                  >
                                    {emp.firstName} {emp.lastName}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#666" }}
                                  >
                                    {emp.position || "—"}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "#888" }}
                                  >
                                    {emp.outlet || "—"}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={
                                      <WarningAmberIcon
                                        sx={{ fontSize: "13px !important" }}
                                      />
                                    }
                                    label="Not in Hub List"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#fff3e0",
                                      color: "#e65100",
                                      fontWeight: 600,
                                      fontSize: "11px",
                                      border: "1px solid #ffcc80",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
