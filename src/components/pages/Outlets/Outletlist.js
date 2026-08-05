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
  Autocomplete,
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
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import EFClogo from "../../Images/Bmpower_Logo/BMP - EFC.jpg";

// ═════════════════════════════════════════════════════════════════════════════
// 1. CONSTANTS & CONFIGURATION
// ═════════════════════════════════════════════════════════════════════════════

const REGION_ORDER = [
  "NCR",
  "CAR",
  "REGION 1",
  "REGION 2",
  "REGION 3",
  "REGION 4A",
  "REGION 4B",
  "REGION 5",
  "REGION 6",
  "REGION 7",
  "REGION 8",
  "REGION 9",
  "REGION 10",
  "REGION 11",
  "REGION 12",
];

export const OUTLET_DATA = [
  {
    id: 1,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - SUCAT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 2,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - BICUTAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 3,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - MUNTINLUPA WEST",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 4,
    region: "NCR",
    outlet: "LANDMARK - ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 5,
    region: "NCR",
    outlet: "SOUTH - GROCERS BF",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 6,
    region: "NCR",
    outlet: "SUPER 8 - LIBERTAD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 7,
    region: "NCR",
    outlet: "SUPER 8 - BACLARAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 8,
    region: "NCR",
    outlet: "SUPER 8 - MALIBAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 9,
    region: "NCR",
    outlet: "SUPER 8 - MAKATI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 10,
    region: "NCR",
    outlet: "SUPER 8 - GUADALUPE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 11,
    region: "NCR",
    outlet: "LANDMARK - MAKATI-1",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 12,
    region: "NCR",
    outlet: "LANDMARK - MAKATI-2",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 13,
    region: "NCR",
    outlet: "ROBINSON SUPERMARKET - ONE AYALA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 14,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - MARKET MARKET",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 15,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 16,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - NEW PORT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 17,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - GATE3",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 18,
    region: "NCR",
    outlet: "AFPCES - FB C&X FORT BONIFACIO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 19,
    region: "NCR",
    outlet: "AFPCES - BNS C&X NAVAL GATE 3 FORT BONIFACIO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 20,
    region: "NCR",
    outlet: "SOUTH SUPERMARKET - ALABANG FILINVEST",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 21,
    region: "NCR",
    outlet: "LIANA'S SUPERMARKET - ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 22,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUP - PUTATAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 23,
    region: "NCR",
    outlet: "LIANAS SUPERMARKET - EVACOM",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 24,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PARANAQUE-2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 25,
    region: "NCR",
    outlet: "LIANA'S SUPERMARKET - LEVERIZA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 26,
    region: "NCR",
    outlet: "LIANA'S SUPERMARKET - LRT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 27,
    region: "NCR",
    outlet: "MAKATI SUP. - ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 28,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - MAKATI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 29,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - PASAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 30,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - 4TH STATE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 31,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - SUCAT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  // {
  //   id: 32,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - MUNTINLUPA",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  {
    id: 33,
    region: "NCR",
    outlet: "SUPER 8 - MUNTINLUPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 34,
    region: "NCR",
    outlet: "SUPER 8 - ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 35,
    region: "NCR",
    outlet: "SUPER 8 - SUCAT 2",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 36,
    region: "NCR",
    outlet: "SUPER 8 - CAA LAS PINAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 37,
    region: "NCR",
    outlet: "SUPER 8 - BAGUMBAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 38,
    region: "NCR",
    outlet: "SUPER 8 - LAS PINAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 39,
    region: "NCR",
    outlet: "SUPER 8 - LA HUERTA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 40,
    region: "NCR",
    outlet: "LANDMARK - MANILA BAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 41,
    region: "NCR",
    outlet: "SUPER 8 - ORTIGAS EXT. CAINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 42,
    region: "NCR",
    outlet: "SUPER 8 - TAYTAY 1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 43,
    region: "NCR",
    outlet: "SUPER 8 - MASINAG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 44,
    region: "NCR",
    outlet: "SUPER 8 - CAINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 45,
    region: "NCR",
    outlet: "SUPER 8 - TAYTAY 2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 46,
    region: "NCR",
    outlet: "SUPER 8 - COGEO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 47,
    region: "NCR",
    outlet: "SUPER 8 - ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 48,
    region: "NCR",
    outlet: "SUPER 8 - NAPINDAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 49,
    region: "NCR",
    outlet: "SUPER 8 - ROSARIO 2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 50,
    region: "NCR",
    outlet: "SUPER 8 - ANGONO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 51,
    region: "NCR",
    outlet: "SUPER 8 - BINANGONAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 52,
    region: "NCR",
    outlet: "SUPER 8 - MORONG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 53,
    region: "NCR",
    outlet: "SUPER 8 - TANAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 54,
    region: "NCR",
    outlet: "SUPER 8 - SAN JUAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 55,
    region: "NCR",
    outlet: "SUPER 8 - SHAW",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 56,
    region: "NCR",
    outlet: "SUPER 8 - SAN JOAQUIN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 57,
    region: "NCR",
    outlet: "SUPER 8 - SIGNAL (FTI)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 58,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - TAYTAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 59,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 60,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PARANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 61,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - SAN MATEO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 62,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PEÑAFRANCIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 63,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - CAINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 64,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PATEROS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 65,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PINAGBUHATAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 66,
    region: "NCR",
    outlet: "LIANA'S SUPERMARKET - PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 67,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC  - SANTOLAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 68,
    region: "NCR",
    outlet: "UNIMART - CAPITAL COMMON PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 69,
    region: "NCR",
    outlet: "UNIMART- GREENHILLS,SANJUAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 70,
    region: "NCR",
    outlet: "SOUTH PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 71,
    region: "NCR",
    outlet: "SOUTH MARIKINA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 72,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - FELIZ",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 73,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUP - SHAW (2)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 74,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - SHAW",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 75,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 76,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - ROCES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 77,
    region: "NCR",
    outlet: "SUPER 8 - ERMIN GARCIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 78,
    region: "NCR",
    outlet: "SUPER 8 - FARMERS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 79,
    region: "NCR",
    outlet: "SUPER 8 - MOLAVE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 80,
    region: "NCR",
    outlet: "SUPER 8 - LITEX",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 81,
    region: "NCR",
    outlet: "SUPER 8 - COMMONWEALTH",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 82,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - NORTH EDSA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 83,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - VISAYAS AVE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 84,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - E.ROD",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 85,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - JUNCTION",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 86,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGUMBONG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 87,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGONG SILANG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 88,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - VICAS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 89,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - KAYBIGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 90,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - MALIGAYA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 91,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - LAGRO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 92,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - COMMONWEALTH",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 93,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PEARL DRIVE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 94,
    region: "NCR",
    outlet: "ROBINSONS  - COMMONWEALTH(shopwise)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 95,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - TALIPAPA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 96,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - BAESA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 97,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - QUIRINO HIWAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 98,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - SAUYO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 99,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - FOREST HILL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 100,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGBAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 101,
    region: "NCR",
    outlet: "ULTRAMEGA - DEPARO",
    accountSupervisor: "CASERES, JAYSON",
  },
  // {
  //   id: 102,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - NOVALICHES",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 103,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - BAGONG SILANG",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  {
    id: 104,
    region: "NCR",
    outlet: "SUPER 8 - NOVA 2",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 105,
    region: "NCR",
    outlet: "SUPER 8 - TANDANG SORA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 106,
    region: "NCR",
    outlet: "SUPER 8 - BAGONG SILANG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 107,
    region: "NCR",
    outlet: "SUPER 8 - CAMARIN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 108,
    region: "NCR",
    outlet: "AFPCES CAMP AGUINALDO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 109,
    region: "NCR",
    outlet: "AFPCES V. LUNA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 110,
    region: "NCR",
    outlet: "LANDMARK - TRINOMA MAIN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 111,
    region: "NCR",
    outlet: "LANDMARK - TRINOMA COMPLEX",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 112,
    region: "NCR",
    outlet: "ULTRAMEGA - GAGALANGIN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 113,
    region: "NCR",
    outlet: "SUPER 8 - RECTO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 114,
    region: "NCR",
    outlet: "SUPER 8 - PACO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 115,
    region: "NCR",
    outlet: "SUPER 8 - PRITIL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 116,
    region: "NCR",
    outlet: "SUPER 8 - GAGALANGIN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 117,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - BANGKAL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 118,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PACO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 119,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PANDACAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 120,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - RETIRO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 121,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - TRABAJO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 122,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - MASANGKAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 123,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC  - YUSECO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 124,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - HERMOSA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 125,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - TONDO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 126,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - MAYPAJO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 127,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - ARLEGUI QUIAPO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 128,
    region: "NCR",
    outlet: "ULTRAMEGA - SANGANDAAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 129,
    region: "NCR",
    outlet: "SUPER 8 - JACKMAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 130,
    region: "NCR",
    outlet: "SUPER 8 - BLUMENTRITT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 131,
    region: "NCR",
    outlet: "SUPER 8 - MARULAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 132,
    region: "NCR",
    outlet: "SUPER 8 - P. BURGOS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 133,
    region: "NCR",
    outlet: "SUPER 8 - TINAJEROS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 134,
    region: "NCR",
    outlet: "SUPER 8 - HULONG DUHAT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 135,
    region: "NCR",
    outlet: "SUPER 8 - KARUHATAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 136,
    region: "NCR",
    outlet: "SUPER 8 - GEN. T VALENZUELA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 137,
    region: "NCR",
    outlet: "SUPER 8 - BALINTAWAK",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 138,
    region: "NCR",
    outlet: "SUPER 8 - TATALON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 139,
    region: "NCR",
    outlet: "LIANA'S SUPERMARKET - SAMPALOC",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 140,
    region: "NCR",
    outlet: "ISETANN – CARRIEDO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 141,
    region: "NCR",
    outlet: "ISETANN- RECTO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 142,
    region: "NCR",
    outlet: "ISETANN – STA.MESA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 143,
    region: "NCR",
    outlet: "ISETANN – CUBAO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 144,
    region: "NCR",
    outlet: "AFPCES MALACANANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 145,
    region: "NCR",
    outlet: "SOUTH VALENZUELA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 146,
    region: "NCR",
    outlet: "ROBINSONS MEYCAUAYAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 147,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - BINONDO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 148,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC  - GAGALANGIN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 149,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - CALOOCAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 150,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - LANGARAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 151,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - CONCEPCION",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 152,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - NAVOTAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 153,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - CATMON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 154,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGUMBAYAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 155,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - 10TH AVE.",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 156,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - 11TH AVE.",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 157,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - LORETO MORNING BREEZE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 158,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - PANGHULO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 159,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - POLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 160,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - DALANDANAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 161,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - MARULAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 162,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - GEN.T DE LEON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 163,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - MAYSAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 164,
    region: "NCR",
    outlet: "ULTRAMEGA - ARITAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 165,
    region: "NCR",
    outlet: "ULTRAMEGA - CORDON",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 166,
    region: "NCR",
    outlet: "ULTRAMEGA - SAN MATEO ISABELA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 167,
    region: "NCR",
    outlet: "ULTRAMEGA - MADDELA ISABELA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 168,
    region: "NCR",
    outlet: "ULTRAMEGA - IFUGAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 169,
    region: "NCR",
    outlet: "ROBINSONS - EASTWOOD TECHNOPLAZA II",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 170,
    region: "NCR",
    outlet: "THE MARKETPLACE - EASTWOOD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 171,
    region: "NCR",
    outlet: "THE MARKETPLACE - KATIPUNAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 172,
    region: "NCR",
    outlet: "SHOPWISE - ARANETA CUBAO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 173,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - FARMERS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 174,
    region: "NCR",
    outlet: "ROBINSONS- GATEWAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 175,
    region: "NCR",
    outlet: "THE MARKETPLACE - CAPITOL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 176,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - MAGINHAWA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 177,
    region: "NCR",
    outlet: "THE MARKETPLACE - CORINTHIAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 178,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - MANHATTAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 179,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - LOYOLA HEIGHTS QC",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 180,
    region: "NCR",
    outlet: "THE MARKETPLACE - SANTOLAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 181,
    region: "NCR",
    outlet: "THE MARKETPLACE - P.GUEVARRA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 182,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - N' DOMINGO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 183,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - P TUAZON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 184,
    region: "NCR",
    outlet: "THE MARKETPLACE- MAGNOLIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 185,
    region: "NCR",
    outlet: "ROBINSONS PLACE - MAGNOLIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 186,
    region: "NCR",
    outlet: "ROBINSONS  - BLUEWAVE MARIKINA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 187,
    region: "NCR",
    outlet: "ROBINSONS - GRACELAND PLAZA MARIKINA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 188,
    region: "NCR",
    outlet: "ROBINSONS PLACE - ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 189,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - HILL SIDE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 190,
    region: "NCR",
    outlet: "ROBINSON EASYMART- MARIKINA HEIGHTS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 191,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - TUMANA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 192,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - SANTOLAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 193,
    region: "NCR",
    outlet: "THE MARKETPLACE - GROOVE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 194,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - THE LINK",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 195,
    region: "NCR",
    outlet: "THE MARKETPLACE - OPUS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 196,
    region: "NCR",
    outlet: "ROBINSONS - LUCKY GOLD PLAZA ORTIGAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 197,
    region: "NCR",
    outlet: "ROBINSONS - KARANGALAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 198,
    region: "NCR",
    outlet: "ROBINSONS - ACACIA ESCALADES PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 199,
    region: "NCR",
    outlet: "ROBINSONS PLACE - METROEAST",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 200,
    region: "NCR",
    outlet: "ROBINSONS - MERCEDES PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 201,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -C.RAYMUNDO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 202,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -SANDOVAL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 203,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -BINANGONAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 204,
    region: "NCR",
    outlet: "SHOPWISE - ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 205,
    region: "NCR",
    outlet: "THE MARKETPLACE - 30TH",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 206,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - ROBLU CAINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 207,
    region: "NCR",
    outlet: "ROBINSONS PLACE - CAINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 208,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - HOMES ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 209,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - BARAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 210,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - PILILLA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 211,
    region: "NCR",
    outlet: "ULTRAMEGA - GUAGUA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 212,
    region: "NCR",
    outlet: "ULTRAMEGA - ARAYAT",
    accountSupervisor: "CASERES, JAYSON",
  },
  // {
  //   id: 213,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - TARLAC",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  {
    id: 214,
    region: "NCR",
    outlet: "ROBINSONS - METRO PLAZA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 215,
    region: "NCR",
    outlet: "ROBINSONS - ZABARTE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 216,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - METRO PLAZA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 217,
    region: "NCR",
    outlet: "ROBINSONS - VALENZUELA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 218,
    region: "NCR",
    outlet: "ROBINSONS - BIGNAY VALENZUELA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 219,
    region: "NCR",
    outlet: "ROBINSONS - VICTORY MALL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 220,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - ARBORTOWNE VALENZUELA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 221,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - TOWN CENTER",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 222,
    region: "NCR",
    outlet: "ROBINSONS - NOVALICHES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 223,
    region: "NCR",
    outlet: "ROBINSONS - TOWNVILLE REGALADO FAIRVIEW",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 224,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - FAIRVIEW",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 225,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - DAHLIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 226,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - OLD SAUYO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 227,
    region: "NCR",
    outlet: "ROBINSONS - FILINVEST BATASAN HILLS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 228,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - GENERAL AVENUE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 229,
    region: "NCR",
    outlet: "ROBINSONS-CULIAT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 230,
    region: "NCR",
    outlet: "ROBINSONS - DOÑA CARMEN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 231,
    region: "NCR",
    outlet: "ROBINSONS - TANDANG SORA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 232,
    region: "NCR",
    outlet: "ROBINSONS - CONGRESSIONAL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 233,
    region: "NCR",
    outlet: "ROBINSONS - CLOVERLEAF MALL.",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 234,
    region: "NCR",
    outlet: "ROBINSONS PLACE - MALABON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 235,
    region: "NCR",
    outlet: "ROBINSONS - MC MALABON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 236,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - METRO PLAZA B.SILANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 237,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - HOLIDAY ISLAND B.SILANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 238,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - SACRED HEART",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 239,
    region: "NCR",
    outlet: "ROBINSONS - QUIRINO HI WAY LAGRO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 240,
    region: "NCR",
    outlet: "ROBINSON EASYMART - NOVALICHES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 241,
    region: "NCR",
    outlet: "ROBINSONS - SUSANO COMPLEX NOVALICHES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 242,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -BLOCK ONE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 243,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - ROOSEVELT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 244,
    region: "NCR",
    outlet: "ROBINSONS - BANAWE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 245,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - KAMUNING",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 246,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - E. RODRIGUEZ SR. QC (PURITY)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 247,
    region: "NCR",
    outlet: "THE MARKETPLACE - TOMAS MORATO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 248,
    region: "NCR",
    outlet: "SHOPWISE EXPRESS - Q. AVE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 249,
    region: "NCR",
    outlet: "ROBINSONS - COMMONWEALTH",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 250,
    region: "NCR",
    outlet: "ROBINSONS -  TIMOG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 251,
    region: "NCR",
    outlet: "ROBINSONS - MONTALBAN TOWNCENTER",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 252,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -BIRMINGHAM",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 253,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - KAMBAL ROAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 254,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - SAN MATEO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  // {
  //   id: 255,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - BALIUAG HIGHWAY",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 256,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - BALIUAG BAYAN",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  {
    id: 257,
    region: "NCR",
    outlet: "ROBINSONS PLACE - GALLERIA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 258,
    region: "NCR",
    outlet: "THE MARKETPLACE - UPTOWN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 259,
    region: "NCR",
    outlet: "THE MARKETPLACE - BGC",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 260,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - STAMFORD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 261,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - MARKET MARKET -2",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 262,
    region: "NCR",
    outlet: "ROBINSONS - VENICE GRAND MCKINLEY.",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 263,
    region: "NCR",
    outlet: "ROBINSONS - 8 FORBES TOWN ROAD TAGUIG.",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 264,
    region: "NCR",
    outlet: "ROBINSONS - CALIFORNIA MANDALUYONG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 265,
    region: "NCR",
    outlet: "THE MARKETPLACE- SHANGRI-LA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 266,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - BONI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 267,
    region: "NCR",
    outlet: "ROBINSONS PLACE - ERMITA-1",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 268,
    region: "NCR",
    outlet: "ROBINSONS PLACE - ERMITA-2",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 269,
    region: "NCR",
    outlet: "ROBINSONS - TUTUBAN CENTERMALL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 270,
    region: "NCR",
    outlet: "ROBINSON PLACE - OTIS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 271,
    region: "NCR",
    outlet: "ROBINSONS - TOWNVILLE BF PARANAQUE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 272,
    region: "NCR",
    outlet: "ROBINSONS - BF AGUIRRE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 273,
    region: "NCR",
    outlet: "ROBINSONS - WOODSVILLE MERVILLE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 274,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - BETTERLIVING",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 275,
    region: "NCR",
    outlet: "ROBINSONS - FEDERAL BAY GARDEN PASAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 276,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - ARNAIZ",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 277,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -  METRO POINT TAFT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 278,
    region: "NCR",
    outlet: "ROBINSONS PLACE - LAS PINAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 279,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - NAGA ROAD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 280,
    region: "NCR",
    outlet: "ROBINSONS - SOUTHPARK MALL ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 281,
    region: "NCR",
    outlet: "ROBINSONS - MADISON GALERIES MUNTINLUPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 282,
    region: "NCR",
    outlet: "THE MARKETPLACE - EASTBAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 283,
    region: "NCR",
    outlet: "SHOPWISE - SUCAT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 284,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - ALABANG HILLS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 285,
    region: "NCR",
    outlet: "SHOPWISE - ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 286,
    region: "NCR",
    outlet: "THE MARKETPLACE - AYALA ALABANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 287,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -BF RESORT LP",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 288,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -MARCOS ALVAREZ",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 289,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - SAN LORENZO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 290,
    region: "NCR",
    outlet: "THE MARKET PLACE - MAGALLANES",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 291,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - PEMBO MAKATI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 292,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - PATEROS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 293,
    region: "NCR",
    outlet: "THE MARKETPLACE - CENTURY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 294,
    region: "NCR",
    outlet: "THE MARKET PLACE - MAKATI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 295,
    region: "NCR",
    outlet: "THE MARKETPLACE - ROCKWELL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 296,
    region: "NCR",
    outlet: "SHOPWISE - MAKATI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 297,
    region: "NCR",
    outlet: "SHOPWISE - CIRCUIT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 298,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - MAKATI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 299,
    region: "NCR",
    outlet: "THE MARKETPLACE - ALPHALAND",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 300,
    region: "NCR",
    outlet: "THE MARKETPLACE - PASEO DE ROXAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 301,
    region: "NCR",
    outlet: "THE MARKETPLACE - TWO CENTRAL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 302,
    region: "NCR",
    outlet: "THE MARKETPLACE - PARQAL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 303,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - MARIPOSA ARCADE KAPASIGAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 304,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - STO TOMAS PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 305,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -ONE MERCEDES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 306,
    region: "NCR",
    outlet: "ROBINSONS EASYMART -AMAIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  // {
  //   id: 307,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - CANDABA",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 308,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - BALIBAGO",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  {
    id: 309,
    region: "NCR",
    outlet: "ROBINSONS-DON ANTONIO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 310,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - THE EMERALD COURT PROJECT 6",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 311,
    region: "NCR",
    outlet: "ROBINSONS-MIRANILA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  // {
  //   id: 312,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - BALAGTAS",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  {
    id: 313,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MALANDAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  // {
  //   id: 314,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - SAPANG PALAY",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 315,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - SAN MIGUEL",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  {
    id: 316,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TAYUMAN-2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 317,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - GAGALANGIN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 318,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - DV HERBOSA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 319,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MALABON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 320,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NAVOTAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 321,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - C. RAYMUNDO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 322,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MAYPAJO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 323,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - 999",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 324,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- JUAN LUNA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 325,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- V. MAPA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 326,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PUREZA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 327,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LANGARAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 328,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- LIBIS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 329,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - 999 CALOOCAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 330,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - ORTIGAS AVE EXT PASIG (G)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 331,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LIGAYA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 332,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BLUMENTRITT CGH",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 333,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BLUMENTRITT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 334,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - AGORA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 335,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - STA.MESA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 336,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MONUMENTO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 337,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - KALENTONG 1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 338,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SHAW-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 339,
    region: "NCR",
    outlet: "PUREGOLD-DV SAN MIGUEL PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 340,
    region: "NCR",
    outlet: "PUREGOLD-SIKAP MINIMART",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 341,
    region: "NCR",
    outlet: "PUREGOLD - AGLIPAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 342,
    region: "NCR",
    outlet: "PUREGOLD-BARRANCA MINIMART",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 343,
    region: "NCR",
    outlet: "PUREGOLD-PRIMO CRUZ MINIMART",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 344,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - DIVISORIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 345,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MALINAO PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 346,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MERCEDEZ",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 347,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ESPANA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 348,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BUSTILLOS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 349,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ROSARIO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 350,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DE CASTRO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 351,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TAYUMAN-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 352,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 353,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ZURBARAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 354,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- 3RD AVE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 355,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CALOOCAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 356,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DOROTEO JOSE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 357,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CARRIEDO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 358,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CUBAO-2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 359,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - Q.I -2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 360,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- WEST AVE.",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 361,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA)- PHILAM",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 362,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CUBAO-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 363,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SUSANO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 364,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NITANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 365,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- KALAYAAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 366,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - COMMONWEALTH-2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 367,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- KARUHATAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 368,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MALINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 369,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BALARA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 370,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - VISAYAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 371,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TANDANG SORA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 372,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BAESA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 373,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CROSSROAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 374,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- QUIRINO HI WAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 375,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 376,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - KANLAON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 377,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DEL MONTE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 378,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- A. BONIFACIO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 379,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - DEPARO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 380,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - Q.I -1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 381,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PASO DE BLAS- 2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 382,
    region: "NCR",
    outlet: "PUREGOLD - GEN T. DE LEON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 383,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PASO DE BLAS- 1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 384,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CAMARIN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 385,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CHAMPACA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 386,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BALINTAWAK",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 387,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NOVALICHES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 388,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ZABARTE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 389,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - VALENZUELA-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 390,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MINDANAO AVE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 391,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LANGIT ROAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 392,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BAGONG SILANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 393,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BAGUMBONG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 394,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - ZABARTE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 395,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MOTHER IGNACIA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 396,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TIMOG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 397,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - Q. AVE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 398,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TERRACES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 399,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DON ANTONIO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 400,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CULIAT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 401,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - COMMONWEALTH-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 402,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PANDACAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 403,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BOCOBO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 404,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MAKATI-2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 405,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- OSMENA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 406,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - KALENTONG 2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 407,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LIBERTAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 408,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SKY REGENCY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 409,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LAS PINAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 410,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TIPAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 411,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- USUSAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 412,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TAGUIG HAGONOY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 413,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MOONWALK",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 414,
    region: "NCR",
    outlet: "PUREGOLD MINIMART - DONA SOLEDAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 415,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - REMANVILLE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 416,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BACLARAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 417,
    region: "NCR",
    outlet: "PUREGOLD - 88 SQUARE PARANAQUE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 418,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BF HOMES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 419,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - AGUIRRE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 420,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SOUTHGATE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 421,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MALATE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 422,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BETTER LIVING",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 423,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TAGUIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 424,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LIBERTAD-2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 425,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - FTI",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 426,
    region: "NCR",
    outlet: "PUREGOLD-PILAR VILLAGE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 427,
    region: "NCR",
    outlet: "PUREGOLD-GOLDEN ACRES",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 428,
    region: "NCR",
    outlet: "PUREGOLD-MONTILLANO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 429,
    region: "NCR",
    outlet: "PUREGOLD-BAYANAN EXTRA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 430,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MAKATI-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 431,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PACO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 432,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SUCAT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 433,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PULANG LUPA DOS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 434,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LIBERTAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 435,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SAN ANTONIO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 436,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SAN DIONISIO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 437,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PARANAQUE-1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 438,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ZAPOTE ARCADE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 439,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PULANG LUPA UNO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 440,
    region: "NCR",
    outlet: "PUREGOLD-BAMBOO ORGAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 441,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CASIMIRO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 442,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MARCOS ALVAREZ LAS PINAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 443,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SOUTHPARK",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 444,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - JUNCTION",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 445,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TANAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 446,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TAYTAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 447,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 448,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ANTIPOLO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 449,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - KASIGLAHAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 450,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SAN ISIDRO MONTALBAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 451,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB -MONTALBAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 452,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- AMPID",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 453,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- GUITNANG BAYAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 454,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - GULOD MALAYA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 455,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TAYTAY FLOODWAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 456,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAYTAY ANNEX",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 457,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - AMPID SAN MATEO (G)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 458,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TAYTAY -2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 459,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PAG ASA BINANGONAN (G)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 460,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BINANGONAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 461,
    region: "NCR",
    outlet: "PUREGOLD-DV TAYTAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 462,
    region: "NCR",
    outlet: "PUREGOLD-DV SAN ISIDRO TAYTAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 463,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- NANGKA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 464,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BATASAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 465,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ORTIGAS EXT EAST SUMMIT",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 466,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA) - BROOKSIDE CAINTA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 467,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB -SUPERPALENGKE, ANTIPOLO (G)",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 468,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PAROLA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 469,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAYTAY PALENGKE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 470,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - Q. PLAZA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 471,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SAN RAFAEL",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 472,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DULONG BAYAN SAN MATEO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 473,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - BURGOS MONTALBAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 474,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CONCEPCION",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 475,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CONCEPCION",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 476,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LILAC",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 477,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PANORAMA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 478,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CIRCUMFERENTIAL ROAD",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 479,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TERESA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 480,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - EXTRA COGEO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 481,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - EASTLAND",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 482,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SUMULONG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 483,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- STA. ELENA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 484,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - AYALA MALL MARIKINA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 485,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PARANG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 486,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - ANGONO",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 487,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO HIGH WAY",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 488,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO BAYAN",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 489,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SAN MATEO BANABA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 490,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MARIKINA",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 491,
    region: "NCR",
    outlet: "ULTRAMEGA - LEMERY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 492,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - LAS PINAS 2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 493,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - TS CRUZ",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 494,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH 2",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 495,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PAYATAS",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 496,
    region: "NCR",
    outlet: "LANDMARK - BGC",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 497,
    region: "NCR",
    outlet: "STA LUCIA - PHASE3",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 498,
    region: "NCR",
    outlet: "STA LUCIA - PHASE1",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 499,
    region: "NCR",
    outlet: "PIONEER CENTRE- PIONEER PASIG",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 500,
    region: "NCR",
    outlet: "FISHERMALL Q. AVENUE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 501,
    region: "NCR",
    outlet: "HI-TOP SUPERMARKET - Q.AVE.",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 502,
    region: "NCR",
    outlet: "HI-TOP SUPERMARKET - AURORA BLVD",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 503,
    region: "NCR",
    outlet: "FISHERMALL MALABON",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 504,
    region: "CAR",
    outlet: "PUREGOLD PRICE CLUB - LA TRINIDAD BENGUET",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 505,
    region: "CAR",
    outlet: "PUREGOLD PRICE CLUB - BAGUIO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 506,
    region: "CAR",
    outlet: "ROBINSONS - PORTA VAGA MALL BAGUIO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 507,
    region: "CAR",
    outlet: "THE MARKETPLACE - BAGUIO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 508,
    region: "CAR",
    outlet: "PUREGOLD PRICE CLUB - BURNHAM PARK",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 509,
    region: "CAR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BAKAKENG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 510,
    region: "REGION 1",
    outlet: "ROBINSONS - XENTRO MALL VIGAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 511,
    region: "REGION 1",
    outlet: "ROBINSONS PLACE - PANGASINAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 512,
    region: "REGION 1",
    outlet: "ROBINSONS - NEPOMALL DAGUPAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 513,
    region: "REGION 1",
    outlet: "ROBINSONS - SAN CARLOS TOWN CENTER PANGASINAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 514,
    region: "REGION 1",
    outlet: "ROBINSONS -LA UNION",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 515,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - VIGAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 516,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - LA UNION",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 517,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - BACNOTAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 518,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - CALASIAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 519,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - MANAOAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 520,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - SAN FABIAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 521,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BONUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 522,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - MAYOMBO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 523,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BAYAMBANG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 524,
    region: "REGION 1",
    outlet: "SUPER 8 - URDANETA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 525,
    region: "REGION 1",
    outlet: "SUPER 8 - MANAOAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 526,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB URDANETA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 527,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - VILLASIS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 528,
    region: "REGION 1",
    outlet: "PUREGOLD-MANGATAREM",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 529,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB - LAOAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 530,
    region: "REGION 1",
    outlet: "ROBINSON - ILOCOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 531,
    region: "REGION 1",
    outlet: "GEN. TRADE - ERGO SUPERMARKET",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 532,
    region: "REGION 1",
    outlet: "GEN. TRADE - JTC SUPERMARKET",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 533,
    region: "REGION 1",
    outlet: "GEN. TRADE - ROSE GROCERY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 534,
    region: "REGION 1",
    outlet: "GEN. TRADE JELRA SUPERMARKET",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 535,
    region: "REGION 1",
    outlet: "GEN. TRADE BAMBI SUPERMARKET",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 536,
    region: "REGION 2",
    outlet: "ROBINSONS - TALAVERA SQUARE ILAGAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 537,
    region: "REGION 2",
    outlet: "ROBINSONS PLACE - SANTIAGO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 538,
    region: "REGION 2",
    outlet: "ROBINSONS - ALICIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 539,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB (JR.)- OLD CENTRO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 540,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - CABATUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 541,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - ROXAS ISABELA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 542,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - TUMAUINI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 543,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TUGUEGARAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 544,
    region: "REGION 2",
    outlet: "ROBINSONS TUGUEGARAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 545,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - BUNTUN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 546,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 547,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - SANTIAGO HIGHWAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 548,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - ILAGAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 549,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - ALIBAGU",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 550,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - APPARI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 551,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - LAL-LO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 552,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - TUAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 553,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - SOLANA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 554,
    region: "REGION 2",
    outlet: "PUREGOLD-ALLACAPAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 555,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - TABUK",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 556,
    region: "REGION 2",
    outlet: "GEN. TRADE - LAIDAS CEDRON GROCERY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 557,
    region: "REGION 2",
    outlet: "GEN. TRADE UP TO DATE GROCERY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 558,
    region: "REGION 2",
    outlet: "GEN. TRADE MELBA GROCERY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 559,
    region: "REGION 2",
    outlet: "ROBINSON BAYOMBONG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 560,
    region: "REGION 3",
    outlet: "SUPER 8 - BALANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 561,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - BALANGA BATAAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 562,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - ARAYAT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 563,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ARAYAT PAMPANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 564,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MEXICO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 565,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB -CANDABA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 566,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MASANTOL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 567,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MACABEBE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 568,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN SIMON",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 569,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- APALIT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 570,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SF 2 CAFÉ FERNANDINO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 571,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- STO.TOMAS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 572,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BULAON",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 573,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SF 1 DOLORES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 574,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB -DUTY FREE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 575,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - FERTUNA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 576,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DINALUPIHAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 577,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ORANI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 578,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- HERMOSA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 579,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LUBAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 580,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PORAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 581,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GUAGUA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 582,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SASMUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 583,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MARIVELES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 584,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - LIMAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 585,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BALANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 586,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ABUCAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 587,
    region: "REGION 3",
    outlet: "ROBINSONS IBA, ZAMBALES (.50)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 588,
    region: "REGION 3",
    outlet: "ROYAL DUTY FREE 1",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 589,
    region: "REGION 3",
    outlet: "ROYAL DUTY FREE 2",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 590,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CUTCUT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 591,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - PIO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 592,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - EPL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 593,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - FIL AM",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 594,
    region: "REGION 3",
    outlet: "ROBINSONS PLACE - PAMPANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 595,
    region: "REGION 3",
    outlet: "ROBINSONS - DOLORES SAN FERNANDO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 596,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SOLANA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 597,
    region: "REGION 3",
    outlet: "ROBINSONS - GUAGUA TOWNCENTER",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 598,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CROWN BLDG. STO. TOMAS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 599,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SAN SIMON",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 600,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - ORANI BATAAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 601,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - HERMOSA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 602,
    region: "REGION 3",
    outlet: "PUREGOLD-TUGATOG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 603,
    region: "REGION 3",
    outlet: "PUREGOLD DV - ORANI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 604,
    region: "REGION 3",
    outlet: "PUREGOLD-BACOLOR",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 605,
    region: "REGION 3",
    outlet: "PUREGOLD-SAN AGUSTIN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 606,
    region: "REGION 3",
    outlet: "PUREGOLD-DV MORONG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 607,
    region: "REGION 3",
    outlet: "SUPER 8 - GUAGUA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 608,
    region: "REGION 3",
    outlet: "SUPER 8 - ANGELES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 609,
    region: "REGION 3",
    outlet: "SUPER 8 - TARLAC 2",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 610,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - CONCEPCION",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 611,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - PANIQUI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 612,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - CAPAS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 613,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DAU",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 614,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DAU 2",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 615,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MABALACAT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 616,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MAWAQUE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 617,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CENTRAL TOWN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 618,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PANDAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 619,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MAGALANG PAMPANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 620,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ANGELES - MAGALANG ROAD EPZA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 621,
    region: "REGION 3",
    outlet: "ROBINSONS -NEPOMALL ANGELES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 622,
    region: "REGION 3",
    outlet: "ROBINSONS PLACE - ANGELES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 623,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMRT - FRIENDSHIP ANGELES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 624,
    region: "REGION 3",
    outlet: "ROBINSONS PLACE - TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 625,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART LIGTASAN TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 626,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SAN VICENTE TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 627,
    region: "REGION 3",
    outlet: "ROBINSONS - METROTOWN TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 628,
    region: "REGION 3",
    outlet: "ROBINSONS - TAÑEDO TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 629,
    region: "REGION 3",
    outlet: "ROBINSONS - XEVERA MABALACAT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 630,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CONCEPCION TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 631,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - BAMBAN TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 632,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - MATATALAIB",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 633,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - MARKET CITY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 634,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SAN SEBASTIAN TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 635,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - STARHOMES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 636,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - PANDAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 637,
    region: "REGION 3",
    outlet: "ROBINSONS - GCC MEXICO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 638,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - MAGALANG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 639,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - PULUNG CACUTUD",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 640,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CONCEPCION TARLAC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 641,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PALM PLAZA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 642,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PANIQUI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 643,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PUBLIC MARKET",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 644,
    region: "REGION 3",
    outlet: "EVERPLUS SUPERSTORE INC. - SAPANG PALAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 645,
    region: "REGION 3",
    outlet: "EVERPLUS SUPERSTORE INC. - MUZON",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 646,
    region: "REGION 3",
    outlet: "ROBINSONS-EASYMART SKYLINE",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 647,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART-POBLACION",
    accountSupervisor: "VIGIL, BERNIE",
  },
  {
    id: 648,
    region: "REGION 3",
    outlet: "SUPER 8 - MALOLOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 649,
    region: "REGION 3",
    outlet: "SUPER 8 - HAGONOY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 650,
    region: "REGION 3",
    outlet: "SUPER 8 - PULILAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 651,
    region: "REGION 3",
    outlet: "SOUTH MALOLOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 652,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - GUIGUINTO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 653,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - MALOLOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 654,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - BALIUAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 655,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TUNGKONG MANGGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 656,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SAPANG PALAY , SAMPOL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 657,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TABANG GUIGUINTO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 658,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CALVARIO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 659,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CAMALIG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 660,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PLARIDEL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 661,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MAUNLAD",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 662,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MALOLOS JUNCTION",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 663,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - GUINGUINTO BAYAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 664,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BULAKAN,BULAKAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 665,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - STA.MARIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 666,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - STA.MARIA BAYAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 667,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PANDI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 668,
    region: "REGION 3",
    outlet: "PUREGOLD-DV PANDI",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 669,
    region: "REGION 3",
    outlet: "PUREGOLD DV - BUNSURAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 670,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BOCAUE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 671,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CASA CECILIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 672,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - LIAS MARILAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 673,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - TALAVERA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 674,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - SUBIC ZAMBALES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 675,
    region: "REGION 3",
    outlet: "SOUTH SUPERMARKET - PAMPANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 676,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SINDALAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 677,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SUBIC",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 678,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - OLONGAPO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 679,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CASTILLEJOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 680,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - PAMPANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 681,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DAU ACCESS ROAD",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 682,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DON JUICO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 683,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ANGELES",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 684,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)-BALIBAGO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 685,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - PLARIDEL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 686,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE DEL MONTE PALMERA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 687,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MEYCAUAYAN BANGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 688,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - OBANDO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 689,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BALIWAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 690,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BUSTOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 691,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TANGOS BALIWAG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 692,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DRT HI-WAY (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 693,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - HAGONOY BULACAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 694,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PAOMBONG",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 695,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MALOLOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 696,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ALIW",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 697,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MARILAO PLAZA CECILIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 698,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LOMA DE GATO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 699,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MUZON",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 700,
    region: "REGION 3",
    outlet: "PUREGOLD-CALUMPIT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 701,
    region: "REGION 3",
    outlet: "PUREGOLD-DV PULILAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 702,
    region: "REGION 3",
    outlet: "PUREGOLD DV-TUKTUKAN GUIGUINTO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 703,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - GAPAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 704,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - CABANATUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 705,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - SAN JOSE",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 706,
    region: "REGION 3",
    outlet: "SUPER 8 - SAPANG PALAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 707,
    region: "REGION 3",
    outlet: "SUPER 8 - STA MARIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 708,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - STA MARIA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 709,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - ALTARAZA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 710,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - HAGONOY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 711,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CALUMPIT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 712,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CASA ALSELMO MALOLOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 713,
    region: "REGION 3",
    outlet: "ROBINSONS PLACE - MALOLOS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 714,
    region: "REGION 3",
    outlet: "ROBINSONS - PULILAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 715,
    region: "REGION 3",
    outlet: "ROBINSONS - BALAGTAS",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 716,
    region: "REGION 3",
    outlet: "ROBINSONS SUPERMARKET - SAN MIGUEL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 717,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SAN MIGUEL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 718,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN MIGUEL BULACAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 719,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN ILDEFONSO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 720,
    region: "REGION 3",
    outlet: "ROBINSONS - TOWNVILLE CABANATUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 721,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - RIZAL NUEVA ECIJA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 722,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - GUIMBA NUEVA ECIJA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 723,
    region: "REGION 3",
    outlet: "ROBINSONS - GAPAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 724,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - MUNOZ",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 725,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CABANATUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 726,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ZARAGOZA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 727,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB-CABIAO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 728,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB-DV ALIAGA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 729,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BALER (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 730,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MARIA AURORA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 731,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - BALER",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 732,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TALAVERA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 733,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CROSSING (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 734,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - GUIMBA",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 735,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE NUEVA ECIJA (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 736,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ZULUETA (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 737,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CABANATUAN PALENGKE (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 738,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PACIFIC MALL (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 739,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CIRCUMFERENCIAL (N.E)",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 740,
    region: "REGION 3",
    outlet: "PUREGOLD - SAN LEONARDO",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 741,
    region: "REGION 3",
    outlet: "PUREGOLD-DV CABANATUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 742,
    region: "REGION 3",
    outlet: "PUREGOLD-NORZAGARAY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 743,
    region: "REGION 3",
    outlet: "PUREGOLD-DV ANGAT",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 744,
    region: "REGION 3",
    outlet: "GEN. TRADE - BAYAMBANG GROCERY",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 745,
    region: "REGION 3",
    outlet: "WALTERMART SAN RAFAEL",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 746,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - ALAMINOS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 747,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - PAGSANJAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 748,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - FAMY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 749,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - STA. CRUZ",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 750,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CANDELARIA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 751,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TIAONG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 752,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TIAONG HIGWAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 753,
    region: "REGION 4A",
    outlet: "PUREGOLD-SARIAYA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 754,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CALIHAN HIGHWAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 755,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 756,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - LUCENA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 757,
    region: "REGION 4A",
    outlet: "METRO RETAILS STORES GROUP, INC. - LUCENA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 758,
    region: "REGION 4A",
    outlet: "SUPER 8 - SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 759,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 760,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - HILARIO SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 761,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - HERMANOS SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 762,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - SAN FRANCISCO SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 763,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - SAN LUCAS SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 764,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - CANDELARIA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 765,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SAN JUAN BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 766,
    region: "REGION 4A",
    outlet: "LIANA'S SUPERMARKET - SAN PABLO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 767,
    region: "REGION 4A",
    outlet: "LIANA'S SUPERMARKET - STO TOMAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 768,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STA. CRUZ (G)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 769,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - VICTORIA LAGUNA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 770,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- PILA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 771,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CALAUAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 772,
    region: "REGION 4A",
    outlet: "ROBINSONS STA. CRUZ",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 773,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BUHAY NA TUBIG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 774,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TANZANG LUMA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 775,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - LANCASTER",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 776,
    region: "REGION 4A",
    outlet: "SHOPWISE - LANCASTER",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 777,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TERMINAL MALL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 778,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GOLDEN CITY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 779,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- NAIC",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 780,
    region: "REGION 4A",
    outlet: "PUREGOLD DIVIMART - MAMBOG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 781,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- HABAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 782,
    region: "REGION 4A",
    outlet: "SUPER 8 - ROSARIO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 783,
    region: "REGION 4A",
    outlet: "SUPER 8 - TRECE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 784,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BUCANDALA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 785,
    region: "REGION 4A",
    outlet: "ROBINSONS PLACE - GENERAL TRIAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 786,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - TANZA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 787,
    region: "REGION 4A",
    outlet: "PUREGOLD-PARADAHAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 788,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - MOLINO BLVD.",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 789,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MAGDIWANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 790,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MARCOS ALVAREZ",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 791,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - ROSARIO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 792,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - NOVELETA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 793,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BACOOR",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 794,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - NOVELETA OASIS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 795,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - KAWIT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 796,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - NAIC",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 797,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- HUGO PEREZ",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 798,
    region: "REGION 4A",
    outlet: "PUREGOLD DIVIMART - INOCENCIO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 799,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - IMUS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 800,
    region: "REGION 4A",
    outlet: "ROBINSONS - MAIN SQUARE MOLINO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 801,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - ALIMA BAY BACOOR",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 802,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - TRECE MAR",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 803,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TANZA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 804,
    region: "REGION 4A",
    outlet: "ROBINSONS - BUCANDALA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 805,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - BUHAY NA TUBIG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 806,
    region: "REGION 4A",
    outlet: "ROBINSONS - GREEN GATE MALAGASANG IMUS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 807,
    region: "REGION 4A",
    outlet: "EVERPLUS SUPERSTORE INC. - CAVITE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 808,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - P. BURGOS CAVITE CITY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 809,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - CABUYAO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 810,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - MAKILING",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 811,
    region: "REGION 4A",
    outlet: "SUPER 8 - CABUYAO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 812,
    region: "REGION 4A",
    outlet: "SUPER 8 - BINAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 813,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - HALANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 814,
    region: "REGION 4A",
    outlet: "PUREGOLD-DV BANLIC",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 815,
    region: "REGION 4A",
    outlet: "PUREGOLD-DV PULO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 816,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CROSSING CALAMBA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 817,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CALAMBA BAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 818,
    region: "REGION 4A",
    outlet: "ROBINSONS - IMALL CANLUBANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 819,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - CALAMBA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 820,
    region: "REGION 4A",
    outlet: "SOUTH SUPERMARKET -LOS BANOS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 821,
    region: "REGION 4A",
    outlet: "ROBINSON SUPERMARKET - LOS BANOS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 822,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PARIAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 823,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - SAN ISIDRO CABUYAO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 824,
    region: "REGION 4A",
    outlet: "ROBINSONS - CENTRO MALL CABUYAO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 825,
    region: "REGION 4A",
    outlet: "PUREGOLD JUNIOR - CABUYAO BAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 826,
    region: "REGION 4A",
    outlet: "ROBINSONS - EASYMART CABUYAO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 827,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - LOS BANOS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 828,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MAMATID",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 829,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CABUYAO BANLIC",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 830,
    region: "REGION 4A",
    outlet: "LIANA'S SUPERMARKET - CALAMBA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 831,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LOS BANOS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 832,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- LOS BANOS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 833,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CANLUBANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 834,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CANLUBANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 835,
    region: "REGION 4A",
    outlet: "PUREGOLD-GUMACA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 836,
    region: "REGION 4A",
    outlet: "PUREGOLD-CATANAUAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 837,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - ANABU",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 838,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - GEN. TRIAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 839,
    region: "REGION 4A",
    outlet: "SUPER 8 - DASMARINAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 840,
    region: "REGION 4A",
    outlet: "ROBINSONS - SILANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 841,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART -SILANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 842,
    region: "REGION 4A",
    outlet: "ROBINSONS - SUMMIT RIDGE TAGAYTAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 843,
    region: "REGION 4A",
    outlet: "ROBINSONS - TWINLAKES VILLAGE BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 844,
    region: "REGION 4A",
    outlet: "ROBINSONS - TOWNVILLE BUHAY NA TUBIG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 845,
    region: "REGION 4A",
    outlet: "SHOPWISE - IMUS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 846,
    region: "REGION 4A",
    outlet: "METRO RETAILS STORES GROUP, INC. - IMUS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 847,
    region: "REGION 4A",
    outlet: "ROBINSONS PLACE - IMUS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 848,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - TAGAYTAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 849,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - CARMONA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 850,
    region: "REGION 4A",
    outlet: "SUPER 8 - GMA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 851,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PRINZA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 852,
    region: "REGION 4A",
    outlet: "PUREGOLD DIVIMART - MANGGAHAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 853,
    region: "REGION 4A",
    outlet: "ROBINSONS - TOWNVILLE ARVO DASMARINAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 854,
    region: "REGION 4A",
    outlet: "ROBINSONS PLACE - DASMARINAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 855,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - DASMA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 856,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CARMONA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 857,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - GMA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 858,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - SILANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 859,
    region: "REGION 4A",
    outlet: "PUREGOLD CROSSING EAST",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 860,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BROOKSIDE LANE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 861,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GEN TRIAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 862,
    region: "REGION 4A",
    outlet: "EVERPLUS SUPERSTORE INC. - TRECE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 863,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - NAIC CAVITE CITY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 864,
    region: "REGION 4A",
    outlet: "EVERPLUS SUPERSTORE INC. - PALIPARAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 865,
    region: "REGION 4A",
    outlet: "EVERPLUS SUPERSTORE INC. - ZAPOTE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 866,
    region: "REGION 4A",
    outlet: "METRO RETAILS STORES GROUP, INC. - TAGAYTAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 867,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - SILANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 868,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAGAYTAY-A",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 869,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TAGAYTAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 870,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PALIPARAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 871,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - MOLINO TOWN CENTER",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 872,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - MOLINO ROAD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 873,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - DASMARINAS HIGH WAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 874,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DASMA BAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 875,
    region: "REGION 4A",
    outlet: "PUREGOLD-TALISAY BATANGAS-A",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 876,
    region: "REGION 4A",
    outlet: "PUREGOLD-DV TALISAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 877,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - ROSARIO BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 878,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 879,
    region: "REGION 4A",
    outlet: "SUPER 8 - LIPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 880,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - LIPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 881,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - NEW MARKET BATANGAS (G)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 882,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CALICANTO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 883,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TANAUAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 884,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STO.TOMAS BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 885,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - PASCUAL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 886,
    region: "REGION 4A",
    outlet: "ROBINSONS PLACE - LIMA EXCHANGE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 887,
    region: "REGION 4A",
    outlet: "ROBINSONS - TAMBO LIPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 888,
    region: "REGION 4A",
    outlet: "ROBINSONS - XENTRO MALL LEMERY BATANGAS-B",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 889,
    region: "REGION 4A",
    outlet: "ROBINSONS - XENTRO MALL LEMERY BATANGAS-A",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 890,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - CALACA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 891,
    region: "REGION 4A",
    outlet: "ROBINSONS PLACE - LIPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 892,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BALAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 893,
    region: "REGION 4A",
    outlet: "SOUTH STO TOMAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 894,
    region: "REGION 4A",
    outlet: "SOUTH LIPA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 895,
    region: "REGION 4A",
    outlet: "SHOPWISE - BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 896,
    region: "REGION 4A",
    outlet: "ROBINSONS - NUCITI CENTRAL BATANGAS",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 897,
    region: "REGION 4A",
    outlet: "RC ALVAREZ - LEMERY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 898,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - TANAUAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 899,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - NASUGBU",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 900,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - STA. ROSA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 901,
    region: "REGION 4A",
    outlet: "SOUTH SUPERMARKET -PASEO STA ROSA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 902,
    region: "REGION 4A",
    outlet: "ROBINSONS - GALLERIA SOUTH-A",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 903,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - HARMONY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 904,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- GOLDEN CITY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 905,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CROSSTOWN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 906,
    region: "REGION 4A",
    outlet: "ROBINSONS - SOUTHWOODS MALL LAGUNA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 907,
    region: "REGION 4A",
    outlet: "SOUTH BRENT",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 908,
    region: "REGION 4A",
    outlet: "PUREGOLD JR. ELVINDA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 909,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STA.ROSA BALIBAGO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 910,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - VICTORY MALL",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 911,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BINAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 912,
    region: "REGION 4A",
    outlet: "SUPER 8 - STA ROSA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 913,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BEL-AIR",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 914,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - PACITA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 915,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- VILLA OLYMPIA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 916,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- MAGSAYSAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 917,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TAGAPO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 918,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BINAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 919,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BINAN BAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 920,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- HALANG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 921,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - SAN PEDRO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 922,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - LANGGAM",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 923,
    region: "REGION 4A",
    outlet: "ROBINSONS - TARGETMALL STA. ROSA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 924,
    region: "REGION 4A",
    outlet: "ROBINSONS PLACE - STA ROSA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 925,
    region: "REGION 4A",
    outlet: "ROBINSONS - TOWNVILLE NUVALI STA ROSA-1",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 926,
    region: "REGION 4A",
    outlet: "THE MARKETPLACE- WESTBORROUGH",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 927,
    region: "REGION 4A",
    outlet: "SUPER 8 - SAN PEDRO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 928,
    region: "REGION 4A",
    outlet: "LANDMARK - NUVALI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 929,
    region: "REGION 4A",
    outlet: "SHOPWISE - STA.ROSA(PASEO)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 930,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STA.ROSA BAYAN (G)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 931,
    region: "REGION 4A",
    outlet: "SHOPWISE - PACITA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 932,
    region: "REGION 4A",
    outlet: "ROBINSONS - PACITA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 933,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BACOOR",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 934,
    region: "REGION 4A",
    outlet: "MB MANALO (.25)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 935,
    region: "REGION 4A",
    outlet: "GOLDEN M (.25)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 936,
    region: "REGION 4A",
    outlet: "AMY ABAD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 937,
    region: "REGION 4A",
    outlet: "KB ABAD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 938,
    region: "REGION 4A",
    outlet: "EDRA 1 (.25)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 939,
    region: "REGION 4A",
    outlet: "EDRA 3 (.25)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 940,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - ANIBAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 941,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - NIA ROAD",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 942,
    region: "REGION 4A",
    outlet: "JEREMYS - LEMERY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 943,
    region: "REGION 4B",
    outlet: "PUREGOLD PRICE CLUB - BOAC MARINDUQUE",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 944,
    region: "REGION 4B",
    outlet: "PUREGOLD-PINAMALAYAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 945,
    region: "REGION 4B",
    outlet: "ROBINSONS PLACE - PALAWAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 946,
    region: "REGION 4B",
    outlet: "PUREGOLD - BONGABONG",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 947,
    region: "REGION 4B",
    outlet: "ROBINSONS - CALAPAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 948,
    region: "REGION 4B",
    outlet: "PUREGOLD - CALAPAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 949,
    region: "REGION 4B",
    outlet: "PUREGOLD PRICE CLUB - ROXAS MINDORO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 950,
    region: "REGION 4B",
    outlet: "SOUTH EMERALD BOAC (.25)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 951,
    region: "REGION 4B",
    outlet: "SOUTH EMERALD GASAN (.25)",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 952,
    region: "REGION 5",
    outlet: "METRO RETAILS STORES GROUP, INC. - LEGAZPI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 953,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - IRIGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 954,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - PILI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 955,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - SORSOGON",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 956,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - IROSIN SORSOGON",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 957,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - LEGAZPI ALBAY",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 958,
    region: "REGION 5",
    outlet: "ROBINSONS - ALBAY 738 LEGAZPI",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 959,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - NAGA DIVERSION",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 960,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - CENTRO NAGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 961,
    region: "REGION 5",
    outlet: "METRO RETAILS STORES GROUP, INC. - NAGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 962,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - CALABANGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 963,
    region: "REGION 5",
    outlet: "ROBINSONS PLACE - NAGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 964,
    region: "REGION 5",
    outlet: "ROBINSONS - EMALL NAGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 965,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - DAET",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 966,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - TABACO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 967,
    region: "REGION 5",
    outlet: "METRO- LIGAO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 968,
    region: "REGION 5",
    outlet: "METRO- GUINOBATAN",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 969,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - DARAGA",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 970,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - LABO",
    accountSupervisor: "ZABALLA, FERCEY",
  },
  {
    id: 971,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - LIBERTAD BACOLOD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 972,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB (JR.) -CENTROPLEX",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 973,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -MURCIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 974,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - MANSILINGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 975,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -PORT BACOLOD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 976,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -BATA BACOLOD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 977,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -888 CHINA TOWN SQUARE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 978,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -HINIGARAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 979,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - KABANKALAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 980,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - BAROTAC VIEJO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 981,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - BAROTAC NUEVO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 982,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - ESCALANTE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 983,
    region: "REGION 6",
    outlet: "PUREGOLD - CADIZ",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 984,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - BURGOS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 985,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - LEGAZPI",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 986,
    region: "REGION 6",
    outlet: "PUREGOLD - PONTEVEDRA ROXAS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 987,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -BAYBAY GOODSHOP",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 988,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -PUEBLO DE PANAY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 989,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - PAVIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 990,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB-OTON",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 991,
    region: "REGION 6",
    outlet: "PUREGOLD - JARO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 992,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - STA.BARBARA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 993,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - CABATUAN",
    accountSupervisor: "CASERES, JAYSON",
  },
  {
    id: 994,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -SAN CARLOS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 995,
    region: "REGION 6",
    outlet: "PUREGOLD - BAYAWAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 996,
    region: "REGION 6",
    outlet: "PUREGOLD - LA CASTELLANA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 997,
    region: "REGION 6",
    outlet: "PUREGOLD - CANLAON",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 998,
    region: "REGION 6",
    outlet: "PUREGOLD - CALINOG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 999,
    region: "REGION 6",
    outlet: "ROBINSONS - PAVIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1000,
    region: "REGION 6",
    outlet: "ROBINSONS - OPEN MARKET MANSILINGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1001,
    region: "REGION 6",
    outlet: "ROBINSONS - BACOLOD TRIANGLE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1002,
    region: "REGION 6",
    outlet: "THE MARKETPLACE - FESTIVE WALK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1003,
    region: "REGION 6",
    outlet: "ROBINSONS PLACE - MANDALAGAN BACOLOD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1004,
    region: "REGION 6",
    outlet: "ROBINSONS - VILLAMONTE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1005,
    region: "REGION 6",
    outlet: "PUREGOLD - TANJAY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1006,
    region: "REGION 6",
    outlet: "ROBINSONS - GT PARK PLACE MOLO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1007,
    region: "REGION 6",
    outlet: "ROBINSONS PLACE -JARO ILOILO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1008,
    region: "REGION 6",
    outlet: "ROBINSONS PLACE - ROXAS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1009,
    region: "REGION 6",
    outlet: "ROBINSONS - CITIMALL ROXAS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1010,
    region: "REGION 6",
    outlet: "ROBINSONS PLACE - ILOILO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1011,
    region: "REGION 6",
    outlet: "ROBINSONS - ANTIQUE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1012,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - ANTIQUE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1013,
    region: "REGION 6",
    outlet: "THE MARKETPLACE - NORTH GROOVE MOLO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1014,
    region: "REGION 7",
    outlet: "PUREGOLD PRICE CLUB -GUIHULNGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1015,
    region: "REGION 7",
    outlet: "ROBINSONS - TOWNVILLE PERDICES DGT",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1016,
    region: "REGION 7",
    outlet: "ROBINSONS PLACE - DUMAGUETE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1017,
    region: "REGION 7",
    outlet: "SHOPWISE - MAMBALING",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1018,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - PARDO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1019,
    region: "REGION 7",
    outlet: "ROBINSONS - MINGLANILLA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1020,
    region: "REGION 7",
    outlet: "THE MARKETPLACE - AYALA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1021,
    region: "REGION 7",
    outlet: "THE MARKETPLACE - BANAWA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1022,
    region: "REGION 7",
    outlet: "ROBINSONS - BASELINE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1023,
    region: "REGION 7",
    outlet: "ROBINSONS - CASIMIRA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1024,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - CABAHUG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1025,
    region: "REGION 7",
    outlet: "THE MARKETPLACE - OAKRIDGE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1026,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - BASAK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1027,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - NEWTOWN MACTAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1028,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - PAJAC",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1029,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - GUN-OB",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1030,
    region: "REGION 7",
    outlet: "THE MARKETPLACE - GALLERIA  SELECTION CEBU",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1031,
    region: "REGION 7",
    outlet: "ROBINSONS - TALAMBAN TIME SQUARE CEBU",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1032,
    region: "REGION 7",
    outlet: "ROBINSONS - BANILAD CEBU",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1033,
    region: "REGION 7",
    outlet: "ROBINSONS PLACE - CEBU FUENTE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1034,
    region: "REGION 7",
    outlet: "ROBINSONS - TALISAY CEBU",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1035,
    region: "REGION 7",
    outlet: "ROBINSONS - SOUTH TOWN CENTER TABUNOK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1036,
    region: "REGION 7",
    outlet: "ROBINSONS - ISLAND CENTRAL MACTAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1037,
    region: "REGION 7",
    outlet: "ROBINSONS - PUEBLO VERDE MACTAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1038,
    region: "REGION 7",
    outlet: "PUREGOLD- MANGO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1039,
    region: "REGION 7",
    outlet: "PUREGOLD -TALISAY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1040,
    region: "REGION 7",
    outlet: "PUREGOLD - GUADALUPE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1041,
    region: "REGION 7",
    outlet: "PUREGOLD- KASAMBAGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1042,
    region: "REGION 7",
    outlet: "PUREGOLD- BOHOL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1043,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - MACTAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1044,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - CASUNTINGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1045,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - SAVER'SMART BASAK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1046,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - DANAO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1047,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - TISA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1048,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - OPM",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1049,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - SOUTH",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1050,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - SRP",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1051,
    region: "REGION 7",
    outlet: "GAISANO SAVER'SMART - T.PADILLA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1052,
    region: "REGION 7",
    outlet: "GAISANO SAVER'SMART - BACAYAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1053,
    region: "REGION 7",
    outlet: "GAISANO GRAND - CARCAR",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1054,
    region: "REGION 7",
    outlet: "GAISANO GRAND - MACTAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1055,
    region: "REGION 7",
    outlet: "GAISANO GRAND - FIESTA MALL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1056,
    region: "REGION 7",
    outlet: "GAISANO GRAND - FIESTA MALL 2",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1057,
    region: "REGION 7",
    outlet: "GAISANO GRAND - CORDOVA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1058,
    region: "REGION 7",
    outlet: "GAISANO GRAND - DUMANJUG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1059,
    region: "REGION 7",
    outlet: "GAISANO GRAND - LILOAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1060,
    region: "REGION 7",
    outlet: "GAISANO GRAND - TALAMBAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1061,
    region: "REGION 7",
    outlet: "GAISANO GRAND - MINGLANILLA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1062,
    region: "REGION 7",
    outlet: "GAISANO GRAND - MOALBOAL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1063,
    region: "REGION 7",
    outlet: "GAISANO GRAND - BALAMBAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1064,
    region: "REGION 7",
    outlet: "GAISANO GRAND - NORTH BASAK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1065,
    region: "REGION 7",
    outlet: "GAISANO METRO - COLON-1",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1066,
    region: "REGION 7",
    outlet: "GAISANO METRO - COLON-2",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1067,
    region: "REGION 7",
    outlet: "SUPER METRO - CARCAR",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1068,
    region: "REGION 7",
    outlet: "GAISANO METRO - NAGA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1069,
    region: "REGION 7",
    outlet: "SUPER METRO - TOLEDO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1070,
    region: "REGION 7",
    outlet: "SUPER METRO - BOGO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1071,
    region: "REGION 7",
    outlet: "GAISANO METRO - BANILAD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1072,
    region: "REGION 7",
    outlet: "GAISANO METRO - IT PARK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1073,
    region: "REGION 7",
    outlet: "GAISANO METRO FRESH N EASY - TABOK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1074,
    region: "REGION 7",
    outlet: "METRO GAISANO - AYALA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1075,
    region: "REGION 7",
    outlet: "GAISANO METRO - MANDAUE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1076,
    region: "REGION 7",
    outlet: "GAISANO METRO FRESH N EASY - UMAPAD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1077,
    region: "REGION 7",
    outlet: "GAISANO METRO FRESH N EASY - SHANGRILA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1078,
    region: "REGION 7",
    outlet: "METRO LG GARDEN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1079,
    region: "REGION 7",
    outlet: "GAISASANO METRO POBLACION",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1080,
    region: "REGION 7",
    outlet: "GAISANO METRO -TANKE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1081,
    region: "REGION 7",
    outlet: "METRO DUMLOG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1082,
    region: "REGION 7",
    outlet: "SUPER METRO - OPON",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1083,
    region: "REGION 7",
    outlet: "SAVEMORE - PARKMALL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1084,
    region: "REGION 7",
    outlet: "SAVEMORE - EMALL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1085,
    region: "REGION 7",
    outlet: "SM - INSULAR",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1086,
    region: "REGION 7",
    outlet: "SM - JMALL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1087,
    region: "REGION 7",
    outlet: "SM - CONSOLACION",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1088,
    region: "REGION 7",
    outlet: "SM - MACTAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1089,
    region: "REGION 7",
    outlet: "SM - MARIBAGO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1090,
    region: "REGION 7",
    outlet: "SM - PRIMARK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1091,
    region: "REGION 7",
    outlet: "SM - LAPU LAPU",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1092,
    region: "REGION 7",
    outlet: "SM - SEA SIDE CITY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1093,
    region: "REGION 7",
    outlet: "GAISANO METRO TAYUD LILOAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1094,
    region: "REGION 7",
    outlet: "GAISANO METRO   CANDUMAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1095,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - MARASBARAS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1096,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - REAL TACLOBAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1097,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - CALANIPAWAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1098,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - KANANGA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1099,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - CARIGARA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1100,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - ABUYOG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1101,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - DULAG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1102,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - ALANG-ALANG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1103,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - PALO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1104,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - BORONGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1105,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - DOLORES",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1106,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - BAYBAY LEYTE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1107,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - ORMOC",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1108,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - SOGOD",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1109,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - BATO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1110,
    region: "REGION 8",
    outlet: "ROBINSONS PLACE - TACLOBAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1111,
    region: "REGION 8",
    outlet: "ROBINSONS PLACE - ABUCAY TACLOBAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1112,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - ABUCAY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1113,
    region: "REGION 8",
    outlet: "ROBINSONS - ORMOC CENTRUM",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1114,
    region: "REGION 8",
    outlet: "ROBINSONS PLACE - ORMOC",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1115,
    region: "REGION 8",
    outlet: "PUREGOLD-GUIUAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1116,
    region: "REGION 8",
    outlet: "PUREGOLD-HINUNANGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1117,
    region: "REGION 8",
    outlet: "PUREGOLD-CALBAYOG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1118,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - TANAUAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1119,
    region: "REGION 9",
    outlet: "PUREGOLD PRICE CLUB - PANTUKAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1120,
    region: "REGION 9",
    outlet: "ROBINSONS - C3 MALL PAGADIAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1121,
    region: "REGION 9",
    outlet: "AFPCES - PAGADIAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1122,
    region: "REGION 9",
    outlet: "PUREGOLD PRICE CLUB - J&F MONKAYO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1123,
    region: "REGION 9",
    outlet: "PUREGOLD PRICE CLUB - TANDAG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1124,
    region: "REGION 9",
    outlet: "ROBINSONS - TANDAG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1125,
    region: "REGION 9",
    outlet: "PUREGOLD PRICE CLUB - J&F MARAGUSAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1126,
    region: "REGION 9",
    outlet: "ROBINSONS - STA LUCIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1127,
    region: "REGION 9",
    outlet: "ROBINSON EASYMART - DAMOSA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1128,
    region: "REGION 9",
    outlet: "ROBINSON EASYMART - ACCASIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1129,
    region: "REGION 9",
    outlet: "ROBINSON EASYMART - ECOLAND",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1130,
    region: "REGION 9",
    outlet: "ROBINSONS - POLOMOLOK",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1131,
    region: "REGION 9",
    outlet: "ROBINSONS - CALUMPANG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1132,
    region: "REGION 9",
    outlet: "ROBINSONS - SINDANGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1133,
    region: "REGION 9",
    outlet: "ROBINSONS - PAGADIAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1134,
    region: "REGION 9",
    outlet: "ROBINSONS - IPIL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1135,
    region: "REGION 9",
    outlet: "GEN TRADE - UNITOP COGON",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1136,
    region: "REGION 9",
    outlet: "GEN TRADE - PALANA STORE",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1137,
    region: "REGION 9",
    outlet: "GEN TRADE - LADYS MART",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1138,
    region: "REGION 9",
    outlet: "GEN TRADE - CAPITOL BAZAAR",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1139,
    region: "REGION 10",
    outlet: "PUREGOLD PRICE CLUB - OZAMIS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1140,
    region: "REGION 10",
    outlet: "PUREGOLD PRICE CLUB - CAGAYAN DE ORO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1141,
    region: "REGION 10",
    outlet: "THE MARKETPLACE - CDOC",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1142,
    region: "REGION 10",
    outlet: "SHOPWISE - CDOC",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1143,
    region: "REGION 10",
    outlet: "ROBINSONS - LIMKETKAI MALL CDO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1144,
    region: "REGION 10",
    outlet: "ROBINSONS PLACE - CAGAYAN DE ORO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1145,
    region: "REGION 10",
    outlet: "ROBINSONS GUSA- CAGAYAN DE ORO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1146,
    region: "REGION 10",
    outlet: "PUREGOLD PRICE CLUB - VALENCIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1147,
    region: "REGION 10",
    outlet: "ROBINSONS - LAVINA PARK VALENCIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1148,
    region: "REGION 10",
    outlet: "ROBINSON - NEW VALENCIA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1149,
    region: "REGION 10",
    outlet: "ROBINSONS - GEEGE MALL OZAMIZ",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1150,
    region: "REGION 10",
    outlet: "ROBINSONS PLACE - ILIGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1151,
    region: "REGION 10",
    outlet: "PUREGOLD - ILIGAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1152,
    region: "REGION 10",
    outlet: "BYANT MILLING OZAMIS CITY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1153,
    region: "REGION 10",
    outlet: "NOVO OZMIS CITY",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1154,
    region: "REGION 10",
    outlet: "GEN TRADE - RTM SALES &GROUP INC",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1155,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - DIGOS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1156,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - BANSALAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1157,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - STO.TOMAS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1158,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - LANANG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1159,
    region: "REGION 11",
    outlet: "AFPCES - PANACAN (0.25)",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1160,
    region: "REGION 11",
    outlet: "ROBINSONS PLACE - TAGUM",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1161,
    region: "REGION 11",
    outlet: "ROBINSONS - CYBERGATE DAVAO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1162,
    region: "REGION 11",
    outlet: "ROBINSON-TOWNVILLE ABREEZA DAVAO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1163,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - COTABATO MAIN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1164,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - COTABATO FIESTA MALL",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1165,
    region: "REGION 11",
    outlet: "ROBINSONS - AL NOR MALL COTABATO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1166,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - BUTUAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1167,
    region: "REGION 11",
    outlet: "ROBINSONS PLACE - BUTUAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1168,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - LANGIHAN",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1169,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB SIARGAO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1170,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - LUPON",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1171,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - MARAWI",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1172,
    region: "REGION 11",
    outlet: "GEN TRADE -NCCC NOVA TIERRA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1173,
    region: "REGION 11",
    outlet: "GEN TRADE - NCCC CHOICE PUBLIC MARKET",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1174,
    region: "REGION 11",
    outlet: "GEN TRADE - NCCC HB1 BONIFACIO",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1175,
    region: "REGION 11",
    outlet: "GEN TRADE - SOUTH SEAS SUPERRAMA",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1176,
    region: "REGION 12",
    outlet: "ROBINSONS PLACE - GENERAL SANTOS",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1177,
    region: "REGION 12",
    outlet: "ROBINSON TANDAG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1178,
    region: "REGION 12",
    outlet: "PUREGOLD TANDAG",
    accountSupervisor: "DOBLE, RYAN",
  },
  {
    id: 1179,
    region: "REGION 12",
    outlet: "test",
    accountSupervisor: "",
  },

  // COMMENTED-OUT STORES

  // {
  //   id: 6,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - TAGUIG",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 42,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - ANTIPOLO",
  //   accountSupervisor: "VIGIL, BERNIE",
  // },
  // {
  //   id: 43,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - TANAY",
  //   accountSupervisor: "VIGIL, BERNIE",
  // },
  // {
  //   id: 44,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - MONTALBAN",
  //   accountSupervisor: "VIGIL, BERNIE",
  // },
  // {
  //   id: 45,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - SAN MATEO",
  //   accountSupervisor: "VIGIL, BERNIE",
  // },
  // {
  //   id: 118,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - TUTUBAN",
  //   accountSupervisor: "VIGIL, BERNIE",
  // },
  // {
  //   id: 264,
  //   region: "NCR",
  //   outlet: "THE MARKETPLACE - SAN ANTONIO",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 309,
  //   region: "NCR",
  //   outlet: "MERRYMART DOUBLE DRAGON",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 310,
  //   region: "NCR",
  //   outlet: "THE MARKETPLACE - METLIVE",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 413,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - NAIC",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 414,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - CANLUBANG 2",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 415,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA -  CABUYAO MAMATID",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 416,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - CANLUBANG 1",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 507,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - TAGAYTAY",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 508,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - PALIPARAN",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 509,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - GEN. TRIAS",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 510,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - PADRE GARCIA",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 511,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - TANAUAN",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 513,
  //   region: "NCR",
  //   outlet: "ULTRAMEGA - ROSARIO",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 520,
  //   region: "NCR",
  //   outlet: "TROPICAL HUT - PANAY",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
  // {
  //   id: 622,
  //   region: "REGION 3",
  //   outlet: "ROBINSONS EASYMART - CAPITOL",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 624,
  //   region: "REGION 3",
  //   outlet: "SHOPWISE - SAN FERNANDO",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 712,
  //   region: "REGION 3",
  //   outlet: "PUREGOLD PRICE CLUB - CAPAS",
  //   accountSupervisor: "CASERES, JAYSON",
  // },
  // {
  //   id: 880,
  //   region: "REGION 4A",
  //   outlet: "SUPER 8 - MOLINO",
  //   accountSupervisor: "ZABALLA, FERCEY",
  // },
].sort((a, b) => {
  const regionCompare =
    REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region);
  if (regionCompare !== 0) return regionCompare;
  return a.outlet.localeCompare(b.outlet);
});

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
    value: "Intro Done",
    label: "Intro Done",
    color: "#6a1b9a",
    bg: "#f3e5f5",
    description: "Applicant completed the intro/interview",
  },
  {
    value: "Back Out",
    label: "Back Out",
    color: "#c62828",
    bg: "#ffebee",
    description: "Applicant backed out of the process",
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

const APPLICANT_STAGES = [
  "Applicant Endorsed",
  "Intro Done",
  "Back Out",
  "For Onboarding",
];

// ═════════════════════════════════════════════════════════════════════════════
// 2. HELPER FUNCTIONS
// ═════════════════════════════════════════════════════════════════════════════

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

// ═════════════════════════════════════════════════════════════════════════════
// 3. DATA BUILDING FUNCTIONS
// ═════════════════════════════════════════════════════════════════════════════

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

  // Map employed merchandisers
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
          deploymentType: emp.deploymentType || "Stationary",
          deployDate: emp.deployDate || null,
          undeployDate: emp.undeployDate || null,
          applicantStatus: emp.applicantStatus || "",
          backOutReason: emp.backOutReason || "",
          targetOnboardDate: emp.targetOnboardDate || null,
          temporaryDeployEndDate: emp.temporaryDeployEndDate || null,
          isApplicant: false,
          incomingApplicantId: null,
          incomingApplicantName: null,
          incomingApplicantStatus: "",
        };
      }
    });
  });

  // Map applicants
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
        assignments[m.id].incomingApplicantId = emp._id;
        assignments[m.id].incomingApplicantName =
          `${emp.firstName} ${emp.lastName}`;
        assignments[m.id].incomingApplicantStatus = emp.applicantStatus || "";
        assignments[m.id].incomingBackOutReason = emp.backOutReason || "";
        assignments[m.id].incomingTargetOnboardDate =
          emp.targetOnboardDate || null;
      } else {
        assignments[m.id] = {
          employeeId: emp._id,
          employeeName: `${emp.firstName} ${emp.lastName}`,
          deployStatus: emp.deployStatus || "Undeployed",
          deploymentType: emp.deploymentType || "Stationary",
          deployDate: emp.deployDate || null,
          undeployDate: emp.undeployDate || null,
          applicantStatus: emp.applicantStatus || "",
          backOutReason: emp.backOutReason || "",
          targetOnboardDate: emp.targetOnboardDate || null,
          temporaryDeployEndDate: emp.temporaryDeployEndDate || null,
          isApplicant: true,
          incomingApplicantId: null,
          incomingApplicantName: null,
          incomingApplicantStatus: "",
        };
      }
    });
  });

  // Map coordinators
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

