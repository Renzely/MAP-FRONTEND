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
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EventIcon from "@mui/icons-material/Event";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import EFClogo from "../../Images/Bmpower_Logo/BMP - EFC.jpg";

// ── Outlet data ───────────────────────────────────────────────────────────────
export const OUTLET_DATA = [
  {
    id: 1,
    account: "AFPCES",
    outlet: "AFPCES - BNS C&X NAVAL GATE 3 FORT BONIFACIO",
  },
  { id: 2, account: "AFPCES", outlet: "AFPCES - FB C&X FORT BONIFACIO" },
  { id: 3, account: "AFPCES", outlet: "AFPCES - PAGADIAN" },
  { id: 4, account: "AFPCES", outlet: "AFPCES - PANACAN (0.25)" },
  { id: 5, account: "AFPCES", outlet: "AFPCES CAMP AGUINALDO" },
  { id: 6, account: "AFPCES", outlet: "AFPCES MALACANANG" },
  { id: 7, account: "AFPCES", outlet: "AFPCES V. LUNA" },
  { id: 8, account: "BROLLEE", outlet: "GAISANO CAPITAL - CASUNTINGAN" },
  { id: 9, account: "BROLLEE", outlet: "GAISANO CAPITAL - DANAO" },
  { id: 10, account: "BROLLEE", outlet: "GAISANO CAPITAL - MACTAN" },
  { id: 11, account: "BROLLEE", outlet: "GAISANO CAPITAL - OPM" },
  { id: 12, account: "BROLLEE", outlet: "GAISANO CAPITAL - SAVER'SMART BASAK" },
  { id: 13, account: "BROLLEE", outlet: "GAISANO CAPITAL - SOUTH" },
  { id: 14, account: "BROLLEE", outlet: "GAISANO CAPITAL - SRP" },
  { id: 15, account: "BROLLEE", outlet: "GAISANO CAPITAL - TISA" },
  { id: 16, account: "BROLLEE", outlet: "GAISANO GRAND - BALAMBAN" },
  { id: 17, account: "BROLLEE", outlet: "GAISANO GRAND - CARCAR" },
  { id: 18, account: "BROLLEE", outlet: "GAISANO GRAND - CORDOVA" },
  { id: 19, account: "BROLLEE", outlet: "GAISANO GRAND - DUMANJUG" },
  { id: 20, account: "BROLLEE", outlet: "GAISANO GRAND - FIESTA MALL" },
  { id: 21, account: "BROLLEE", outlet: "GAISANO GRAND - FIESTA MALL 2" },
  { id: 22, account: "BROLLEE", outlet: "GAISANO GRAND - LILOAN" },
  { id: 23, account: "BROLLEE", outlet: "GAISANO GRAND - MACTAN" },
  { id: 24, account: "BROLLEE", outlet: "GAISANO GRAND - MINGLANILLA" },
  { id: 25, account: "BROLLEE", outlet: "GAISANO GRAND - MOALBOAL" },
  { id: 26, account: "BROLLEE", outlet: "GAISANO GRAND - NORTH BASAK" },
  { id: 27, account: "BROLLEE", outlet: "GAISANO GRAND - TALAMBAN" },
  { id: 28, account: "BROLLEE", outlet: "GAISANO METRO - BANILAD" },
  { id: 29, account: "BROLLEE", outlet: "GAISANO METRO - COLON-1" },
  { id: 30, account: "BROLLEE", outlet: "GAISANO METRO - COLON-2" },
  { id: 31, account: "BROLLEE", outlet: "GAISANO METRO - IT PARK" },
  { id: 32, account: "BROLLEE", outlet: "GAISANO METRO - MANDAUE" },
  { id: 33, account: "BROLLEE", outlet: "GAISANO METRO - NAGA" },
  { id: 34, account: "BROLLEE", outlet: "GAISANO METRO - TANKE" },
];

// ── Applicant Status pipeline ─────────────────────────────────────────────────
export const APPLICANT_STATUS_OPTIONS = [
  {
    value: "For Pooling",
    label: "For Pooling",
    color: "#78909c",
    bg: "#eceff1",
    description: "Outlet is vacant — waiting for applicant",
  },
  {
    value: "Applicant Endorsed",
    label: "Applicant Endorsed",
    color: "#1565c0",
    bg: "#e3f2fd",
    description: "Applicant endorsed for this outlet",
  },
  {
    value: "Interview Done",
    label: "Interview Done",
    color: "#6a1b9a",
    bg: "#f3e5f5",
    description: "Applicant completed the interview",
  },
  {
    value: "For Onboarding",
    label: "For Onboarding",
    color: "#e65100",
    bg: "#fff3e0",
    description: "Applicant cleared — awaiting onboarding",
  },
  {
    value: "Onboarded",
    label: "Onboarded",
    color: "#2e7d32",
    bg: "#e8f5e9",
    description: "Onboarded — ready for deployment",
  },
];

// Stages where applicant dropdown is shown
const APPLICANT_STAGES = [
  "Applicant Endorsed",
  "Interview Done",
  "For Onboarding",
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getApplicantStatusConfig(value) {
  return (
    APPLICANT_STATUS_OPTIONS.find((o) => o.value === value) || {
      value: "",
      label: "—",
      color: "#bbb",
      bg: "#fafafa",
    }
  );
}
// Deploy is unlocked when:
//  1. Role is ACCOUNT SUPERVISOR or MIS → always free to manage deploy/undeploy
//  2. applicantStatus is empty → already-employed person, no pipeline active
//  3. applicantStatus is "Onboarded" → applicant completed pipeline, ready to deploy
function isDeployUnlocked(applicantStatus, role) {
  if (["ACCOUNT SUPERVISOR", "MIS"].includes(role)) return true;
  if (!applicantStatus || applicantStatus === "") return true;
  return applicantStatus === "Onboarded";
}
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
function calcDaysUndeployed(undeployDate, deployStatus) {
  if (deployStatus === "Deployed" || !undeployDate) return null;
  const from = new Date(undeployDate);
  if (isNaN(from)) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  from.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - from) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? diff : 0;
}
function getDaysBadgeColor(days) {
  if (days === null) return null;
  if (days <= 7) return { bg: "#fff9c4", color: "#f57f17", border: "#ffe082" };
  if (days <= 30) return { bg: "#ffe0b2", color: "#e65100", border: "#ffcc80" };
  return { bg: "#ffcdd2", color: "#b71c1c", border: "#ef9a9a" };
}
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// ── Build assignment maps ─────────────────────────────────────────────────────
// Each outlet can have:
//   assignments[id].employeeId        → current deployed/assigned employee
//   assignments[id].incomingApplicantId → applicant being tracked in pipeline
//                                          (separate from current employee)
function buildAssignmentMaps(allData) {
  const efcAll = allData.filter(
    (e) => e.clientAssigned?.toUpperCase() === "ECOSSENTIAL FOODS CORP",
  );

  const merchandisers = efcAll.filter(
    (e) =>
      ["Merchandiser", "CVS Merchandiser", "Repacker"].includes(e.position) &&
      e.status?.toLowerCase() === "active",
  );
  const efcApplicants = efcAll.filter(
    (e) =>
      ["Merchandiser", "CVS Merchandiser", "Repacker"].includes(e.position) &&
      e.status?.toLowerCase() === "applicant",
  );
  const coordinators = efcAll.filter(
    (e) =>
      ["Tactical Coordinator", "Account Coordinator"].includes(e.position) &&
      e.status?.toLowerCase() === "active",
  );

  const assignments = {};

  // 1. Map employed merchandisers first
  merchandisers.forEach((emp) => {
    const names = new Set();
    if (emp.outletsAssigned?.length > 0)
      emp.outletsAssigned.forEach((n) => names.add(n));
    if (names.size === 0 && emp.outletAssignmentHistory?.length > 0) {
      const lat =
        emp.outletAssignmentHistory[emp.outletAssignmentHistory.length - 1];
      if (lat?.outletName) names.add(lat.outletName);
    }
    names.forEach((outletName) => {
      const m = OUTLET_DATA.find((o) => o.outlet === outletName);
      if (m) {
        assignments[m.id] = {
          employeeId: emp._id,
          employeeName: `${emp.firstName} ${emp.lastName}`,
          deployStatus: emp.deployStatus || "Undeployed",
          deployDate: emp.deployDate || null,
          undeployDate: emp.undeployDate || null,
          applicantStatus: emp.applicantStatus || "",
          isApplicant: false,
          incomingApplicantId: null,
          incomingApplicantName: null,
          incomingApplicantStatus: "",
        };
      }
    });
  });

  // 2. Map applicants
  //    If outlet already has employed → attach as incomingApplicant (pipeline tracking)
  //    If outlet has no employee yet  → make applicant the primary assignment
  efcApplicants.forEach((emp) => {
    const names = new Set();
    if (emp.outletsAssigned?.length > 0)
      emp.outletsAssigned.forEach((n) => names.add(n));
    if (names.size === 0 && emp.outletAssignmentHistory?.length > 0) {
      const lat =
        emp.outletAssignmentHistory[emp.outletAssignmentHistory.length - 1];
      if (lat?.outletName) names.add(lat.outletName);
    }
    names.forEach((outletName) => {
      const m = OUTLET_DATA.find((o) => o.outlet === outletName);
      if (!m) return;
      if (assignments[m.id]) {
        // Outlet already has a deployed employee — attach applicant as incoming
        assignments[m.id].incomingApplicantId = emp._id;
        assignments[m.id].incomingApplicantName =
          `${emp.firstName} ${emp.lastName}`;
        assignments[m.id].incomingApplicantStatus = emp.applicantStatus || "";
      } else {
        assignments[m.id] = {
          employeeId: emp._id,
          employeeName: `${emp.firstName} ${emp.lastName}`,
          deployStatus: emp.deployStatus || "Undeployed",
          deployDate: emp.deployDate || null,
          undeployDate: emp.undeployDate || null,
          applicantStatus: emp.applicantStatus || "",
          isApplicant: true,
          incomingApplicantId: null,
          incomingApplicantName: null,
          incomingApplicantStatus: "",
        };
      }
    });
  });

  const coordAssignments = {};
  coordinators.forEach((emp) => {
    if (emp.outletsAssigned?.length > 0) {
      emp.outletsAssigned.forEach((outletName) => {
        const m = OUTLET_DATA.find((o) => o.outlet === outletName);
        if (m) {
          const safeKey = outletName.replace(/\./g, "_");
          coordAssignments[m.id] = {
            employeeId: emp._id,
            employeeName: `${emp.firstName} ${emp.lastName}`,
            status: emp.outletStatusMap?.[safeKey] || "Active",
          };
        }
      });
    }
  });

  return {
    merchandisers,
    coordinators,
    assignments,
    coordAssignments,
    efcApplicants,
  };
}

