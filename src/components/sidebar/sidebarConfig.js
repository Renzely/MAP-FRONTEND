// sidebarConfig.js  ← put this in its own file
import {
  Dashboard,
  AssignmentInd,
  ManageAccounts,
  SupervisorAccount,
  ListAlt,
} from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactPageIcon from "@mui/icons-material/ContactPage";

// Role groups — define once, reuse everywhere
const ALL_HR = [
  "MIS",
  "HR HEAD",
  "HR OFFICER",
  "HR SPECIALIST",
  "HR COMPENSATION AND BENEFITS",
  "HR COORDINATOR SPECIALIST",
];
const HR_MANAGEMENT = [...ALL_HR, "EXECUTIVE DIRECTOR", "OPERATION DIRECTOR"];
const CLIENT_ACCESS = [
  ...ALL_HR,
  "EXECUTIVE DIRECTOR",
  "OPERATION DIRECTOR",
  "ACCOUNT SUPERVISOR",
];
const ACCOUNT_SUPERVISORS = ["MIS", "OPERATION DIRECTOR", "ACCOUNT SUPERVISOR"];

export const NAV_CONFIG = [
  {
    label: "Dashboard",
    path: "/view-dashboard",
    icon: Dashboard,
    allowedRoles: null, // null = everyone
  },
  {
    label: "Employee Registration",
    path: "/view-AccountCreationEmployee",
    icon: PersonAddIcon,
    allowedRoles: ALL_HR,
  },
  {
    label: "Admin Accounts",
    path: "/view-admin-accounts",
    icon: AdminPanelSettingsIcon,
    allowedRoles: ["MIS", "HR HEAD"],
  },
  {
    label: "Recent Activity",
    path: "/view-recent-activity",
    icon: ListAlt,
    allowedRoles: ["MIS", "HR HEAD", "EXECUTIVE DIRECTOR"],
  },
  {
    label: "Client Profiles",
    icon: ContactPageIcon,
    allowedRoles: CLIENT_ACCESS,
    children: [
      {
        label: "Client Profile Registration",
        path: "/view-AccountCreationProfileclient",
        icon: ManageAccounts,
        allowedRoles: ACCOUNT_SUPERVISORS,
      },
      {
        label: "Client Profile",
        path: "/view-clientProfile",
        icon: ContactPhoneIcon,
        allowedRoles: CLIENT_ACCESS,
      },
    ],
  },
  {
    label: "EFC Outlets",
    path: "/view-Outletlist",
    icon: StoreIcon,
    allowedRoles: [
      ...ALL_HR,
      "ACCOUNT SUPERVISOR",
      "EXECUTIVE DIRECTOR",
      "OPERATION DIRECTOR",
    ],
  },
  {
    label: "SPX Hubs",
    path: "/view-spxhubs",
    icon: StoreIcon,
    allowedRoles: [...ALL_HR, "COORDINATOR", "EXECUTIVE DIRECTOR"],
  },
  {
    label: "Applicants",
    path: "/view-applicants",
    icon: AssignmentInd,
    allowedRoles: ALL_HR,
  },
  {
    label: "Employee Management",
    icon: GroupsIcon,
    allowedRoles: [...HR_MANAGEMENT, "ACCOUNT SUPERVISOR", "COORDINATOR"],
    children: [
      {
        label: "BMPOWER",
        icon: AssignmentInd,
        allowedRoles: [...HR_MANAGEMENT, "ACCOUNT SUPERVISOR", "COORDINATOR"],
        children: [
          {
            label: "BMPOWER HO",
            path: "/view-bmpowerHO",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Asian Streak Brokerage",
            path: "/view-asianstreak",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Ecossential Foods",
            path: "/view-ecossentialfoods",
            icon: AssignmentInd,
            allowedRoles: [
              ...HR_MANAGEMENT,
              "ACCOUNT SUPERVISOR",
              "COODINATOR",
            ],
          },
          {
            label: "Ecossential Foods HO",
            path: "/view-ecossentialfoodsHO",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Brollee Exclusive",
            path: "/view-brolleeexlusive",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Engkanto",
            path: "/view-engkanto",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Magis",
            path: "/view-magis",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Mckenzie",
            path: "/view-mckenzie",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "PLDT Telescoop",
            path: "/view-pldt",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "SPX Express",
            path: "/view-spx",
            icon: AssignmentInd,
            allowedRoles: [...HR_MANAGEMENT, "COORDINATOR"],
          },
          {
            label: "Del Monte",
            path: "/view-delmonte",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Mandom",
            path: "/view-mandom",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Union Galvasteel",
            path: "/view-galvasteel",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
        ],
      },
      {
        label: "MARABOU",
        icon: AssignmentInd,
        allowedRoles: HR_MANAGEMENT,
        children: [
          {
            label: "Marabou HO",
            path: "/view-marabouHO",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Carmens Best",
            path: "/view-carmensbest",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Metro Pacific Dairy Farm",
            path: "/view-metropacific",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Metro Pacific Fresh Farm",
            path: "/view-metropacificfresh",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Universal Harvester Dairy Farm",
            path: "/view-universalharvester",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Long Table - Masajiro",
            path: "/view-longtable",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "J-GYU INC",
            path: "/view-jgyu",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
          {
            label: "Cosmetique Asia",
            path: "/view-cosmetic",
            icon: AssignmentInd,
            allowedRoles: HR_MANAGEMENT,
          },
        ],
      },
    ],
  },
];