function buildSummaryData(employees, outletAssignments, type = "MERCHANDISER") {
  const map = {};
  Object.entries(outletAssignments).forEach(([outletId, a]) => {
    const empId = a.employeeId;
    const info = OUTLET_DATA.find((o) => o.id === parseInt(outletId));
    if (!info) return;
    if (!map[empId]) {
      map[empId] = {
        employeeId: empId,
        employeeName: a.employeeName,
        outlets: [],
        status: a.deployStatus || a.status,
      };
    }
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
// 4. REACT COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════

const BackOutReasonField = React.memo(function BackOutReasonField({
  value,
  onChange,
  hasError,
}) {
  return (
    <TextField
      label="Reason for Back Out *"
      fullWidth
      multiline
      rows={2}
      defaultValue={value}
      onBlur={(e) => onChange(e.target.value)}
      placeholder="Enter reason why applicant backed out..."
      error={!value && hasError}
      helperText={
        !value
          ? "⚠ Required — enter the reason for backing out"
          : `${value.length} characters`
      }
      FormHelperTextProps={{ sx: { color: !value ? "#d32f2f" : "#888" } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fff8f8",
          border: "1px solid #ef9a9a",
        },
      }}
    />
  );
});

const TerminateReasonField = React.memo(function TerminateReasonField({
  value,
  onChange,
  hasError,
}) {
  return (
    <TextField
      label="Reason for Termination *"
      fullWidth
      multiline
      rows={2}
      defaultValue={value}
      onBlur={(e) => onChange(e.target.value)}
      placeholder="Enter the specific reason for termination..."
      error={!value && hasError}
      helperText={
        !value
          ? "⚠ Required — provide the reason for termination"
          : `${value.length} characters`
      }
      FormHelperTextProps={{ sx: { color: !value ? "#d32f2f" : "#888" } }}
      sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "#fff8f0" } }}
    />
  );
});

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