// ── Build summary data ────────────────────────────────────────────────────────
function buildSummaryData(employees, outletAssignments, type = "MERCHANDISER") {
  const map = {};
  Object.entries(outletAssignments).forEach(([outletId, a]) => {
    const empId = a.employeeId;
    const info = OUTLET_DATA.find((o) => o.id === parseInt(outletId));
    if (!info) return;
    if (!map[empId])
      map[empId] = {
        employeeId: empId,
        employeeName: a.employeeName,
        outlets: [],
        status: a.deployStatus || a.status,
      };
    map[empId].outlets.push({
      outletName: info.outlet,
      account: info.account,
      status: type === "MERCHANDISER" ? a.deployStatus : a.status,
    });
  });
  const assigned = Object.values(map).sort((a, b) =>
    a.employeeName.localeCompare(b.employeeName),
  );
  const assignedIds = new Set(Object.keys(map));
  const floating = employees
    .filter((e) => !assignedIds.has(e._id))
    .map((e) => ({
      employeeId: e._id,
      employeeName: `${e.firstName} ${e.lastName}`,
      outlets: [],
      position: e.position || "",
    }))
    .sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  return { assigned, floating };
}

// ═════════════════════════════════════════════════════════════════════════════
export default function OutletList() {
  const [efcEmployees, setEfcEmployees] = useState([]);
  const [efcApplicants, setEfcApplicants] = useState([]);
  const [efcCoordinators, setEfcCoordinators] = useState([]);
  const [outletAssignments, setOutletAssignments] = useState({});
  const [coordinatorAssignments, setCoordinatorAssignments] = useState({});
  const [filteredOutlets, setFilteredOutlets] = useState(OUTLET_DATA);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [assignMode, setAssignMode] = useState("employed"); // "employed" | "applicant"
  const [showIncomingSection, setShowIncomingSection] = useState(false); // manually opened by "Add Incoming Applicant" button
  const [previousEmployeeRemarks, setPreviousEmployeeRemarks] = useState(""); // remarks for removed employee on onboarding
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateError, setDateError] = useState("");
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const [summaryFilter, setSummaryFilter] = useState("MERCHANDISER");

  const role = localStorage.getItem("roleAccount");
  const canEdit = ["ACCOUNT SUPERVISOR", "MIS"].includes(role);
  const canSetApplicantStatus = [
    "MIS",
    "HR HEAD",
    "HR OFFICER",
    "HR SPECIALIST",
    "HR COORDINATOR SPECIALIST",
  ].includes(role);
  const canSetOnboarded = ["ACCOUNT SUPERVISOR", "MIS"].includes(role);
  const canAccessEdit = canEdit || canSetApplicantStatus || canSetOnboarded;

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
      const {
        merchandisers,
        coordinators,
        assignments,
        coordAssignments,
        efcApplicants,
      } = buildAssignmentMaps(data);
      setEfcEmployees(merchandisers);
      setEfcApplicants(efcApplicants);
      setEfcCoordinators(coordinators);
      setOutletAssignments(assignments);
      setCoordinatorAssignments(coordAssignments);
    } catch (e) {
      console.error("Error fetching:", e);
    }
  };
  useEffect(() => {
    fetchAndApply();
  }, []);

  const summaryData =
    summaryFilter === "MERCHANDISER"
      ? buildSummaryData(efcEmployees, outletAssignments, "MERCHANDISER")
      : buildSummaryData(
          efcCoordinators,
          coordinatorAssignments,
          "COORDINATOR",
        );

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
              "&:hover fieldset": { borderColor: "#2e6385ff" },
            },
          }}
        />
      </Box>
    );
  }

  const handleStatusFilter = (e) => {
    const v = e.target.value;
    setFilterStatus(v);
    if (!v || v === "ALL") setFilteredOutlets(OUTLET_DATA);
    else if (v === "Deployed")
      setFilteredOutlets(
        OUTLET_DATA.filter(
          (o) => outletAssignments[o.id]?.deployStatus === "Deployed",
        ),
      );
    else if (v === "Undeployed")
      setFilteredOutlets(
        OUTLET_DATA.filter(
          (o) =>
            !outletAssignments[o.id] ||
            outletAssignments[o.id]?.deployStatus === "Undeployed",
        ),
      );
  };

  const handleEdit = (outletRow) => {
    const a = outletAssignments[outletRow.id];
    const co = coordinatorAssignments[outletRow.id];
    setSelectedOutlet({
      outletId: outletRow.id,
      outletName: outletRow.outlet,
      accountName: outletRow.account,
      // ── Current employee ──────────────────────────────────────
      assignedEmployeeId: a?.employeeId || "",
      deployStatus: a?.deployStatus || "Undeployed",
      deployDate: a?.deployDate
        ? new Date(a.deployDate).toISOString().split("T")[0]
        : "",
      undeployDate: a?.undeployDate
        ? new Date(a.undeployDate).toISOString().split("T")[0]
        : "",
      applicantStatus: a?.applicantStatus || "",
      _originalDeployStatus: a?.deployStatus || "Undeployed",
      _isApplicant: a?.isApplicant || false,
      // ── Incoming applicant pipeline ───────────────────────────
      incomingApplicantId: a?.incomingApplicantId || "",
      incomingApplicantStatus: a?.incomingApplicantStatus || "",
      incomingDeployDate: "",
      // ── Coordinator ──────────────────────────────────────────
      assignedCoordinatorId: co?.employeeId || "",
      coordinatorDeployStatus: co ? co.status : "Inactive",
    });
    setDateError("");
    setIsEditing(false);
    // Set assignMode based on current assignment: applicant or employed
    // Set assignMode: if outlet has existing assignment use its type,
    // otherwise default based on role — Account Supervisor → employed, HR → applicant
    const defaultMode = a?.isApplicant
      ? "applicant"
      : canEdit
        ? "employed"
        : "applicant";
    setAssignMode(defaultMode);
    // Auto-show Section 2 if incoming pipeline already exists in DB
    setShowIncomingSection(
      !!(a?.incomingApplicantId || a?.incomingApplicantStatus),
    );
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedOutlet(null);
    setIsEditing(false);
    setAssignMode("employed");
    setShowIncomingSection(false);
    setPreviousEmployeeRemarks("");
    setDateError("");
  };

  const validateDates = (data) => {
    // If incoming applicant is being onboarded, require incomingDeployDate AND previousEmployeeRemarks
    if (
      data.incomingApplicantId &&
      data.incomingApplicantStatus === "Onboarded"
    ) {
      if (!data.incomingDeployDate) {
        setDateError("Please select a Deploy Date for the incoming applicant.");
        return false;
      }
      if (data.assignedEmployeeId && !previousEmployeeRemarks) {
        setDateError(
          "Please select a Remarks for the previous employee before saving.",
        );
        return false;
      }
      setDateError("");
      return true;
    }
    if (!data.assignedEmployeeId) return true;
    if (data.deployStatus === "Deployed") {
      if (!isDeployUnlocked(data.applicantStatus, role)) {
        setDateError(
          'Deployment is locked. Applicant Status must be "Onboarded" before deploying.',
        );
        return false;
      }
      if (!data.deployDate) {
        setDateError("Please select a Deploy Date before saving.");
        return false;
      }
    }
    if (
      data.deployStatus === "Undeployed" &&
      data._originalDeployStatus === "Deployed" &&
      !data.undeployDate
    ) {
      setDateError("Please select an Undeploy Date before saving.");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleSaveChanges = async (data) => {
    if (!validateDates(data)) return;
    // ── DEBUG: log the data being saved ──────────────────────────────────────
    console.log("[handleSaveChanges] data:", {
      assignedEmployeeId: data.assignedEmployeeId,
      incomingApplicantId: data.incomingApplicantId,
      incomingApplicantStatus: data.incomingApplicantStatus,
      incomingDeployDate: data.incomingDeployDate,
      deployStatus: data.deployStatus,
      previousEmployeeRemarks,
    });
    // ─────────────────────────────────────────────────────────────────────────
    try {
      const adminFullName = localStorage.getItem("adminFullName");
      const today = todayISO();

      // Safety check: if status is Onboarded but no applicant selected, block save
      if (
        data.incomingApplicantStatus === "Onboarded" &&
        !data.incomingApplicantId
      ) {
        setDateError(
          "Please select the incoming applicant from the dropdown before saving.",
        );
        return;
      }

      const isIncomingOnboarded =
        data.incomingApplicantId &&
        data.incomingApplicantStatus === "Onboarded";

      if (isIncomingOnboarded) {
        // ── SCENARIO: Incoming applicant is onboarded ──────────────────────
        // 1. Remove previous employee — set Inactive + selected remarks + dateResigned today
        if (data.assignedEmployeeId) {
          await axios.put(
            "https://api-map.bmphrc.com/remove-outlet-assignment",
            {
              outletName: data.outletName,
              employeeId: data.assignedEmployeeId,
              remarks: previousEmployeeRemarks || "Resign",
              dateResigned: today,
              updatedBy: adminFullName,
            },
          );
        }
        // 2. Assign incoming applicant as new deployed employee
        await axios.put("https://api-map.bmphrc.com/assign-outlet", {
          outletId: data.outletId,
          outletName: data.outletName,
          employeeId: data.incomingApplicantId,
          deployStatus: "Deployed",
          deployDate: data.incomingDeployDate || today,
          undeployDate: null,
          applicantStatus: "",
          updatedBy: adminFullName,
        });
        // 3. Promote applicant → Active/Employed
        await axios.put("https://api-map.bmphrc.com/promote-applicant", {
          employeeId: data.incomingApplicantId,
          updatedBy: adminFullName,
        });
      } else {
        // ── SCENARIO: Normal save ──────────────────────────────────────────
        const origStatus = data.applicantStatus;
        const finalStatus =
          data.deployStatus === "Deployed" ? "" : data.applicantStatus;

        // Save current employee
        if (data.assignedEmployeeId || data.applicantStatus === "For Pooling") {
          await axios.put("https://api-map.bmphrc.com/assign-outlet", {
            outletId: data.outletId,
            outletName: data.outletName,
            employeeId: data.assignedEmployeeId,
            deployStatus: data.deployStatus,
            deployDate: data.deployDate || null,
            undeployDate: data.undeployDate || null,
            applicantStatus: finalStatus,
            updatedBy: adminFullName,
          });
        }

        // Save incoming applicant pipeline update (stages 1-4, not onboarding)
        if (
          data.incomingApplicantId &&
          data.incomingApplicantStatus !== "Onboarded"
        ) {
          await axios.put("https://api-map.bmphrc.com/assign-outlet", {
            outletId: data.outletId,
            outletName: data.outletName,
            employeeId: data.incomingApplicantId,
            deployStatus: "Undeployed",
            deployDate: null,
            undeployDate: null,
            applicantStatus: data.incomingApplicantStatus,
            updatedBy: adminFullName,
          });
        }

        // Promote if primary (no-incoming) was just onboarded
        if (
          origStatus === "Onboarded" &&
          data.assignedEmployeeId &&
          !data.incomingApplicantId
        ) {
          await axios.put("https://api-map.bmphrc.com/promote-applicant", {
            employeeId: data.assignedEmployeeId,
            updatedBy: adminFullName,
          });
        }
      }

      // Coordinator always saved
      await axios.put("https://api-map.bmphrc.com/assign-coordinator", {
        outletName: data.outletName,
        employeeId: data.assignedCoordinatorId,
        deployStatus: data.coordinatorDeployStatus,
        updatedBy: adminFullName,
      });

      await fetchAndApply();
      setFilterStatus("ALL");
      setFilteredOutlets(OUTLET_DATA);
      alert("Outlet assignment updated successfully!");
      setOpenEditModal(false);
      setIsEditing(false);
      setPreviousEmployeeRemarks("");
      setDateError("");
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save assignment.");
    }
  };

  const findPersonById = (id) =>
    efcEmployees.find((e) => e._id === id) ||
    efcApplicants.find((e) => e._id === id);

  const deployUnlocked = selectedOutlet
    ? isDeployUnlocked(selectedOutlet.applicantStatus, role)
    : false;

  // ── Section 2 (Incoming Applicant Pipeline) visibility ──
  // Shows when outlet has ANY assigned employee (deployed OR undeployed, not an applicant as primary)
  // AND either:
  //   - There is already a tracked incomingApplicantId/Status in the DB
  //   - OR the user manually clicked "Add Incoming Applicant" button (showIncomingSection)
  const hasIncomingPipeline =
    selectedOutlet &&
    selectedOutlet.assignedEmployeeId &&
    !selectedOutlet._isApplicant &&
    (showIncomingSection ||
      !!(
        selectedOutlet.incomingApplicantId ||
        selectedOutlet.incomingApplicantStatus
      ));

  // Whether to show the "Add Incoming Applicant" button:
  // "Add Incoming Applicant" button rules:
  //   - Edit mode only
  //   - Current employee exists (not an applicant as primary)
  //   - Section 2 not already open
  //   - No incoming applicant already tracked in DB
  //   - Role must be HR HEAD, HR OFFICER, HR SPECIALIST, HR COORDINATOR SPECIALIST, or MIS
  //   - Current deploy status must be UNDEPLOYED
  //     (Account Supervisor sets undeploy first, then HR can add the incoming pipeline)
  const canAddIncoming = [
    "MIS",
    "HR HEAD",
    "HR OFFICER",
    "HR SPECIALIST",
    "HR COORDINATOR SPECIALIST",
  ].includes(role);

  const showAddIncomingBtn =
    isEditing &&
    selectedOutlet?.assignedEmployeeId &&
    !selectedOutlet._isApplicant &&
    !showIncomingSection &&
    !selectedOutlet.incomingApplicantId &&
    !selectedOutlet.incomingApplicantStatus &&
    canAddIncoming &&
    selectedOutlet.deployStatus === "Undeployed";

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "account", headerName: "Account", width: 150 },
    { field: "outlet", headerName: "Outlet", width: 380 },
    {
      field: "assignedCoordinator",
      headerName: "Coordinator",
      width: 180,
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
      field: "coordinatorStatus",
      headerName: "Coord. Status",
      width: 120,
      renderCell: (p) => {
        const s = p.row._coordStatus;
        return (
          <Chip
            label={s || "Inactive"}
            color={s === "Active" ? "success" : "default"}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      field: "assignedEmployee",
      headerName: "Assigned Merchandiser",
      width: 265,
      renderCell: (p) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            gap: 0.3,
          }}
        >
          {p.row._employeeName ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontSize: "12px" }}
              >
                {p.row._employeeName}
              </Typography>
              {p.row._isApplicant && (
                <Chip
                  label="Applicant"
                  size="small"
                  sx={{
                    height: 15,
                    fontSize: "9px",
                    backgroundColor: "#e3f2fd",
                    color: "#1565c0",
                  }}
                />
              )}
            </Box>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", fontSize: "12px" }}
            >
              No assignment
            </Typography>
          )}
          {/* Incoming applicant pipeline indicator */}
          {p.row._incomingApplicantName && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                flexWrap: "wrap",
              }}
            >
              <SwapHorizIcon sx={{ fontSize: 12, color: "#1565c0" }} />
              <Typography
                variant="caption"
                sx={{ color: "#1565c0", fontSize: "11px", fontWeight: 500 }}
              >
                {p.row._incomingApplicantName}
              </Typography>
              {p.row._incomingApplicantStatus &&
                (() => {
                  const cfg = getApplicantStatusConfig(
                    p.row._incomingApplicantStatus,
                  );
                  return (
                    <Chip
                      label={p.row._incomingApplicantStatus}
                      size="small"
                      sx={{
                        height: 14,
                        fontSize: "9px",
                        fontWeight: 600,
                        backgroundColor: cfg.bg,
                        color: cfg.color,
                      }}
                    />
                  );
                })()}
            </Box>
          )}
        </Box>
      ),
    },
    {
      field: "deployStatus",
      headerName: "Status",
      width: 115,
      renderCell: (p) => {
        const s = p.row._deployStatus;
        return (
          <Chip
            label={s || "Undeployed"}
            color={s === "Deployed" ? "success" : "default"}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      field: "applicantStatus",
      headerName: "Applicant Status",
      width: 175,
      renderCell: (p) => {
        // Show incoming applicant status if outlet has a deployed employee + incoming pipeline
        const status = p.row._incomingApplicantStatus || p.row._applicantStatus;
        const deployStatus = p.row._deployStatus;
        if (deployStatus === "Deployed" && !p.row._incomingApplicantStatus)
          return (
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}
            >
              —
            </Typography>
          );
        if (!status)
          return (
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}
            >
              —
            </Typography>
          );
        const cfg = getApplicantStatusConfig(status);
        return (
          <Chip
            label={status}
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
    {
      field: "deployDate",
      headerName: "Deploy Date",
      width: 125,
      renderCell: (p) => {
        const s = p.row._deployStatus,
          d = p.row._deployDate;
        if (s !== "Deployed" || !d)
          return (
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}
            >
              —
            </Typography>
          );
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              variant="body2"
              sx={{ fontSize: "13px", color: "#2e7d32", fontWeight: 500 }}
            >
              {formatDate(d)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "undeployDate",
      headerName: "Undeploy Date",
      width: 130,
      renderCell: (p) => {
        const s = p.row._deployStatus,
          d = p.row._undeployDate;
        if (s !== "Undeployed" || !d)
          return (
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}
            >
              —
            </Typography>
          );
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography
              variant="body2"
              sx={{ fontSize: "13px", color: "#e65100", fontWeight: 500 }}
            >
              {formatDate(d)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "daysUndeployed",
      headerName: "Days Undeployed",
      width: 145,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => {
        const days = p.row._daysUndeployed;
        if (days === null || days === undefined)
          return (
            <Typography
              variant="body2"
              sx={{ fontSize: "12px", color: "#bbb", fontStyle: "italic" }}
            >
              —
            </Typography>
          );
        const c = getDaysBadgeColor(days);
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.2,
                py: 0.3,
                borderRadius: "20px",
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
              }}
            >
              <HourglassEmptyIcon sx={{ fontSize: 13, color: c.color }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", fontWeight: 700, color: c.color }}
              >
                {days} day{days !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => (
        <Tooltip title="Assign / Update">
          <span>
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(p.row)}
              sx={{ "&:hover": { backgroundColor: "rgba(46,99,133,0.1)" } }}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
      ),
    },
  ];

  const rows = filteredOutlets.map((outlet, index) => {
    const a = outletAssignments[outlet.id];
    const c = coordinatorAssignments[outlet.id];
    return {
      ...outlet,
      count: index + 1,
      _deployStatus: a?.deployStatus || "",
      _applicantStatus: a?.applicantStatus || "",
      _employeeName: a?.employeeName || "",
      _deployDate: a?.deployDate || null,
      _undeployDate: a?.undeployDate || null,
      _daysUndeployed: calcDaysUndeployed(a?.undeployDate, a?.deployStatus),
      _isApplicant: a?.isApplicant || false,
      _incomingApplicantId: a?.incomingApplicantId || null,
      _incomingApplicantName: a?.incomingApplicantName || null,
      _incomingApplicantStatus: a?.incomingApplicantStatus || "",
      _coordName: c?.employeeName || "",
      _coordStatus: c?.status || "",
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
          {/* Header */}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={EFClogo}
                alt="EFC Logo"
                sx={{
                  width: 86,
                  height: 86,
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
                  OUTLET LIST
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255,255,255,0.9)" }}
                >
                  ALL ACCOUNTS & OUTLETS OF ECOSSENTIAL FOODS CORPORATION
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Filter Bar */}
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
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: 2,
              }}
            >
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={handleStatusFilter}
                  label="Filter by Status"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                >
                  <MenuItem value="ALL">All Records</MenuItem>
                  <MenuItem value="Deployed">Deployed</MenuItem>
                  <MenuItem value="Undeployed">Undeployed</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Chip
                  icon={<PersonIcon />}
                  label={`Total Outlets: ${filteredOutlets.length}`}
                  color="primary"
                  sx={{
                    height: "40px",
                    fontSize: "15px",
                    fontWeight: 600,
                    px: 1,
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<PeopleAltIcon />}
                  onClick={() => setOpenSummaryModal(true)}
                  sx={{
                    height: "40px",
                    backgroundColor: "#0c2e3fff",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    px: 2.5,
                    "&:hover": { backgroundColor: "#2e6385ff" },
                  }}
                >
                  Personnel Summary
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* DataGrid */}
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
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 20 } },
              }}
              slots={{ toolbar: CustomToolbar }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              pageSizeOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
            />
          </Paper>

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
                  width: { xs: "98%", sm: "90%", md: "80%", lg: "72%" },
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
                    background:
                      "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
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
                        Assigned & floating personnel overview
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
                    py: 2,
                    borderBottom: "1px solid #e0e0e0",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flexShrink: 0,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "#555", mr: 1 }}
                  >
                    View:
                  </Typography>
                  <ToggleButtonGroup
                    value={summaryFilter}
                    exclusive
                    onChange={(e, v) => v && setSummaryFilter(v)}
                    size="small"
                    sx={{
                      "& .MuiToggleButton-root": {
                        fontWeight: 600,
                        textTransform: "none",
                        px: 2.5,
                        fontSize: "13px",
                        "&.Mui-selected": {
                          backgroundColor: "#2e6385ff",
                          color: "white",
                          "&:hover": { backgroundColor: "#0c2e3fff" },
                        },
                      },
                    }}
                  >
                    <ToggleButton value="MERCHANDISER">
                      <AssignmentIndIcon sx={{ fontSize: 16, mr: 0.8 }} />
                      Merchandisers
                    </ToggleButton>
                    <ToggleButton value="COORDINATOR">
                      <BadgeIcon sx={{ fontSize: 16, mr: 0.8 }} />
                      Coordinators
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      ml: "auto",
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      icon={<CheckCircleOutlineIcon sx={{ fontSize: 16 }} />}
                      label={`Assigned: ${summaryData.assigned.length}`}
                      color="success"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip
                      icon={<WarningAmberIcon sx={{ fontSize: 16 }} />}
                      label={`Floating: ${summaryData.floating.length}`}
                      color="warning"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip
                      label={`Total: ${summaryData.assigned.length + summaryData.floating.length}`}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
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
                      <CheckCircleOutlineIcon
                        sx={{ color: "#2e7d32", fontSize: 20 }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: "#2e7d32" }}
                      >
                        Assigned{" "}
                        {summaryFilter === "MERCHANDISER"
                          ? "Merchandisers"
                          : "Coordinators"}
                      </Typography>
                      <Chip
                        label={summaryData.assigned.length}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 700, height: 22 }}
                      />
                    </Box>
                    {summaryData.assigned.length === 0 ? (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#999",
                          fontStyle: "italic",
                          py: 2,
                          textAlign: "center",
                        }}
                      >
                        No assigned personnel found.
                      </Typography>
                    ) : (
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
                            <TableRow sx={{ backgroundColor: "#f0f7f4" }}>
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#2e7d32",
                                  width: 40,
                                  borderBottom: "2px solid #c8e6c9",
                                }}
                              >
                                #
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#2e7d32",
                                  width: 200,
                                  borderBottom: "2px solid #c8e6c9",
                                }}
                              >
                                Name
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#2e7d32",
                                  borderBottom: "2px solid #c8e6c9",
                                }}
                              >
                                Assigned Outlet(s)
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#2e7d32",
                                  width: 120,
                                  borderBottom: "2px solid #c8e6c9",
                                }}
                              >
                                Status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {summaryData.assigned.map((person, idx) => (
                              <TableRow
                                key={person.employeeId}
                                sx={{
                                  "&:hover": { backgroundColor: "#f9fef9" },
                                  "&:last-child td": { borderBottom: 0 },
                                  backgroundColor:
                                    person.outlets.length > 1
                                      ? "#fffde7"
                                      : "white",
                                }}
                              >
                                <TableCell
                                  sx={{ fontSize: "13px", color: "#666" }}
                                >
                                  {idx + 1}
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 600, fontSize: "13px" }}
                                    >
                                      {person.employeeName}
                                    </Typography>
                                    {person.outlets.length > 1 && (
                                      <Tooltip title="Multiple outlets">
                                        <Chip
                                          label={`×${person.outlets.length}`}
                                          size="small"
                                          color="warning"
                                          sx={{
                                            height: 18,
                                            fontSize: "11px",
                                            fontWeight: 700,
                                          }}
                                        />
                                      </Tooltip>
                                    )}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 0.5,
                                    }}
                                  >
                                    {person.outlets.map((o, oi) => (
                                      <Box
                                        key={oi}
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            fontSize: "12px",
                                            color: "#444",
                                          }}
                                        >
                                          {o.outletName}
                                        </Typography>
                                        <Chip
                                          label={o.account}
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            height: 16,
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            borderColor: "#2e6385",
                                            color: "#2e6385",
                                          }}
                                        />
                                      </Box>
                                    ))}
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {person.outlets.length > 0 && (
                                    <Chip
                                      label={
                                        person.outlets[0].status ||
                                        (summaryFilter === "MERCHANDISER"
                                          ? "Undeployed"
                                          : "Inactive")
                                      }
                                      color={
                                        person.outlets[0].status ===
                                          "Deployed" ||
                                        person.outlets[0].status === "Active"
                                          ? "success"
                                          : "default"
                                      }
                                      size="small"
                                      sx={{ fontWeight: 500, fontSize: "11px" }}
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
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
                        Floating{" "}
                        {summaryFilter === "MERCHANDISER"
                          ? "Merchandisers"
                          : "Coordinators"}
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
                          (no outlet assigned)
                        </Typography>
                      </Typography>
                      <Chip
                        label={summaryData.floating.length}
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 700, height: 22 }}
                      />
                    </Box>
                    {summaryData.floating.length === 0 ? (
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
                          All personnel are assigned to outlets!
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
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#e65100",
                                  width: 40,
                                  borderBottom: "2px solid #ffcc80",
                                }}
                              >
                                #
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#e65100",
                                  borderBottom: "2px solid #ffcc80",
                                }}
                              >
                                Name
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "13px",
                                  color: "#e65100",
                                  borderBottom: "2px solid #ffcc80",
                                }}
                              >
                                Remarks
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {summaryData.floating.map((person, idx) => (
                              <TableRow
                                key={person.employeeId}
                                sx={{
                                  "&:hover": { backgroundColor: "#fff8f0" },
                                  "&:last-child td": { borderBottom: 0 },
                                }}
                              >
                                <TableCell
                                  sx={{ fontSize: "13px", color: "#666" }}
                                >
                                  {idx + 1}
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, fontSize: "13px" }}
                                  >
                                    {person.employeeName}
                                  </Typography>
                                  {person.position && (
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "#888" }}
                                    >
                                      {person.position}
                                    </Typography>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    icon={
                                      <WarningAmberIcon
                                        sx={{ fontSize: "14px !important" }}
                                      />
                                    }
                                    label="No Outlet Assigned"
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

          {/* ══════════════════════════════════════════════════════
               ASSIGN EMPLOYEE MODAL
          ══════════════════════════════════════════════════════ */}
          <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
              sx: { backgroundColor: "rgba(0,0,0,0.7)" },
            }}
          >
            <Fade in={openEditModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: { xs: "95%", sm: "80%", md: "65%", lg: "55%" },
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
                    background:
                      "linear-gradient(135deg, #2e6385ff 0%, #0c2e3fff 100%)",
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
                      <BadgeIcon sx={{ color: "white" }} />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: 700 }}
                      >
                        Outlet Assignment
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
                    onClick={handleCloseEditModal}
                    sx={{
                      color: "white",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {selectedOutlet && (
                  <Box sx={{ p: 4 }}>
                    {/* ════════════════════════════════════════════
                         SECTION 1: CURRENT DEPLOYED EMPLOYEE
                    ════════════════════════════════════════════ */}
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
                            mb: 3,
                            fontWeight: 600,
                            color: "#2e6385ff",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BusinessIcon /> Outlet & Current Assignment
                        </Typography>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Account"
                              fullWidth
                              value={selectedOutlet.accountName || ""}
                              InputProps={{ readOnly: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Outlet"
                              fullWidth
                              value={selectedOutlet.outletName || ""}
                              InputProps={{ readOnly: true }}
                            />
                          </Grid>

                          {/* ── Assign Employee/Applicant — toggle when outlet is vacant ── */}
                          {/* When outlet has a deployed employee (hasIncomingPipeline), show read-only */}
                          {/* When outlet is vacant, show a toggle: Employed | Applicant */}
                          {isEditing && !hasIncomingPipeline ? (
                            <>
                              {/* Toggle: only shown when outlet is vacant (no current assignment) */}
                              {!selectedOutlet.assignedEmployeeId && (
                                <Grid item xs={12}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1.5,
                                      mb: 0.5,
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      sx={{ fontWeight: 600, color: "#555" }}
                                    >
                                      Assign as:
                                    </Typography>
                                    <ToggleButtonGroup
                                      value={assignMode}
                                      exclusive
                                      size="small"
                                      onChange={(e, v) => {
                                        if (!v) return;
                                        setAssignMode(v);
                                        setSelectedOutlet({
                                          ...selectedOutlet,
                                          assignedEmployeeId: "",
                                          applicantStatus: "",
                                          deployDate: "",
                                          undeployDate: "",
                                        });
                                      }}
                                      sx={{
                                        "& .MuiToggleButton-root": {
                                          px: 2,
                                          py: 0.5,
                                          fontWeight: 600,
                                          textTransform: "none",
                                          fontSize: "13px",
                                          "&.Mui-selected": {
                                            backgroundColor:
                                              assignMode === "employed"
                                                ? "#e8f5e9"
                                                : "#e3f2fd",
                                            color:
                                              assignMode === "employed"
                                                ? "#2e7d32"
                                                : "#1565c0",
                                          },
                                          "&.Mui-disabled": { opacity: 0.38 },
                                        },
                                      }}
                                    >
                                      {/* Employed — Account Supervisor and MIS only */}
                                      <Tooltip
                                        title={
                                          !canEdit
                                            ? "Only Account Supervisor / MIS can assign an employed person"
                                            : ""
                                        }
                                        arrow
                                      >
                                        <span>
                                          <ToggleButton
                                            value="employed"
                                            disabled={!canEdit}
                                          >
                                            <WorkIcon
                                              sx={{ fontSize: 15, mr: 0.6 }}
                                            />{" "}
                                            Employed
                                          </ToggleButton>
                                        </span>
                                      </Tooltip>
                                      {/* Applicant — HR roles and MIS only */}
                                      <Tooltip
                                        title={
                                          !canSetApplicantStatus
                                            ? "Only HR roles / MIS can assign an applicant"
                                            : ""
                                        }
                                        arrow
                                      >
                                        <span>
                                          <ToggleButton
                                            value="applicant"
                                            disabled={!canSetApplicantStatus}
                                          >
                                            <PersonIcon
                                              sx={{ fontSize: 15, mr: 0.6 }}
                                            />{" "}
                                            Applicant
                                          </ToggleButton>
                                        </span>
                                      </Tooltip>
                                    </ToggleButtonGroup>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "#888",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      {assignMode === "employed"
                                        ? `${efcEmployees.length} active employee(s)`
                                        : `${efcApplicants.length} applicant(s)`}
                                    </Typography>
                                  </Box>
                                </Grid>
                              )}
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                  <InputLabel>
                                    {assignMode === "applicant"
                                      ? "Assign Applicant"
                                      : "Assign Employee"}
                                  </InputLabel>
                                  <Select
                                    value={
                                      selectedOutlet.assignedEmployeeId || ""
                                    }
                                    label={
                                      assignMode === "applicant"
                                        ? "Assign Applicant"
                                        : "Assign Employee"
                                    }
                                    onChange={(e) => {
                                      const isApplicant =
                                        assignMode === "applicant";
                                      const newId = e.target.value;
                                      setSelectedOutlet({
                                        ...selectedOutlet,
                                        assignedEmployeeId: newId,
                                        _isApplicant: isApplicant,
                                        // Employed person → auto-default to Deployed + today's date
                                        // Applicant → stays Undeployed, goes through pipeline first
                                        deployStatus:
                                          newId && !isApplicant
                                            ? "Deployed"
                                            : "Undeployed",
                                        deployDate:
                                          newId && !isApplicant
                                            ? todayISO()
                                            : "",
                                        undeployDate: "",
                                        applicantStatus: "",
                                      });
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>— No Assignment —</em>
                                    </MenuItem>
                                    {(assignMode === "applicant"
                                      ? efcApplicants
                                      : efcEmployees
                                    ).map((emp) => (
                                      <MenuItem key={emp._id} value={emp._id}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                          }}
                                        >
                                          <span>
                                            {emp.firstName}{" "}
                                            {emp.middleName
                                              ? emp.middleName + " "
                                              : ""}
                                            {emp.lastName}
                                            {emp.position
                                              ? ` — ${emp.position}`
                                              : ""}
                                          </span>
                                          {assignMode === "applicant" && (
                                            <Chip
                                              label="Applicant"
                                              size="small"
                                              sx={{
                                                height: 16,
                                                fontSize: "10px",
                                                backgroundColor: "#e3f2fd",
                                                color: "#1565c0",
                                              }}
                                            />
                                          )}
                                        </Box>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  <FormHelperText>
                                    {assignMode === "applicant"
                                      ? "Applicants will go through the endorsement pipeline below"
                                      : "Active/Employed merchandisers for direct deployment"}
                                  </FormHelperText>
                                </FormControl>
                              </Grid>
                            </>
                          ) : !isEditing ? (
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label={
                                  hasIncomingPipeline
                                    ? "Current Employee (Deployed)"
                                    : "Assigned Person"
                                }
                                fullWidth
                                value={(() => {
                                  if (!selectedOutlet.assignedEmployeeId)
                                    return "No assignment";
                                  const p = findPersonById(
                                    selectedOutlet.assignedEmployeeId,
                                  );
                                  if (!p) return "No assignment";
                                  const tag =
                                    p.status === "Applicant"
                                      ? " (Applicant)"
                                      : "";
                                  return `${p.firstName} ${p.lastName}${p.position ? " — " + p.position : ""}${tag}`;
                                })()}
                                InputProps={{ readOnly: true }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    backgroundColor: hasIncomingPipeline
                                      ? "#f0fdf4"
                                      : "inherit",
                                  },
                                }}
                              />
                            </Grid>
                          ) : null}

                          {/* Deploy Status — only shown when no incoming pipeline */}
                          {/* Account Supervisor / MIS: always editable */}
                          {/* HR roles: locked until applicant status = Onboarded */}
                          {!hasIncomingPipeline && (
                            <Grid item xs={12} sm={6}>
                              {isEditing ? (
                                <Tooltip
                                  title={
                                    !deployUnlocked &&
                                    selectedOutlet.assignedEmployeeId &&
                                    !canEdit
                                      ? 'Set Applicant Status to "Onboarded" to enable Deployment'
                                      : ""
                                  }
                                  arrow
                                >
                                  <span style={{ display: "block" }}>
                                    <FormControl
                                      fullWidth
                                      disabled={
                                        !selectedOutlet.assignedEmployeeId ||
                                        (!deployUnlocked && !canEdit)
                                      }
                                    >
                                      <InputLabel>Deploy Status</InputLabel>
                                      <Select
                                        value={
                                          selectedOutlet.assignedEmployeeId
                                            ? selectedOutlet.deployStatus ||
                                              "Undeployed"
                                            : "Undeployed"
                                        }
                                        label="Deploy Status"
                                        onChange={(e) => {
                                          const s = e.target.value;
                                          setSelectedOutlet({
                                            ...selectedOutlet,
                                            deployStatus: s,
                                            deployDate:
                                              s === "Deployed"
                                                ? ""
                                                : selectedOutlet.deployDate,
                                            undeployDate:
                                              s === "Undeployed"
                                                ? ""
                                                : selectedOutlet.undeployDate,
                                          });
                                          setDateError("");
                                        }}
                                      >
                                        <MenuItem value="Deployed">
                                          Deployed
                                        </MenuItem>
                                        <MenuItem value="Undeployed">
                                          Undeployed
                                        </MenuItem>
                                      </Select>
                                      {/* Only HR roles see the "Locked until Onboarded" message */}
                                      {!deployUnlocked &&
                                        selectedOutlet.assignedEmployeeId &&
                                        !canEdit && (
                                          <FormHelperText
                                            sx={{
                                              color: "#e65100",
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 0.5,
                                            }}
                                          >
                                            <LockIcon sx={{ fontSize: 12 }} />{" "}
                                            Locked until Onboarded
                                          </FormHelperText>
                                        )}
                                    </FormControl>
                                  </span>
                                </Tooltip>
                              ) : (
                                <TextField
                                  label="Deploy Status"
                                  fullWidth
                                  value={
                                    selectedOutlet.deployStatus || "Undeployed"
                                  }
                                  InputProps={{ readOnly: true }}
                                />
                              )}
                            </Grid>
                          )}

                          {/* Days Undeployed */}
                          {selectedOutlet.deployStatus === "Undeployed" &&
                            selectedOutlet.undeployDate &&
                            (() => {
                              const days = calcDaysUndeployed(
                                selectedOutlet.undeployDate,
                                selectedOutlet.deployStatus,
                              );
                              if (days === null) return null;
                              const c = getDaysBadgeColor(days);
                              return (
                                <Grid item xs={12} sm={6}>
                                  <Box
                                    sx={{
                                      border: `1px solid ${c.border}`,
                                      borderRadius: "8px",
                                      backgroundColor: c.bg,
                                      px: 2,
                                      py: 1.5,
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1.5,
                                    }}
                                  >
                                    <HourglassEmptyIcon
                                      sx={{ color: c.color, fontSize: 28 }}
                                    />
                                    <Box>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: c.color,
                                          fontWeight: 600,
                                          display: "block",
                                          fontSize: "11px",
                                        }}
                                      >
                                        DAYS UNDEPLOYED
                                      </Typography>
                                      <Typography
                                        variant="h5"
                                        sx={{
                                          color: c.color,
                                          fontWeight: 800,
                                          lineHeight: 1.1,
                                        }}
                                      >
                                        {days}{" "}
                                        <Typography
                                          component="span"
                                          variant="body2"
                                          sx={{ fontWeight: 500 }}
                                        >
                                          day{days !== 1 ? "s" : ""}
                                        </Typography>
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              );
                            })()}

                          {/* Applicant Status + dates — only when no incoming pipeline */}
                          {!hasIncomingPipeline &&
                            selectedOutlet.assignedEmployeeId && (
                              <>
                                {/* Applicant Status (primary pipeline) — shown when person is an applicant */}
                                {(selectedOutlet._isApplicant ||
                                  assignMode === "applicant") &&
                                  selectedOutlet.deployStatus ===
                                    "Undeployed" && (
                                    <Grid item xs={12} sm={6}>
                                      {isEditing ? (
                                        (() => {
                                          const cur =
                                            selectedOutlet.applicantStatus ||
                                            "";
                                          if (
                                            !(
                                              canSetApplicantStatus ||
                                              canSetOnboarded
                                            )
                                          )
                                            return (
                                              <TextField
                                                label="Applicant Status"
                                                fullWidth
                                                value={cur || "Not set"}
                                                InputProps={{ readOnly: true }}
                                                helperText="No permission"
                                              />
                                            );
                                          return (
                                            <FormControl fullWidth>
                                              <InputLabel>
                                                Applicant Status *
                                              </InputLabel>
                                              <Select
                                                value={cur}
                                                label="Applicant Status *"
                                                onChange={(e) => {
                                                  const ns = e.target.value;
                                                  setSelectedOutlet({
                                                    ...selectedOutlet,
                                                    applicantStatus: ns,
                                                    assignedEmployeeId:
                                                      ns === "For Pooling"
                                                        ? ""
                                                        : selectedOutlet.assignedEmployeeId,
                                                    // When Onboarded → auto-set Deployed + today's date
                                                    // When anything else that was Deployed → revert to Undeployed
                                                    deployStatus:
                                                      ns === "Onboarded"
                                                        ? "Deployed"
                                                        : ns !== "Onboarded" &&
                                                            selectedOutlet.deployStatus ===
                                                              "Deployed"
                                                          ? "Undeployed"
                                                          : selectedOutlet.deployStatus,
                                                    deployDate:
                                                      ns === "Onboarded"
                                                        ? todayISO()
                                                        : selectedOutlet.deployDate,
                                                    undeployDate:
                                                      ns === "Onboarded"
                                                        ? ""
                                                        : selectedOutlet.undeployDate,
                                                  });
                                                }}
                                              >
                                                <MenuItem value="">
                                                  <em>— Select Status —</em>
                                                </MenuItem>
                                                {APPLICANT_STATUS_OPTIONS.map(
                                                  (opt) => {
                                                    const isOB =
                                                      opt.value === "Onboarded";
                                                    const obDis =
                                                      isOB &&
                                                      (!canSetOnboarded ||
                                                        cur !==
                                                          "For Onboarding");
                                                    const hrDis =
                                                      !isOB &&
                                                      !canSetApplicantStatus &&
                                                      !canSetOnboarded;
                                                    const dis = obDis || hrDis;
                                                    const cfg =
                                                      getApplicantStatusConfig(
                                                        opt.value,
                                                      );
                                                    return (
                                                      <MenuItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                        disabled={dis}
                                                      >
                                                        <Box
                                                          sx={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                            gap: 1,
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <Box
                                                            sx={{
                                                              width: 10,
                                                              height: 10,
                                                              borderRadius:
                                                                "50%",
                                                              backgroundColor:
                                                                dis
                                                                  ? "#ccc"
                                                                  : cfg.color,
                                                              flexShrink: 0,
                                                            }}
                                                          />
                                                          <Box sx={{ flex: 1 }}>
                                                            <Box
                                                              sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                  "center",
                                                                gap: 1,
                                                              }}
                                                            >
                                                              <Typography
                                                                variant="body2"
                                                                sx={{
                                                                  fontWeight: 600,
                                                                  color: dis
                                                                    ? "#aaa"
                                                                    : "inherit",
                                                                }}
                                                              >
                                                                {opt.label}
                                                              </Typography>
                                                              {isOB && (
                                                                <Chip
                                                                  label="→ Promotes to Employed"
                                                                  size="small"
                                                                  sx={{
                                                                    height: 16,
                                                                    fontSize:
                                                                      "10px",
                                                                    backgroundColor:
                                                                      "#e8f5e9",
                                                                    color:
                                                                      "#2e7d32",
                                                                  }}
                                                                />
                                                              )}
                                                            </Box>
                                                            <Typography
                                                              variant="caption"
                                                              sx={{
                                                                color: dis
                                                                  ? "#bbb"
                                                                  : "#888",
                                                              }}
                                                            >
                                                              {opt.description}
                                                              {isOB &&
                                                                !canSetOnboarded &&
                                                                " · ACCOUNT SUPERVISOR / MIS only"}
                                                              {isOB &&
                                                                canSetOnboarded &&
                                                                cur !==
                                                                  "For Onboarding" &&
                                                                ' · Requires "For Onboarding" first'}
                                                            </Typography>
                                                          </Box>
                                                        </Box>
                                                      </MenuItem>
                                                    );
                                                  },
                                                )}
                                              </Select>
                                              <FormHelperText
                                                sx={{
                                                  color:
                                                    cur === "Onboarded"
                                                      ? "#2e7d32"
                                                      : cur === "For Onboarding"
                                                        ? "#e65100"
                                                        : "inherit",
                                                }}
                                              >
                                                {cur === "Onboarded"
                                                  ? "✅ Deployment unlocked — applicant promoted to Employed on save"
                                                  : cur === "For Onboarding"
                                                    ? canSetOnboarded
                                                      ? "✅ You can now set Onboarded"
                                                      : "🔒 ACCOUNT SUPERVISOR / MIS only"
                                                    : "Controls which employee list appears below"}
                                              </FormHelperText>
                                            </FormControl>
                                          );
                                        })()
                                      ) : (
                                        <Box>
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              color: "#666",
                                              fontWeight: 600,
                                              display: "block",
                                              mb: 0.5,
                                            }}
                                          >
                                            Applicant Status
                                          </Typography>
                                          {selectedOutlet.applicantStatus ? (
                                            (() => {
                                              const cfg =
                                                getApplicantStatusConfig(
                                                  selectedOutlet.applicantStatus,
                                                );
                                              return (
                                                <Chip
                                                  label={
                                                    selectedOutlet.applicantStatus
                                                  }
                                                  sx={{
                                                    fontWeight: 700,
                                                    backgroundColor: cfg.bg,
                                                    color: cfg.color,
                                                    border: `1px solid ${cfg.color}40`,
                                                  }}
                                                />
                                              );
                                            })()
                                          ) : (
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                color: "#bbb",
                                                fontStyle: "italic",
                                              }}
                                            >
                                              Not set
                                            </Typography>
                                          )}
                                        </Box>
                                      )}
                                    </Grid>
                                  )}

                                {/* Deploy Date */}
                                {selectedOutlet.deployStatus === "Deployed" && (
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      label="Deploy Date"
                                      type="date"
                                      fullWidth
                                      value={selectedOutlet.deployDate || ""}
                                      InputLabelProps={{ shrink: true }}
                                      InputProps={{
                                        readOnly: !isEditing,
                                        startAdornment: (
                                          <EventIcon
                                            sx={{
                                              fontSize: 18,
                                              color: "#2e7d32",
                                              mr: 1,
                                            }}
                                          />
                                        ),
                                      }}
                                      onChange={(e) => {
                                        if (isEditing) {
                                          setSelectedOutlet({
                                            ...selectedOutlet,
                                            deployDate: e.target.value,
                                          });
                                          setDateError("");
                                        }
                                      }}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          backgroundColor: isEditing
                                            ? "#f0fdf4"
                                            : "#fafafa",
                                        },
                                      }}
                                      helperText={
                                        isEditing && !selectedOutlet.deployDate
                                          ? "Required when status is Deployed"
                                          : !isEditing &&
                                              selectedOutlet.deployDate
                                            ? `Deployed on ${formatDate(selectedOutlet.deployDate)}`
                                            : ""
                                      }
                                      FormHelperTextProps={{
                                        sx: {
                                          color:
                                            isEditing &&
                                            !selectedOutlet.deployDate
                                              ? "#d32f2f"
                                              : "#2e7d32",
                                        },
                                      }}
                                    />
                                  </Grid>
                                )}
                                {/* Undeploy Date */}
                                {selectedOutlet.deployStatus ===
                                  "Undeployed" && (
                                  <Grid item xs={12} sm={6}>
                                    <TextField
                                      label="Undeploy Date"
                                      type="date"
                                      fullWidth
                                      value={selectedOutlet.undeployDate || ""}
                                      InputLabelProps={{ shrink: true }}
                                      InputProps={{
                                        readOnly: !isEditing,
                                        startAdornment: (
                                          <EventIcon
                                            sx={{
                                              fontSize: 18,
                                              color: "#e65100",
                                              mr: 1,
                                            }}
                                          />
                                        ),
                                      }}
                                      onChange={(e) => {
                                        if (isEditing) {
                                          setSelectedOutlet({
                                            ...selectedOutlet,
                                            undeployDate: e.target.value,
                                          });
                                          setDateError("");
                                        }
                                      }}
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          backgroundColor: isEditing
                                            ? "#fff8f0"
                                            : "#fafafa",
                                        },
                                      }}
                                      helperText={
                                        isEditing &&
                                        !selectedOutlet.undeployDate
                                          ? "Select the date this outlet became undeployed"
                                          : !isEditing &&
                                              selectedOutlet.undeployDate
                                            ? `Undeployed on ${formatDate(selectedOutlet.undeployDate)}`
                                            : ""
                                      }
                                      FormHelperTextProps={{
                                        sx: {
                                          color:
                                            isEditing &&
                                            !selectedOutlet.undeployDate
                                              ? "#d32f2f"
                                              : "#e65100",
                                        },
                                      }}
                                    />
                                  </Grid>
                                )}
                              </>
                            )}

                          {/* ── Add Incoming Applicant button ────────────────────────────────
                               Shown in edit mode when the outlet has an employee (any status)
                               but no incoming pipeline has been started yet.
                               Clicking it opens Section 2 below without requiring DB data.
                          ── */}
                          {showAddIncomingBtn && (
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  border: "1.5px dashed #1565c0",
                                  borderRadius: "10px",
                                  p: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  backgroundColor: "#f0f8ff",
                                  gap: 2,
                                  flexWrap: "wrap",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                  }}
                                >
                                  <SwapHorizIcon
                                    sx={{ color: "#1565c0", fontSize: 22 }}
                                  />
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 600, color: "#1565c0" }}
                                    >
                                      Track an Incoming Applicant
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "#555" }}
                                    >
                                      Start the endorsement pipeline for the
                                      next merchandiser for this outlet
                                    </Typography>
                                  </Box>
                                </Box>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<SwapHorizIcon />}
                                  onClick={() => setShowIncomingSection(true)}
                                  sx={{
                                    borderColor: "#1565c0",
                                    color: "#1565c0",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    borderRadius: "8px",
                                    "&:hover": {
                                      backgroundColor: "#e3f2fd",
                                      borderColor: "#0d47a1",
                                    },
                                  }}
                                >
                                  Add Incoming Applicant
                                </Button>
                              </Box>
                            </Grid>
                          )}

                          {/* Error / lock alerts */}
                          {dateError && (
                            <Grid item xs={12}>
                              <Alert
                                severity="error"
                                sx={{ borderRadius: "8px" }}
                              >
                                {dateError}
                              </Alert>
                            </Grid>
                          )}
                          {!isEditing &&
                            selectedOutlet.deployStatus === "Undeployed" &&
                            selectedOutlet.assignedEmployeeId &&
                            !deployUnlocked &&
                            !hasIncomingPipeline &&
                            !canEdit && (
                              <Grid item xs={12}>
                                <Alert
                                  severity="warning"
                                  icon={<LockIcon fontSize="inherit" />}
                                  sx={{ borderRadius: "8px" }}
                                >
                                  Deployment is locked. Set Applicant Status to{" "}
                                  <strong>Onboarded</strong> to enable Deploy
                                  fields.
                                </Alert>
                              </Grid>
                            )}
                          {selectedOutlet.applicantStatus === "Onboarded" &&
                            selectedOutlet._isApplicant &&
                            !hasIncomingPipeline && (
                              <Grid item xs={12}>
                                <Alert
                                  severity="success"
                                  icon={<WorkIcon fontSize="inherit" />}
                                  sx={{ borderRadius: "8px" }}
                                >
                                  <strong>On Save:</strong> This applicant will
                                  be promoted to{" "}
                                  <strong>Active / Employed</strong>.
                                </Alert>
                              </Grid>
                            )}
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* ════════════════════════════════════════════
                         SECTION 2: INCOMING APPLICANT PIPELINE
                         Shown when outlet has a deployed employee
                         so you can track the next merchandiser
                    ════════════════════════════════════════════ */}
                    {(hasIncomingPipeline ||
                      selectedOutlet.incomingApplicantId) && (
                      <Card
                        elevation={0}
                        sx={{
                          mb: 3,
                          border: "2px solid #1565c0",
                          borderRadius: "12px",
                          backgroundColor: "#f0f8ff",
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
                                color: "#1565c0",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <SwapHorizIcon /> Incoming Applicant Pipeline
                              <Chip
                                label="Tracks next merchandiser"
                                size="small"
                                sx={{
                                  fontSize: "10px",
                                  backgroundColor: "#e3f2fd",
                                  color: "#1565c0",
                                  ml: 1,
                                }}
                              />
                            </Typography>
                            {/* Allow dismissing the section if it was manually opened and nothing saved yet */}
                            {isEditing &&
                              showIncomingSection &&
                              !selectedOutlet.incomingApplicantId &&
                              !selectedOutlet.incomingApplicantStatus && (
                                <Tooltip title="Cancel — remove incoming pipeline section">
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      setShowIncomingSection(false);
                                      setSelectedOutlet({
                                        ...selectedOutlet,
                                        incomingApplicantId: "",
                                        incomingApplicantStatus: "",
                                        incomingDeployDate: "",
                                      });
                                    }}
                                    sx={{
                                      color: "#e53935",
                                      "&:hover": {
                                        backgroundColor: "rgba(229,57,53,0.08)",
                                      },
                                    }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ color: "#555", mb: 2.5, fontSize: "13px" }}
                          >
                            The current employee stays in place. Track an
                            incoming applicant through the pipeline here. When
                            set to <strong>Onboarded</strong>, the current
                            employee is removed and this applicant takes over.
                          </Typography>
                          <Grid container spacing={2.5}>
                            {/* Incoming Applicant Status */}
                            <Grid item xs={12} sm={6}>
                              {isEditing ? (
                                (() => {
                                  const cur =
                                    selectedOutlet.incomingApplicantStatus ||
                                    "";
                                  if (
                                    !(canSetApplicantStatus || canSetOnboarded)
                                  )
                                    return (
                                      <TextField
                                        label="Incoming Applicant Status"
                                        fullWidth
                                        value={cur || "Not set"}
                                        InputProps={{ readOnly: true }}
                                        helperText="No permission"
                                      />
                                    );
                                  return (
                                    <FormControl fullWidth>
                                      <InputLabel>
                                        Incoming Applicant Status
                                      </InputLabel>
                                      <Select
                                        value={cur}
                                        label="Incoming Applicant Status"
                                        onChange={(e) => {
                                          const ns = e.target.value;
                                          setSelectedOutlet({
                                            ...selectedOutlet,
                                            incomingApplicantStatus: ns,
                                            incomingApplicantId:
                                              ns === "For Pooling"
                                                ? ""
                                                : selectedOutlet.incomingApplicantId,
                                          });
                                        }}
                                      >
                                        <MenuItem value="">
                                          <em>— Select Status —</em>
                                        </MenuItem>
                                        {APPLICANT_STATUS_OPTIONS.map((opt) => {
                                          const isOB =
                                            opt.value === "Onboarded";
                                          const obDis =
                                            isOB &&
                                            (!canSetOnboarded ||
                                              cur !== "For Onboarding");
                                          const hrDis =
                                            !isOB &&
                                            !canSetApplicantStatus &&
                                            !canSetOnboarded;
                                          const dis = obDis || hrDis;
                                          const cfg = getApplicantStatusConfig(
                                            opt.value,
                                          );
                                          return (
                                            <MenuItem
                                              key={opt.value}
                                              value={opt.value}
                                              disabled={dis}
                                            >
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 1,
                                                  width: "100%",
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: "50%",
                                                    backgroundColor: dis
                                                      ? "#ccc"
                                                      : cfg.color,
                                                    flexShrink: 0,
                                                  }}
                                                />
                                                <Box sx={{ flex: 1 }}>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: 1,
                                                    }}
                                                  >
                                                    <Typography
                                                      variant="body2"
                                                      sx={{
                                                        fontWeight: 600,
                                                        color: dis
                                                          ? "#aaa"
                                                          : "inherit",
                                                      }}
                                                    >
                                                      {opt.label}
                                                    </Typography>
                                                    {isOB && (
                                                      <Chip
                                                        label="→ Replaces current employee"
                                                        size="small"
                                                        sx={{
                                                          height: 16,
                                                          fontSize: "10px",
                                                          backgroundColor:
                                                            "#e8f5e9",
                                                          color: "#2e7d32",
                                                        }}
                                                      />
                                                    )}
                                                  </Box>
                                                  <Typography
                                                    variant="caption"
                                                    sx={{
                                                      color: dis
                                                        ? "#bbb"
                                                        : "#888",
                                                    }}
                                                  >
                                                    {opt.description}
                                                    {isOB &&
                                                      !canSetOnboarded &&
                                                      " · ACCOUNT SUPERVISOR / MIS only"}
                                                    {isOB &&
                                                      canSetOnboarded &&
                                                      cur !==
                                                        "For Onboarding" &&
                                                      ' · Requires "For Onboarding" first'}
                                                  </Typography>
                                                </Box>
                                              </Box>
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                      <FormHelperText
                                        sx={{
                                          color:
                                            cur === "Onboarded"
                                              ? "#2e7d32"
                                              : cur === "For Onboarding"
                                                ? "#e65100"
                                                : "inherit",
                                        }}
                                      >
                                        {cur === "Onboarded"
                                          ? "✅ Will replace current employee on save"
                                          : cur === "For Onboarding"
                                            ? canSetOnboarded
                                              ? "✅ You can now set Onboarded"
                                              : "🔒 ACCOUNT SUPERVISOR / MIS only"
                                            : "Track applicant through the hiring pipeline"}
                                      </FormHelperText>
                                    </FormControl>
                                  );
                                })()
                              ) : (
                                <Box>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: "#1565c0",
                                      fontWeight: 600,
                                      display: "block",
                                      mb: 0.5,
                                    }}
                                  >
                                    Incoming Applicant Status
                                  </Typography>
                                  {selectedOutlet.incomingApplicantStatus ? (
                                    (() => {
                                      const cfg = getApplicantStatusConfig(
                                        selectedOutlet.incomingApplicantStatus,
                                      );
                                      return (
                                        <Chip
                                          label={
                                            selectedOutlet.incomingApplicantStatus
                                          }
                                          sx={{
                                            fontWeight: 700,
                                            backgroundColor: cfg.bg,
                                            color: cfg.color,
                                            border: `1px solid ${cfg.color}40`,
                                          }}
                                        />
                                      );
                                    })()
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: "#bbb",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      Not set
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </Grid>

                            {/* Incoming Applicant Dropdown */}
                            <Grid item xs={12} sm={6}>
                              {isEditing ? (
                                (() => {
                                  const appStatus =
                                    selectedOutlet.incomingApplicantStatus;
                                  if (!appStatus || appStatus === "For Pooling")
                                    return (
                                      <TextField
                                        label="Assign Incoming Applicant"
                                        fullWidth
                                        value=""
                                        disabled
                                        helperText={
                                          !appStatus
                                            ? "Select incoming status first"
                                            : "No applicant needed for 'For Pooling'"
                                        }
                                      />
                                    );
                                  // Always show applicants — the incoming person is still an applicant
                                  // until promote-applicant runs on save (even when status = Onboarded)
                                  const list = efcApplicants;
                                  return (
                                    <FormControl fullWidth>
                                      <InputLabel>Assign Applicant</InputLabel>
                                      <Select
                                        value={
                                          selectedOutlet.incomingApplicantId ||
                                          ""
                                        }
                                        label="Assign Applicant"
                                        onChange={(e) =>
                                          setSelectedOutlet({
                                            ...selectedOutlet,
                                            incomingApplicantId: e.target.value,
                                          })
                                        }
                                      >
                                        <MenuItem value="">
                                          <em>— No Assignment —</em>
                                        </MenuItem>
                                        {list.map((emp) => (
                                          <MenuItem
                                            key={emp._id}
                                            value={emp._id}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                              }}
                                            >
                                              <span>
                                                {emp.firstName}{" "}
                                                {emp.middleName
                                                  ? emp.middleName + " "
                                                  : ""}
                                                {emp.lastName}
                                                {emp.position
                                                  ? ` — ${emp.position}`
                                                  : ""}
                                              </span>
                                              <Chip
                                                label="Applicant"
                                                size="small"
                                                sx={{
                                                  height: 16,
                                                  fontSize: "10px",
                                                  backgroundColor: "#e3f2fd",
                                                  color: "#1565c0",
                                                }}
                                              />
                                            </Box>
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      <FormHelperText>
                                        {appStatus === "Onboarded"
                                          ? `${efcApplicants.length} applicant(s) — will be promoted to Employed on save`
                                          : `${efcApplicants.length} EFC applicant(s) available`}
                                      </FormHelperText>
                                    </FormControl>
                                  );
                                })()
                              ) : (
                                <TextField
                                  label="Incoming Applicant"
                                  fullWidth
                                  value={(() => {
                                    if (!selectedOutlet.incomingApplicantId)
                                      return "Not assigned";
                                    const p = findPersonById(
                                      selectedOutlet.incomingApplicantId,
                                    );
                                    if (!p) return "Not assigned";
                                    return `${p.firstName} ${p.lastName}${p.position ? " — " + p.position : ""}${p.status === "Applicant" ? " (Applicant)" : ""}`;
                                  })()}
                                  InputProps={{ readOnly: true }}
                                />
                              )}
                            </Grid>

                            {/* Deploy date for incoming applicant — only when Onboarded */}
                            {selectedOutlet.incomingApplicantStatus ===
                              "Onboarded" && (
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Deploy Date (New Employee)"
                                  type="date"
                                  fullWidth
                                  value={
                                    selectedOutlet.incomingDeployDate || ""
                                  }
                                  InputLabelProps={{ shrink: true }}
                                  InputProps={{
                                    readOnly: !isEditing,
                                    startAdornment: (
                                      <EventIcon
                                        sx={{
                                          fontSize: 18,
                                          color: "#2e7d32",
                                          mr: 1,
                                        }}
                                      />
                                    ),
                                  }}
                                  onChange={(e) => {
                                    if (isEditing) {
                                      setSelectedOutlet({
                                        ...selectedOutlet,
                                        incomingDeployDate: e.target.value,
                                      });
                                      setDateError("");
                                    }
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      backgroundColor: isEditing
                                        ? "#f0fdf4"
                                        : "#fafafa",
                                    },
                                  }}
                                  helperText={
                                    isEditing
                                      ? "Required — date new employee starts"
                                      : `Starting ${formatDate(selectedOutlet.incomingDeployDate)}`
                                  }
                                  FormHelperTextProps={{
                                    sx: {
                                      color:
                                        isEditing &&
                                        !selectedOutlet.incomingDeployDate
                                          ? "#d32f2f"
                                          : "#2e7d32",
                                    },
                                  }}
                                />
                              </Grid>
                            )}

                            {/* ── Previous Employee Remarks — required when Onboarded ── */}
                            {/* Account Supervisor selects why the previous employee is being removed */}
                            {selectedOutlet.incomingApplicantStatus ===
                              "Onboarded" &&
                              selectedOutlet.assignedEmployeeId && (
                                <Grid item xs={12} sm={6}>
                                  {isEditing ? (
                                    <FormControl
                                      fullWidth
                                      error={
                                        !previousEmployeeRemarks && !!dateError
                                      }
                                    >
                                      <InputLabel>
                                        Previous Employee Remarks *
                                      </InputLabel>
                                      <Select
                                        value={previousEmployeeRemarks}
                                        label="Previous Employee Remarks *"
                                        onChange={(e) => {
                                          setPreviousEmployeeRemarks(
                                            e.target.value,
                                          );
                                          setDateError("");
                                        }}
                                      >
                                        <MenuItem value="">
                                          <em>— Select Remarks —</em>
                                        </MenuItem>
                                        <MenuItem value="Resign">
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            <Typography
                                              variant="body2"
                                              sx={{ fontWeight: 600 }}
                                            >
                                              Resign
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Employee voluntarily resigned
                                            </Typography>
                                          </Box>
                                        </MenuItem>
                                        <MenuItem value="Terminate">
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            <Typography
                                              variant="body2"
                                              sx={{ fontWeight: 600 }}
                                            >
                                              Terminate
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Employment terminated by company
                                            </Typography>
                                          </Box>
                                        </MenuItem>
                                        <MenuItem value="End of Contract">
                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                            }}
                                          >
                                            <Typography
                                              variant="body2"
                                              sx={{ fontWeight: 600 }}
                                            >
                                              End of Contract
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Contract period has ended
                                            </Typography>
                                          </Box>
                                        </MenuItem>
                                      </Select>
                                      <FormHelperText
                                        sx={{
                                          color: !previousEmployeeRemarks
                                            ? "#d32f2f"
                                            : "#666",
                                        }}
                                      >
                                        {!previousEmployeeRemarks
                                          ? "⚠ Required — select a reason for removing this employee"
                                          : `Previous employee will be set to Inactive / ${previousEmployeeRemarks}`}
                                      </FormHelperText>
                                    </FormControl>
                                  ) : (
                                    <Box>
                                      <Typography
                                        variant="caption"
                                        sx={{
                                          color: "#666",
                                          fontWeight: 600,
                                          display: "block",
                                          mb: 0.5,
                                        }}
                                      >
                                        Previous Employee Remarks
                                      </Typography>
                                      {previousEmployeeRemarks ? (
                                        <Chip
                                          label={previousEmployeeRemarks}
                                          sx={{
                                            fontWeight: 700,
                                            backgroundColor: "#fff3e0",
                                            color: "#e65100",
                                            border: "1px solid #ffcc8040",
                                          }}
                                        />
                                      ) : (
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            color: "#bbb",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          Not set
                                        </Typography>
                                      )}
                                    </Box>
                                  )}
                                </Grid>
                              )}

                            {/* Onboarding alert */}
                            {selectedOutlet.incomingApplicantStatus ===
                              "Onboarded" &&
                              selectedOutlet.incomingApplicantId && (
                                <Grid item xs={12}>
                                  <Alert
                                    severity="warning"
                                    icon={<SwapHorizIcon fontSize="inherit" />}
                                    sx={{ borderRadius: "8px" }}
                                  >
                                    <strong>On Save:</strong> Current employee
                                    will be set to{" "}
                                    <strong>
                                      Inactive /{" "}
                                      {previousEmployeeRemarks || "?"}
                                    </strong>{" "}
                                    and removed from this outlet. The incoming
                                    applicant will be deployed as the new
                                    merchandiser and promoted to{" "}
                                    <strong>Active / Employed</strong>.
                                    {!previousEmployeeRemarks && isEditing && (
                                      <Box
                                        sx={{
                                          mt: 0.5,
                                          color: "#d32f2f",
                                          fontWeight: 600,
                                          fontSize: "13px",
                                        }}
                                      >
                                        ⚠ Select a Remarks for the previous
                                        employee above before saving.
                                      </Box>
                                    )}
                                  </Alert>
                                </Grid>
                              )}
                          </Grid>
                        </CardContent>
                      </Card>
                    )}

                    {/* ════════════════════════════════════════════
                         SECTION 3: COORDINATOR
                    ════════════════════════════════════════════ */}
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
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Assign Coordinator</InputLabel>
                                <Select
                                  value={
                                    selectedOutlet.assignedCoordinatorId || ""
                                  }
                                  label="Assign Coordinator"
                                  onChange={(e) =>
                                    setSelectedOutlet({
                                      ...selectedOutlet,
                                      assignedCoordinatorId: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="">
                                    <em>— No Coordinator —</em>
                                  </MenuItem>
                                  {efcCoordinators.map((emp) => (
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
                                value={(() => {
                                  if (!selectedOutlet.assignedCoordinatorId)
                                    return "No coordinator";
                                  const e = efcCoordinators.find(
                                    (c) =>
                                      c._id ===
                                      selectedOutlet.assignedCoordinatorId,
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
                                disabled={!selectedOutlet.assignedCoordinatorId}
                              >
                                <InputLabel>Coordinator Status</InputLabel>
                                <Select
                                  value={
                                    selectedOutlet.assignedCoordinatorId
                                      ? selectedOutlet.coordinatorDeployStatus ||
                                        "Inactive"
                                      : "Inactive"
                                  }
                                  label="Coordinator Status"
                                  onChange={(e) =>
                                    setSelectedOutlet({
                                      ...selectedOutlet,
                                      coordinatorDeployStatus: e.target.value,
                                    })
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
                                value={
                                  selectedOutlet.coordinatorDeployStatus ||
                                  "Inactive"
                                }
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        pt: 1,
                      }}
                    >
                      {!isEditing ? (
                        <span>
                          <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setIsEditing(true)}
                            disabled={!canAccessEdit}
                            sx={{
                              backgroundColor: "#2e6385ff",
                              px: 4,
                              py: 1.5,
                              fontSize: "16px",
                              fontWeight: 600,
                              borderRadius: "8px",
                              textTransform: "none",
                              boxShadow: "0 4px 12px rgba(46,99,133,0.3)",
                              "&:hover": { backgroundColor: "#0c2e3fff" },
                              "&.Mui-disabled": {
                                backgroundColor: "#90a4ae",
                                color: "#eceff1",
                              },
                            }}
                          >
                            Edit Assignment
                          </Button>
                        </span>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSaveChanges(selectedOutlet)}
                            disabled={
                              !selectedOutlet.assignedEmployeeId &&
                              !selectedOutlet.assignedCoordinatorId &&
                              selectedOutlet.applicantStatus !==
                                "For Pooling" &&
                              !selectedOutlet.incomingApplicantId
                            }
                            sx={{
                              backgroundColor: "#2e6385ff",
                              px: 4,
                              py: 1.5,
                              fontSize: "16px",
                              fontWeight: 600,
                              borderRadius: "8px",
                              textTransform: "none",
                              boxShadow: "0 4px 12px rgba(46,99,133,0.3)",
                              "&:hover": { backgroundColor: "#0c2e3fff" },
                              "&.Mui-disabled": {
                                backgroundColor: "#b0bec5",
                                color: "white",
                                boxShadow: "none",
                              },
                            }}
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={() => {
                              setIsEditing(false);
                              setDateError("");
                            }}
                            sx={{
                              borderColor: "#d32f2f",
                              color: "#d32f2f",
                              px: 4,
                              py: 1.5,
                              fontSize: "16px",
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
                        </>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </>
  );
}
