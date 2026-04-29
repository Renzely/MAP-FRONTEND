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
  { id: 1, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - SUCAT" },
  { id: 2, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - BICUTAN" },
  {
    id: 3,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - MUNTINLUPA WEST",
  },
  { id: 4, region: "NCR", outlet: "LANDMARK - ALABANG" },
  { id: 5, region: "NCR", outlet: "SOUTH - GROCERS BF" },
  { id: 6, region: "NCR", outlet: "ULTRAMEGA - TAGUIG" },
  { id: 7, region: "NCR", outlet: "SUPER 8 - LIBERTAD" },
  { id: 8, region: "NCR", outlet: "SUPER 8 - BACLARAN" },
  { id: 9, region: "NCR", outlet: "SUPER 8 - MALIBAY" },
  { id: 10, region: "NCR", outlet: "SUPER 8 - MAKATI" },
  { id: 11, region: "NCR", outlet: "SUPER 8 - GUADALUPE" },
  { id: 12, region: "NCR", outlet: "LANDMARK - MAKATI-1" },
  { id: 13, region: "NCR", outlet: "LANDMARK - MAKATI-2" },
  { id: 14, region: "NCR", outlet: "ROBINSON SUPERMARKET - ONE AYALA" },
  {
    id: 15,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - MARKET MARKET",
  },
  {
    id: 16,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - ALABANG",
  },
  {
    id: 17,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - NEW PORT",
  },
  { id: 18, region: "NCR", outlet: "METRO RETAILS STORES GROUP, INC. - GATE3" },
  { id: 19, region: "NCR", outlet: "AFPCES - FB C&X FORT BONIFACIO" },
  {
    id: 20,
    region: "NCR",
    outlet: "AFPCES - BNS C&X NAVAL GATE 3 FORT BONIFACIO",
  },
  { id: 21, region: "NCR", outlet: "SOUTH SUPERMARKET - ALABANG FILINVEST" },
  { id: 22, region: "NCR", outlet: "LIANA'S SUPERMARKET - ALABANG" },
  { id: 23, region: "NCR", outlet: "PUREGOLD PRICE CLUP - PUTATAN" },
  { id: 24, region: "NCR", outlet: "LIANAS SUPERMARKET - EVACOM" },
  { id: 25, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PARANAQUE-2" },
  { id: 26, region: "NCR", outlet: "LIANA'S SUPERMARKET - LEVERIZA" },
  { id: 27, region: "NCR", outlet: "LIANA'S SUPERMARKET - LRT" },
  { id: 28, region: "NCR", outlet: "MAKATI SUP. - ALABANG" },
  { id: 29, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - MAKATI" },
  { id: 30, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - PASAY" },
  { id: 31, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - 4TH STATE" },
  { id: 32, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - SUCAT" },
  { id: 33, region: "NCR", outlet: "ULTRAMEGA - MUNTINLUPA" },
  { id: 34, region: "NCR", outlet: "SUPER 8 - MUNTINLUPA" },
  { id: 35, region: "NCR", outlet: "SUPER 8 - ALABANG" },
  { id: 36, region: "NCR", outlet: "SUPER 8 - SUCAT 2" },
  { id: 37, region: "NCR", outlet: "SUPER 8 - CAA LAS PINAS" },
  { id: 38, region: "NCR", outlet: "SUPER 8 - BAGUMBAYAN" },
  { id: 39, region: "NCR", outlet: "SUPER 8 - LAS PINAS" },
  { id: 40, region: "NCR", outlet: "SUPER 8 - LA HUERTA" },
  { id: 41, region: "NCR", outlet: "LANDMARK - MANILA BAY" },
  { id: 42, region: "NCR", outlet: "ULTRAMEGA - ANTIPOLO" },
  { id: 43, region: "NCR", outlet: "ULTRAMEGA - TANAY" },
  { id: 44, region: "NCR", outlet: "ULTRAMEGA - MONTALBAN" },
  { id: 45, region: "NCR", outlet: "ULTRAMEGA - SAN MATEO" },
  { id: 46, region: "NCR", outlet: "SUPER 8 - ORTIGAS EXT. CAINTA" },
  { id: 47, region: "NCR", outlet: "SUPER 8 - TAYTAY 1" },
  { id: 48, region: "NCR", outlet: "SUPER 8 - MASINAG" },
  { id: 49, region: "NCR", outlet: "SUPER 8 - CAINTA" },
  { id: 50, region: "NCR", outlet: "SUPER 8 - TAYTAY 2" },
  { id: 51, region: "NCR", outlet: "SUPER 8 - COGEO" },
  { id: 52, region: "NCR", outlet: "SUPER 8 - ANTIPOLO" },
  { id: 53, region: "NCR", outlet: "SUPER 8 - NAPINDAN" },
  { id: 54, region: "NCR", outlet: "SUPER 8 - ROSARIO 2" },
  { id: 55, region: "NCR", outlet: "SUPER 8 - ANGONO" },
  { id: 56, region: "NCR", outlet: "SUPER 8 - BINANGONAN" },
  { id: 57, region: "NCR", outlet: "SUPER 8 - MORONG" },
  { id: 58, region: "NCR", outlet: "SUPER 8 - TANAY" },
  { id: 59, region: "NCR", outlet: "SUPER 8 - SAN JUAN" },
  { id: 60, region: "NCR", outlet: "SUPER 8 - SHAW" },
  { id: 61, region: "NCR", outlet: "SUPER 8 - SAN JOAQUIN" },
  { id: 62, region: "NCR", outlet: "SUPER 8 - SIGNAL (FTI)" },
  { id: 63, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - TAYTAY" },
  { id: 64, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - ANTIPOLO" },
  { id: 65, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PARANG" },
  { id: 66, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - SAN MATEO" },
  { id: 67, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PEÑAFRANCIA" },
  { id: 68, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - CAINTA" },
  { id: 69, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PATEROS" },
  { id: 70, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PINAGBUHATAN" },
  { id: 71, region: "NCR", outlet: "LIANA'S SUPERMARKET - PASIG" },
  { id: 72, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC  - SANTOLAN" },
  { id: 73, region: "NCR", outlet: "UNIMART - CAPITAL COMMON PASIG" },
  { id: 74, region: "NCR", outlet: "UNIMART- GREENHILLS,SANJUAN" },
  { id: 75, region: "NCR", outlet: "SOUTH PASIG" },
  { id: 76, region: "NCR", outlet: "SOUTH MARIKINA" },
  { id: 77, region: "NCR", outlet: "METRO RETAILS STORES GROUP, INC. - FELIZ" },
  { id: 78, region: "NCR", outlet: "PUREGOLD PRICE CLUP - SHAW (2)" },
  { id: 79, region: "NCR", outlet: "METRO RETAILS STORES GROUP, INC. - SHAW" },
  {
    id: 80,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - ANTIPOLO",
  },
  { id: 81, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - ROCES" },
  { id: 82, region: "NCR", outlet: "SUPER 8 - ERMIN GARCIA" },
  { id: 83, region: "NCR", outlet: "SUPER 8 - FARMERS" },
  { id: 84, region: "NCR", outlet: "SUPER 8 - MOLAVE" },
  { id: 85, region: "NCR", outlet: "SUPER 8 - LITEX" },
  { id: 86, region: "NCR", outlet: "SUPER 8 - COMMONWEALTH" },
  {
    id: 87,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - NORTH EDSA",
  },
  {
    id: 88,
    region: "NCR",
    outlet: "WALTERMART SUPERMARKET, INC. - VISAYAS AVE",
  },
  { id: 89, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - E.ROD" },
  { id: 90, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - JUNCTION" },
  { id: 91, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - BAGUMBONG" },
  { id: 92, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - BAGONG SILANG" },
  { id: 93, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - VICAS" },
  { id: 94, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - KAYBIGA" },
  { id: 95, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - MALIGAYA" },
  { id: 96, region: "NCR", outlet: "ROBINSONS EASYMART - LAGRO" },
  { id: 97, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - COMMONWEALTH" },
  { id: 98, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PEARL DRIVE" },
  { id: 99, region: "NCR", outlet: "ROBINSONS  - COMMONWEALTH(shopwise)" },
  { id: 100, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - TALIPAPA" },
  { id: 101, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - BAESA" },
  {
    id: 102,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - QUIRINO HIWAY",
  },
  { id: 103, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - SAUYO" },
  { id: 104, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - FOREST HILL" },
  { id: 105, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - BAGBAG" },
  { id: 106, region: "NCR", outlet: "ULTRAMEGA - DEPARO" },
  { id: 107, region: "NCR", outlet: "ULTRAMEGA - NOVALICHES" },
  { id: 108, region: "NCR", outlet: "ULTRAMEGA - BAGONG SILANG" },
  { id: 109, region: "NCR", outlet: "SUPER 8 - NOVA 2" },
  { id: 110, region: "NCR", outlet: "SUPER 8 - TANDANG SORA" },
  { id: 111, region: "NCR", outlet: "SUPER 8 - BAGONG SILANG" },
  { id: 112, region: "NCR", outlet: "SUPER 8 - CAMARIN" },
  { id: 113, region: "NCR", outlet: "AFPCES CAMP AGUINALDO" },
  { id: 114, region: "NCR", outlet: "AFPCES V. LUNA" },
  { id: 115, region: "NCR", outlet: "LANDMARK - TRINOMA MAIN" },
  { id: 116, region: "NCR", outlet: "LANDMARK - TRINOMA COMPLEX" },
  { id: 117, region: "NCR", outlet: "ULTRAMEGA - GAGALANGIN" },
  { id: 118, region: "NCR", outlet: "ULTRAMEGA - TUTUBAN" },
  { id: 119, region: "NCR", outlet: "SUPER 8 - RECTO" },
  { id: 120, region: "NCR", outlet: "SUPER 8 - PACO" },
  { id: 121, region: "NCR", outlet: "SUPER 8 - PRITIL" },
  { id: 122, region: "NCR", outlet: "SUPER 8 - GAGALANGIN" },
  { id: 123, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - BANGKAL" },
  { id: 124, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PACO" },
  { id: 125, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PANDACAN" },
  { id: 126, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - RETIRO" },
  { id: 127, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - TRABAJO" },
  { id: 128, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - MASANGKAY" },
  { id: 129, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC  - YUSECO" },
  { id: 130, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - HERMOSA" },
  { id: 131, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - TONDO" },
  { id: 132, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - MAYPAJO" },
  {
    id: 133,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - ARLEGUI QUIAPO",
  },
  { id: 134, region: "NCR", outlet: "ULTRAMEGA - SANGANDAAN" },
  { id: 135, region: "NCR", outlet: "SUPER 8 - JACKMAN" },
  { id: 136, region: "NCR", outlet: "SUPER 8 - BLUMENTRITT" },
  { id: 137, region: "NCR", outlet: "SUPER 8 - MARULAS" },
  { id: 138, region: "NCR", outlet: "SUPER 8 - P. BURGOS" },
  { id: 139, region: "NCR", outlet: "SUPER 8 - TINAJEROS" },
  { id: 140, region: "NCR", outlet: "SUPER 8 - HULONG DUHAT" },
  { id: 141, region: "NCR", outlet: "SUPER 8 - KARUHATAN" },
  { id: 142, region: "NCR", outlet: "SUPER 8 - GEN. T VALENZUELA" },
  { id: 143, region: "NCR", outlet: "SUPER 8 - BALINTAWAK" },
  { id: 144, region: "NCR", outlet: "SUPER 8 - TATALON" },
  { id: 145, region: "NCR", outlet: "LIANA'S SUPERMARKET - SAMPALOC" },
  { id: 146, region: "NCR", outlet: "ISETANN – CARRIEDO" },
  { id: 147, region: "NCR", outlet: "ISETANN- RECTO" },
  { id: 148, region: "NCR", outlet: "ISETANN – STA.MESA" },
  { id: 149, region: "NCR", outlet: "ISETANN – CUBAO" },
  { id: 150, region: "NCR", outlet: "AFPCES MALACANANG" },
  { id: 151, region: "NCR", outlet: "SOUTH VALENZUELA" },
  { id: 152, region: "NCR", outlet: "ROBINSONS MEYCAUAYAN" },
  {
    id: 153,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - BINONDO",
  },
  { id: 154, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC  - GAGALANGIN" },
  { id: 155, region: "NCR", outlet: "WALTERMART SUPERMARKET, INC. - CALOOCAN" },
  { id: 156, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - LANGARAY" },
  { id: 157, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - CONCEPCION" },
  { id: 158, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - NAVOTAS" },
  { id: 159, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - CATMON" },
  { id: 160, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - BAGUMBAYAN" },
  { id: 161, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - 10TH AVE." },
  { id: 162, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - 11TH AVE." },
  {
    id: 163,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - LORETO MORNING BREEZE",
  },
  { id: 164, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - PANGHULO" },
  { id: 165, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - POLO" },
  { id: 166, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - DALANDANAN" },
  { id: 167, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - MARULAS" },
  {
    id: 168,
    region: "NCR",
    outlet: "EVERPLUS SUPERSTORE INC. - GEN.T DE LEON",
  },
  { id: 169, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - MAYSAN" },
  { id: 170, region: "NCR", outlet: "ULTRAMEGA - ARITAO" },
  { id: 171, region: "NCR", outlet: "ULTRAMEGA - CORDON" },
  { id: 172, region: "NCR", outlet: "ULTRAMEGA - SAN MATEO ISABELA" },
  { id: 173, region: "NCR", outlet: "ULTRAMEGA - MADDELA ISABELA" },
  { id: 174, region: "NCR", outlet: "ULTRAMEGA - IFUGAO" },
  { id: 175, region: "NCR", outlet: "ROBINSONS - EASTWOOD TECHNOPLAZA II" },
  { id: 176, region: "NCR", outlet: "THE MARKETPLACE - EASTWOOD" },
  { id: 177, region: "NCR", outlet: "THE MARKETPLACE - KATIPUNAN" },
  { id: 178, region: "NCR", outlet: "SHOPWISE - ARANETA CUBAO" },
  { id: 179, region: "NCR", outlet: "ROBINSONS EASYMART - FARMERS" },
  { id: 180, region: "NCR", outlet: "ROBINSONS- GATEWAY" },
  { id: 181, region: "NCR", outlet: "THE MARKETPLACE - CAPITOL" },
  { id: 182, region: "NCR", outlet: "ROBINSONS EASYMART - MAGINHAWA" },
  { id: 183, region: "NCR", outlet: "THE MARKETPLACE - CORINTHIAN" },
  { id: 184, region: "NCR", outlet: "ROBINSONS EASYMART - MANHATTAN" },
  { id: 185, region: "NCR", outlet: "ROBINSONS EASYMART - LOYOLA HEIGHTS QC" },
  { id: 186, region: "NCR", outlet: "THE MARKETPLACE - SANTOLAN" },
  { id: 187, region: "NCR", outlet: "THE MARKETPLACE - P.GUEVARRA" },
  { id: 188, region: "NCR", outlet: "ROBINSONS EASYMART - N' DOMINGO" },
  { id: 189, region: "NCR", outlet: "ROBINSONS EASYMART - P TUAZON" },
  { id: 190, region: "NCR", outlet: "THE MARKETPLACE- MAGNOLIA" },
  { id: 191, region: "NCR", outlet: "ROBINSONS PLACE - MAGNOLIA" },
  { id: 192, region: "NCR", outlet: "ROBINSONS  - BLUEWAVE MARIKINA" },
  { id: 193, region: "NCR", outlet: "ROBINSONS - GRACELAND PLAZA MARIKINA" },
  { id: 194, region: "NCR", outlet: "ROBINSONS PLACE - ANTIPOLO" },
  { id: 195, region: "NCR", outlet: "ROBINSONS EASYMART - HILL SIDE" },
  { id: 196, region: "NCR", outlet: "ROBINSON EASYMART- MARIKINA HEIGHTS" },
  { id: 197, region: "NCR", outlet: "ROBINSONS EASYMART - TUMANA" },
  { id: 198, region: "NCR", outlet: "ROBINSONS EASYMART - SANTOLAN" },
  { id: 199, region: "NCR", outlet: "THE MARKETPLACE - GROOVE" },
  { id: 200, region: "NCR", outlet: "ROBINSONS EASYMART - THE LINK" },
  { id: 201, region: "NCR", outlet: "THE MARKETPLACE - OPUS" },
  { id: 202, region: "NCR", outlet: "ROBINSONS - LUCKY GOLD PLAZA ORTIGAS" },
  { id: 203, region: "NCR", outlet: "ROBINSONS - KARANGALAN" },
  { id: 204, region: "NCR", outlet: "ROBINSONS - ACACIA ESCALADES PASIG" },
  { id: 205, region: "NCR", outlet: "ROBINSONS PLACE - METROEAST" },
  { id: 206, region: "NCR", outlet: "ROBINSONS - MERCEDES PASIG" },
  { id: 207, region: "NCR", outlet: "ROBINSONS EASYMART -C.RAYMUNDO" },
  { id: 208, region: "NCR", outlet: "ROBINSONS EASYMART -SANDOVAL" },
  { id: 209, region: "NCR", outlet: "ROBINSONS EASYMART -BINANGONAN" },
  { id: 210, region: "NCR", outlet: "SHOPWISE - ANTIPOLO" },
  { id: 211, region: "NCR", outlet: "THE MARKETPLACE - 30TH" },
  { id: 212, region: "NCR", outlet: "ROBINSONS EASYMART - ROBLU CAINTA" },
  { id: 213, region: "NCR", outlet: "ROBINSONS PLACE - CAINTA" },
  { id: 214, region: "NCR", outlet: "ROBINSONS EASYMART - HOMES ANTIPOLO" },
  { id: 215, region: "NCR", outlet: "ROBINSONS EASYMART - BARAS" },
  { id: 216, region: "NCR", outlet: "ROBINSONS EASYMART - PILILLA" },
  { id: 217, region: "NCR", outlet: "ULTRAMEGA - GUAGUA" },
  { id: 218, region: "NCR", outlet: "ULTRAMEGA - ARAYAT" },
  { id: 219, region: "NCR", outlet: "ULTRAMEGA - TARLAC" },
  { id: 220, region: "NCR", outlet: "ROBINSONS - METRO PLAZA" },
  { id: 221, region: "NCR", outlet: "ROBINSONS - ZABARTE" },
  { id: 222, region: "NCR", outlet: "EVERPLUS SUPERSTORE INC. - METRO PLAZA" },
  { id: 223, region: "NCR", outlet: "ROBINSONS - VALENZUELA" },
  { id: 224, region: "NCR", outlet: "ROBINSONS - BIGNAY VALENZUELA" },
  { id: 225, region: "NCR", outlet: "ROBINSONS - VICTORY MALL" },
  {
    id: 226,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - ARBORTOWNE VALENZUELA",
  },
  { id: 227, region: "NCR", outlet: "ROBINSONS EASYMART - TOWN CENTER" },
  { id: 228, region: "NCR", outlet: "ROBINSONS - NOVALICHES" },
  { id: 229, region: "NCR", outlet: "ROBINSONS - TOWNVILLE REGALADO FAIRVIEW" },
  { id: 230, region: "NCR", outlet: "ROBINSONS EASYMART - FAIRVIEW" },
  { id: 231, region: "NCR", outlet: "ROBINSONS EASYMART - DAHLIA" },
  { id: 232, region: "NCR", outlet: "ROBINSONS EASYMART - OLD SAUYO" },
  { id: 233, region: "NCR", outlet: "ROBINSONS - FILINVEST BATASAN HILLS" },
  { id: 234, region: "NCR", outlet: "ROBINSONS EASYMART - GENERAL AVENUE" },
  { id: 235, region: "NCR", outlet: "ROBINSONS-CULIAT" },
  { id: 236, region: "NCR", outlet: "ROBINSONS - DOÑA CARMEN" },
  { id: 237, region: "NCR", outlet: "ROBINSONS - TANDANG SORA" },
  { id: 238, region: "NCR", outlet: "ROBINSONS - CONGRESSIONAL" },
  { id: 239, region: "NCR", outlet: "ROBINSONS - CLOVERLEAF MALL." },
  { id: 240, region: "NCR", outlet: "ROBINSONS PLACE - MALABON" },
  { id: 241, region: "NCR", outlet: "ROBINSONS - MC MALABON" },
  {
    id: 242,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - METRO PLAZA B.SILANG",
  },
  {
    id: 243,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - HOLIDAY ISLAND B.SILANG",
  },
  { id: 244, region: "NCR", outlet: "ROBINSONS EASYMART - SACRED HEART" },
  { id: 245, region: "NCR", outlet: "ROBINSONS - QUIRINO HI WAY LAGRO" },
  { id: 246, region: "NCR", outlet: "ROBINSON EASYMART - NOVALICHES" },
  { id: 247, region: "NCR", outlet: "ROBINSONS - SUSANO COMPLEX NOVALICHES" },
  { id: 248, region: "NCR", outlet: "ROBINSONS EASYMART -BLOCK ONE" },
  { id: 249, region: "NCR", outlet: "ROBINSONS EASYMART - ROOSEVELT" },
  { id: 250, region: "NCR", outlet: "ROBINSONS - BANAWE" },
  { id: 251, region: "NCR", outlet: "ROBINSONS EASYMART - KAMUNING" },
  {
    id: 252,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - E. RODRIGUEZ SR. QC (PURITY)",
  },
  { id: 253, region: "NCR", outlet: "THE MARKETPLACE - TOMAS MORATO" },
  { id: 254, region: "NCR", outlet: "SHOPWISE EXPRESS - Q. AVE" },
  { id: 255, region: "NCR", outlet: "ROBINSONS - COMMONWEALTH" },
  { id: 256, region: "NCR", outlet: "ROBINSONS -  TIMOG" },
  { id: 257, region: "NCR", outlet: "ROBINSONS - MONTALBAN TOWNCENTER" },
  { id: 258, region: "NCR", outlet: "ROBINSONS EASYMART -BIRMINGHAM" },
  { id: 259, region: "NCR", outlet: "ROBINSONS EASYMART - KAMBAL ROAD" },
  { id: 260, region: "NCR", outlet: "ROBINSONS EASYMART - SAN MATEO" },
  { id: 261, region: "NCR", outlet: "ULTRAMEGA - BALIUAG HIGHWAY" },
  { id: 262, region: "NCR", outlet: "ULTRAMEGA - BALIUAG BAYAN" },
  { id: 263, region: "NCR", outlet: "ROBINSONS PLACE - GALLERIA" },
  { id: 264, region: "NCR", outlet: "THE MARKETPLACE - SAN ANTONIO" },
  { id: 265, region: "NCR", outlet: "THE MARKETPLACE - UPTOWN" },
  { id: 266, region: "NCR", outlet: "THE MARKETPLACE - BGC" },
  { id: 267, region: "NCR", outlet: "ROBINSONS EASYMART - STAMFORD" },
  {
    id: 268,
    region: "NCR",
    outlet: "METRO RETAILS STORES GROUP, INC. - MARKET MARKET -2",
  },
  { id: 269, region: "NCR", outlet: "ROBINSONS - VENICE GRAND MCKINLEY." },
  { id: 270, region: "NCR", outlet: "ROBINSONS - 8 FORBES TOWN ROAD TAGUIG." },
  { id: 271, region: "NCR", outlet: "ROBINSONS - CALIFORNIA MANDALUYONG" },
  { id: 272, region: "NCR", outlet: "THE MARKETPLACE- SHANGRI-LA" },
  { id: 273, region: "NCR", outlet: "ROBINSONS EASYMART - BONI" },
  { id: 274, region: "NCR", outlet: "ROBINSONS PLACE - ERMITA-1" },
  { id: 275, region: "NCR", outlet: "ROBINSONS PLACE - ERMITA-2" },
  { id: 276, region: "NCR", outlet: "ROBINSONS - TUTUBAN CENTERMALL" },
  { id: 277, region: "NCR", outlet: "ROBINSON PLACE - OTIS" },
  { id: 278, region: "NCR", outlet: "ROBINSONS - TOWNVILLE BF PARANAQUE" },
  { id: 279, region: "NCR", outlet: "ROBINSONS - BF AGUIRRE" },
  { id: 280, region: "NCR", outlet: "ROBINSONS - WOODSVILLE MERVILLE" },
  { id: 281, region: "NCR", outlet: "ROBINSONS EASYMART - BETTERLIVING" },
  { id: 282, region: "NCR", outlet: "ROBINSONS - FEDERAL BAY GARDEN PASAY" },
  { id: 283, region: "NCR", outlet: "ROBINSONS EASYMART - ARNAIZ" },
  { id: 284, region: "NCR", outlet: "ROBINSONS EASYMART -  METRO POINT TAFT" },
  { id: 285, region: "NCR", outlet: "ROBINSONS PLACE - LAS PINAS" },
  { id: 286, region: "NCR", outlet: "ROBINSONS EASYMART - NAGA ROAD" },
  { id: 287, region: "NCR", outlet: "ROBINSONS - SOUTHPARK MALL ALABANG" },
  { id: 288, region: "NCR", outlet: "ROBINSONS - MADISON GALERIES MUNTINLUPA" },
  { id: 289, region: "NCR", outlet: "THE MARKETPLACE - EASTBAY" },
  { id: 290, region: "NCR", outlet: "SHOPWISE - SUCAT" },
  { id: 291, region: "NCR", outlet: "ROBINSONS EASYMART - ALABANG HILLS" },
  { id: 292, region: "NCR", outlet: "SHOPWISE - ALABANG" },
  { id: 293, region: "NCR", outlet: "THE MARKETPLACE - AYALA ALABANG" },
  { id: 294, region: "NCR", outlet: "ROBINSONS EASYMART -BF RESORT LP" },
  { id: 295, region: "NCR", outlet: "ROBINSONS EASYMART -MARCOS ALVAREZ" },
  { id: 296, region: "NCR", outlet: "ROBINSONS EASYMART - SAN LORENZO" },
  { id: 297, region: "NCR", outlet: "THE MARKET PLACE - MAGALLANES" },
  { id: 298, region: "NCR", outlet: "ROBINSONS EASYMART - PEMBO MAKATI" },
  { id: 299, region: "NCR", outlet: "ROBINSONS EASYMART - PATEROS" },
  { id: 300, region: "NCR", outlet: "THE MARKETPLACE - CENTURY" },
  { id: 301, region: "NCR", outlet: "THE MARKET PLACE - MAKATI" },
  { id: 302, region: "NCR", outlet: "THE MARKETPLACE - ROCKWELL" },
  { id: 303, region: "NCR", outlet: "SHOPWISE - MAKATI" },
  { id: 304, region: "NCR", outlet: "SHOPWISE - CIRCUIT" },
  { id: 305, region: "NCR", outlet: "ROBINSONS EASYMART - MAKATI" },
  { id: 306, region: "NCR", outlet: "THE MARKETPLACE - ALPHALAND" },
  { id: 307, region: "NCR", outlet: "THE MARKETPLACE - PASEO DE ROXAS" },
  { id: 308, region: "NCR", outlet: "THE MARKETPLACE - TWO CENTRAL" },
  { id: 309, region: "NCR", outlet: "MERRYMART DOUBLE DRAGON" },
  { id: 310, region: "NCR", outlet: "THE MARKETPLACE - METLIVE" },
  { id: 311, region: "NCR", outlet: "THE MARKETPLACE - PARQAL" },
  {
    id: 312,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - MARIPOSA ARCADE KAPASIGAN",
  },
  { id: 313, region: "NCR", outlet: "ROBINSONS EASYMART - STO TOMAS PASIG" },
  { id: 314, region: "NCR", outlet: "ROBINSONS EASYMART -ONE MERCEDES" },
  { id: 315, region: "NCR", outlet: "ROBINSONS EASYMART -AMAIA" },
  { id: 316, region: "NCR", outlet: "ULTRAMEGA - CANDABA" },
  { id: 317, region: "NCR", outlet: "ULTRAMEGA - BALIBAGO" },
  { id: 318, region: "NCR", outlet: "ROBINSONS-DON ANTONIO" },
  {
    id: 319,
    region: "NCR",
    outlet: "ROBINSONS EASYMART - THE EMERALD COURT PROJECT 6",
  },
  { id: 320, region: "NCR", outlet: "ROBINSONS-MIRANILA" },
  { id: 321, region: "NCR", outlet: "ULTRAMEGA - BALAGTAS" },
  { id: 322, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MALANDAY" },
  { id: 323, region: "NCR", outlet: "ULTRAMEGA - SAPANG PALAY" },
  { id: 324, region: "NCR", outlet: "ULTRAMEGA - SAN MIGUEL" },
  { id: 325, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TAYUMAN-2" },
  { id: 326, region: "NCR", outlet: "PUREGOLD PRICE CLUB - GAGALANGIN" },
  { id: 327, region: "NCR", outlet: "PUREGOLD PRICE CLUB - DV HERBOSA" },
  { id: 328, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MALABON" },
  { id: 329, region: "NCR", outlet: "PUREGOLD PRICE CLUB - NAVOTAS" },
  { id: 330, region: "NCR", outlet: "PUREGOLD PRICE CLUB - C. RAYMUNDO" },
  { id: 331, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MAYPAJO" },
  { id: 332, region: "NCR", outlet: "PUREGOLD PRICE CLUB - 999" },
  { id: 333, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- JUAN LUNA" },
  { id: 334, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- V. MAPA" },
  { id: 335, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- PUREZA" },
  { id: 336, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LANGARAY" },
  { id: 337, region: "NCR", outlet: "PUREGOLD PRICE CLUB (MINIMART.)- LIBIS" },
  { id: 338, region: "NCR", outlet: "PUREGOLD PRICE CLUB - 999 CALOOCAN" },
  {
    id: 339,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - ORTIGAS AVE EXT PASIG (G)",
  },
  { id: 340, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LIGAYA" },
  {
    id: 341,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BLUMENTRITT CGH",
  },
  { id: 342, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BLUMENTRITT" },
  { id: 343, region: "NCR", outlet: "PUREGOLD PRICE CLUB - AGORA" },
  { id: 344, region: "NCR", outlet: "PUREGOLD PRICE CLUB - STA.MESA" },
  { id: 345, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MONUMENTO" },
  { id: 346, region: "NCR", outlet: "PUREGOLD PRICE CLUB - KALENTONG 1" },
  { id: 347, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SHAW-1" },
  { id: 348, region: "NCR", outlet: "PUREGOLD-DV SAN MIGUEL PASIG" },
  { id: 349, region: "NCR", outlet: "PUREGOLD-SIKAP MINIMART" },
  { id: 350, region: "NCR", outlet: "PUREGOLD - AGLIPAY" },
  { id: 351, region: "NCR", outlet: "PUREGOLD-BARRANCA MINIMART" },
  { id: 352, region: "NCR", outlet: "PUREGOLD-PRIMO CRUZ MINIMART" },
  { id: 353, region: "NCR", outlet: "PUREGOLD PRICE CLUB - DIVISORIA" },
  {
    id: 354,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MALINAO PASIG",
  },
  { id: 355, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- MERCEDEZ" },
  { id: 356, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- ESPANA" },
  { id: 357, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- BUSTILLOS" },
  { id: 358, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- ROSARIO" },
  { id: 359, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- DE CASTRO" },
  { id: 360, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TAYUMAN-1" },
  { id: 361, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PASIG" },
  { id: 362, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- ZURBARAN" },
  { id: 363, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- 3RD AVE" },
  { id: 364, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CALOOCAN" },
  { id: 365, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- DOROTEO JOSE" },
  { id: 366, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- CARRIEDO" },
  { id: 367, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CUBAO-2" },
  { id: 368, region: "NCR", outlet: "PUREGOLD PRICE CLUB - Q.I -2" },
  { id: 369, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- WEST AVE." },
  { id: 370, region: "NCR", outlet: "PUREGOLD PRICE CLUB (EXTRA)- PHILAM" },
  { id: 371, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CUBAO-1" },
  { id: 372, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SUSANO" },
  { id: 373, region: "NCR", outlet: "PUREGOLD PRICE CLUB - NITANG" },
  { id: 374, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- KALAYAAN" },
  { id: 375, region: "NCR", outlet: "PUREGOLD PRICE CLUB - COMMONWEALTH-2" },
  { id: 376, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- KARUHATAN" },
  { id: 377, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- MALINTA" },
  { id: 378, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- BALARA" },
  { id: 379, region: "NCR", outlet: "PUREGOLD PRICE CLUB - VISAYAS" },
  {
    id: 380,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TANDANG SORA",
  },
  { id: 381, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BAESA" },
  { id: 382, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CROSSROAD" },
  {
    id: 383,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- QUIRINO HI WAY",
  },
  {
    id: 384,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH",
  },
  { id: 385, region: "NCR", outlet: "PUREGOLD PRICE CLUB - KANLAON" },
  { id: 386, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- DEL MONTE" },
  {
    id: 387,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- A. BONIFACIO",
  },
  { id: 388, region: "NCR", outlet: "PUREGOLD PRICE CLUB - DEPARO" },
  { id: 389, region: "NCR", outlet: "PUREGOLD PRICE CLUB - Q.I -1" },
  { id: 390, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PASO DE BLAS- 2" },
  { id: 391, region: "NCR", outlet: "PUREGOLD - GEN T. DE LEON" },
  { id: 392, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PASO DE BLAS- 1" },
  { id: 393, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CAMARIN" },
  { id: 394, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CHAMPACA" },
  { id: 395, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BALINTAWAK" },
  { id: 396, region: "NCR", outlet: "PUREGOLD PRICE CLUB - NOVALICHES" },
  { id: 397, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- ZABARTE" },
  { id: 398, region: "NCR", outlet: "PUREGOLD PRICE CLUB - VALENZUELA-1" },
  { id: 399, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MINDANAO AVE" },
  { id: 400, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LANGIT ROAD" },
  { id: 401, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BAGONG SILANG" },
  { id: 402, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BAGUMBONG" },
  { id: 403, region: "NCR", outlet: "PUREGOLD PRICE CLUB - ZABARTE" },
  {
    id: 406,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MOTHER IGNACIA",
  },
  { id: 407, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- TIMOG" },
  { id: 408, region: "NCR", outlet: "PUREGOLD PRICE CLUB - Q. AVE" },
  { id: 409, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TERRACES" },
  { id: 410, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- DON ANTONIO" },
  { id: 411, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CULIAT" },
  { id: 412, region: "NCR", outlet: "PUREGOLD PRICE CLUB - COMMONWEALTH-1" },
  { id: 413, region: "NCR", outlet: "ULTRAMEGA - NAIC" },
  { id: 414, region: "NCR", outlet: "ULTRAMEGA - CANLUBANG 2" },
  { id: 415, region: "NCR", outlet: "ULTRAMEGA -  CABUYAO MAMATID" },
  { id: 416, region: "NCR", outlet: "ULTRAMEGA - CANLUBANG 1" },
  { id: 417, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- PANDACAN" },
  { id: 418, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- BOCOBO" },
  { id: 419, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MAKATI-2" },
  { id: 420, region: "NCR", outlet: "PUREGOLD PRICE CLUB (EXTRA.)- OSMENA" },
  { id: 421, region: "NCR", outlet: "PUREGOLD PRICE CLUB - KALENTONG 2" },
  { id: 422, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- LIBERTAD" },
  { id: 423, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SKY REGENCY" },
  { id: 424, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LAS PINAS" },
  { id: 425, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- TIPAS" },
  { id: 426, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- USUSAN" },
  {
    id: 427,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TAGUIG HAGONOY",
  },
  { id: 428, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MOONWALK" },
  { id: 429, region: "NCR", outlet: "PUREGOLD MINIMART - DONA SOLEDAD" },
  { id: 430, region: "NCR", outlet: "PUREGOLD PRICE CLUB - REMANVILLE" },
  { id: 431, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- BACLARAN" },
  { id: 432, region: "NCR", outlet: "PUREGOLD - 88 SQUARE PARANAQUE" },
  { id: 433, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- BF HOMES" },
  { id: 434, region: "NCR", outlet: "PUREGOLD PRICE CLUB - AGUIRRE" },
  { id: 435, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SOUTHGATE" },
  { id: 437, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MALATE" },
  {
    id: 438,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BETTER LIVING",
  },
  { id: 439, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TAGUIG" },
  { id: 440, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LIBERTAD-2" },
  { id: 441, region: "NCR", outlet: "PUREGOLD PRICE CLUB - FTI" },
  { id: 442, region: "NCR", outlet: "PUREGOLD-PILAR VILLAGE" },
  { id: 443, region: "NCR", outlet: "PUREGOLD-GOLDEN ACRES" },
  { id: 444, region: "NCR", outlet: "PUREGOLD-MONTILLANO" },
  { id: 445, region: "NCR", outlet: "PUREGOLD-BAYANAN EXTRA" },
  { id: 446, region: "NCR", outlet: "PUREGOLD PRICE CLUB - MAKATI-1" },
  { id: 447, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PACO" },
  { id: 448, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SUCAT" },
  { id: 449, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PULANG LUPA DOS" },
  { id: 450, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LIBERTAD" },
  { id: 451, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SAN ANTONIO" },
  { id: 452, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SAN DIONISIO" },
  { id: 453, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PARANAQUE-1" },
  {
    id: 454,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ZAPOTE ARCADE",
  },
  { id: 455, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PULANG LUPA UNO" },
  { id: 456, region: "NCR", outlet: "PUREGOLD-BAMBOO ORGAN" },
  { id: 457, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CASIMIRO" },
  {
    id: 458,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - MARCOS ALVAREZ LAS PINAS",
  },
  { id: 459, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SOUTHPARK" },
  { id: 460, region: "NCR", outlet: "PUREGOLD PRICE CLUB - JUNCTION" },
  { id: 461, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TANAY" },
  { id: 462, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TAYTAY" },
  { id: 463, region: "NCR", outlet: "PUREGOLD PRICE CLUB - ANTIPOLO" },
  { id: 464, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- ANTIPOLO" },
  { id: 465, region: "NCR", outlet: "PUREGOLD PRICE CLUB - KASIGLAHAN" },
  {
    id: 466,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - SAN ISIDRO MONTALBAN",
  },
  { id: 467, region: "NCR", outlet: "PUREGOLD PRICE CLUB -MONTALBAN" },
  { id: 468, region: "NCR", outlet: "PUREGOLD PRICE CLUB (EXTRA.)- AMPID" },
  {
    id: 469,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- GUITNANG BAYAN",
  },
  { id: 470, region: "NCR", outlet: "PUREGOLD PRICE CLUB - GULOD MALAYA" },
  { id: 471, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TAYTAY FLOODWAY" },
  { id: 472, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- TAYTAY ANNEX" },
  {
    id: 473,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - AMPID SAN MATEO (G)",
  },
  { id: 474, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TAYTAY -2" },
  {
    id: 475,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - PAG ASA BINANGONAN (G)",
  },
  { id: 476, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BINANGONAN" },
  { id: 477, region: "NCR", outlet: "PUREGOLD-DV TAYTAY" },
  { id: 478, region: "NCR", outlet: "PUREGOLD-DV SAN ISIDRO TAYTAY" },
  { id: 479, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- NANGKA" },
  { id: 480, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- BATASAN" },
  {
    id: 481,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ORTIGAS EXT EAST SUMMIT",
  },
  {
    id: 482,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA) - BROOKSIDE CAINTA",
  },
  {
    id: 483,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB -SUPERPALENGKE, ANTIPOLO (G)",
  },
  { id: 484, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- PAROLA" },
  {
    id: 485,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAYTAY PALENGKE",
  },
  { id: 486, region: "NCR", outlet: "PUREGOLD PRICE CLUB - Q. PLAZA" },
  { id: 487, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SAN RAFAEL" },
  {
    id: 488,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DULONG BAYAN SAN MATEO",
  },
  { id: 489, region: "NCR", outlet: "PUREGOLD PRICE CLUB - BURGOS MONTALBAN" },
  { id: 490, region: "NCR", outlet: "PUREGOLD PRICE CLUB - CONCEPCION" },
  { id: 491, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- CONCEPCION" },
  { id: 492, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- LILAC" },
  { id: 493, region: "NCR", outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PANORAMA" },
  {
    id: 494,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - CIRCUMFERENTIAL ROAD",
  },
  { id: 495, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TERESA" },
  { id: 496, region: "NCR", outlet: "PUREGOLD PRICE CLUB - EXTRA COGEO" },
  { id: 497, region: "NCR", outlet: "PUREGOLD PRICE CLUB - EASTLAND" },
  { id: 498, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SUMULONG" },
  {
    id: 499,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- STA. ELENA",
  },
  {
    id: 500,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - AYALA MALL MARIKINA",
  },
  { id: 501, region: "NCR", outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PARANG" },
  { id: 502, region: "NCR", outlet: "PUREGOLD PRICE CLUB - ANGONO" },
  {
    id: 503,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO HIGH WAY",
  },
  {
    id: 504,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO BAYAN",
  },
  { id: 505, region: "NCR", outlet: "PUREGOLD PRICE CLUB - SAN MATEO BANABA" },
  { id: 506, region: "NCR", outlet: "PUREGOLD PRICE CLUB (JR.)- MARIKINA" },
  { id: 507, region: "NCR", outlet: "ULTRAMEGA - TAGAYTAY" },
  { id: 508, region: "NCR", outlet: "ULTRAMEGA - PALIPARAN" },
  { id: 509, region: "NCR", outlet: "ULTRAMEGA - GEN. TRIAS" },
  { id: 510, region: "NCR", outlet: "ULTRAMEGA - PADRE GARCIA" },
  { id: 511, region: "NCR", outlet: "ULTRAMEGA - TANAUAN" },
  { id: 512, region: "NCR", outlet: "ULTRAMEGA - LEMERY" },
  { id: 513, region: "NCR", outlet: "ULTRAMEGA - ROSARIO" },
  { id: 514, region: "NCR", outlet: "PUREGOLD PRICE CLUB - LAS PINAS 2" },
  { id: 515, region: "NCR", outlet: "PUREGOLD PRICE CLUB - TS CRUZ" },
  {
    id: 516,
    region: "NCR",
    outlet: "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH 2",
  },
  { id: 517, region: "NCR", outlet: "PUREGOLD PRICE CLUB - PAYATAS" },
  { id: 518, region: "NCR", outlet: "LANDMARK - BGC" },
  { id: 520, region: "NCR", outlet: "TROPICAL HUT - PANAY" },
  { id: 521, region: "NCR", outlet: "STA LUCIA - PHASE3" },
  { id: 522, region: "NCR", outlet: "STA LUCIA - PHASE1" },
  { id: 523, region: "NCR", outlet: "PIONEER CENTRE- PIONEER PASIG" },
  { id: 524, region: "NCR", outlet: "FISHERMALL Q. AVENUE" },
  { id: 525, region: "NCR", outlet: "HI-TOP SUPERMARKET - Q.AVE." },
  { id: 526, region: "NCR", outlet: "HI-TOP SUPERMARKET - AURORA BLVD" },
  { id: 527, region: "NCR", outlet: "FISHERMALL MALABON" },
  {
    id: 528,
    region: "CAR",
    outlet: "PUREGOLD PRICE CLUB - LA TRINIDAD BENGUET",
  },
  { id: 529, region: "CAR", outlet: "PUREGOLD PRICE CLUB - BAGUIO" },
  { id: 530, region: "CAR", outlet: "ROBINSONS - PORTA VAGA MALL BAGUIO" },
  { id: 531, region: "CAR", outlet: "THE MARKETPLACE - BAGUIO" },
  { id: 532, region: "CAR", outlet: "PUREGOLD PRICE CLUB - BURNHAM PARK" },
  { id: 533, region: "CAR", outlet: "PUREGOLD PRICE CLUB (JR.)- BAKAKENG" },
  { id: 534, region: "REGION 1", outlet: "ROBINSONS - XENTRO MALL VIGAN" },
  { id: 535, region: "REGION 1", outlet: "ROBINSONS PLACE - PANGASINAN" },
  { id: 536, region: "REGION 1", outlet: "ROBINSONS - NEPOMALL DAGUPAN" },
  {
    id: 537,
    region: "REGION 1",
    outlet: "ROBINSONS - SAN CARLOS TOWN CENTER PANGASINAN",
  },
  { id: 538, region: "REGION 1", outlet: "ROBINSONS -LA UNION" },
  { id: 539, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - VIGAN" },
  { id: 540, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - LA UNION" },
  { id: 541, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - BACNOTAN" },
  { id: 542, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - CALASIAO" },
  { id: 543, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - MANAOAG" },
  { id: 544, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - SAN FABIAN" },
  { id: 545, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB (JR.)- BONUAN" },
  { id: 546, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - MAYOMBO" },
  {
    id: 547,
    region: "REGION 1",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BAYAMBANG",
  },
  { id: 548, region: "REGION 1", outlet: "SUPER 8 - URDANETA" },
  { id: 549, region: "REGION 1", outlet: "SUPER 8 - MANAOAG" },
  { id: 550, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB URDANETA" },
  { id: 551, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - VILLASIS" },
  { id: 552, region: "REGION 1", outlet: "PUREGOLD-MANGATAREM" },
  { id: 553, region: "REGION 1", outlet: "PUREGOLD PRICE CLUB - LAOAG" },
  { id: 554, region: "REGION 1", outlet: "ROBINSON - ILOCOS" },
  { id: 555, region: "REGION 1", outlet: "GEN. TRADE - ERGO SUPERMARKET" },
  { id: 556, region: "REGION 1", outlet: "GEN. TRADE - JTC SUPERMARKET" },
  { id: 557, region: "REGION 1", outlet: "GEN. TRADE - ROSE GROCERY" },
  { id: 558, region: "REGION 1", outlet: "GEN. TRADE JELRA SUPERMARKET" },
  { id: 559, region: "REGION 1", outlet: "GEN. TRADE BAMBI SUPERMARKET" },
  { id: 560, region: "REGION 2", outlet: "ROBINSONS - TALAVERA SQUARE ILAGAN" },
  { id: 561, region: "REGION 2", outlet: "ROBINSONS PLACE - SANTIAGO" },
  { id: 562, region: "REGION 2", outlet: "ROBINSONS - ALICIA" },
  {
    id: 563,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB (JR.)- OLD CENTRO",
  },
  { id: 564, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - CABATUAN" },
  {
    id: 565,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - ROXAS ISABELA",
  },
  { id: 566, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - TUMAUINI" },
  {
    id: 567,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TUGUEGARAO",
  },
  { id: 568, region: "REGION 2", outlet: "ROBINSONS TUGUEGARAO" },
  { id: 569, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - BUNTUN" },
  {
    id: 570,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E)",
  },
  {
    id: 571,
    region: "REGION 2",
    outlet: "PUREGOLD PRICE CLUB - SANTIAGO HIGHWAY",
  },
  { id: 572, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - ILAGAN" },
  { id: 573, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - ALIBAGU" },
  { id: 574, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - APPARI" },
  { id: 575, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - LAL-LO" },
  { id: 576, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - TUAO" },
  { id: 577, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - SOLANA" },
  { id: 578, region: "REGION 2", outlet: "PUREGOLD-ALLACAPAN" },
  { id: 579, region: "REGION 2", outlet: "PUREGOLD PRICE CLUB - TABUK" },
  { id: 580, region: "REGION 2", outlet: "GEN. TRADE - LAIDAS CEDRON GROCERY" },
  { id: 581, region: "REGION 2", outlet: "GEN. TRADE UP TO DATE GROCERY" },
  { id: 582, region: "REGION 2", outlet: "GEN. TRADE MELBA GROCERY" },
  { id: 583, region: "REGION 3", outlet: "SUPER 8 - BALANGA" },
  {
    id: 584,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - BALANGA BATAAN",
  },
  {
    id: 585,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - ARAYAT",
  },
  {
    id: 586,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ARAYAT PAMPANGA",
  },
  { id: 587, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MEXICO" },
  { id: 588, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB -CANDABA" },
  { id: 589, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MASANTOL" },
  {
    id: 590,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MACABEBE",
  },
  { id: 591, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - SAN SIMON" },
  {
    id: 592,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- APALIT",
  },
  {
    id: 593,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SF 2 CAFÉ FERNANDINO",
  },
  {
    id: 594,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- STO.TOMAS",
  },
  { id: 595, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - BULAON" },
  {
    id: 596,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SF 1 DOLORES",
  },
  { id: 597, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB -DUTY FREE" },
  { id: 598, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - FERTUNA" },
  { id: 599, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - DINALUPIHAN" },
  { id: 600, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- ORANI" },
  { id: 601, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- HERMOSA" },
  { id: 602, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- LUBAO" },
  { id: 603, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- PORAC" },
  { id: 604, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- GUAGUA" },
  { id: 605, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- SASMUAN" },
  { id: 606, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MARIVELES" },
  { id: 607, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - LIMAY" },
  { id: 608, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - BALANGA" },
  { id: 609, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- ABUCAY" },
  { id: 611, region: "REGION 3", outlet: "ROBINSONS IBA, ZAMBALES (.50)" },
  { id: 612, region: "REGION 3", outlet: "ROYAL DUTY FREE 1" },
  { id: 613, region: "REGION 3", outlet: "ROYAL DUTY FREE 2" },
  { id: 614, region: "REGION 3", outlet: "ROBINSONS EASYMART - CUTCUT" },
  { id: 615, region: "REGION 3", outlet: "ROBINSONS EASYMART - PIO" },
  { id: 616, region: "REGION 3", outlet: "ROBINSONS EASYMART - EPL" },
  { id: 617, region: "REGION 3", outlet: "ROBINSONS EASYMART - FIL AM" },
  { id: 618, region: "REGION 3", outlet: "ROBINSONS PLACE - PAMPANGA" },
  { id: 619, region: "REGION 3", outlet: "ROBINSONS - DOLORES SAN FERNANDO" },
  { id: 620, region: "REGION 3", outlet: "ROBINSONS EASYMART - SOLANA" },
  { id: 621, region: "REGION 3", outlet: "ROBINSONS - GUAGUA TOWNCENTER" },
  { id: 622, region: "REGION 3", outlet: "ROBINSONS EASYMART - CAPITOL" },
  {
    id: 623,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CROWN BLDG. STO. TOMAS",
  },
  { id: 624, region: "REGION 3", outlet: "SHOPWISE - SAN FERNANDO" },
  { id: 625, region: "REGION 3", outlet: "ROBINSONS EASYMART - SAN SIMON" },
  { id: 626, region: "REGION 3", outlet: "ROBINSONS EASYMART - ORANI BATAAN" },
  { id: 627, region: "REGION 3", outlet: "ROBINSONS EASYMART - HERMOSA" },
  { id: 628, region: "REGION 3", outlet: "PUREGOLD-TUGATOG" },
  { id: 629, region: "REGION 3", outlet: "PUREGOLD DV - ORANI" },
  { id: 630, region: "REGION 3", outlet: "PUREGOLD-BACOLOR" },
  { id: 631, region: "REGION 3", outlet: "PUREGOLD-SAN AGUSTIN" },
  { id: 632, region: "REGION 3", outlet: "PUREGOLD-DV MORONG" },
  { id: 633, region: "REGION 3", outlet: "SUPER 8 - GUAGUA" },
  { id: 634, region: "REGION 3", outlet: "SUPER 8 - ANGELES" },
  { id: 635, region: "REGION 3", outlet: "SUPER 8 - TARLAC 2" },
  {
    id: 636,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - CONCEPCION",
  },
  {
    id: 637,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - PANIQUI",
  },
  {
    id: 638,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - CAPAS",
  },
  { id: 639, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - DAU" },
  { id: 640, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - DAU 2" },
  { id: 641, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MABALACAT" },
  { id: 642, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MAWAQUE" },
  { id: 643, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - CENTRAL TOWN" },
  { id: 644, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - PANDAN" },
  {
    id: 645,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MAGALANG PAMPANGA",
  },
  {
    id: 646,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ANGELES - MAGALANG ROAD EPZA",
  },
  { id: 647, region: "REGION 3", outlet: "ROBINSONS -NEPOMALL ANGELES" },
  { id: 648, region: "REGION 3", outlet: "ROBINSONS PLACE - ANGELES" },
  {
    id: 649,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMRT - FRIENDSHIP ANGELES",
  },
  { id: 650, region: "REGION 3", outlet: "ROBINSONS PLACE - TARLAC" },
  { id: 651, region: "REGION 3", outlet: "ROBINSONS EASYMART LIGTASAN TARLAC" },
  {
    id: 652,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SAN VICENTE TARLAC",
  },
  { id: 653, region: "REGION 3", outlet: "ROBINSONS - METROTOWN TARLAC" },
  { id: 654, region: "REGION 3", outlet: "ROBINSONS - TAÑEDO TARLAC" },
  { id: 655, region: "REGION 3", outlet: "ROBINSONS - XEVERA MABALACAT" },
  {
    id: 656,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CONCEPCION TARLAC",
  },
  { id: 657, region: "REGION 3", outlet: "ROBINSONS EASYMART - BAMBAN TARLAC" },
  { id: 658, region: "REGION 3", outlet: "ROBINSONS EASYMART - MATATALAIB" },
  { id: 659, region: "REGION 3", outlet: "ROBINSONS EASYMART - MARKET CITY" },
  {
    id: 660,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - SAN SEBASTIAN TARLAC",
  },
  { id: 661, region: "REGION 3", outlet: "ROBINSONS EASYMART - STARHOMES" },
  { id: 662, region: "REGION 3", outlet: "ROBINSONS EASYMART - PANDAN" },
  { id: 663, region: "REGION 3", outlet: "ROBINSONS - GCC MEXICO" },
  { id: 664, region: "REGION 3", outlet: "ROBINSONS EASYMART - MAGALANG" },
  {
    id: 665,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - PULUNG CACUTUD",
  },
  {
    id: 666,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CONCEPCION TARLAC",
  },
  {
    id: 667,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PALM PLAZA",
  },
  { id: 668, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - PANIQUI" },
  {
    id: 669,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PUBLIC MARKET",
  },
  {
    id: 670,
    region: "REGION 3",
    outlet: "EVERPLUS SUPERSTORE INC. - SAPANG PALAY",
  },
  { id: 671, region: "REGION 3", outlet: "EVERPLUS SUPERSTORE INC. - MUZON" },
  { id: 673, region: "REGION 3", outlet: "ROBINSONS-EASYMART SKYLINE" },
  { id: 674, region: "REGION 3", outlet: "ROBINSONS EASYMART-POBLACION" },
  { id: 675, region: "REGION 3", outlet: "SUPER 8 - MALOLOS" },
  { id: 676, region: "REGION 3", outlet: "SUPER 8 - HAGONOY" },
  { id: 677, region: "REGION 3", outlet: "SUPER 8 - PULILAN" },
  { id: 678, region: "REGION 3", outlet: "SOUTH MALOLOS" },
  {
    id: 679,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - GUIGUINTO",
  },
  {
    id: 680,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - MALOLOS",
  },
  {
    id: 681,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - BALIUAG",
  },
  {
    id: 682,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TUNGKONG MANGGA",
  },
  {
    id: 683,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SAPANG PALAY , SAMPOL",
  },
  {
    id: 684,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TABANG GUIGUINTO",
  },
  {
    id: 685,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CALVARIO",
  },
  { id: 686, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- CAMALIG" },
  { id: 687, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - PLARIDEL" },
  { id: 688, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MAUNLAD" },
  {
    id: 689,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MALOLOS JUNCTION",
  },
  {
    id: 690,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - GUINGUINTO BAYAN",
  },
  {
    id: 691,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - BULAKAN,BULAKAN",
  },
  { id: 692, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - STA.MARIA" },
  {
    id: 693,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - STA.MARIA BAYAN",
  },
  { id: 694, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)- PANDI" },
  { id: 695, region: "REGION 3", outlet: "PUREGOLD-DV PANDI" },
  { id: 696, region: "REGION 3", outlet: "PUREGOLD DV - BUNSURAN" },
  { id: 697, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - BOCAUE" },
  { id: 698, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - CASA CECILIA" },
  { id: 699, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - LIAS MARILAO" },
  {
    id: 700,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - TALAVERA",
  },
  {
    id: 701,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - SUBIC ZAMBALES",
  },
  { id: 702, region: "REGION 3", outlet: "SOUTH SUPERMARKET - PAMPANGA" },
  { id: 703, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - SINDALAN" },
  { id: 704, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - SUBIC" },
  { id: 705, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - OLONGAPO" },
  { id: 706, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - CASTILLEJOS" },
  {
    id: 707,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - PAMPANGA",
  },
  {
    id: 708,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DAU ACCESS ROAD",
  },
  {
    id: 709,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DON JUICO",
  },
  { id: 710, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - ANGELES" },
  { id: 711, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB (JR.)-BALIBAGO" },
  { id: 712, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - CAPAS" },
  {
    id: 713,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - PLARIDEL",
  },
  {
    id: 714,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE DEL MONTE PALMERA",
  },
  {
    id: 715,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MEYCAUAYAN BANGA",
  },
  { id: 716, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - OBANDO" },
  { id: 717, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - BALIWAG" },
  { id: 718, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - BUSTOS" },
  {
    id: 719,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - TANGOS BALIWAG",
  },
  {
    id: 720,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - DRT HI-WAY (N.E)",
  },
  {
    id: 721,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - HAGONOY BULACAN",
  },
  { id: 722, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - PAOMBONG" },
  { id: 723, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MALOLOS" },
  { id: 724, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - ALIW" },
  {
    id: 725,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - MARILAO PLAZA CECILIA",
  },
  {
    id: 726,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LOMA DE GATO",
  },
  { id: 727, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MUZON" },
  { id: 728, region: "REGION 3", outlet: "PUREGOLD-CALUMPIT" },
  { id: 729, region: "REGION 3", outlet: "PUREGOLD-DV PULILAN" },
  { id: 730, region: "REGION 3", outlet: "PUREGOLD DV-TUKTUKAN GUIGUINTO" },
  {
    id: 731,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - GAPAN",
  },
  {
    id: 732,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - CABANATUAN",
  },
  {
    id: 733,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - SAN JOSE",
  },
  { id: 734, region: "REGION 3", outlet: "SUPER 8 - SAPANG PALAY" },
  { id: 735, region: "REGION 3", outlet: "SUPER 8 - STA MARIA" },
  {
    id: 736,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - STA MARIA",
  },
  {
    id: 737,
    region: "REGION 3",
    outlet: "WALTERMART SUPERMARKET, INC. - ALTARAZA",
  },
  { id: 738, region: "REGION 3", outlet: "ROBINSONS EASYMART - HAGONOY" },
  { id: 739, region: "REGION 3", outlet: "ROBINSONS EASYMART - CALUMPIT" },
  {
    id: 740,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - CASA ALSELMO MALOLOS",
  },
  { id: 741, region: "REGION 3", outlet: "ROBINSONS PLACE - MALOLOS" },
  { id: 742, region: "REGION 3", outlet: "ROBINSONS - PULILAN" },
  { id: 743, region: "REGION 3", outlet: "ROBINSONS - BALAGTAS" },
  { id: 744, region: "REGION 3", outlet: "ROBINSONS SUPERMARKET - SAN MIGUEL" },
  { id: 745, region: "REGION 3", outlet: "ROBINSONS EASYMART - SAN MIGUEL" },
  {
    id: 747,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN MIGUEL BULACAN",
  },
  {
    id: 748,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN ILDEFONSO",
  },
  { id: 749, region: "REGION 3", outlet: "ROBINSONS - TOWNVILLE CABANATUAN" },
  {
    id: 750,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - RIZAL NUEVA ECIJA",
  },
  {
    id: 751,
    region: "REGION 3",
    outlet: "ROBINSONS EASYMART - GUIMBA NUEVA ECIJA",
  },
  { id: 752, region: "REGION 3", outlet: "ROBINSONS - GAPAN" },
  { id: 753, region: "REGION 3", outlet: "ROBINSONS EASYMART - MUNOZ" },
  { id: 754, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - CABANATUAN" },
  { id: 755, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - ZARAGOZA" },
  { id: 756, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB-CABIAO" },
  { id: 757, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB-DV ALIAGA" },
  { id: 758, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - BALER (N.E)" },
  { id: 759, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - MARIA AURORA" },
  { id: 760, region: "REGION 3", outlet: "ROBINSONS EASYMART - BALER" },
  { id: 761, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - TALAVERA" },
  {
    id: 762,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CROSSING (N.E)",
  },
  { id: 763, region: "REGION 3", outlet: "PUREGOLD PRICE CLUB - GUIMBA" },
  {
    id: 764,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE NUEVA ECIJA (N.E)",
  },
  {
    id: 765,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - ZULUETA (N.E)",
  },
  {
    id: 766,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CABANATUAN PALENGKE (N.E)",
  },
  {
    id: 767,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - PACIFIC MALL (N.E)",
  },
  {
    id: 768,
    region: "REGION 3",
    outlet: "PUREGOLD PRICE CLUB - CIRCUMFERENCIAL (N.E)",
  },
  { id: 769, region: "REGION 3", outlet: "PUREGOLD - SAN LEONARDO" },
  { id: 770, region: "REGION 3", outlet: "PUREGOLD-DV CABANATUAN" },
  { id: 771, region: "REGION 3", outlet: "PUREGOLD-NORZAGARAY" },
  { id: 772, region: "REGION 3", outlet: "PUREGOLD-DV ANGAT" },
  { id: 773, region: "REGION 3", outlet: "GEN. TRADE - BAYAMBANG GROCERY" },
  { id: 774, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - ALAMINOS" },
  { id: 775, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - PAGSANJAN" },
  { id: 776, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - FAMY" },
  {
    id: 777,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - STA. CRUZ",
  },
  { id: 778, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - CANDELARIA" },
  {
    id: 779,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TIAONG",
  },
  {
    id: 780,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TIAONG HIGWAY",
  },
  { id: 781, region: "REGION 4A", outlet: "PUREGOLD-SARIAYA" },
  {
    id: 782,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CALIHAN HIGHWAY",
  },
  {
    id: 783,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- SAN PABLO",
  },
  { id: 784, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - LUCENA" },
  {
    id: 785,
    region: "REGION 4A",
    outlet: "METRO RETAILS STORES GROUP, INC. - LUCENA",
  },
  { id: 786, region: "REGION 4A", outlet: "SUPER 8 - SAN PABLO" },
  { id: 787, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - SAN PABLO" },
  {
    id: 788,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - HILARIO SAN PABLO",
  },
  {
    id: 789,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - HERMANOS SAN PABLO",
  },
  {
    id: 790,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - SAN FRANCISCO SAN PABLO",
  },
  {
    id: 791,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - SAN LUCAS SAN PABLO",
  },
  {
    id: 792,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - CANDELARIA",
  },
  {
    id: 793,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SAN JUAN BATANGAS",
  },
  { id: 794, region: "REGION 4A", outlet: "LIANA'S SUPERMARKET - SAN PABLO" },
  { id: 795, region: "REGION 4A", outlet: "LIANA'S SUPERMARKET - STO TOMAS" },
  {
    id: 796,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STA. CRUZ (G)",
  },
  {
    id: 797,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - VICTORIA LAGUNA",
  },
  {
    id: 798,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- PILA",
  },
  { id: 799, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - CALAUAN" },
  { id: 800, region: "REGION 4A", outlet: "ROBINSONS STA. CRUZ" },
  {
    id: 801,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BUHAY NA TUBIG",
  },
  {
    id: 802,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TANZANG LUMA",
  },
  { id: 803, region: "REGION 4A", outlet: "ROBINSONS EASYMART - LANCASTER" },
  { id: 804, region: "REGION 4A", outlet: "SHOPWISE - LANCASTER" },
  {
    id: 805,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - TERMINAL MALL",
  },
  {
    id: 806,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GOLDEN CITY",
  },
  { id: 807, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB (JR.)- NAIC" },
  { id: 808, region: "REGION 4A", outlet: "PUREGOLD DIVIMART - MAMBOG" },
  { id: 809, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB (JR.)- HABAY" },
  { id: 810, region: "REGION 4A", outlet: "SUPER 8 - ROSARIO" },
  { id: 811, region: "REGION 4A", outlet: "SUPER 8 - TRECE" },
  { id: 812, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - BUCANDALA" },
  { id: 813, region: "REGION 4A", outlet: "ROBINSONS PLACE - GENERAL TRIAS" },
  { id: 814, region: "REGION 4A", outlet: "ROBINSONS EASYMART - TANZA" },
  { id: 815, region: "REGION 4A", outlet: "PUREGOLD-PARADAHAN" },
  {
    id: 816,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - MOLINO BLVD.",
  },
  {
    id: 817,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MAGDIWANG",
  },
  {
    id: 818,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MARCOS ALVAREZ",
  },
  { id: 819, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - ROSARIO" },
  { id: 820, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - NOVELETA" },
  { id: 821, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - BACOOR" },
  {
    id: 822,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - NOVELETA OASIS",
  },
  { id: 823, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - KAWIT" },
  {
    id: 824,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - NAIC",
  },
  {
    id: 825,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- HUGO PEREZ",
  },
  { id: 826, region: "REGION 4A", outlet: "PUREGOLD DIVIMART - INOCENCIO" },
  {
    id: 827,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - IMUS",
  },
  { id: 828, region: "REGION 4A", outlet: "ROBINSONS - MAIN SQUARE MOLINO" },
  {
    id: 829,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - ALIMA BAY BACOOR",
  },
  {
    id: 830,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - TRECE MAR",
  },
  { id: 831, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - TANZA" },
  { id: 832, region: "REGION 4A", outlet: "ROBINSONS - BUCANDALA" },
  {
    id: 833,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - BUHAY NA TUBIG",
  },
  {
    id: 834,
    region: "REGION 4A",
    outlet: "ROBINSONS - GREEN GATE MALAGASANG IMUS",
  },
  { id: 835, region: "REGION 4A", outlet: "EVERPLUS SUPERSTORE INC. - CAVITE" },
  {
    id: 836,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - P. BURGOS CAVITE CITY",
  },
  {
    id: 837,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - CABUYAO",
  },
  {
    id: 838,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - MAKILING",
  },
  { id: 839, region: "REGION 4A", outlet: "SUPER 8 - CABUYAO" },
  { id: 840, region: "REGION 4A", outlet: "SUPER 8 - BINAN" },
  { id: 841, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - HALANG" },
  { id: 842, region: "REGION 4A", outlet: "PUREGOLD-DV BANLIC" },
  { id: 843, region: "REGION 4A", outlet: "PUREGOLD-DV PULO" },
  {
    id: 844,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CROSSING CALAMBA",
  },
  {
    id: 845,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - CALAMBA BAYAN",
  },
  { id: 846, region: "REGION 4A", outlet: "ROBINSONS - IMALL CANLUBANG" },
  { id: 847, region: "REGION 4A", outlet: "ROBINSONS EASYMART - CALAMBA" },
  { id: 848, region: "REGION 4A", outlet: "SOUTH SUPERMARKET -LOS BANOS" },
  { id: 849, region: "REGION 4A", outlet: "ROBINSON SUPERMARKET - LOS BANOS" },
  { id: 850, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB (JR.)- PARIAN" },
  {
    id: 851,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - SAN ISIDRO CABUYAO",
  },
  { id: 852, region: "REGION 4A", outlet: "ROBINSONS - CENTRO MALL CABUYAO" },
  { id: 853, region: "REGION 4A", outlet: "PUREGOLD JUNIOR - CABUYAO BAYAN" },
  { id: 854, region: "REGION 4A", outlet: "ROBINSONS - EASYMART CABUYAO" },
  {
    id: 855,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - LOS BANOS",
  },
  {
    id: 856,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MAMATID",
  },
  {
    id: 857,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CABUYAO BANLIC",
  },
  { id: 858, region: "REGION 4A", outlet: "LIANA'S SUPERMARKET - CALAMBA" },
  {
    id: 859,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LOS BANOS",
  },
  {
    id: 860,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- LOS BANOS",
  },
  {
    id: 861,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CANLUBANG",
  },
  {
    id: 862,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CANLUBANG",
  },
  { id: 863, region: "REGION 4A", outlet: "PUREGOLD-GUMACA" },
  { id: 865, region: "REGION 4A", outlet: "PUREGOLD-CATANAUAN" },
  { id: 866, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - ANABU" },
  {
    id: 867,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - GEN. TRIAS",
  },
  { id: 868, region: "REGION 4A", outlet: "SUPER 8 - DASMARINAS" },
  { id: 869, region: "REGION 4A", outlet: "ROBINSONS - SILANG" },
  { id: 870, region: "REGION 4A", outlet: "ROBINSONS EASYMART -SILANG" },
  { id: 871, region: "REGION 4A", outlet: "ROBINSONS - SUMMIT RIDGE TAGAYTAY" },
  {
    id: 872,
    region: "REGION 4A",
    outlet: "ROBINSONS - TWINLAKES VILLAGE BATANGAS",
  },
  {
    id: 873,
    region: "REGION 4A",
    outlet: "ROBINSONS - TOWNVILLE BUHAY NA TUBIG",
  },
  { id: 874, region: "REGION 4A", outlet: "SHOPWISE - IMUS" },
  {
    id: 875,
    region: "REGION 4A",
    outlet: "METRO RETAILS STORES GROUP, INC. - IMUS",
  },
  { id: 876, region: "REGION 4A", outlet: "ROBINSONS PLACE - IMUS" },
  {
    id: 877,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - TAGAYTAY",
  },
  {
    id: 878,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - CARMONA",
  },
  { id: 879, region: "REGION 4A", outlet: "SUPER 8 - GMA" },
  { id: 880, region: "REGION 4A", outlet: "SUPER 8 - MOLINO" },
  {
    id: 881,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PRINZA",
  },
  { id: 882, region: "REGION 4A", outlet: "PUREGOLD DIVIMART - MANGGAHAN" },
  {
    id: 883,
    region: "REGION 4A",
    outlet: "ROBINSONS - TOWNVILLE ARVO DASMARINAS",
  },
  { id: 884, region: "REGION 4A", outlet: "ROBINSONS PLACE - DASMARINAS" },
  {
    id: 885,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - DASMA",
  },
  { id: 886, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - CARMONA" },
  { id: 887, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - GMA" },
  { id: 888, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - SILANG" },
  { id: 889, region: "REGION 4A", outlet: "PUREGOLD CROSSING EAST" },
  {
    id: 890,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - BROOKSIDE LANE",
  },
  {
    id: 891,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GEN TRIAS",
  },
  { id: 892, region: "REGION 4A", outlet: "EVERPLUS SUPERSTORE INC. - TRECE" },
  {
    id: 893,
    region: "REGION 4A",
    outlet: "ROBINSONS EASYMART - NAIC CAVITE CITY",
  },
  {
    id: 894,
    region: "REGION 4A",
    outlet: "EVERPLUS SUPERSTORE INC. - PALIPARAN",
  },
  { id: 895, region: "REGION 4A", outlet: "EVERPLUS SUPERSTORE INC. - ZAPOTE" },
  {
    id: 896,
    region: "REGION 4A",
    outlet: "METRO RETAILS STORES GROUP, INC. - TAGAYTAY",
  },
  {
    id: 897,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - SILANG",
  },
  {
    id: 898,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAGAYTAY-A",
  },
  {
    id: 899,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TAGAYTAY",
  },
  {
    id: 900,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PALIPARAN",
  },
  {
    id: 901,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - MOLINO TOWN CENTER",
  },
  { id: 902, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - MOLINO ROAD" },
  {
    id: 903,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - DASMARINAS HIGH WAY",
  },
  {
    id: 904,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DASMA BAYAN",
  },
  { id: 905, region: "REGION 4A", outlet: "PUREGOLD-TALISAY BATANGAS-A" },
  { id: 906, region: "REGION 4A", outlet: "PUREGOLD-DV TALISAY" },
  {
    id: 907,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - ROSARIO BATANGAS",
  },
  {
    id: 908,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BATANGAS",
  },
  { id: 909, region: "REGION 4A", outlet: "SUPER 8 - LIPA" },
  { id: 910, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - LIPA" },
  {
    id: 911,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - NEW MARKET BATANGAS (G)",
  },
  { id: 912, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - CALICANTO" },
  { id: 913, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - TANAUAN" },
  {
    id: 914,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STO.TOMAS BATANGAS",
  },
  {
    id: 915,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - PASCUAL",
  },
  { id: 916, region: "REGION 4A", outlet: "ROBINSONS PLACE - LIMA EXCHANGE" },
  { id: 917, region: "REGION 4A", outlet: "ROBINSONS - TAMBO LIPA" },
  {
    id: 918,
    region: "REGION 4A",
    outlet: "ROBINSONS - XENTRO MALL LEMERY BATANGAS-B",
  },
  {
    id: 919,
    region: "REGION 4A",
    outlet: "ROBINSONS - XENTRO MALL LEMERY BATANGAS-A",
  },
  { id: 920, region: "REGION 4A", outlet: "ROBINSONS EASYMART - CALACA" },
  { id: 921, region: "REGION 4A", outlet: "ROBINSONS PLACE - LIPA" },
  {
    id: 922,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BALAYAN",
  },
  { id: 923, region: "REGION 4A", outlet: "SOUTH STO TOMAS" },
  { id: 924, region: "REGION 4A", outlet: "SOUTH LIPA" },
  { id: 925, region: "REGION 4A", outlet: "SHOPWISE - BATANGAS" },
  {
    id: 926,
    region: "REGION 4A",
    outlet: "ROBINSONS - NUCITI CENTRAL BATANGAS",
  },
  { id: 927, region: "REGION 4A", outlet: "RC ALVAREZ - LEMERY" },
  {
    id: 928,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - TANAUAN",
  },
  {
    id: 929,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - NASUGBU",
  },
  {
    id: 930,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - STA. ROSA",
  },
  { id: 931, region: "REGION 4A", outlet: "SOUTH SUPERMARKET -PASEO STA ROSA" },
  { id: 932, region: "REGION 4A", outlet: "ROBINSONS - GALLERIA SOUTH-A" },
  { id: 933, region: "REGION 4A", outlet: "ROBINSONS EASYMART - HARMONY" },
  {
    id: 934,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- GOLDEN CITY",
  },
  {
    id: 935,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CROSSTOWN",
  },
  {
    id: 936,
    region: "REGION 4A",
    outlet: "ROBINSONS - SOUTHWOODS MALL LAGUNA",
  },
  { id: 937, region: "REGION 4A", outlet: "SOUTH BRENT" },
  { id: 938, region: "REGION 4A", outlet: "PUREGOLD JR. ELVINDA" },
  {
    id: 939,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STA.ROSA BALIBAGO",
  },
  {
    id: 940,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - VICTORY MALL",
  },
  { id: 941, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - BINAN" },
  { id: 942, region: "REGION 4A", outlet: "SUPER 8 - STA ROSA" },
  {
    id: 943,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BEL-AIR",
  },
  { id: 944, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - PACITA" },
  {
    id: 945,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- VILLA OLYMPIA",
  },
  {
    id: 946,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- MAGSAYSAY",
  },
  { id: 947, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - TAGAPO" },
  { id: 948, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB (JR.)- BINAN" },
  { id: 949, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - BINAN BAYAN" },
  {
    id: 950,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- HALANG",
  },
  { id: 951, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - SAN PEDRO" },
  { id: 952, region: "REGION 4A", outlet: "PUREGOLD PRICE CLUB - LANGGAM" },
  { id: 953, region: "REGION 4A", outlet: "ROBINSONS - TARGETMALL STA. ROSA" },
  { id: 954, region: "REGION 4A", outlet: "ROBINSONS PLACE - STA ROSA" },
  {
    id: 955,
    region: "REGION 4A",
    outlet: "ROBINSONS - TOWNVILLE NUVALI STA ROSA-1",
  },
  { id: 956, region: "REGION 4A", outlet: "THE MARKETPLACE- WESTBORROUGH" },
  { id: 957, region: "REGION 4A", outlet: "SUPER 8 - SAN PEDRO" },
  { id: 958, region: "REGION 4A", outlet: "LANDMARK - NUVALI" },
  { id: 959, region: "REGION 4A", outlet: "SHOPWISE - STA.ROSA(PASEO)" },
  {
    id: 960,
    region: "REGION 4A",
    outlet: "PUREGOLD PRICE CLUB - STA.ROSA BAYAN (G)",
  },
  { id: 961, region: "REGION 4A", outlet: "SHOPWISE - PACITA" },
  { id: 962, region: "REGION 4A", outlet: "ROBINSONS - PACITA" },
  {
    id: 963,
    region: "REGION 4A",
    outlet: "WALTERMART SUPERMARKET, INC. - BACOOR",
  },
  { id: 964, region: "REGION 4A", outlet: "MB MANALO (.25)" },
  { id: 965, region: "REGION 4A", outlet: "GOLDEN M (.25)" },
  { id: 966, region: "REGION 4A", outlet: "AMY ABAD" },
  { id: 967, region: "REGION 4A", outlet: "KB ABAD" },
  { id: 968, region: "REGION 4A", outlet: "EDRA 1 (.25)" },
  { id: 969, region: "REGION 4A", outlet: "EDRA 3 (.25)" },
  { id: 970, region: "REGION 4A", outlet: "JEREMYS - LEMERY" },
  {
    id: 971,
    region: "REGION 4B",
    outlet: "PUREGOLD PRICE CLUB - BOAC MARINDUQUE",
  },
  { id: 972, region: "REGION 4B", outlet: "PUREGOLD-PINAMALAYAN" },
  { id: 973, region: "REGION 4B", outlet: "ROBINSONS PLACE - PALAWAN" },
  { id: 974, region: "REGION 4B", outlet: "PUREGOLD - BONGABONG" },
  { id: 975, region: "REGION 4B", outlet: "ROBINSONS - CALAPAN" },
  { id: 976, region: "REGION 4B", outlet: "PUREGOLD - CALAPAN" },
  {
    id: 977,
    region: "REGION 4B",
    outlet: "PUREGOLD PRICE CLUB - ROXAS MINDORO",
  },
  { id: 978, region: "REGION 4B", outlet: "SOUTH EMERALD BOAC (.25)" },
  { id: 979, region: "REGION 4B", outlet: "SOUTH EMERALD GASAN (.25)" },
  {
    id: 980,
    region: "REGION 5",
    outlet: "METRO RETAILS STORES GROUP, INC. - LEGAZPI",
  },
  { id: 981, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - IRIGA" },
  { id: 982, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - PILI" },
  { id: 983, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - SORSOGON" },
  {
    id: 984,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - IROSIN SORSOGON",
  },
  {
    id: 985,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - LEGAZPI ALBAY",
  },
  { id: 986, region: "REGION 5", outlet: "ROBINSONS - ALBAY 738 LEGAZPI" },
  {
    id: 987,
    region: "REGION 5",
    outlet: "PUREGOLD PRICE CLUB - NAGA DIVERSION",
  },
  { id: 988, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - CENTRO NAGA" },
  {
    id: 989,
    region: "REGION 5",
    outlet: "METRO RETAILS STORES GROUP, INC. - NAGA",
  },
  { id: 990, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - CALABANGA" },
  { id: 991, region: "REGION 5", outlet: "ROBINSONS PLACE - NAGA" },
  { id: 992, region: "REGION 5", outlet: "ROBINSONS - EMALL NAGA" },
  { id: 993, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - DAET" },
  { id: 994, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - TABACO" },
  { id: 995, region: "REGION 5", outlet: "METRO- LIGAO" },
  { id: 996, region: "REGION 5", outlet: "METRO- GUINOBATAN" },
  { id: 997, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - DARAGA" },
  { id: 998, region: "REGION 5", outlet: "PUREGOLD PRICE CLUB - LABO" },
  {
    id: 999,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - LIBERTAD BACOLOD",
  },
  {
    id: 1000,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB (JR.) -CENTROPLEX",
  },
  { id: 1001, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB -MURCIA" },
  { id: 1002, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - MANSILINGAN" },
  { id: 1003, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB -PORT BACOLOD" },
  { id: 1004, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB -BATA BACOLOD" },
  {
    id: 1005,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -888 CHINA TOWN SQUARE",
  },
  { id: 1006, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB -HINIGARAN" },
  { id: 1007, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - KABANKALAN" },
  {
    id: 1008,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - BAROTAC VIEJO",
  },
  {
    id: 1009,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB - BAROTAC NUEVO",
  },
  { id: 1010, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - ESCALANTE" },
  { id: 1011, region: "REGION 6", outlet: "PUREGOLD - CADIZ" },
  { id: 1012, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - BURGOS" },
  { id: 1013, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - LEGAZPI" },
  { id: 1014, region: "REGION 6", outlet: "PUREGOLD - PONTEVEDRA ROXAS" },
  {
    id: 1015,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -BAYBAY GOODSHOP",
  },
  {
    id: 1016,
    region: "REGION 6",
    outlet: "PUREGOLD PRICE CLUB -PUEBLO DE PANAY",
  },
  { id: 1017, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - PAVIA" },
  { id: 1018, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB-OTON" },
  { id: 1019, region: "REGION 6", outlet: "PUREGOLD - JARO" },
  { id: 1020, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - STA.BARBARA" },
  { id: 1021, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - CABATUAN" },
  { id: 1022, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB -SAN CARLOS" },
  { id: 1023, region: "REGION 6", outlet: "PUREGOLD - BAYAWAN" },
  { id: 1024, region: "REGION 6", outlet: "PUREGOLD - LA CASTELLANA" },
  { id: 1025, region: "REGION 6", outlet: "PUREGOLD - CANLAON" },
  { id: 1026, region: "REGION 6", outlet: "PUREGOLD - CALINOG" },
  { id: 1027, region: "REGION 6", outlet: "ROBINSONS - PAVIA" },
  {
    id: 1028,
    region: "REGION 6",
    outlet: "ROBINSONS - OPEN MARKET MANSILINGAN",
  },
  { id: 1029, region: "REGION 6", outlet: "ROBINSONS - BACOLOD TRIANGLE" },
  { id: 1030, region: "REGION 6", outlet: "THE MARKETPLACE - FESTIVE WALK" },
  {
    id: 1031,
    region: "REGION 6",
    outlet: "ROBINSONS PLACE - MANDALAGAN BACOLOD",
  },
  { id: 1032, region: "REGION 6", outlet: "ROBINSONS - VILLAMONTE" },
  { id: 1033, region: "REGION 6", outlet: "PUREGOLD - TANJAY" },
  { id: 1034, region: "REGION 6", outlet: "ROBINSONS - GT PARK PLACE MOLO" },
  { id: 1035, region: "REGION 6", outlet: "ROBINSONS PLACE -JARO ILOILO" },
  { id: 1036, region: "REGION 6", outlet: "ROBINSONS PLACE - ROXAS" },
  { id: 1037, region: "REGION 6", outlet: "ROBINSONS - CITIMALL ROXAS" },
  { id: 1038, region: "REGION 6", outlet: "ROBINSONS PLACE - ILOILO" },
  { id: 1039, region: "REGION 6", outlet: "ROBINSONS - ANTIQUE" },
  { id: 1040, region: "REGION 6", outlet: "PUREGOLD PRICE CLUB - ANTIQUE" },
  {
    id: 1041,
    region: "REGION 6",
    outlet: "THE MARKETPLACE - NORTH GROOVE MOLO",
  },
  { id: 1042, region: "REGION 7", outlet: "PUREGOLD PRICE CLUB -GUIHULNGAN" },
  {
    id: 1043,
    region: "REGION 7",
    outlet: "ROBINSONS - TOWNVILLE PERDICES DGT",
  },
  { id: 1044, region: "REGION 7", outlet: "ROBINSONS PLACE - DUMAGUETE" },
  { id: 1045, region: "REGION 7", outlet: "SHOPWISE - MAMBALING" },
  { id: 1046, region: "REGION 7", outlet: "ROBINSONS EASYMART - PARDO" },
  { id: 1047, region: "REGION 7", outlet: "ROBINSONS - MINGLANILLA" },
  { id: 1048, region: "REGION 7", outlet: "THE MARKETPLACE - AYALA" },
  { id: 1049, region: "REGION 7", outlet: "THE MARKETPLACE - BANAWA" },
  { id: 1050, region: "REGION 7", outlet: "ROBINSONS - BASELINE" },
  { id: 1051, region: "REGION 7", outlet: "ROBINSONS - CASIMIRA" },
  { id: 1052, region: "REGION 7", outlet: "ROBINSONS EASYMART - CABAHUG" },
  { id: 1053, region: "REGION 7", outlet: "THE MARKETPLACE - OAKRIDGE" },
  { id: 1054, region: "REGION 7", outlet: "ROBINSONS EASYMART - BASAK" },
  {
    id: 1055,
    region: "REGION 7",
    outlet: "ROBINSONS EASYMART - NEWTOWN MACTAN",
  },
  { id: 1056, region: "REGION 7", outlet: "ROBINSONS EASYMART - PAJAC" },
  { id: 1057, region: "REGION 7", outlet: "ROBINSONS EASYMART - GUN-OB" },
  {
    id: 1058,
    region: "REGION 7",
    outlet: "THE MARKETPLACE - GALLERIA  SELECTION CEBU",
  },
  {
    id: 1059,
    region: "REGION 7",
    outlet: "ROBINSONS - TALAMBAN TIME SQUARE CEBU",
  },
  { id: 1060, region: "REGION 7", outlet: "ROBINSONS - BANILAD CEBU" },
  { id: 1061, region: "REGION 7", outlet: "ROBINSONS PLACE - CEBU FUENTE" },
  { id: 1062, region: "REGION 7", outlet: "ROBINSONS - TALISAY CEBU" },
  {
    id: 1063,
    region: "REGION 7",
    outlet: "ROBINSONS - SOUTH TOWN CENTER TABUNOK",
  },
  { id: 1064, region: "REGION 7", outlet: "ROBINSONS - ISLAND CENTRAL MACTAN" },
  { id: 1065, region: "REGION 7", outlet: "ROBINSONS - PUEBLO VERDE MACTAN" },
  { id: 1066, region: "REGION 7", outlet: "PUREGOLD- MANGO" },
  { id: 1067, region: "REGION 7", outlet: "PUREGOLD -TALISAY" },
  { id: 1068, region: "REGION 7", outlet: "PUREGOLD - GUADALUPE" },
  { id: 1069, region: "REGION 7", outlet: "PUREGOLD- KASAMBAGAN" },
  { id: 1070, region: "REGION 7", outlet: "PUREGOLD- BOHOL" },
  { id: 1071, region: "REGION 7", outlet: "GAISANO CAPITAL - MACTAN" },
  { id: 1072, region: "REGION 7", outlet: "GAISANO CAPITAL - CASUNTINGAN" },
  {
    id: 1073,
    region: "REGION 7",
    outlet: "GAISANO CAPITAL - SAVER'SMART BASAK",
  },
  { id: 1074, region: "REGION 7", outlet: "GAISANO CAPITAL - DANAO" },
  { id: 1075, region: "REGION 7", outlet: "GAISANO CAPITAL - TISA" },
  { id: 1076, region: "REGION 7", outlet: "GAISANO CAPITAL - OPM" },
  { id: 1077, region: "REGION 7", outlet: "GAISANO CAPITAL - SOUTH" },
  { id: 1078, region: "REGION 7", outlet: "GAISANO CAPITAL - SRP" },
  { id: 1079, region: "REGION 7", outlet: "GAISANO SAVER'SMART - T.PADILLA" },
  { id: 1080, region: "REGION 7", outlet: "GAISANO SAVER'SMART - BACAYAN" },
  { id: 1081, region: "REGION 7", outlet: "GAISANO GRAND - CARCAR" },
  { id: 1082, region: "REGION 7", outlet: "GAISANO GRAND - MACTAN" },
  { id: 1083, region: "REGION 7", outlet: "GAISANO GRAND - FIESTA MALL" },
  { id: 1084, region: "REGION 7", outlet: "GAISANO GRAND - FIESTA MALL 2" },
  { id: 1085, region: "REGION 7", outlet: "GAISANO GRAND - CORDOVA" },
  { id: 1086, region: "REGION 7", outlet: "GAISANO GRAND - DUMANJUG" },
  { id: 1087, region: "REGION 7", outlet: "GAISANO GRAND - LILOAN" },
  { id: 1088, region: "REGION 7", outlet: "GAISANO GRAND - TALAMBAN" },
  { id: 1089, region: "REGION 7", outlet: "GAISANO GRAND - MINGLANILLA" },
  { id: 1090, region: "REGION 7", outlet: "GAISANO GRAND - MOALBOAL" },
  { id: 1091, region: "REGION 7", outlet: "GAISANO GRAND - BALAMBAN" },
  { id: 1092, region: "REGION 7", outlet: "GAISANO GRAND - NORTH BASAK" },
  { id: 1093, region: "REGION 7", outlet: "GAISANO METRO - COLON-1" },
  { id: 1094, region: "REGION 7", outlet: "GAISANO METRO - COLON-2" },
  { id: 1095, region: "REGION 7", outlet: "SUPER METRO - CARCAR" },
  { id: 1096, region: "REGION 7", outlet: "GAISANO METRO - NAGA" },
  { id: 1097, region: "REGION 7", outlet: "SUPER METRO - TOLEDO" },
  { id: 1098, region: "REGION 7", outlet: "SUPER METRO - BOGO" },
  { id: 1099, region: "REGION 7", outlet: "GAISANO METRO - BANILAD" },
  { id: 1100, region: "REGION 7", outlet: "GAISANO METRO - IT PARK" },
  {
    id: 1101,
    region: "REGION 7",
    outlet: "GAISANO METRO FRESH N EASY - TABOK",
  },
  { id: 1102, region: "REGION 7", outlet: "METRO GAISANO - AYALA" },
  { id: 1103, region: "REGION 7", outlet: "GAISANO METRO - MANDAUE" },
  {
    id: 1104,
    region: "REGION 7",
    outlet: "GAISANO METRO FRESH N EASY - UMAPAD",
  },
  {
    id: 1105,
    region: "REGION 7",
    outlet: "GAISANO METRO FRESH N EASY - SHANGRILA",
  },
  { id: 1106, region: "REGION 7", outlet: "METRO LG GARDEN" },
  { id: 1107, region: "REGION 7", outlet: "GAISASANO METRO POBLACION" },
  { id: 1108, region: "REGION 7", outlet: "GAISANO METRO -TANKE" },
  { id: 1109, region: "REGION 7", outlet: "METRO DUMLOG" },
  { id: 1110, region: "REGION 7", outlet: "SUPER METRO - OPON" },
  { id: 1111, region: "REGION 7", outlet: "SAVEMORE - PARKMALL" },
  { id: 1112, region: "REGION 7", outlet: "SAVEMORE - EMALL" },
  { id: 1113, region: "REGION 7", outlet: "SM - INSULAR" },
  { id: 1114, region: "REGION 7", outlet: "SM - JMALL" },
  { id: 1115, region: "REGION 7", outlet: "SM - CONSOLACION" },
  { id: 1116, region: "REGION 7", outlet: "SM - MACTAN" },
  { id: 1117, region: "REGION 7", outlet: "SM - MARIBAGO" },
  { id: 1118, region: "REGION 7", outlet: "SM - PRIMARK" },
  { id: 1119, region: "REGION 7", outlet: "SM - LAPU LAPU" },
  { id: 1120, region: "REGION 7", outlet: "SM - SEA SIDE CITY" },
  { id: 1121, region: "REGION 7", outlet: "GAISANO METRO TAYUD LILOAN" },
  { id: 1122, region: "REGION 7", outlet: "GAISANO METRO   CANDUMAN" },
  { id: 1123, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - MARASBARAS" },
  {
    id: 1124,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - REAL TACLOBAN",
  },
  { id: 1125, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - CALANIPAWAN" },
  { id: 1126, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - KANANGA" },
  { id: 1127, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - CARIGARA" },
  { id: 1128, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - ABUYOG" },
  { id: 1129, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - DULAG" },
  { id: 1130, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - ALANG-ALANG" },
  { id: 1131, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - PALO" },
  { id: 1132, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - BORONGAN" },
  { id: 1133, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - DOLORES" },
  {
    id: 1134,
    region: "REGION 8",
    outlet: "PUREGOLD PRICE CLUB - BAYBAY LEYTE",
  },
  { id: 1135, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - ORMOC" },
  { id: 1136, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - SOGOD" },
  { id: 1137, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - BATO" },
  { id: 1138, region: "REGION 8", outlet: "ROBINSONS PLACE - TACLOBAN" },
  { id: 1139, region: "REGION 8", outlet: "ROBINSONS PLACE - ABUCAY TACLOBAN" },
  { id: 1140, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - ABUCAY" },
  { id: 1141, region: "REGION 8", outlet: "ROBINSONS - ORMOC CENTRUM" },
  { id: 1142, region: "REGION 8", outlet: "ROBINSONS PLACE - ORMOC" },
  { id: 1143, region: "REGION 8", outlet: "PUREGOLD-GUIUAN" },
  { id: 1144, region: "REGION 8", outlet: "PUREGOLD-HINUNANGAN" },
  { id: 1145, region: "REGION 8", outlet: "PUREGOLD-CALBAYOG" },
  { id: 1146, region: "REGION 8", outlet: "PUREGOLD PRICE CLUB - TANAUAN" },
  { id: 1147, region: "REGION 9", outlet: "PUREGOLD PRICE CLUB - PANTUKAN" },
  { id: 1148, region: "REGION 9", outlet: "ROBINSONS - C3 MALL PAGADIAN" },
  { id: 1149, region: "REGION 9", outlet: "AFPCES - PAGADIAN" },
  { id: 1150, region: "REGION 9", outlet: "PUREGOLD PRICE CLUB - J&F MONKAYO" },
  { id: 1151, region: "REGION 9", outlet: "PUREGOLD PRICE CLUB - TANDAG" },
  { id: 1152, region: "REGION 9", outlet: "ROBINSONS - TANDAG" },
  {
    id: 1153,
    region: "REGION 9",
    outlet: "PUREGOLD PRICE CLUB - J&F MARAGUSAN",
  },
  { id: 1154, region: "REGION 9", outlet: "ROBINSONS - STA LUCIA" },
  { id: 1155, region: "REGION 9", outlet: "ROBINSON EASYMART - DAMOSA" },
  { id: 1156, region: "REGION 9", outlet: "ROBINSON EASYMART - ACCASIA" },
  { id: 1157, region: "REGION 9", outlet: "ROBINSON EASYMART - ECOLAND" },
  { id: 1158, region: "REGION 9", outlet: "ROBINSONS - POLOMOLOK" },
  { id: 1159, region: "REGION 9", outlet: "ROBINSONS - CALUMPANG" },
  { id: 1160, region: "REGION 9", outlet: "ROBINSONS - SINDANGAN" },
  { id: 1161, region: "REGION 9", outlet: "ROBINSONS - PAGADIAN" },
  { id: 1162, region: "REGION 9", outlet: "ROBINSONS - IPIL" },
  { id: 1163, region: "REGION 9", outlet: "GEN TRADE - UNITOP COGON" },
  { id: 1164, region: "REGION 9", outlet: "GEN TRADE - PALANA STORE" },
  { id: 1165, region: "REGION 9", outlet: "GEN TRADE - LADYS MART" },
  { id: 1166, region: "REGION 9", outlet: "GEN TRADE - CAPITOL BAZAAR" },
  { id: 1167, region: "REGION 10", outlet: "PUREGOLD PRICE CLUB - OZAMIS" },
  {
    id: 1168,
    region: "REGION 10",
    outlet: "PUREGOLD PRICE CLUB - CAGAYAN DE ORO",
  },
  { id: 1169, region: "REGION 10", outlet: "THE MARKETPLACE - CDOC" },
  { id: 1170, region: "REGION 10", outlet: "SHOPWISE - CDOC" },
  { id: 1171, region: "REGION 10", outlet: "ROBINSONS - LIMKETKAI MALL CDO" },
  { id: 1172, region: "REGION 10", outlet: "ROBINSONS PLACE - CAGAYAN DE ORO" },
  { id: 1173, region: "REGION 10", outlet: "ROBINSONS GUSA- CAGAYAN DE ORO" },
  { id: 1174, region: "REGION 10", outlet: "PUREGOLD PRICE CLUB - VALENCIA" },
  { id: 1175, region: "REGION 10", outlet: "ROBINSONS - LAVINA PARK VALENCIA" },
  { id: 1176, region: "REGION 10", outlet: "ROBINSON - NEW VALENCIA" },
  { id: 1177, region: "REGION 10", outlet: "ROBINSONS - GEEGE MALL OZAMIZ" },
  { id: 1178, region: "REGION 10", outlet: "ROBINSONS PLACE - ILIGAN" },
  { id: 1179, region: "REGION 10", outlet: "PUREGOLD - ILIGAN" },
  { id: 1180, region: "REGION 10", outlet: "BYANT MILLING OZAMIS CITY" },
  { id: 1181, region: "REGION 10", outlet: "NOVO OZMIS CITY" },
  { id: 1182, region: "REGION 10", outlet: "GEN TRADE - RTM SALES &GROUP INC" },
  { id: 1183, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - DIGOS" },
  { id: 1184, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - BANSALAN" },
  { id: 1185, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - STO.TOMAS" },
  { id: 1186, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - LANANG" },
  { id: 1187, region: "REGION 11", outlet: "AFPCES - PANACAN (0.25)" },
  { id: 1188, region: "REGION 11", outlet: "ROBINSONS PLACE - TAGUM" },
  { id: 1189, region: "REGION 11", outlet: "ROBINSONS - CYBERGATE DAVAO" },
  { id: 1190, region: "REGION 11", outlet: "ROBINSON-TOWNVILLE ABREEZA DAVAO" },
  {
    id: 1191,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - COTABATO MAIN",
  },
  {
    id: 1192,
    region: "REGION 11",
    outlet: "PUREGOLD PRICE CLUB - COTABATO FIESTA MALL",
  },
  { id: 1193, region: "REGION 11", outlet: "ROBINSONS - AL NOR MALL COTABATO" },
  { id: 1194, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - BUTUAN" },
  { id: 1195, region: "REGION 11", outlet: "ROBINSONS PLACE - BUTUAN" },
  { id: 1196, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - LANGIHAN" },
  { id: 1197, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB SIARGAO" },
  { id: 1198, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - LUPON" },
  { id: 1199, region: "REGION 11", outlet: "PUREGOLD PRICE CLUB - MARAWI" },
  { id: 1200, region: "REGION 11", outlet: "GEN TRADE -NCCC NOVA TIERRA" },
  {
    id: 1201,
    region: "REGION 11",
    outlet: "GEN TRADE - NCCC CHOICE PUBLIC MARKET",
  },
  { id: 1202, region: "REGION 11", outlet: "GEN TRADE - NCCC HB1 BONIFACIO" },
  { id: 1203, region: "REGION 11", outlet: "GEN TRADE - SOUTH SEAS SUPERRAMA" },
  { id: 1204, region: "REGION 12", outlet: "ROBINSONS PLACE - GENERAL SANTOS" },
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

// Stages where applicant dropdown is shown
const APPLICANT_STAGES = [
  "Applicant Endorsed",
  "Intro Done",
  "Back Out",
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
        assignments[m.id].incomingBackOutReason = emp.backOutReason || "";
        assignments[m.id].incomingTargetOnboardDate =
          emp.targetOnboardDate || null;
      } else {
        assignments[m.id] = {
          employeeId: emp._id,
          employeeName: `${emp.firstName} ${emp.lastName}`,
          deployStatus: emp.deployStatus || "Undeployed",
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
  const [filterRegion, setFilterRegion] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [assignMode, setAssignMode] = useState("employed"); // "employed" | "applicant"
  const [showIncomingSection, setShowIncomingSection] = useState(false); // manually opened by "Add Incoming Applicant" button
  const [previousEmployeeRemarks, setPreviousEmployeeRemarks] = useState(""); // remarks for removed employee on onboarding
  const [backOutReason, setBackOutReason] = useState(""); // reason when applicant backs out
  const [terminateReason, setTerminateReason] = useState("");
  const [targetOnboardDate, setTargetOnboardDate] = useState(""); // target date when For Onboarding
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
        defaultValue={value} // ← use defaultValue (uncontrolled) for typing performance
        onBlur={(e) => onChange(e.target.value)} // ← sync to parent only on blur
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

  const applyFilters = (region, status) => {
    let filtered = [...OUTLET_DATA];

    // Filter by region
    if (region !== "ALL") {
      filtered = filtered.filter((o) => o.region === region);
    }

    // Filter by status
    if (status !== "ALL") {
      filtered = filtered.filter((o) => {
        const deployStatus = outletAssignments[o.id]?.deployStatus;

        if (status === "Deployed") {
          return deployStatus === "Deployed";
        }

        if (status === "Reliever Deployed") {
          return deployStatus === "Reliever Deployed";
        }

        if (status === "Undeployed") {
          return !deployStatus || deployStatus === "Undeployed";
        }

        return true;
      });
    }

    setFilteredOutlets(filtered);
  };

  const handleRegionFilter = (e) => {
    const value = e.target.value;
    setFilterRegion(value);

    applyFilters(value, filterStatus);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setFilterStatus(value);

    applyFilters(filterRegion, value);
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
      temporaryDeployEndDate: a?.temporaryDeployEndDate
        ? new Date(a.temporaryDeployEndDate).toISOString().split("T")[0]
        : "",
      applicantStatus: a?.applicantStatus || "",
      _originalDeployStatus: a?.deployStatus || "Undeployed",
      _isApplicant: a?.isApplicant || false,
      // ── Incoming applicant pipeline ───────────────────────────
      incomingApplicantId: a?.incomingApplicantId || "",
      incomingApplicantStatus: a?.incomingApplicantStatus || "",
      incomingDeployDate: "",
      incomingBackOutReason: a?.incomingBackOutReason || "",
      incomingTargetOnboardDate: a?.incomingTargetOnboardDate
        ? new Date(a.incomingTargetOnboardDate).toISOString().split("T")[0]
        : "",

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
              terminateReason:
                previousEmployeeRemarks === "Terminated" ? terminateReason : "",
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
          temporaryDeployEndDate:
            data.deployStatus === "Reliever Deployed"
              ? data.temporaryDeployEndDate || null
              : null,
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
            // ← add
            temporaryDeployEndDate:
              data.deployStatus === "Reliever Deployed"
                ? data.temporaryDeployEndDate || null
                : null,
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
            backOutReason:
              data.incomingApplicantStatus === "Back Out" ? backOutReason : "",
            targetOnboardDate:
              data.incomingApplicantStatus === "For Onboarding"
                ? targetOnboardDate
                : "",
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
      setBackOutReason("");
      setTerminateReason("");
      setTargetOnboardDate("");
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
    { field: "region", headerName: "Region", width: 150 },
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
                              {/* Show Assign dropdown only when:
                                   - assignMode = "employed" (Account Supervisor/MIS assigning an employee), OR
                                   - MIS in applicant mode (canSetApplicantStatus = true, can do both)
                                   Hide when Account Supervisor is in applicant mode (they use Section 2) */}
                              {assignMode === "employed" ||
                              (assignMode === "applicant" &&
                                canSetApplicantStatus) ? (
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
                              ) : null}
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

                          {/* Deploy Status — Account Supervisor/MIS: editable. HR: always read-only/disabled */}
                          {!hasIncomingPipeline && (
                            <Grid item xs={12} sm={6}>
                              {isEditing && canEdit ? (
                                <FormControl
                                  fullWidth
                                  disabled={!selectedOutlet.assignedEmployeeId}
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
                                    selectedOutlet.deployStatus || "Undeployed"
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
                                {/* Applicant Status (primary pipeline) — only for Account Supervisor/MIS
                                  HR roles manage applicant status exclusively through Section 2 (Incoming Pipeline) */}
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
                                                    // Account Supervisor / MIS: can ONLY set Onboarded (when current = "For Onboarding")
                                                    // HR roles: can set stages 1–4 but NOT Onboarded
                                                    const acctSupDis =
                                                      canEdit &&
                                                      !canSetApplicantStatus
                                                        ? !isOB ||
                                                          cur !==
                                                            "For Onboarding"
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

                                {/* Deploy Date — editable only for Account Supervisor/MIS, read-only for HR */}
                                {(selectedOutlet.deployStatus === "Deployed" ||
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

                                {/* Reliever Deploy End Date — only shown when Reliever Deployed */}
                                {selectedOutlet.deployStatus ===
                                  "Reliever Deployed" && (
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
                                {/* Undeploy Date — editable only for Account Supervisor/MIS, read-only for HR */}
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
                                  // ── Access rules per stage ──────────────────────────────
                                  // For Pooling / Applicant Endorsed → HR only
                                  // Intro Done / Back Out / For Onboarding / Onboarded → Account Supervisor / MIS only
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
                                            // Account Supervisor: only Acct Sup stages; Onboarded only when cur = "For Onboarding"
                                            if (isHRStage) dis = true;
                                            else if (
                                              isOB &&
                                              cur !== "For Onboarding"
                                            )
                                              dis = true;
                                          } else {
                                            // HR roles: only HR stages
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

                                  // Account Supervisor can only set Onboarded — HR selects the actual applicant
                                  // If Acct Sup opens this and an applicant is already selected, show read-only
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

                                  // HR roles — editable dropdown
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

                            {/* ── Target Onboard Date — shown when status = "For Onboarding" ── */}
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