// ═════════════════════════════════════════════════════════════════════════════
// 5. MAIN COMPONENT - OutletList
// ═════════════════════════════════════════════════════════════════════════════

export default function OutletList() {
  // ── State ────────────────────────────────────────────────────────────────
  const [efcEmployees, setEfcEmployees] = useState([]);
  const [efcApplicants, setEfcApplicants] = useState([]);
  const [efcCoordinators, setEfcCoordinators] = useState([]);
  const [outletAssignments, setOutletAssignments] = useState({});
  const [coordinatorAssignments, setCoordinatorAssignments] = useState({});
  const [filteredOutlets, setFilteredOutlets] = useState(OUTLET_DATA);
  const [filterRegion, setFilterRegion] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterType, setFilterType] = useState("ALL");
  const [filterSupervisor, setFilterSupervisor] = useState("ALL");

  // Modal states
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [assignMode, setAssignMode] = useState("employed");
  // TRANSFER/SWAP (TEST): when true, show the assign dropdown even though the
  // outlet already has someone, so the user can replace/transfer them.
  const [showChangeMerchandiser, setShowChangeMerchandiser] = useState(false);
  const [showIncomingSection, setShowIncomingSection] = useState(false);

  // Form states
  const [previousEmployeeRemarks, setPreviousEmployeeRemarks] = useState("");
  const [backOutReason, setBackOutReason] = useState("");
  const [terminateReason, setTerminateReason] = useState("");
  const [targetOnboardDate, setTargetOnboardDate] = useState("");
  const [dateError, setDateError] = useState("");

  // Summary modal
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const [summaryFilter, setSummaryFilter] = useState("MERCHANDISER");

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Permissions ──────────────────────────────────────────────────────────
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
  const canEditDeploymentType = canEdit || canSetApplicantStatus;
  const canAddIncoming = [
    "MIS",
    "HR HEAD",
    "HR OFFICER",
    "HR SPECIALIST",
    "HR COORDINATOR SPECIALIST",
  ].includes(role);

  // ── Computed Values ──────────────────────────────────────────────────────
  const summaryData =
    summaryFilter === "MERCHANDISER"
      ? buildSummaryData(efcEmployees, outletAssignments, "MERCHANDISER")
      : buildSummaryData(
          efcCoordinators,
          coordinatorAssignments,
          "COORDINATOR",
        );

  const deployUnlocked = selectedOutlet
    ? isDeployUnlocked(selectedOutlet.applicantStatus, role)
    : false;

  const hasIncomingPipeline =
    selectedOutlet &&
    selectedOutlet.assignedEmployeeId &&
    !selectedOutlet._isApplicant &&
    (showIncomingSection ||
      !!(
        selectedOutlet.incomingApplicantId ||
        selectedOutlet.incomingApplicantStatus
      ));

  const showAddIncomingBtn =
    isEditing &&
    selectedOutlet?.assignedEmployeeId &&
    !selectedOutlet._isApplicant &&
    !showIncomingSection &&
    !selectedOutlet.incomingApplicantId &&
    !selectedOutlet.incomingApplicantStatus &&
    canAddIncoming &&
    selectedOutlet.deployStatus === "Undeployed";

  // ── Effects ──────────────────────────────────────────────────────────────
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

  // ── Helper Functions ────────────────────────────────────────────────────
  const findPersonById = (id) =>
    efcEmployees.find((e) => e._id === id) ||
    efcApplicants.find((e) => e._id === id);

  // ══════════════════════════════════════════════════════════════════════════
  // TRANSFER / SWAP (TEST FEATURE) — helpers
  // Returns the outlet a given employee is currently DEPLOYED at (if any),
  // by reading their live record. Used so the Assign dropdown can show
  // "deployed elsewhere" merchandisers and so save can decide move vs swap.
  // ══════════════════════════════════════════════════════════════════════════
  const getEmployeeCurrentOutlet = (emp) => {
    if (!emp) return null;
    const outlets = Array.isArray(emp.outletsAssigned)
      ? emp.outletsAssigned.filter(Boolean)
      : [];
    // For Stationary, there is one outlet; take the first.
    const currentOutletName = outlets[0] || null;
    if (!currentOutletName) return null;
    return {
      outletName: currentOutletName,
      deployStatus: emp.deployStatus || "Undeployed",
      deploymentType: emp.deploymentType || "Stationary",
    };
  };

  // Is this employee currently deployed somewhere (any outlet)?
  const isEmployeeDeployedElsewhere = (emp, exceptOutletName) => {
    const info = getEmployeeCurrentOutlet(emp);
    if (!info) return false;
    if (info.outletName === exceptOutletName) return false;
    return (
      info.deployStatus === "Deployed" ||
      info.deployStatus === "Reliever Deployed"
    );
  };

  const applyFilters = (region, status, type = "ALL", supervisor = "ALL") => {
    let filtered = [...OUTLET_DATA];

    if (region !== "ALL") {
      filtered = filtered.filter((o) => o.region === region);
    }

    if (supervisor !== "ALL") {
      filtered = filtered.filter(
        (o) => (o.accountSupervisor || "") === supervisor,
      );
    }

    if (type !== "ALL") {
      filtered = filtered.filter((o) => {
        const a = outletAssignments[o.id];
        const t = a?.deploymentType || "Stationary";
        return t === type;
      });
    }

    if (status !== "ALL") {
      filtered = filtered.filter((o) => {
        const deployStatus = outletAssignments[o.id]?.deployStatus;
        if (status === "Deployed") return deployStatus === "Deployed";
        if (status === "Reliever Deployed")
          return deployStatus === "Reliever Deployed";
        if (status === "Undeployed")
          return !deployStatus || deployStatus === "Undeployed";
        return true;
      });
    }

    setFilteredOutlets(filtered);
  };

  const validateDates = (data) => {
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

  // ── Event Handlers ──────────────────────────────────────────────────────
  const handleRegionFilter = (e) => {
    const value = e.target.value;
    setFilterRegion(value);
    applyFilters(value, filterStatus, filterType, filterSupervisor);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    applyFilters(filterRegion, value, filterType, filterSupervisor);
  };

  const handleTypeFilter = (e) => {
    const value = e.target.value;
    setFilterType(value);
    applyFilters(filterRegion, filterStatus, value, filterSupervisor);
  };

  const handleSupervisorFilter = (e) => {
    const value = e.target.value;
    setFilterSupervisor(value);
    applyFilters(filterRegion, filterStatus, filterType, value);
  };

  // Unique, sorted list of Account Supervisors for the dropdown
  const supervisorOptions = Array.from(
    new Set(
      OUTLET_DATA.map((o) => o.accountSupervisor).filter(
        (s) => s && s.trim() !== "",
      ),
    ),
  ).sort();

  // ── Export current (filtered) rows to Excel — all columns ────────────────
  const handleExportExcel = () => {
    const XLSX = require("sheetjs-style");

    const fmtDate = (d) => {
      if (!d) return "";
      const dt = new Date(d);
      return isNaN(dt) ? "" : dt.toLocaleDateString("en-PH");
    };

    // Build one row per currently-visible outlet, every column included
    const exportRows = filteredOutlets.map((outlet, index) => {
      const a = outletAssignments[outlet.id];
      const c = coordinatorAssignments[outlet.id];
      return {
        "#": index + 1,
        Region: outlet.region || "",
        Outlet: outlet.outlet || "",
        "Account Supervisor": outlet.accountSupervisor || "",
        Merchandiser: a?.employeeName || "",
        "Deploy Status": a?.deployStatus || "Undeployed",
        "Type of Deployment": a?.deploymentType || "Stationary",
        "Applicant Status": a?.applicantStatus || "",
        "Deploy Date": fmtDate(a?.deployDate),
        "Undeploy Date": fmtDate(a?.undeployDate),
        "Days Undeployed": calcDaysUndeployed(a?.undeployDate, a?.deployStatus),
        "Incoming Applicant": a?.incomingApplicantName || "",
        "Incoming Status": a?.incomingApplicantStatus || "",
        Coordinator: c?.employeeName || "",
        "Coordinator Status": c?.status || "",
      };
    });

    const headers = [
      "#",
      "Region",
      "Outlet",
      "Account Supervisor",
      "Merchandiser",
      "Deploy Status",
      "Type of Deployment",
      "Applicant Status",
      "Deploy Date",
      "Undeploy Date",
      "Days Undeployed",
      "Incoming Applicant",
      "Incoming Status",
      "Coordinator",
      "Coordinator Status",
    ];

    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
    XLSX.utils.sheet_add_json(ws, exportRows, {
      origin: "A2",
      skipHeader: true,
      header: headers,
    });

    // column widths
    ws["!cols"] = [
      { wch: 5 },
      { wch: 12 },
      { wch: 45 },
      { wch: 22 },
      { wch: 26 },
      { wch: 16 },
      { wch: 18 },
      { wch: 16 },
      { wch: 14 },
      { wch: 14 },
      { wch: 15 },
      { wch: 26 },
      { wch: 16 },
      { wch: 24 },
      { wch: 18 },
    ];

    // bold header row
    headers.forEach((_, col) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (ws[cell])
        ws[cell].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "2E6385" } },
          alignment: { horizontal: "center", vertical: "center" },
        };
    });

    const wb = XLSX.utils.book_new();
    const sheetName =
      filterSupervisor !== "ALL"
        ? filterSupervisor.substring(0, 28)
        : "EFC Outlets";
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const supTag =
      filterSupervisor !== "ALL"
        ? `_${filterSupervisor.replace(/[^a-zA-Z]/g, "")}`
        : "";
    const buffer = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `EFC_Outlets${supTag}_${new Date().toISOString().split("T")[0]}.xlsx`;
    link.click();
  };

  const handleEdit = (outletRow) => {
    const a = outletAssignments[outletRow.id];
    const co = coordinatorAssignments[outletRow.id];

    setSelectedOutlet({
      outletId: outletRow.id,
      outletName: outletRow.outlet,
      accountName: outletRow.account,
      assignedEmployeeId: a?.employeeId || "",
      deployStatus: a?.deployStatus || "Undeployed",
      deploymentType: a?.deploymentType || "Stationary",
      deployDate: a?.deployDate
        ? new Date(a.deployDate).toISOString().split("T")[0]
        : "",
      undeployDate: a?.undeployDate
        ? new Date(a.undeployDate).toISOString().split("T")[0]
        : "",
      temporaryDeployEndDate: a?.temporaryDeployEndDate
        ? new Date(a.temporaryDeployEndDate).toISOString().split("T")[0]
        : "",
      applicantStatus: a?.applicantStatus || "",
      _originalDeployStatus: a?.deployStatus || "Undeployed",
      _originalAssignedEmployeeId: a?.employeeId || null,
      _isApplicant: a?.isApplicant || false,
      incomingApplicantId: a?.incomingApplicantId || "",
      incomingApplicantStatus: a?.incomingApplicantStatus || "",
      incomingDeployDate: "",
      incomingBackOutReason: a?.incomingBackOutReason || "",
      incomingTargetOnboardDate: a?.incomingTargetOnboardDate
        ? new Date(a.incomingTargetOnboardDate).toISOString().split("T")[0]
        : "",
      assignedCoordinatorId: co?.employeeId || "",
      coordinatorDeployStatus: co ? co.status : "Inactive",
    });

    setDateError("");
    setIsEditing(false);

    const defaultMode = a?.isApplicant
      ? "applicant"
      : canEdit
        ? "employed"
        : "applicant";
    setAssignMode(defaultMode);
    setShowChangeMerchandiser(false);
    setShowIncomingSection(
      !!(a?.incomingApplicantId || a?.incomingApplicantStatus),
    );
    setBackOutReason(a?.incomingBackOutReason || "");
    setTargetOnboardDate(
      a?.incomingTargetOnboardDate
        ? new Date(a.incomingTargetOnboardDate).toISOString().split("T")[0]
        : "",
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
    setBackOutReason("");
    setTargetOnboardDate("");
    setDateError("");
  };

  const handleSaveChanges = async (data) => {
    if (!validateDates(data)) return;

    console.log("[handleSaveChanges] data:", {
      assignedEmployeeId: data.assignedEmployeeId,
      incomingApplicantId: data.incomingApplicantId,
      incomingApplicantStatus: data.incomingApplicantStatus,
      incomingDeployDate: data.incomingDeployDate,
      deployStatus: data.deployStatus,
      previousEmployeeRemarks,
    });

    try {
      const adminFullName = localStorage.getItem("adminFullName");
      const adminRole = localStorage.getItem("roleAccount");
      const today = todayISO();

      // ════════════════════════════════════════════════════════════════════
      // TRANSFER / SWAP (TEST FEATURE) — Option A (auto move-vs-swap)
      // Runs only when the picked merchandiser is deployed at ANOTHER outlet.
      // • If THIS outlet already had a deployed merchandiser  → SWAP (they trade)
      // • If THIS outlet was empty                            → MOVE (one-way)
      // Both use the existing /assign-outlet route. New deploy date = today.
      // ════════════════════════════════════════════════════════════════════
      if (data._transferFromOutlet && data._transferPersonId) {
        const outletA = data.outletName; // where we're assigning TO
        const outletB = data._transferFromOutlet; // where the picked person came FROM
        const incomingPersonId = data._transferPersonId; // Y (was at B)
        const sittingPersonId = data._originalAssignedEmployeeId || null; // X (was at A), if any

        const confirmMsg =
          sittingPersonId && sittingPersonId !== incomingPersonId
            ? `SWAP: the merchandiser currently at "${outletA}" will move to "${outletB}", and the selected merchandiser will move from "${outletB}" to "${outletA}". Continue?`
            : `MOVE: the selected merchandiser will transfer from "${outletB}" to "${outletA}". "${outletB}" will be left empty. Continue?`;

        if (!window.confirm(confirmMsg)) return;

        // Step 1 — move the picked person (Y) INTO outlet A (today's date).
        // The route's own Step-1 pull removes Y from outlet B automatically.
        await axios.put("https://api-map.bmphrc.com/assign-outlet", {
          outletName: outletA,
          employeeId: incomingPersonId,
          deployStatus: "Deployed",
          deploymentType: data.deploymentType || "Stationary",
          deployDate: today,
          undeployDate: null,
          applicantStatus: "",
          updatedBy: adminFullName,
          updatedByRole: adminRole,
        });

        // Step 2 — if outlet A had someone (X), move X INTO outlet B (swap).
        if (sittingPersonId && sittingPersonId !== incomingPersonId) {
          await axios.put("https://api-map.bmphrc.com/assign-outlet", {
            outletName: outletB,
            employeeId: sittingPersonId,
            deployStatus: "Deployed",
            deploymentType: "Stationary",
            deployDate: today,
            undeployDate: null,
            applicantStatus: "",
            updatedBy: adminFullName,
            updatedByRole: adminRole,
          });
        }

        // Also update the coordinator on outlet A as usual.
        await axios.put("https://api-map.bmphrc.com/assign-coordinator", {
          outletName: outletA,
          employeeId: data.assignedCoordinatorId,
          deployStatus: data.coordinatorDeployStatus,
          updatedBy: adminFullName,
          updatedByRole: adminRole,
        });

        await fetchAndApply();
        setFilterStatus("ALL");
        setFilteredOutlets(OUTLET_DATA);
        alert(
          sittingPersonId && sittingPersonId !== incomingPersonId
            ? "Swap completed. Please verify BOTH outlets below."
            : "Transfer completed. Please verify both outlets below.",
        );
        setOpenEditModal(false);
        setIsEditing(false);
        setShowChangeMerchandiser(false);
        setPreviousEmployeeRemarks("");
        setBackOutReason("");
        setTerminateReason("");
        setTargetOnboardDate("");
        setDateError("");
        return; // <-- transfer handled; skip the normal save path
      }

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
        if (data.assignedEmployeeId) {
          await axios.put(
            "https://api-map.bmphrc.com/remove-outlet-assignment",
            {
              outletName: data.outletName,
              employeeId: data.assignedEmployeeId,
              remarks: previousEmployeeRemarks || "Resign",
              terminateReason:
                previousEmployeeRemarks === "Terminated" ? terminateReason : "",
              dateResigned: today,
              updatedBy: adminFullName,
              updatedByRole: adminRole,
            },
          );
        }

        await axios.put("https://api-map.bmphrc.com/assign-outlet", {
          outletId: data.outletId,
          outletName: data.outletName,
          employeeId: data.incomingApplicantId,
          temporaryDeployEndDate:
            data.deployStatus === "Reliever Deployed"
              ? data.temporaryDeployEndDate || null
              : null,
          deployStatus: "Deployed",
          deploymentType: data.deploymentType || "Stationary", // <-- Use the selected value
          deployDate: data.incomingDeployDate || today,
          undeployDate: null,
          applicantStatus: "",
          updatedBy: adminFullName,
          updatedByRole: adminRole,
        });

        await axios.put("https://api-map.bmphrc.com/promote-applicant", {
          employeeId: data.incomingApplicantId,
          updatedBy: adminFullName,
          updatedByRole: adminRole,
        });
      } else {
        const origStatus = data.applicantStatus;
        const finalStatus =
          data.deployStatus === "Deployed" ? "" : data.applicantStatus;

        // ── FOR POOLING: vacate the outlet ──────────────────────────────────
        // When the status is set to "For Pooling", the current merchandiser is
        // removed so the outlet becomes VACANT. (Works whether or not a separate
        // incoming applicant was selected — the status alone triggers it.)
        const isIncomingForPooling =
          data.incomingApplicantStatus === "For Pooling" ||
          data.applicantStatus === "For Pooling";

        if (isIncomingForPooling && data.assignedEmployeeId) {
          await axios.put(
            "https://api-map.bmphrc.com/remove-outlet-assignment",
            {
              outletName: data.outletName,
              employeeId: data.assignedEmployeeId,
              remarks: previousEmployeeRemarks || "Resign",
              terminateReason:
                previousEmployeeRemarks === "Terminated" ? terminateReason : "",
              dateResigned: today,
              updatedBy: adminFullName,
              updatedByRole: adminRole,
            },
          );
        }

        if (
          !isIncomingForPooling &&
          (data.assignedEmployeeId || data.applicantStatus === "For Pooling")
        ) {
          await axios.put("https://api-map.bmphrc.com/assign-outlet", {
            outletId: data.outletId,
            outletName: data.outletName,
            employeeId: data.assignedEmployeeId,
            deployStatus: data.deployStatus,
            deploymentType: data.deploymentType || "Stationary",
            deployDate: data.deployDate || null,
            undeployDate: data.undeployDate || null,
            applicantStatus: finalStatus,
            temporaryDeployEndDate:
              data.deployStatus === "Reliever Deployed"
                ? data.temporaryDeployEndDate || null
                : null,
            updatedBy: adminFullName,
            updatedByRole: adminRole,
          });
        }

        if (
          data.incomingApplicantId &&
          data.incomingApplicantStatus !== "Onboarded"
        ) {
          await axios.put("https://api-map.bmphrc.com/assign-outlet", {
            outletId: data.outletId,
            outletName: data.outletName,
            employeeId: data.incomingApplicantId,
            deployStatus: "Undeployed",
            deploymentType: "Stationary",
            deployDate: null,
            undeployDate: null,
            applicantStatus: data.incomingApplicantStatus,
            backOutReason:
              data.incomingApplicantStatus === "Back Out" ? backOutReason : "",
            targetOnboardDate:
              data.incomingApplicantStatus === "For Onboarding"
                ? targetOnboardDate
                : "",
            updatedBy: adminFullName,
            updatedByRole: adminRole,
          });
        }

        if (
          origStatus === "Onboarded" &&
          data.assignedEmployeeId &&
          !data.incomingApplicantId
        ) {
          await axios.put("https://api-map.bmphrc.com/promote-applicant", {
            employeeId: data.assignedEmployeeId,
            updatedBy: adminFullName,
            updatedByRole: adminRole,
          });
        }
      }

      await axios.put("https://api-map.bmphrc.com/assign-coordinator", {
        outletName: data.outletName,
        employeeId: data.assignedCoordinatorId,
        deployStatus: data.coordinatorDeployStatus,
        updatedBy: adminFullName,
        updatedByRole: adminRole,
      });

      await fetchAndApply();
      setFilterStatus("ALL");
      setFilteredOutlets(OUTLET_DATA);
      alert("Outlet assignment updated successfully!");
      setOpenEditModal(false);
      setIsEditing(false);
      setShowChangeMerchandiser(false);
      setPreviousEmployeeRemarks("");
      setBackOutReason("");
      setTerminateReason("");
      setTargetOnboardDate("");
      setDateError("");
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save assignment.");
    }
  };

  // ── Columns Definition ──────────────────────────────────────────────────
  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "region", headerName: "Region", width: 100 },
    { field: "outlet", headerName: "Outlet", width: 380 },
    {
      field: "accountSupervisor",
      headerName: "Account Supervisor",
      width: 200,
    },
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
      width: 200,
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
      field: "deploymentType",
      headerName: "Type of Deployment",
      width: 170,
      renderCell: (p) => {
        const t = p.row._deploymentType || "Stationary";
        if (t === "Roving") {
          return (
            <Chip
              label="Roving"
              size="small"
              sx={{
                fontWeight: 500,
                backgroundColor: "#e8eaf6",
                color: "#3949ab",
                border: "1px solid #c5cae9",
              }}
            />
          );
        }
        return (
          <Chip
            label="Stationary"
            size="small"
            sx={{
              fontWeight: 500,
              backgroundColor: "#f5f5f5",
              color: "#616161",
              border: "1px solid #e0e0e0",
            }}
          />
        );
      },
    },
    {
      field: "deployStatus",
      headerName: "Status",
      width: 115,
      renderCell: (p) => {
        const s = p.row._deployStatus;
        const label = s || "Undeployed";
        const color =
          s === "Deployed"
            ? "success"
            : s === "Reliever Deployed"
              ? "warning"
              : "default";
        return (
          <Chip
            label={label}
            color={color}
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

  // ── Rows Data ─────────────────────────────────────────────────────────────
  const rows = filteredOutlets.map((outlet, index) => {
    const a = outletAssignments[outlet.id];
    const c = coordinatorAssignments[outlet.id];
    return {
      ...outlet,
      count: index + 1,
      _deployStatus: a?.deployStatus || "",
      _deploymentType: a?.deploymentType || "Stationary",
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

  // ═════════════════════════════════════════════════════════════════════════
  // 6. RENDER
  // ═════════════════════════════════════════════════════════════════════════

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
          {/* ── Header ────────────────────────────────────────────────────── */}
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

          {/* ── Filter Bar ────────────────────────────────────────────────── */}
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
                <InputLabel>Filter by Region</InputLabel>
                <Select
                  value={filterRegion}
                  onChange={handleRegionFilter}
                  label="Filter by Region"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                >
                  <MenuItem value="ALL">All Regions</MenuItem>
                  <MenuItem value="NCR">NCR</MenuItem>
                  <MenuItem value="CAR">CAR</MenuItem>
                  <MenuItem value="REGION 1">Region 1</MenuItem>
                  <MenuItem value="REGION 2">Region 2</MenuItem>
                  <MenuItem value="REGION 3">Region 3</MenuItem>
                  <MenuItem value="REGION 4A">Region 4A</MenuItem>
                  <MenuItem value="REGION 4B">Region 4B</MenuItem>
                  <MenuItem value="REGION 5">Region 5</MenuItem>
                  <MenuItem value="REGION 6">Region 6</MenuItem>
                  <MenuItem value="REGION 7">Region 7</MenuItem>
                  <MenuItem value="REGION 8">Region 8</MenuItem>
                  <MenuItem value="REGION 9">Region 9</MenuItem>
                  <MenuItem value="REGION 10">Region 10</MenuItem>
                  <MenuItem value="REGION 11">Region 11</MenuItem>
                  <MenuItem value="REGION 12">Region 12</MenuItem>
                </Select>
              </FormControl>
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
                  <MenuItem value="Reliever Deployed">
                    Reliever Deployed
                  </MenuItem>
                  <MenuItem value="Undeployed">Undeployed</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel>Filter by Type of Deployment</InputLabel>
                <Select
                  value={filterType}
                  onChange={handleTypeFilter}
                  label="Filter by Type of Deployment"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                >
                  <MenuItem value="ALL">All Types</MenuItem>
                  <MenuItem value="Stationary">Stationary</MenuItem>
                  <MenuItem value="Roving">Roving</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel>Filter by Account Supervisor</InputLabel>
                <Select
                  value={filterSupervisor}
                  onChange={handleSupervisorFilter}
                  label="Filter by Account Supervisor"
                  sx={{ backgroundColor: "white", borderRadius: "8px" }}
                >
                  <MenuItem value="ALL">All Supervisors</MenuItem>
                  {supervisorOptions.map((sup) => (
                    <MenuItem key={sup} value={sup}>
                      {sup}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportExcel}
                disabled={filteredOutlets.length === 0}
                sx={{
                  backgroundColor: "#2e6385",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  px: 2.5,
                  py: 1.4,
                  "&:hover": { backgroundColor: "#0c2e3f" },
                }}
              >
                Export Excel
              </Button>
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

          {/* ── DataGrid ──────────────────────────────────────────────────── */}
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

          {/* ── Personnel Summary Modal ──────────────────────────────────── */}
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
                {/* Summary Modal Header */}
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

                {/* Summary Modal Controls */}
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

                {/* Summary Modal Content */}
                <Box sx={{ overflowY: "auto", flex: 1, px: 3, py: 2 }}>
                  {/* Assigned Personnel Table */}
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

                  {/* Floating Personnel Table */}
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

          {/* ── Edit/Assign Modal ────────────────────────────────────────── */}
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
                {/* Edit Modal Header */}
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

                {/* Edit Modal Content */}
                {selectedOutlet && (
                  <Box sx={{ p: 4 }}>
                    {/* ── SECTION 1: Current Deployed Employee ── */}
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

                          {/* ── Assign Employee/Applicant ── */}
                          {isEditing &&
                          !hasIncomingPipeline &&
                          (!selectedOutlet.assignedEmployeeId ||
                            showChangeMerchandiser) ? (
                            <>
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
                                        deploymentType: "Stationary",
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

                              {assignMode === "employed" ||
                              (assignMode === "applicant" &&
                                canSetApplicantStatus) ? (
                                <>
                                  <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        options={
                                          assignMode === "applicant"
                                            ? efcApplicants
                                            : efcEmployees
                                        }
                                        value={
                                          (assignMode === "applicant"
                                            ? efcApplicants
                                            : efcEmployees
                                          ).find(
                                            (emp) =>
                                              emp._id ===
                                              selectedOutlet.assignedEmployeeId,
                                          ) || null
                                        }
                                        getOptionLabel={(emp) =>
                                          emp
                                            ? `${emp.firstName}${
                                                emp.middleName
                                                  ? " " + emp.middleName
                                                  : ""
                                              } ${emp.lastName}${
                                                emp.position
                                                  ? " — " + emp.position
                                                  : ""
                                              }`
                                            : ""
                                        }
                                        isOptionEqualToValue={(opt, val) =>
                                          opt._id === val._id
                                        }
                                        onChange={(event, picked) => {
                                          const isApplicant =
                                            assignMode === "applicant";
                                          const newId = picked?._id || "";

                                          // TRANSFER/SWAP: detect if the picked
                                          // person is deployed elsewhere.
                                          const pickedEmp = efcEmployees.find(
                                            (x) => x._id === newId,
                                          );
                                          const transferFrom =
                                            !isApplicant && pickedEmp
                                              ? getEmployeeCurrentOutlet(
                                                  pickedEmp,
                                                )
                                              : null;
                                          const isTransfer =
                                            !isApplicant &&
                                            transferFrom &&
                                            transferFrom.outletName !==
                                              selectedOutlet.outletName &&
                                            (transferFrom.deployStatus ===
                                              "Deployed" ||
                                              transferFrom.deployStatus ===
                                                "Reliever Deployed");

                                          setSelectedOutlet({
                                            ...selectedOutlet,
                                            assignedEmployeeId: newId,
                                            _isApplicant: isApplicant,
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
                                            _transferFromOutlet: isTransfer
                                              ? transferFrom.outletName
                                              : null,
                                            _transferPersonId: isTransfer
                                              ? newId
                                              : null,
                                          });
                                        }}
                                        renderOption={(props, emp) => {
                                          const deployedElsewhere =
                                            assignMode !== "applicant" &&
                                            isEmployeeDeployedElsewhere(
                                              emp,
                                              selectedOutlet.outletName,
                                            );
                                          const currentOutlet =
                                            deployedElsewhere
                                              ? getEmployeeCurrentOutlet(emp)
                                                  ?.outletName
                                              : null;
                                          return (
                                            <Box
                                              component="li"
                                              {...props}
                                              key={emp._id}
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                flexWrap: "wrap",
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
                                              {deployedElsewhere && (
                                                <Chip
                                                  label={`🔴 Deployed at ${currentOutlet}`}
                                                  size="small"
                                                  sx={{
                                                    height: 18,
                                                    fontSize: "10px",
                                                    fontWeight: 600,
                                                    backgroundColor: "#ffebee",
                                                    color: "#c62828",
                                                  }}
                                                />
                                              )}
                                            </Box>
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label={
                                              assignMode === "applicant"
                                                ? "Assign Applicant"
                                                : "Assign Employee"
                                            }
                                            placeholder="Type to search…"
                                          />
                                        )}
                                      />
                                      <FormHelperText>
                                        {assignMode === "applicant"
                                          ? "Applicants will go through the endorsement pipeline below"
                                          : "Active/Employed merchandisers for direct deployment"}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                </>
                              ) : null}
                            </>
                          ) : (
                            /* ── Show current employee when not editing or when outlet has an employee ── */
                            (isEditing || !isEditing) &&
                            selectedOutlet.assignedEmployeeId && (
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
                                        : "#f5f5f5",
                                    },
                                  }}
                                />
                                {/* TRANSFER/SWAP (TEST): reveal dropdown to replace/transfer */}
                                {isEditing &&
                                  canEdit &&
                                  !hasIncomingPipeline && (
                                    <Button
                                      size="small"
                                      startIcon={<SwapHorizIcon />}
                                      onClick={() => {
                                        setShowChangeMerchandiser(true);
                                        // keep original person id for swap detection,
                                        // clear the current selection so the dropdown opens
                                        setSelectedOutlet({
                                          ...selectedOutlet,
                                          _originalAssignedEmployeeId:
                                            selectedOutlet._originalAssignedEmployeeId ||
                                            selectedOutlet.assignedEmployeeId,
                                          assignedEmployeeId: "",
                                        });
                                      }}
                                      sx={{
                                        mt: 1,
                                        textTransform: "none",
                                        color: "#2e6385",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Change / Transfer merchandiser
                                    </Button>
                                  )}
                              </Grid>
                            )
                          )}

                          {/* ── Deploy Status ── */}
                          {!hasIncomingPipeline &&
                            !selectedOutlet._isApplicant && (
                              <Grid item xs={12} sm={6}>
                                {isEditing && canEdit ? (
                                  <FormControl
                                    fullWidth
                                    disabled={
                                      !selectedOutlet.assignedEmployeeId
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
                                            s === "Deployed" ||
                                            s === "Reliever Deployed"
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
                                      <MenuItem value="Reliever Deployed">
                                        Reliever Deployed
                                      </MenuItem>
                                      <MenuItem value="Undeployed">
                                        Undeployed
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                ) : (
                                  <TextField
                                    label="Deploy Status"
                                    fullWidth
                                    value={
                                      selectedOutlet.deployStatus ||
                                      "Undeployed"
                                    }
                                    InputProps={{
                                      readOnly: true,
                                      endAdornment:
                                        isEditing && !canEdit ? (
                                          <LockIcon
                                            sx={{
                                              fontSize: 16,
                                              color: "#bbb",
                                              mr: 1,
                                            }}
                                          />
                                        ) : null,
                                    }}
                                    helperText={
                                      isEditing && !canEdit
                                        ? "Managed by Account Supervisor"
                                        : ""
                                    }
                                    FormHelperTextProps={{
                                      sx: {
                                        color: "#bbb",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                      },
                                    }}
                                  />
                                )}
                              </Grid>
                            )}

                          {/* ── Type of Deployment ── */}
                          <Grid item xs={12} sm={6}>
                            {isEditing && canEditDeploymentType ? (
                              <FormControl
                                fullWidth
                                disabled={
                                  // Only disable if there's no assigned employee AND no applicant being assigned
                                  !selectedOutlet.assignedEmployeeId &&
                                  !(
                                    assignMode === "applicant" &&
                                    selectedOutlet._isApplicant
                                  )
                                }
                              >
                                <InputLabel>Type of Deployment</InputLabel>
                                <Select
                                  value={
                                    selectedOutlet.assignedEmployeeId ||
                                    selectedOutlet._isApplicant
                                      ? selectedOutlet.deploymentType ||
                                        "Stationary"
                                      : "Stationary"
                                  }
                                  label="Type of Deployment"
                                  onChange={(e) => {
                                    setSelectedOutlet({
                                      ...selectedOutlet,
                                      deploymentType: e.target.value,
                                    });
                                  }}
                                >
                                  <MenuItem value="Stationary">
                                    Stationary
                                  </MenuItem>
                                  <MenuItem value="Roving">Roving</MenuItem>
                                </Select>
                                <FormHelperText>
                                  {selectedOutlet?.deploymentType === "Roving"
                                    ? "Roving merchandiser covers multiple outlets"
                                    : "Stationary merchandiser stays at this outlet"}
                                </FormHelperText>
                              </FormControl>
                            ) : (
                              <TextField
                                label="Type of Deployment"
                                fullWidth
                                value={
                                  selectedOutlet.deploymentType || "Stationary"
                                }
                                InputProps={{
                                  readOnly: true,
                                  endAdornment:
                                    isEditing && !canEditDeploymentType ? (
                                      <LockIcon
                                        sx={{
                                          fontSize: 16,
                                          color: "#bbb",
                                          mr: 1,
                                        }}
                                      />
                                    ) : null,
                                }}
                                helperText={
                                  isEditing && !canEditDeploymentType
                                    ? "Managed by Account Supervisor or HR"
                                    : ""
                                }
                                FormHelperTextProps={{
                                  sx: {
                                    color: "#bbb",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  },
                                }}
                              />
                            )}
                          </Grid>

                          {/* ── Days Undeployed ── */}
                          {selectedOutlet.deployStatus === "Undeployed" &&
                            !selectedOutlet._isApplicant &&
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

                          {/* ── Applicant Status + Dates ── */}
                          {!hasIncomingPipeline &&
                            selectedOutlet.assignedEmployeeId && (
                              <>
                                {(selectedOutlet._isApplicant ||
                                  assignMode === "applicant") &&
                                  selectedOutlet.deployStatus ===
                                    "Undeployed" &&
                                  canEdit && (
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
                                                    const ACCT_SUP_STAGES = [
                                                      "Intro Done",
                                                      "Back Out",
                                                      "For Onboarding",
                                                      "Onboarded",
                                                    ];
                                                    const acctSupDis =
                                                      canEdit &&
                                                      !canSetApplicantStatus
                                                        ? !ACCT_SUP_STAGES.includes(
                                                            opt.value,
                                                          )
                                                        : false;
                                                    const obDis =
                                                      isOB &&
                                                      (!canSetOnboarded ||
                                                        cur !==
                                                          "For Onboarding");
                                                    const hrDis =
                                                      !isOB &&
                                                      !canSetApplicantStatus &&
                                                      !canSetOnboarded;
                                                    const dis =
                                                      acctSupDis ||
                                                      obDis ||
                                                      hrDis;
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

                                {/* ── Deploy Date ── */}
                                {!selectedOutlet._isApplicant &&
                                  (selectedOutlet.deployStatus === "Deployed" ||
                                    selectedOutlet.deployStatus ===
                                      "Reliever Deployed") && (
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        label="Deploy Date"
                                        type="date"
                                        fullWidth
                                        value={selectedOutlet.deployDate || ""}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          readOnly: !isEditing || !canEdit,
                                          startAdornment: (
                                            <EventIcon
                                              sx={{
                                                fontSize: 18,
                                                color:
                                                  selectedOutlet.deployStatus ===
                                                  "Reliever Deployed"
                                                    ? "#e65100"
                                                    : "#2e7d32",
                                                mr: 1,
                                              }}
                                            />
                                          ),
                                        }}
                                        onChange={(e) => {
                                          if (isEditing && canEdit) {
                                            setSelectedOutlet({
                                              ...selectedOutlet,
                                              deployDate: e.target.value,
                                            });
                                            setDateError("");
                                          }
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            backgroundColor:
                                              isEditing && canEdit
                                                ? selectedOutlet.deployStatus ===
                                                  "Reliever Deployed"
                                                  ? "#fff8f0"
                                                  : "#f0fdf4"
                                                : "#fafafa",
                                          },
                                        }}
                                        helperText={
                                          isEditing &&
                                          canEdit &&
                                          !selectedOutlet.deployDate
                                            ? "Required when status is Deployed"
                                            : selectedOutlet.deployDate
                                              ? `Deployed on ${formatDate(selectedOutlet.deployDate)}`
                                              : ""
                                        }
                                        FormHelperTextProps={{
                                          sx: {
                                            color:
                                              isEditing &&
                                              canEdit &&
                                              !selectedOutlet.deployDate
                                                ? "#d32f2f"
                                                : selectedOutlet.deployStatus ===
                                                    "Reliever Deployed"
                                                  ? "#e65100"
                                                  : "#2e7d32",
                                          },
                                        }}
                                      />
                                    </Grid>
                                  )}

                                {/* ── Reliever Deploy End Date ── */}
                                {selectedOutlet.deployStatus ===
                                  "Reliever Deployed" &&
                                  !selectedOutlet._isApplicant && (
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        label="Reliever Deploy Until"
                                        type="date"
                                        fullWidth
                                        value={
                                          selectedOutlet.temporaryDeployEndDate ||
                                          ""
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          readOnly: !isEditing || !canEdit,
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
                                          if (isEditing && canEdit) {
                                            setSelectedOutlet({
                                              ...selectedOutlet,
                                              temporaryDeployEndDate:
                                                e.target.value,
                                            });
                                            setDateError("");
                                          }
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            backgroundColor:
                                              isEditing && canEdit
                                                ? "#fff8f0"
                                                : "#fafafa",
                                            border:
                                              isEditing && canEdit
                                                ? "1px solid #ffcc80"
                                                : "none",
                                          },
                                        }}
                                        helperText={
                                          isEditing &&
                                          canEdit &&
                                          !selectedOutlet.temporaryDeployEndDate
                                            ? "Required — select the end date of temporary deployment"
                                            : selectedOutlet.temporaryDeployEndDate
                                              ? `Temporary until ${formatDate(selectedOutlet.temporaryDeployEndDate)}`
                                              : ""
                                        }
                                        FormHelperTextProps={{
                                          sx: {
                                            color:
                                              isEditing &&
                                              canEdit &&
                                              !selectedOutlet.temporaryDeployEndDate
                                                ? "#d32f2f"
                                                : "#e65100",
                                          },
                                        }}
                                      />
                                    </Grid>
                                  )}

                                {/* ── Undeploy Date ── */}
                                {selectedOutlet.deployStatus === "Undeployed" &&
                                  !selectedOutlet._isApplicant && (
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        label="Undeploy Date"
                                        type="date"
                                        fullWidth
                                        value={
                                          selectedOutlet.undeployDate || ""
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                          readOnly: !isEditing || !canEdit,
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
                                          if (isEditing && canEdit) {
                                            setSelectedOutlet({
                                              ...selectedOutlet,
                                              undeployDate: e.target.value,
                                            });
                                            setDateError("");
                                          }
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            backgroundColor:
                                              isEditing && canEdit
                                                ? "#fff8f0"
                                                : "#fafafa",
                                          },
                                        }}
                                        helperText={
                                          isEditing &&
                                          canEdit &&
                                          !selectedOutlet.undeployDate
                                            ? "Select the date this outlet became undeployed"
                                            : selectedOutlet.undeployDate
                                              ? `Undeployed on ${formatDate(selectedOutlet.undeployDate)}`
                                              : ""
                                        }
                                        FormHelperTextProps={{
                                          sx: {
                                            color:
                                              isEditing &&
                                              canEdit &&
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

                          {/* ── Add Incoming Applicant Button ── */}
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

                          {/* ── Error / Lock Alerts ── */}
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

                    {/* ── SECTION 2: Incoming Applicant Pipeline ── */}
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
                                  const ACCT_SUP_STAGES = [
                                    "Intro Done",
                                    "Back Out",
                                    "For Onboarding",
                                    "Onboarded",
                                  ];
                                  const HR_STAGES = [
                                    "For Pooling",
                                    "Applicant Endorsed",
                                  ];
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
                                          if (ns !== "Back Out")
                                            setBackOutReason("");
                                          if (ns !== "For Onboarding")
                                            setTargetOnboardDate("");
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
                                          const isAcctSupStage =
                                            ACCT_SUP_STAGES.includes(opt.value);
                                          const isHRStage = HR_STAGES.includes(
                                            opt.value,
                                          );
                                          let dis = false;
                                          if (
                                            canEdit &&
                                            !canSetApplicantStatus
                                          ) {
                                            if (isHRStage) dis = true;
                                            else if (
                                              isOB &&
                                              cur !== "For Onboarding"
                                            )
                                              dis = true;
                                          } else {
                                            if (isAcctSupStage) dis = true;
                                          }
                                          const cfg = getApplicantStatusConfig(
                                            opt.value,
                                          );
                                          const badge = isOB
                                            ? "→ Replaces current employee"
                                            : opt.value === "Back Out"
                                              ? "Acct Sup only"
                                              : opt.value === "For Onboarding"
                                                ? "Acct Sup only"
                                                : opt.value === "Intro Done"
                                                  ? "Acct Sup only"
                                                  : null;
                                          const badgeColor = isOB
                                            ? {
                                                bg: "#e8f5e9",
                                                color: "#2e7d32",
                                              }
                                            : opt.value === "Back Out"
                                              ? {
                                                  bg: "#ffebee",
                                                  color: "#c62828",
                                                }
                                              : opt.value === "For Onboarding"
                                                ? {
                                                    bg: "#fff3e0",
                                                    color: "#e65100",
                                                  }
                                                : opt.value === "Intro Done"
                                                  ? {
                                                      bg: "#f3e5f5",
                                                      color: "#6a1b9a",
                                                    }
                                                  : null;
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
                                                    {badge && (
                                                      <Chip
                                                        label={badge}
                                                        size="small"
                                                        sx={{
                                                          height: 16,
                                                          fontSize: "10px",
                                                          backgroundColor:
                                                            badgeColor.bg,
                                                          color:
                                                            badgeColor.color,
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
                                                : cur === "Back Out"
                                                  ? "#c62828"
                                                  : "inherit",
                                        }}
                                      >
                                        {cur === "Onboarded"
                                          ? "✅ Will replace current employee on save"
                                          : cur === "For Onboarding"
                                            ? canSetOnboarded
                                              ? "✅ You can now set Onboarded"
                                              : "🔒 ACCOUNT SUPERVISOR / MIS only"
                                            : cur === "Back Out"
                                              ? "⚠ Provide the reason for backing out below"
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
                                  if (canEdit && !canSetApplicantStatus) {
                                    const p = selectedOutlet.incomingApplicantId
                                      ? findPersonById(
                                          selectedOutlet.incomingApplicantId,
                                        )
                                      : null;
                                    return (
                                      <TextField
                                        label="Assigned Applicant"
                                        fullWidth
                                        value={
                                          p
                                            ? `${p.firstName} ${p.lastName}${p.position ? " — " + p.position : ""} (Applicant)`
                                            : "Not yet assigned by HR"
                                        }
                                        InputProps={{
                                          readOnly: true,
                                          endAdornment: (
                                            <LockIcon
                                              sx={{
                                                fontSize: 16,
                                                color: "#bbb",
                                                mr: 1,
                                              }}
                                            />
                                          ),
                                        }}
                                        helperText="Applicant is selected by HR roles"
                                        FormHelperTextProps={{
                                          sx: { color: "#bbb" },
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#fafafa",
                                          },
                                        }}
                                      />
                                    );
                                  }
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
                                    return `${p.firstName} ${p.lastName}${p.position ? " — " + p.position : ""}${
                                      p.status === "Applicant"
                                        ? " (Applicant)"
                                        : ""
                                    }`;
                                  })()}
                                  InputProps={{ readOnly: true }}
                                />
                              )}
                            </Grid>

                            {/* Back Out Reason */}
                            {selectedOutlet.incomingApplicantStatus ===
                              "Back Out" && (
                              <Grid item xs={12} sm={6}>
                                {isEditing ? (
                                  <BackOutReasonField
                                    key={backOutReason}
                                    value={backOutReason}
                                    onChange={setBackOutReason}
                                    hasError={!!dateError}
                                  />
                                ) : (
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "#c62828",
                                        fontWeight: 600,
                                        display: "block",
                                        mb: 0.5,
                                      }}
                                    >
                                      Reason for Back Out
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: backOutReason
                                          ? "#c62828"
                                          : "#bbb",
                                        fontStyle: backOutReason
                                          ? "normal"
                                          : "italic",
                                      }}
                                    >
                                      {selectedOutlet.incomingBackOutReason ||
                                        "Not provided"}
                                    </Typography>
                                  </Box>
                                )}
                              </Grid>
                            )}

                            {/* Target Onboard Date */}
                            {selectedOutlet.incomingApplicantStatus ===
                              "For Onboarding" && (
                              <Grid item xs={12} sm={6}>
                                {isEditing ? (
                                  <TextField
                                    label="Target Onboard Date"
                                    type="date"
                                    fullWidth
                                    value={targetOnboardDate}
                                    onChange={(e) =>
                                      setTargetOnboardDate(e.target.value)
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
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
                                    helperText={
                                      targetOnboardDate
                                        ? `Target: ${formatDate(targetOnboardDate)}`
                                        : "Select expected onboarding date"
                                    }
                                    FormHelperTextProps={{
                                      sx: { color: "#e65100" },
                                    }}
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#fff8f0",
                                      },
                                    }}
                                  />
                                ) : (
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "#e65100",
                                        fontWeight: 600,
                                        display: "block",
                                        mb: 0.5,
                                      }}
                                    >
                                      Target Onboard Date
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: targetOnboardDate
                                          ? "#e65100"
                                          : "#bbb",
                                        fontStyle: targetOnboardDate
                                          ? "normal"
                                          : "italic",
                                      }}
                                    >
                                      {selectedOutlet.incomingTargetOnboardDate
                                        ? formatDate(
                                            selectedOutlet.incomingTargetOnboardDate,
                                          )
                                        : "Not set"}
                                    </Typography>
                                  </Box>
                                )}
                              </Grid>
                            )}

                            {/* Deploy Date for Incoming Applicant */}
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

                            {/* Previous Employee Remarks */}
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
                                        <MenuItem value="Resigned">
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
                                              Resigned
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Employee voluntarily resigned
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
                                        <MenuItem value="Terminated">
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
                                              Terminated
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Employment terminated by company
                                            </Typography>
                                          </Box>
                                        </MenuItem>
                                        <MenuItem value="AWOL">
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
                                              AWOL
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Absent without official leave
                                            </Typography>
                                          </Box>
                                        </MenuItem>
                                        <MenuItem value="Abandonment of Work">
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
                                              Abandonment of Work
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              sx={{ color: "#888" }}
                                            >
                                              Employee abandoned their post
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

                            {/* Termination Reason */}
                            {previousEmployeeRemarks === "Terminated" && (
                              <Grid item xs={12}>
                                {isEditing ? (
                                  <TerminateReasonField
                                    key={terminateReason}
                                    value={terminateReason}
                                    onChange={setTerminateReason}
                                    hasError={!!dateError}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      border: "1px solid #ffe0b2",
                                      borderRadius: "8px",
                                      p: 2,
                                      backgroundColor: "#fff8f0",
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "#e65100",
                                        fontWeight: 600,
                                        display: "block",
                                        mb: 0.5,
                                      }}
                                    >
                                      Reason for Termination
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "#555" }}
                                    >
                                      {terminateReason || "—"}
                                    </Typography>
                                  </Box>
                                )}
                              </Grid>
                            )}

                            {/* Onboarding Alert */}
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

                    {/* ── SECTION 3: Coordinator Assignment ── */}
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

                    {/* ── Action Buttons ── */}
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
