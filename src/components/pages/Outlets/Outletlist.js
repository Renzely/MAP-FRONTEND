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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";

import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import EFClogo from "../../Images/Bmpower_Logo/BMP - EFC.jpg";

const OUTLET_DATA = [
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
  {
    id: 35,
    account: "BROLLEE",
    outlet: "GAISANO METRO FRESH N EASY - SHANGRILA",
  },
  { id: 36, account: "BROLLEE", outlet: "GAISANO METRO FRESH N EASY - TABOK" },
  { id: 37, account: "BROLLEE", outlet: "GAISANO METRO FRESH N EASY - UMAPAD" },
  { id: 38, account: "BROLLEE", outlet: "GAISANO METRO TAYUD LILOAN" },
  { id: 39, account: "BROLLEE", outlet: "GAISANO METRO   CANDUMAN" },
  { id: 40, account: "BROLLEE", outlet: "GAISANO SAVER'SMART - BACAYAN" },
  { id: 41, account: "BROLLEE", outlet: "GAISANO SAVER'SMART - T.PADILLA" },
  { id: 42, account: "BROLLEE", outlet: "GAISASANO METRO POBLACION" },
  { id: 43, account: "BROLLEE", outlet: "METRO DUMLOG" },
  { id: 44, account: "BROLLEE", outlet: "METRO GAISANO - AYALA" },
  { id: 45, account: "BROLLEE", outlet: "METRO LG GARDEN" },
  { id: 46, account: "BROLLEE", outlet: "SAVEMORE - EMALL" },
  { id: 47, account: "BROLLEE", outlet: "SAVEMORE - PARKMALL" },
  { id: 48, account: "BROLLEE", outlet: "SM - INSULAR" },
  { id: 49, account: "BROLLEE", outlet: "SM - JMALL" },
  { id: 50, account: "BROLLEE", outlet: "SM - LAPU LAPU" },
  { id: 51, account: "BROLLEE", outlet: "SM - MACTAN" },
  { id: 52, account: "BROLLEE", outlet: "SM - MARIBAGO" },
  { id: 53, account: "BROLLEE", outlet: "SM - PRIMARK" },
  { id: 54, account: "BROLLEE", outlet: "SM - SEA SIDE CITY" },
  { id: 55, account: "BROLLEE", outlet: "SUPER METRO - BOGO" },
  { id: 56, account: "BROLLEE", outlet: "SUPER METRO - CARCAR" },
  { id: 57, account: "BROLLEE", outlet: "SUPER METRO - OPON" },
  { id: 58, account: "BROLLEE", outlet: "SUPER METRO - TOLEDO" },
  {
    id: 59,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC  - GAGALANGIN",
  },
  {
    id: 60,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC  - SANTOLAN",
  },
  { id: 61, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC  - YUSECO" },
  {
    id: 62,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - 10TH AVE.",
  },
  {
    id: 63,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - 11TH AVE.",
  },
  {
    id: 64,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - 4TH STATE",
  },
  {
    id: 65,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - ARLEGUI QUIAPO",
  },
  { id: 66, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - BAESA" },
  { id: 67, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - BAGBAG" },
  {
    id: 68,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGONG SILANG",
  },
  {
    id: 69,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGUMBAYAN",
  },
  {
    id: 70,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - BAGUMBONG",
  },
  { id: 71, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - BANGKAL" },
  { id: 72, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - CAINTA" },
  { id: 73, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - CATMON" },
  { id: 74, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - CAVITE" },
  {
    id: 75,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - COMMONWEALTH",
  },
  {
    id: 76,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - CONCEPCION",
  },
  {
    id: 77,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - DALANDANAN",
  },
  {
    id: 78,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - FOREST HILL",
  },
  {
    id: 79,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - GEN.T DE LEON",
  },
  { id: 80, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - HERMOSA" },
  { id: 81, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - KAYBIGA" },
  {
    id: 82,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - LANGARAY",
  },
  {
    id: 83,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - LORETO MORNING BREEZE",
  },
  {
    id: 84,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - MALIGAYA",
  },
  { id: 85, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - MARULAS" },
  {
    id: 86,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - MASANGKAY",
  },
  { id: 87, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - MAYSAN" },
  { id: 88, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - MAYPAJO" },
  {
    id: 89,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - METRO PLAZA",
  },
  { id: 90, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - MUZON" },
  { id: 91, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - NAVOTAS" },
  { id: 92, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - PACO" },
  {
    id: 93,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - PALIPARAN",
  },
  {
    id: 94,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - PANDACAN",
  },
  {
    id: 95,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - PANGHULO",
  },
  { id: 96, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - PARANG" },
  { id: 97, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - PATEROS" },
  {
    id: 98,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - PEARL DRIVE",
  },
  {
    id: 99,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - PEÑAFRANCIA",
  },
  {
    id: 100,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - PINAGBUHATAN",
  },
  { id: 101, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - POLO" },
  {
    id: 102,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - QUIRINO HIWAY",
  },
  { id: 103, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - RETIRO" },
  { id: 104, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - ROCES" },
  {
    id: 105,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - SAN MATEO",
  },
  {
    id: 106,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - SAPANG PALAY",
  },
  { id: 107, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - SAUYO" },
  { id: 108, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - SUCAT" },
  {
    id: 109,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - TALIPAPA",
  },
  { id: 110, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - TONDO" },
  {
    id: 111,
    account: "EVERPLUS",
    outlet: "EVERPLUS SUPERSTORE INC. - TRABAJO",
  },
  { id: 112, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - TRECE" },
  { id: 113, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - VICAS" },
  { id: 114, account: "EVERPLUS", outlet: "EVERPLUS SUPERSTORE INC. - ZAPOTE" },
  { id: 115, account: "FISHERMALL", outlet: "FISHERMALL MALABON" },
  { id: 116, account: "FISHERMALL", outlet: "FISHERMALL Q. AVENUE" },
  { id: 117, account: "GEN. TRADE", outlet: "AMY ABAD" },
  { id: 118, account: "GEN. TRADE", outlet: "BYANT MILLING OZAMIS CITY" },
  { id: 119, account: "GEN. TRADE", outlet: "EDRA 1 (.25)" },
  { id: 120, account: "GEN. TRADE", outlet: "EDRA 3 (.25)" },
  { id: 121, account: "GEN. TRADE", outlet: "GEN TRADE - CAPITOL BAZAAR" },
  { id: 122, account: "GEN. TRADE", outlet: "GEN TRADE - LADYS MART" },
  {
    id: 123,
    account: "GEN. TRADE",
    outlet: "GEN TRADE - NCCC CHOICE PUBLIC MARKET",
  },
  { id: 124, account: "GEN. TRADE", outlet: "GEN TRADE - NCCC HB1 BONIFACIO" },
  { id: 125, account: "GEN. TRADE", outlet: "GEN TRADE - NCCC NOVA TIERRA" },
  { id: 126, account: "GEN. TRADE", outlet: "GEN TRADE - NOVO OZMIS CITY" },
  { id: 127, account: "GEN. TRADE", outlet: "GEN TRADE - PALANA STORE" },
  { id: 128, account: "GEN. TRADE", outlet: "GEN TRADE - PRICESMART" },
  {
    id: 129,
    account: "GEN. TRADE",
    outlet: "GEN TRADE - RTM SALES &GROUP INC",
  },
  {
    id: 130,
    account: "GEN. TRADE",
    outlet: "GEN TRADE - SOUTH SEAS SUPERRAMA",
  },
  { id: 131, account: "GEN. TRADE", outlet: "GEN TRADE - UNITOP COGON" },
  { id: 132, account: "GEN. TRADE", outlet: "GEN. TRADE - BAYAMBANG GROCERY" },
  { id: 133, account: "GEN. TRADE", outlet: "GEN. TRADE - ERGO SUPERMARKET" },
  { id: 134, account: "GEN. TRADE", outlet: "GEN. TRADE - JTC SUPERMARKET" },
  {
    id: 135,
    account: "GEN. TRADE",
    outlet: "GEN. TRADE - LAIDAS CEDRON GROCERY",
  },
  { id: 136, account: "GEN. TRADE", outlet: "GEN. TRADE - ROSE GROCERY" },
  { id: 137, account: "GEN. TRADE", outlet: "GEN. TRADE BAMBI SUPERMARKET" },
  { id: 138, account: "GEN. TRADE", outlet: "GEN. TRADE JELRA SUPERMARKET" },
  { id: 139, account: "GEN. TRADE", outlet: "GEN. TRADE MELBA GROCERY" },
  { id: 140, account: "GEN. TRADE", outlet: "GEN. TRADE UP TO DATE GROCERY" },
  { id: 141, account: "GEN. TRADE", outlet: "GOLDEN M (.25)" },
  { id: 142, account: "GEN. TRADE", outlet: "JEREMYS - LEMERY" },
  { id: 143, account: "GEN. TRADE", outlet: "KB ABAD" },
  { id: 144, account: "GEN. TRADE", outlet: "MB MANALO (.25)" },
  { id: 145, account: "GEN. TRADE", outlet: "NOVO OZMIS CITY" },
  { id: 146, account: "GEN. TRADE", outlet: "SOUTH EMERALD BOAC (.25)" },
  { id: 147, account: "GEN. TRADE", outlet: "SOUTH EMERALD GASAN (.25)" },
  { id: 148, account: "ISETANN", outlet: "ISETANN – CARRIEDO" },
  { id: 149, account: "ISETANN", outlet: "ISETANN – CUBAO" },
  { id: 150, account: "ISETANN", outlet: "ISETANN- RECTO" },
  { id: 151, account: "ISETANN", outlet: "ISETANN – STA.MESA" },
  { id: 152, account: "LANDMARK", outlet: "LANDMARK - ALABANG" },
  { id: 153, account: "LANDMARK", outlet: "LANDMARK - MAKATI-1" },
  { id: 154, account: "LANDMARK", outlet: "LANDMARK - MAKATI-2" },
  { id: 155, account: "LANDMARK", outlet: "LANDMARK - MANILA BAY" },
  { id: 156, account: "LANDMARK", outlet: "LANDMARK - NUVALI" },
  { id: 157, account: "LANDMARK", outlet: "LANDMARK - TRINOMA COMPLEX" },
  { id: 158, account: "LANDMARK", outlet: "LANDMARK - TRINOMA MAIN" },
  { id: 159, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - ALABANG" },
  { id: 160, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - CALAMBA" },
  { id: 161, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - LEVERIZA" },
  { id: 162, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - LRT" },
  { id: 163, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - PASIG" },
  { id: 164, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - SAMPALOC" },
  { id: 165, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - SAN PABLO" },
  { id: 166, account: "LIANAS", outlet: "LIANA'S SUPERMARKET - STO TOMAS" },
  { id: 167, account: "LIANAS", outlet: "LIANAS SUPERMARKET - EVACOM" },
  { id: 168, account: "MAGIS PASIG", outlet: "PIONEER CENTRE- PIONEER PASIG" },
  { id: 169, account: "MAGIS PASIG", outlet: "STA LUCIA - PHASE1" },
  { id: 170, account: "MAGIS PASIG", outlet: "STA LUCIA - PHASE3" },
  { id: 171, account: "MAGIS PASIG", outlet: "TROPICAL HUT - FTI" },
  { id: 172, account: "MAGIS PASIG", outlet: "TROPICAL HUT - PANAY" },
  { id: 173, account: "MAGIS Q.C", outlet: "HI-TOP SUPERMARKET - AURORA BLVD" },
  { id: 174, account: "MAGIS Q.C", outlet: "HI-TOP SUPERMARKET - Q.AVE." },
  { id: 175, account: "MERRYMART", outlet: "MERRYMART DOUBLE DRAGON" },
  {
    id: 176,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - ALABANG",
  },
  {
    id: 177,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - ANTIPOLO",
  },
  {
    id: 178,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - BINONDO",
  },
  {
    id: 179,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - FELIZ",
  },
  {
    id: 180,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - GATE3",
  },
  {
    id: 181,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - IMUS",
  },
  {
    id: 182,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - LEGAZPI",
  },
  {
    id: 183,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - LUCENA",
  },
  {
    id: 184,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - MARKET MARKET",
  },
  {
    id: 185,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - MARKET MARKET -2",
  },
  {
    id: 186,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - NAGA",
  },
  {
    id: 187,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - NEW PORT",
  },
  {
    id: 188,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - SHAW",
  },
  {
    id: 189,
    account: "METRO RETAILS",
    outlet: "METRO RETAILS STORES GROUP, INC. - TAGAYTAY",
  },
  { id: 190, account: "NG CHAIN", outlet: "MAKATI SUP. - ALABANG" },
  { id: 191, account: "NG CHAIN", outlet: "UNIMART - CAPITAL COMMON PASIG" },
  { id: 192, account: "NG CHAIN", outlet: "UNIMART- GREENHILLS,SANJUAN" },
  { id: 193, account: "PUREGOLD", outlet: "AYAGOLD NORTH VERTIS" },
  { id: 194, account: "PUREGOLD", outlet: "AYAGOLD UP TOWN" },
  { id: 195, account: "PUREGOLD", outlet: "MERKADO AVIDA" },
  { id: 196, account: "PUREGOLD", outlet: "PUREGOLD - 88 SQUARE PARANAQUE" },
  { id: 197, account: "PUREGOLD", outlet: "PUREGOLD - AGLIPAY" },
  { id: 198, account: "PUREGOLD", outlet: "PUREGOLD - BONGABONG" },
  { id: 199, account: "PUREGOLD", outlet: "PUREGOLD - CALAPAN" },
  { id: 200, account: "PUREGOLD", outlet: "PUREGOLD - CADIZ" },
  { id: 201, account: "PUREGOLD", outlet: "PUREGOLD - CALINOG" },
  { id: 202, account: "PUREGOLD", outlet: "PUREGOLD - CANLAON" },
  { id: 203, account: "PUREGOLD", outlet: "PUREGOLD - GEN T. DE LEON" },
  { id: 204, account: "PUREGOLD", outlet: "PUREGOLD - GUADALUPE" },
  { id: 205, account: "PUREGOLD", outlet: "PUREGOLD - ILIGAN" },
  { id: 206, account: "PUREGOLD", outlet: "PUREGOLD - JARO" },
  { id: 207, account: "PUREGOLD", outlet: "PUREGOLD - LA CASTELLANA" },
  { id: 208, account: "PUREGOLD", outlet: "PUREGOLD - PONTEVEDRA ROXAS" },
  { id: 209, account: "PUREGOLD", outlet: "PUREGOLD - SAN LEONARDO" },
  { id: 210, account: "PUREGOLD", outlet: "PUREGOLD - TANJAY" },
  { id: 211, account: "PUREGOLD", outlet: "PUREGOLD -TALISAY" },
  { id: 212, account: "PUREGOLD", outlet: "PUREGOLD CROSSING EAST" },
  { id: 213, account: "PUREGOLD", outlet: "PUREGOLD DIVI SAN MIGUEL" },
  { id: 214, account: "PUREGOLD", outlet: "PUREGOLD DIVIMART - INOCENCIO" },
  { id: 215, account: "PUREGOLD", outlet: "PUREGOLD DIVIMART - MANGGAHAN" },
  { id: 216, account: "PUREGOLD", outlet: "PUREGOLD DIVIMART - MAMBOG" },
  { id: 217, account: "PUREGOLD", outlet: "PUREGOLD DV - BUNSURAN" },
  { id: 218, account: "PUREGOLD", outlet: "PUREGOLD DV - ORANI" },
  { id: 219, account: "PUREGOLD", outlet: "PUREGOLD DV-TUKTUKAN GUIGUINTO" },
  { id: 220, account: "PUREGOLD", outlet: "PUREGOLD JR. ELVINDA" },
  { id: 221, account: "PUREGOLD", outlet: "PUREGOLD JUNIOR - CABUYAO BAYAN" },
  { id: 222, account: "PUREGOLD", outlet: "PUREGOLD MINIMART - DONA SOLEDAD" },
  { id: 223, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - 999" },
  {
    id: 224,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - 999 CALOOCAN",
  },
  { id: 225, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ABUCAY" },
  { id: 226, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - AGUIRRE" },
  { id: 227, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ALAMINOS" },
  { id: 228, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ALIBAGU" },
  { id: 229, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ALANG-ALANG" },
  { id: 230, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ANABU" },
  { id: 231, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ANGELES" },
  {
    id: 232,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ANGELES - MAGALANG ROAD EPZA",
  },
  { id: 233, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ANGONO" },
  { id: 234, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ANTIPOLO" },
  { id: 235, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ANTIQUE" },
  { id: 236, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - APPARI" },
  {
    id: 237,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ARAYAT PAMPANGA",
  },
  {
    id: 238,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - AYALA MALL MARIKINA",
  },
  { id: 239, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BACNOTAN" },
  { id: 240, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BACOOR" },
  { id: 241, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BAESA" },
  { id: 242, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BAGUIO" },
  { id: 243, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BALIWAG" },
  { id: 244, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BALANGA" },
  { id: 245, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BALINTAWAK" },
  {
    id: 246,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BAROTAC NUEVO",
  },
  {
    id: 247,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BAROTAC VIEJO",
  },
  { id: 248, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BATO" },
  { id: 249, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BANSALAN" },
  { id: 250, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BALER (N.E)" },
  {
    id: 251,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BAYBAY LEYTE",
  },
  { id: 252, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BINANGONAN" },
  { id: 253, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BLUMENTRITT" },
  {
    id: 254,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BOAC MARINDUQUE",
  },
  { id: 255, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BORONGAN" },
  { id: 256, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BUCANDALA" },
  {
    id: 257,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BUHAY NA TUBIG",
  },
  {
    id: 258,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BULAKAN,BULAKAN",
  },
  { id: 259, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BUNTUN" },
  { id: 260, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BURGOS" },
  { id: 261, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BUTUAN" },
  { id: 262, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - C. RAYMUNDO" },
  { id: 263, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CABANATUAN" },
  {
    id: 264,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CAGAYAN DE ORO",
  },
  { id: 265, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CALABANGA" },
  { id: 266, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CALAUAN" },
  { id: 267, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CALICANTO" },
  {
    id: 268,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CALIHAN HIGHWAY",
  },
  { id: 269, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CALOOCAN" },
  { id: 270, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CAMARIN" },
  { id: 271, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CARIGARA" },
  { id: 272, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CARMONA" },
  { id: 273, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CASTILLEJOS" },
  { id: 274, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CENTRO NAGA" },
  { id: 275, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CHAMPACA" },
  {
    id: 276,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CIRCUMFERENCIAL (N.E)",
  },
  {
    id: 277,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CIRCUMFERENTIAL ROAD",
  },
  {
    id: 278,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - COMMONWEALTH-1",
  },
  {
    id: 279,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - COMMONWEALTH-2",
  },
  { id: 280, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CONCEPCION" },
  {
    id: 281,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - COTABATO FIESTA MALL",
  },
  {
    id: 282,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - COTABATO MAIN",
  },
  {
    id: 283,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CROSSING (N.E)",
  },
  { id: 284, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CROSSROAD" },
  { id: 285, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CULIAT" },
  { id: 286, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DAU" },
  { id: 287, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DAU 2" },
  {
    id: 288,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - DAU ACCESS ROAD",
  },
  { id: 289, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DEPARO" },
  { id: 290, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DIGOS" },
  { id: 291, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DINALUPIHAN" },
  { id: 292, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DIVISORIA" },
  { id: 293, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DOLORES" },
  { id: 294, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DULAG" },
  { id: 295, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DV HERBOSA" },
  { id: 296, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - DUTY FREE" },
  { id: 297, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - EASTLAND" },
  { id: 298, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ESCALANTE" },
  { id: 299, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - EXTRA COGEO" },
  { id: 300, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - FERTUNA" },
  { id: 301, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - FTI" },
  { id: 302, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - GAGALANGIN" },
  { id: 303, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - GMA" },
  { id: 304, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - GUIMBA" },
  {
    id: 305,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - GULOD MALAYA",
  },
  {
    id: 306,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - HAGONOY BULACAN",
  },
  { id: 307, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - HINIGARAN" },
  {
    id: 308,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - IBA ZAMBALES",
  },
  { id: 309, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ILAGAN" },
  { id: 310, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - IRIGA" },
  {
    id: 311,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - IROSIN SORSOGON",
  },
  { id: 312, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - J&F MONKAYO" },
  { id: 313, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - JUNCTION" },
  { id: 314, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - KABANKALAN" },
  { id: 315, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - KALENTONG" },
  { id: 316, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - KANANGA" },
  { id: 317, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - KANLAON" },
  { id: 318, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - KASIGLAHAN" },
  { id: 319, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - KAWIT" },
  {
    id: 320,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - LA TRINIDAD BENGUET",
  },
  { id: 321, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LA UNION" },
  { id: 322, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LAL-LO" },
  { id: 323, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LANGIHAN" },
  { id: 324, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LANANG" },
  { id: 325, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LANGARAY" },
  { id: 326, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LANGIT ROAD" },
  { id: 327, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LAOAG" },
  { id: 328, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LAS PINAS" },
  { id: 329, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LAS PINAS 2" },
  {
    id: 330,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - LEGAZPI ALBAY",
  },
  { id: 331, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LEGAZPI" },
  { id: 332, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LIBERTAD" },
  {
    id: 333,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - LIBERTAD BACOLOD",
  },
  { id: 334, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LIBERTAD-2" },
  {
    id: 335,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - LIAS MARILAO",
  },
  { id: 336, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LIGAYA" },
  { id: 337, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LIMAY" },
  { id: 338, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LIPA" },
  { id: 339, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LUCENA" },
  { id: 340, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LUPON" },
  { id: 341, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MABALACAT" },
  { id: 342, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MAKATI-1" },
  { id: 343, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MAKATI-2" },
  { id: 344, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MALABON" },
  { id: 345, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MALATE" },
  { id: 346, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MALANDAY" },
  { id: 347, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MANSILINGAN" },
  { id: 348, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MARAWI" },
  {
    id: 349,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MARILAO PLAZA CECILIA",
  },
  { id: 350, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MARIVELES" },
  { id: 351, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MASANTOL" },
  { id: 352, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MAWAQUE" },
  { id: 353, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MAYOMBO" },
  { id: 354, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MAYPAJO" },
  { id: 355, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MEXICO" },
  {
    id: 356,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MEYCAUAYAN BANGA",
  },
  {
    id: 357,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MINDANAO AVE",
  },
  {
    id: 358,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MOLINO BLVD.",
  },
  { id: 359, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MOLINO ROAD" },
  {
    id: 360,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MOLINO TOWN CENTER",
  },
  { id: 361, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MONUMENTO" },
  { id: 362, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MOONWALK" },
  { id: 363, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MUZON" },
  { id: 364, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MURCIA" },
  {
    id: 365,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - NAGA DIVERSION",
  },
  { id: 366, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - NAVOTAS" },
  {
    id: 367,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - NEW MARKET BATANGAS (G)",
  },
  { id: 368, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - NITANG" },
  {
    id: 369,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH",
  },
  {
    id: 370,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - NORTH COMMONWEALTH 2",
  },
  { id: 371, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - NOVELETA" },
  {
    id: 372,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - NOVELETA OASIS",
  },
  { id: 373, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - NOVALICHES" },
  { id: 374, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - OBANDO" },
  { id: 375, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ORMOC" },
  { id: 376, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - OZAMIS" },
  {
    id: 377,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PACIFIC MALL (N.E)",
  },
  { id: 378, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PACO" },
  { id: 379, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PALO" },
  { id: 380, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PAOMBONG" },
  { id: 381, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PARANAQUE-1" },
  { id: 382, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PARANAQUE-2" },
  {
    id: 383,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PASO DE BLAS- 1",
  },
  {
    id: 384,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PASO DE BLAS- 2",
  },
  { id: 385, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PANTUKAN" },
  { id: 386, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PAYATAS" },
  { id: 387, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PAVIA" },
  { id: 388, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PILI" },
  {
    id: 389,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PORT BACOLOD",
  },
  {
    id: 390,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BATA BACOLOD",
  },
  {
    id: 391,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - 888 CHINA TOWN SQUARE",
  },
  { id: 392, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - Q. AVE" },
  { id: 393, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - Q. PLAZA" },
  { id: 394, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - Q.I -1" },
  { id: 395, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - Q.I -2" },
  { id: 396, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - REMANVILLE" },
  { id: 397, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ROSARIO" },
  {
    id: 398,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ROSARIO BATANGAS",
  },
  {
    id: 399,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ROXAS ISABELA",
  },
  {
    id: 400,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ROXAS MINDORO",
  },
  { id: 401, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN ANTONIO" },
  { id: 402, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN CARLOS" },
  {
    id: 403,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN DIONISIO",
  },
  { id: 404, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN FABIAN" },
  {
    id: 405,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN ISIDRO CABUYAO",
  },
  {
    id: 406,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN ISIDRO MONTALBAN",
  },
  {
    id: 407,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE DEL MONTE PALMERA",
  },
  {
    id: 408,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE NUEVA ECIJA (N.E)",
  },
  {
    id: 409,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN MIGUEL BULACAN",
  },
  { id: 410, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN PABLO" },
  { id: 411, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN PEDRO" },
  { id: 412, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN RAFAEL" },
  { id: 413, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN SIMON" },
  {
    id: 414,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SANTIAGO HIGHWAY",
  },
  { id: 415, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SHAW-1" },
  { id: 416, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SIARGAO" },
  { id: 417, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SILANG" },
  { id: 418, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SINDALAN" },
  { id: 419, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SKY REGENCY" },
  { id: 420, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SOGOD" },
  { id: 421, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SOLANA" },
  { id: 422, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SORSOGON" },
  { id: 423, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SOUTHGATE" },
  { id: 424, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SOUTHPARK" },
  {
    id: 425,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - STA. CRUZ (G)",
  },
  { id: 426, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - STA.BARBARA" },
  { id: 427, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - STA.MESA" },
  {
    id: 428,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - STA.ROSA BAYAN (G)",
  },
  {
    id: 429,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - STA.ROSA BALIBAGO",
  },
  { id: 430, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - STO.TOMAS" },
  {
    id: 431,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - STO.TOMAS BATANGAS",
  },
  { id: 432, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SUCAT" },
  { id: 433, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SUBIC" },
  { id: 434, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SUMULONG" },
  { id: 435, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SUSANO" },
  { id: 436, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TABUK" },
  { id: 437, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAGUIG" },
  { id: 438, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TANAUAN" },
  { id: 439, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TANAY" },
  {
    id: 440,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TANGOS BALIWAG",
  },
  { id: 441, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TANZA" },
  { id: 442, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAYTAY" },
  { id: 443, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAYTAY -2" },
  {
    id: 444,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TAYTAY FLOODWAY",
  },
  { id: 445, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAGAPO" },
  { id: 446, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAGAYTAY" },
  {
    id: 447,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TABANG GUIGUINTO",
  },
  { id: 448, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TALAON" },
  { id: 449, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TANAUAN" },
  {
    id: 450,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TANZANG LUMA",
  },
  {
    id: 451,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TAYTAY PALENGKE",
  },
  {
    id: 452,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TIAONG HIGWAY",
  },
  {
    id: 453,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TERMINAL MALL",
  },
  { id: 454, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TERESA" },
  { id: 455, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TUMAUINI" },
  { id: 456, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TUAO" },
  {
    id: 457,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TUNGKONG MANGGA",
  },
  { id: 458, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - URDANETA" },
  { id: 459, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - VALENCIA" },
  {
    id: 460,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - VICTORIA LAGUNA",
  },
  {
    id: 461,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - VICTORY MALL",
  },
  { id: 462, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - VIGAN" },
  { id: 463, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - VILLASIS" },
  { id: 464, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - VISAYAS" },
  {
    id: 465,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E)",
  },
  { id: 466, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ZABARTE" },
  { id: 467, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ZARAGOZA" },
  {
    id: 468,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ZULUETA (N.E)",
  },
  {
    id: 469,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA) - BROOKSIDE CAINTA",
  },
  {
    id: 470,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- A. BONIFACIO",
  },
  {
    id: 471,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- AMPID",
  },
  {
    id: 472,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO BAYAN",
  },
  {
    id: 473,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- ANGONO HIGH WAY",
  },
  {
    id: 474,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CANLUBANG",
  },
  {
    id: 475,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CABUYAO BANLIC",
  },
  {
    id: 476,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- GOLDEN CITY",
  },
  {
    id: 477,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- GUITNANG BAYAN",
  },
  {
    id: 478,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- HALANG",
  },
  {
    id: 479,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- LOS BANOS",
  },
  {
    id: 480,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MAGDIWANG",
  },
  {
    id: 481,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- MAMATID",
  },
  {
    id: 482,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- OSMENA",
  },
  {
    id: 483,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PANORAMA",
  },
  {
    id: 484,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PARANG",
  },
  {
    id: 485,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PHILAM",
  },
  {
    id: 486,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- PRINZA",
  },
  {
    id: 487,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- SAN PABLO",
  },
  {
    id: 488,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- STA. ELENA",
  },
  {
    id: 489,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TAGAYTAY",
  },
  {
    id: 490,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TIAONG",
  },
  {
    id: 491,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TANDANG SORA",
  },
  {
    id: 492,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- 3RD AVE",
  },
  { id: 493, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- ABUCAY" },
  {
    id: 494,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ANTIPOLO",
  },
  {
    id: 495,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BAKAKENG",
  },
  { id: 496, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- BALARA" },
  {
    id: 497,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BALIBAGO",
  },
  {
    id: 498,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BATASAN",
  },
  {
    id: 499,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BAYAMBANG",
  },
  {
    id: 500,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BF HOMES",
  },
  { id: 501, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- BINAN" },
  {
    id: 502,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BLUMENTRITT CGH",
  },
  { id: 503, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- BOCOBO" },
  { id: 504, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- BONUAN" },
  {
    id: 505,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- BUSTILLOS",
  },
  {
    id: 506,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CAMALIG",
  },
  {
    id: 507,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CALVARIO",
  },
  {
    id: 508,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CANLUBANG",
  },
  {
    id: 509,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CARRIEDO",
  },
  {
    id: 510,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CONCEPCION",
  },
  {
    id: 511,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- CROSSTOWN",
  },
  {
    id: 512,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DASMA BAYAN",
  },
  {
    id: 513,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DE CASTRO",
  },
  {
    id: 514,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DEL MONTE",
  },
  {
    id: 515,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DON ANTONIO",
  },
  {
    id: 516,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DON JUICO",
  },
  {
    id: 517,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DOROTEO JOSE",
  },
  {
    id: 518,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- DULONG BAYAN SAN MATEO",
  },
  { id: 519, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- ESPANA" },
  {
    id: 520,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GEN TRIAS",
  },
  {
    id: 521,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- GOLDEN CITY",
  },
  { id: 522, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- GUAGUA" },
  { id: 523, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- HABAY" },
  {
    id: 524,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- HERMOSA",
  },
  {
    id: 525,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- HUGO PEREZ",
  },
  {
    id: 526,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- JUAN LUNA",
  },
  {
    id: 527,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- KALAYAAN",
  },
  {
    id: 528,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- KARUHATAN",
  },
  {
    id: 529,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LIBERTAD",
  },
  { id: 530, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- LILAC" },
  {
    id: 531,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LOMA DE GATO",
  },
  {
    id: 532,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- LOS BANOS",
  },
  { id: 533, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- LUBAO" },
  {
    id: 534,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MALINTA",
  },
  {
    id: 535,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MALINAO PASIG",
  },
  {
    id: 536,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MARCOS ALVAREZ",
  },
  {
    id: 537,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MARIKINA",
  },
  {
    id: 538,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MERCEDEZ",
  },
  {
    id: 539,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- MOTHER IGNACIA",
  },
  { id: 540, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- NAIC" },
  { id: 541, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- NANGKA" },
  {
    id: 542,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- OLD CENTRO",
  },
  { id: 543, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- ORANI" },
  {
    id: 544,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ORTIGAS EXT EAST SUMMIT",
  },
  {
    id: 545,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PALIPARAN",
  },
  { id: 546, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- PANDI" },
  {
    id: 547,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- PANDACAN",
  },
  { id: 548, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- PAROLA" },
  { id: 549, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- PORAC" },
  { id: 550, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- PUREZA" },
  {
    id: 551,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- QUIRINO HI WAY",
  },
  {
    id: 552,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ROSARIO",
  },
  {
    id: 553,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SF 1 DOLORES",
  },
  {
    id: 554,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SF 2 CAFÉ FERNANDINO",
  },
  {
    id: 555,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SAN JUAN BATANGAS",
  },
  {
    id: 556,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- SASMUAN",
  },
  {
    id: 557,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- STO.TOMAS",
  },
  {
    id: 558,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAGAYTAY-A",
  },
  {
    id: 559,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAGAYTAY-B",
  },
  {
    id: 560,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAYTAY ANNEX",
  },
  {
    id: 561,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- TAYTAY PALENGKE",
  },
  { id: 562, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- TIMOG" },
  { id: 563, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- TIPAS" },
  { id: 564, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB (JR.)- USUSAN" },
  {
    id: 565,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- V. MAPA",
  },
  {
    id: 566,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- WEST AVE.",
  },
  {
    id: 567,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ZABARTE",
  },
  {
    id: 568,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.)- ZURBARAN",
  },
  {
    id: 569,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (JR.) -CENTROPLEX",
  },
  {
    id: 570,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- LIBIS",
  },
  {
    id: 571,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- MAGSAYSAY",
  },
  {
    id: 572,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- PILA",
  },
  {
    id: 573,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (MINIMART.)- VILLA OLYMPIA",
  },
  { id: 574, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB -CANDABA" },
  { id: 575, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB -DV ALIAGA" },
  { id: 576, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB -DUTY FREE" },
  { id: 577, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB -GUIHULNGAN" },
  { id: 578, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB -MONTALBAN" },
  {
    id: 579,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB -SUPERPALENGKE, ANTIPOLO (G)",
  },
  { id: 580, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - AGORA" },
  { id: 581, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - ALIW" },
  {
    id: 582,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - AMPID SAN MATEO (G)",
  },
  { id: 583, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BINAN BAYAN" },
  { id: 584, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BINAN" },
  { id: 585, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - BOCAUE" },
  {
    id: 586,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BURGOS MONTALBAN",
  },
  {
    id: 587,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - BURNHAM PARK",
  },
  {
    id: 588,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CASA CECILIA",
  },
  { id: 589, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - CASIMIRO" },
  {
    id: 590,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CABANATUAN PALENGKE (N.E)",
  },
  {
    id: 591,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CALAMBA BAYAN",
  },
  {
    id: 592,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - CROSSING CALAMBA",
  },
  {
    id: 593,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - DRT HI-WAY (N.E)",
  },
  {
    id: 594,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - DASMARINAS HIGH WAY",
  },
  { id: 595, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - EASTLAND" },
  {
    id: 596,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - GUINGUINTO BAYAN",
  },
  { id: 597, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - HALANG" },
  { id: 598, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - LANGGAM" },
  {
    id: 599,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MARCOS ALVAREZ LAS PINAS",
  },
  { id: 600, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MALOLOS" },
  {
    id: 601,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - MALOLOS JUNCTION",
  },
  { id: 602, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - MAUNLAD" },
  { id: 603, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - OLONGAPO" },
  {
    id: 604,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - ORTIGAS AVE EXT PASIG (G)",
  },
  { id: 605, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - OZAMIS" },
  {
    id: 606,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PAG ASA BINANGONAN (G)",
  },
  { id: 607, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PACITA" },
  { id: 608, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - PASIG" },
  {
    id: 609,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PULANG LUPA DOS",
  },
  {
    id: 610,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PULANG LUPA UNO",
  },
  {
    id: 611,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - PUBLIC MARKET",
  },
  {
    id: 612,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN ILDEFONSO",
  },
  {
    id: 613,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - SAN JOSE DEL MONTE PALMERA",
  },
  { id: 614, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - SAN PEDRO" },
  { id: 615, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - STA.MARIA" },
  {
    id: 616,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - STA.MARIA BAYAN",
  },
  { id: 617, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TALAVERA" },
  { id: 618, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAYUMAN-1" },
  { id: 619, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TAYUMAN-2" },
  {
    id: 620,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TIAONG HIGWAY",
  },
  { id: 621, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB - TS CRUZ" },
  {
    id: 622,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - TUNGKONG MANGGA",
  },
  {
    id: 623,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - VALENZUELA-1",
  },
  {
    id: 624,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB - VICTORY NORTE SANTIAGO (N.E)",
  },
  {
    id: 625,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CABUYAO BANLIC",
  },
  {
    id: 626,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- CANLUBANG",
  },
  {
    id: 627,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- LOS BANOS",
  },
  {
    id: 628,
    account: "PUREGOLD",
    outlet: "PUREGOLD PRICE CLUB (EXTRA.)- TAGUIG HAGONOY",
  },
  { id: 629, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB-CABIAO" },
  { id: 630, account: "PUREGOLD", outlet: "PUREGOLD PRICE CLUB-DV ALIAGA" },
  { id: 631, account: "PUREGOLD", outlet: "PUREGOLD-ALLACAPAN" },
  { id: 632, account: "PUREGOLD", outlet: "PUREGOLD-BACOLOR" },
  { id: 633, account: "PUREGOLD", outlet: "PUREGOLD-BAMBOO ORGAN" },
  { id: 634, account: "PUREGOLD", outlet: "PUREGOLD-BAYANAN EXTRA" },
  { id: 635, account: "PUREGOLD", outlet: "PUREGOLD-CALUMPIT" },
  { id: 636, account: "PUREGOLD", outlet: "PUREGOLD-CATANAUAN" },
  { id: 637, account: "PUREGOLD", outlet: "PUREGOLD-DV ANGAT" },
  { id: 638, account: "PUREGOLD", outlet: "PUREGOLD-DV CABANATUAN" },
  { id: 639, account: "PUREGOLD", outlet: "PUREGOLD-DV MORONG" },
  { id: 640, account: "PUREGOLD", outlet: "PUREGOLD-DV PANDI" },
  { id: 641, account: "PUREGOLD", outlet: "PUREGOLD-DV PULILAN" },
  { id: 642, account: "PUREGOLD", outlet: "PUREGOLD-DV SAN ISIDRO TAYTAY" },
  { id: 643, account: "PUREGOLD", outlet: "PUREGOLD-DV SAN MIGUEL PASIG" },
  { id: 644, account: "PUREGOLD", outlet: "PUREGOLD-DV TAYTAY" },
  { id: 645, account: "PUREGOLD", outlet: "PUREGOLD-DV BANLIC" },
  { id: 646, account: "PUREGOLD", outlet: "PUREGOLD-DV PULO" },
  { id: 647, account: "PUREGOLD", outlet: "PUREGOLD-GOLDEN ACRES" },
  { id: 648, account: "PUREGOLD", outlet: "PUREGOLD-GUMACA" },
  { id: 649, account: "PUREGOLD", outlet: "PUREGOLD-CALAUAG" },
  { id: 650, account: "PUREGOLD", outlet: "PUREGOLD-GUIUAN" },
  { id: 651, account: "PUREGOLD", outlet: "PUREGOLD-HINUNANGAN" },
  { id: 652, account: "PUREGOLD", outlet: "PUREGOLD-CALBAYOG" },
  { id: 653, account: "PUREGOLD", outlet: "PUREGOLD-MANGATAREM" },
  { id: 654, account: "PUREGOLD", outlet: "PUREGOLD-MONTILLANO" },
  { id: 655, account: "PUREGOLD", outlet: "PUREGOLD-NORZAGARAY" },
  { id: 656, account: "PUREGOLD", outlet: "PUREGOLD-NOVO OZMIS CITY" },
  { id: 657, account: "PUREGOLD", outlet: "PUREGOLD-PARADAHAN" },
  { id: 658, account: "PUREGOLD", outlet: "PUREGOLD-PILAR VILLAGE" },
  { id: 659, account: "PUREGOLD", outlet: "PUREGOLD-PINAMALAYAN" },
  { id: 660, account: "PUREGOLD", outlet: "PUREGOLD-PRIMO CRUZ MINIMART" },
  { id: 661, account: "PUREGOLD", outlet: "PUREGOLD-SAN AGUSTIN" },
  { id: 662, account: "PUREGOLD", outlet: "PUREGOLD-SARIAYA" },
  { id: 663, account: "PUREGOLD", outlet: "PUREGOLD-SIKAP MINIMART" },
  { id: 664, account: "PUREGOLD", outlet: "PUREGOLD-TALISAY BATANGAS-A" },
  { id: 665, account: "PUREGOLD", outlet: "PUREGOLD-TUGATOG" },
  { id: 666, account: "PUREGOLD", outlet: "PUREGOLD- BOHOL" },
  { id: 667, account: "PUREGOLD", outlet: "PUREGOLD- KASAMBAGAN" },
  { id: 668, account: "PUREGOLD", outlet: "PUREGOLD- MANGO" },
  { id: 669, account: "PUREGOLD", outlet: "PUREGOLD-BARRANCA MINIMART" },
  { id: 670, account: "RDF", outlet: "ROYAL DUTY FREE 1" },
  { id: 671, account: "RDF", outlet: "ROYAL DUTY FREE 2" },
  { id: 672, account: "ROBINSONS", outlet: "RC ALVAREZ - LEMERY" },
  { id: 673, account: "ROBINSONS", outlet: "ROBINSON - ILOCOS" },
  { id: 674, account: "ROBINSONS", outlet: "ROBINSON - NEW VALENCIA" },
  {
    id: 675,
    account: "ROBINSONS",
    outlet: "ROBINSON EASYMART- MARIKINA HEIGHTS",
  },
  { id: 676, account: "ROBINSONS", outlet: "ROBINSON EASYMART - NOVALICHES" },
  { id: 677, account: "ROBINSONS", outlet: "ROBINSON PLACE - OTIS" },
  { id: 678, account: "ROBINSONS", outlet: "ROBINSON SUPERMARKET - GROTTO" },
  { id: 679, account: "ROBINSONS", outlet: "ROBINSON SUPERMARKET - LOS BANOS" },
  { id: 680, account: "ROBINSONS", outlet: "ROBENSON-TOWNVILLE ABREEZA DAVAO" },
  {
    id: 681,
    account: "ROBINSONS",
    outlet: "ROBINSONS - 8 FORBES TOWN ROAD TAGUIG.",
  },
  {
    id: 682,
    account: "ROBINSONS",
    outlet: "ROBINSONS - ACACIA ESCALADES PASIG",
  },
  { id: 683, account: "ROBINSONS", outlet: "ROBINSONS - AL NOR MALL COTABATO" },
  { id: 684, account: "ROBINSONS", outlet: "ROBINSONS - ALICIA" },
  { id: 685, account: "ROBINSONS", outlet: "ROBINSONS - ANTIQUE" },
  { id: 686, account: "ROBINSONS", outlet: "ROBINSONS - BACOLOD TRIANGLE" },
  { id: 687, account: "ROBINSONS", outlet: "ROBINSONS - BALAGTAS" },
  { id: 688, account: "ROBINSONS", outlet: "ROBINSONS - BANAWE" },
  { id: 689, account: "ROBINSONS", outlet: "ROBINSONS - BANILAD CEBU" },
  { id: 690, account: "ROBINSONS", outlet: "ROBINSONS - BASELINE" },
  { id: 691, account: "ROBINSONS", outlet: "ROBINSONS - BF AGUIRRE" },
  { id: 692, account: "ROBINSONS", outlet: "ROBINSONS - BIGNAY VALENZUELA" },
  { id: 693, account: "ROBINSONS", outlet: "ROBINSONS - BLUEWAVE MARIKINA" },
  { id: 694, account: "ROBINSONS", outlet: "ROBINSONS - BUCANDALA" },
  {
    id: 695,
    account: "ROBINSONS",
    outlet: "ROBINSONS - CALIFORNIA MANDALUYONG",
  },
  { id: 696, account: "ROBINSONS", outlet: "ROBINSONS - CASIMIRA" },
  { id: 697, account: "ROBINSONS", outlet: "ROBINSONS - CITIMALL ROXAS" },
  { id: 698, account: "ROBINSONS", outlet: "ROBINSONS - CLOVERLEAF MALL." },
  { id: 699, account: "ROBINSONS", outlet: "ROBINSONS - COMMONWEALTH" },
  {
    id: 700,
    account: "ROBINSONS",
    outlet: "ROBINSONS - COMMONWEALTH(shopwise)",
  },
  { id: 701, account: "ROBINSONS", outlet: "ROBINSONS - CONGRESSIONAL" },
  { id: 702, account: "ROBINSONS", outlet: "ROBINSONS - CYBERGATE DAVAO" },
  { id: 703, account: "ROBINSONS", outlet: "ROBINSONS - DOÑA CARMEN" },
  { id: 704, account: "ROBINSONS", outlet: "ROBINSONS - DOLORES SAN FERNANDO" },
  {
    id: 705,
    account: "ROBINSONS",
    outlet: "ROBINSONS - EASTWOOD TECHNOPLAZA II",
  },
  { id: 706, account: "ROBINSONS", outlet: "ROBINSONS - EMALL NAGA" },
  { id: 707, account: "ROBINSONS", outlet: "ROBINSONS - EASYMART CABUYAO" },
  {
    id: 708,
    account: "ROBINSONS",
    outlet: "ROBINSONS - FEDERAL BAY GARDEN PASAY",
  },
  {
    id: 709,
    account: "ROBINSONS",
    outlet: "ROBINSONS - FILINVEST BATASAN HILLS",
  },
  { id: 710, account: "ROBINSONS", outlet: "ROBINSONS - GALLERIA SOUTH-A" },
  { id: 711, account: "ROBINSONS", outlet: "ROBINSONS - GALLERIA SOUTH-B" },
  { id: 712, account: "ROBINSONS", outlet: "ROBINSONS - GCC MEXICO" },
  { id: 713, account: "ROBINSONS", outlet: "ROBINSONS - GEEGE MALL OZAMIZ" },
  {
    id: 714,
    account: "ROBINSONS",
    outlet: "ROBINSONS - GRACELAND PLAZA MARIKINA",
  },
  {
    id: 715,
    account: "ROBINSONS",
    outlet: "ROBINSONS - GREEN GATE MALAGASANG IMUS",
  },
  { id: 716, account: "ROBINSONS", outlet: "ROBINSONS - GT PARK PLACE MOLO" },
  { id: 717, account: "ROBINSONS", outlet: "ROBINSONS - GUAGUA TOWNCENTER" },
  { id: 718, account: "ROBINSONS", outlet: "ROBINSONS - IMALL CANLUBANG" },
  {
    id: 719,
    account: "ROBINSONS",
    outlet: "ROBINSONS - ISLAND CENTRAL MACTAN",
  },
  { id: 720, account: "ROBINSONS", outlet: "ROBINSONS - KARANGALAN" },
  { id: 721, account: "ROBINSONS", outlet: "ROBINSONS - LAVINA PARK VALENCIA" },
  { id: 722, account: "ROBINSONS", outlet: "ROBINSONS - LIMKETKAI MALL CDO" },
  {
    id: 723,
    account: "ROBINSONS",
    outlet: "ROBINSONS - LUCKY GOLD PLAZA ORTIGAS",
  },
  {
    id: 724,
    account: "ROBINSONS",
    outlet: "ROBINSONS - MADISON GALERIES MUNTINLUPA",
  },
  { id: 725, account: "ROBINSONS", outlet: "ROBINSONS - MAIN SQUARE MOLINO" },
  { id: 726, account: "ROBINSONS", outlet: "ROBINSONS - MC MALABON" },
  { id: 727, account: "ROBINSONS", outlet: "ROBINSONS - MERCEDES PASIG" },
  { id: 728, account: "ROBINSONS", outlet: "ROBINSONS - METRO PLAZA" },
  { id: 729, account: "ROBINSONS", outlet: "ROBINSONS - MEYCAUAYAN" },
  { id: 730, account: "ROBINSONS", outlet: "ROBINSONS - MINGLANILLA" },
  { id: 731, account: "ROBINSONS", outlet: "ROBINSONS - MONTALBAN TOWNCENTER" },
  { id: 732, account: "ROBINSONS", outlet: "ROBINSONS - NEPOMALL ANGELES" },
  { id: 733, account: "ROBINSONS", outlet: "ROBINSONS - NEPOMALL DAGUPAN" },
  { id: 734, account: "ROBINSONS", outlet: "ROBINSONS - NOVALICHES" },
  {
    id: 735,
    account: "ROBINSONS",
    outlet: "ROBINSONS - OPEN MARKET MANSILINGAN",
  },
  { id: 736, account: "ROBINSONS", outlet: "ROBINSONS - ORMOC CENTRUM" },
  { id: 737, account: "ROBINSONS", outlet: "ROBINSONS - PACITA" },
  { id: 738, account: "ROBINSONS", outlet: "ROBINSONS - PAVIA" },
  {
    id: 739,
    account: "ROBINSONS",
    outlet: "ROBINSONS - PORTA VAGA MALL BAGUIO",
  },
  { id: 740, account: "ROBINSONS", outlet: "ROBINSONS - PUEBLO VERDE MACTAN" },
  { id: 741, account: "ROBINSONS", outlet: "ROBINSONS - PULILAN" },
  { id: 742, account: "ROBINSONS", outlet: "ROBINSONS - QUIRINO HI WAY LAGRO" },
  {
    id: 743,
    account: "ROBINSONS",
    outlet: "ROBINSONS - SAN CARLOS TOWN CENTER PANGASINAN",
  },
  { id: 744, account: "ROBINSONS", outlet: "ROBINSONS - SILANG" },
  {
    id: 745,
    account: "ROBINSONS",
    outlet: "ROBINSONS - SOUTH TOWN CENTER TABUNOK",
  },
  {
    id: 746,
    account: "ROBINSONS",
    outlet: "ROBINSONS - SOUTHPARK MALL ALABANG",
  },
  {
    id: 747,
    account: "ROBINSONS",
    outlet: "ROBINSONS - SUMMIT RIDGE TAGAYTAY",
  },
  {
    id: 748,
    account: "ROBINSONS",
    outlet: "ROBINSONS - SUSANO COMPLEX NOVALICHES",
  },
  {
    id: 749,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TALAMBAN TIME SQUARE CEBU",
  },
  { id: 750, account: "ROBINSONS", outlet: "ROBINSONS - TALISAY CEBU" },
  { id: 751, account: "ROBINSONS", outlet: "ROBINSONS - TANDANG SORA" },
  { id: 752, account: "ROBINSONS", outlet: "ROBINSONS - TIMOG" },
  {
    id: 753,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TOWNVILLE ARVO DASMARINAS",
  },
  {
    id: 754,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TOWNVILLE BF PARANAQUE",
  },
  {
    id: 755,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TOWNVILLE BUHAY NA TUBIG",
  },
  {
    id: 756,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TOWNVILLE NUVALI STA ROSA-1",
  },
  {
    id: 757,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TOWNVILLE PERDICES DGT",
  },
  {
    id: 758,
    account: "ROBINSONS",
    outlet: "ROBINSONS - TWINLAKES VILLAGE BATANGAS",
  },
  { id: 759, account: "ROBINSONS", outlet: "ROBINSONS - VALENZUELA" },
  {
    id: 760,
    account: "ROBINSONS",
    outlet: "ROBINSONS - VENICE GRAND MCKINLEY.",
  },
  { id: 761, account: "ROBINSONS", outlet: "ROBINSONS - VICTORY MALL" },
  { id: 762, account: "ROBINSONS", outlet: "ROBINSONS - VILLAMONTE" },
  { id: 763, account: "ROBINSONS", outlet: "ROBINSONS - WOODSVILLE MERVILLE" },
  {
    id: 764,
    account: "ROBINSONS",
    outlet: "ROBINSONS - XENTRO MALL LEMERY BATANGAS-A",
  },
  {
    id: 765,
    account: "ROBINSONS",
    outlet: "ROBINSONS - XENTRO MALL LEMERY BATANGAS-B",
  },
  { id: 766, account: "ROBINSONS", outlet: "ROBINSONS - XENTRO MALL VIGAN" },
  { id: 767, account: "ROBINSONS", outlet: "ROBINSONS - XEVERA MABALACAT" },
  { id: 768, account: "ROBINSONS", outlet: "ROBINSONS - ZABARTE" },
  { id: 769, account: "ROBINSONS", outlet: "ROBINSONS - CENTRO MALL CABUYAO" },
  { id: 770, account: "ROBINSONS", outlet: "ROBINSONS - C3 MALL PAGADIAN" },
  { id: 771, account: "ROBINSONS", outlet: "ROBINSONS - ALBAY 738 LEGAZPI" },
  {
    id: 772,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - ALABANG HILLS",
  },
  { id: 773, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - AMAIA" },
  {
    id: 774,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - ARBORTOWNE VALENZUELA",
  },
  { id: 775, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - ARNAIZ" },
  { id: 776, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - BARAS" },
  {
    id: 777,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - BAMBAN TARLAC",
  },
  { id: 778, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - BASAK" },
  {
    id: 779,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - BETTERLIVING",
  },
  { id: 780, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - BINANGONAN" },
  { id: 781, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - BIRMINGHAM" },
  { id: 782, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - BLOCK ONE" },
  { id: 783, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - BONI" },
  { id: 784, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - CABAHUG" },
  { id: 785, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - CALAMBA" },
  { id: 786, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - CALUMPIT" },
  { id: 787, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - CAPITOL" },
  {
    id: 788,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - CASA ALSELMO MALOLOS",
  },
  { id: 789, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - C.RAYMUNDO" },
  {
    id: 790,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - CONCEPCION TARLAC",
  },
  {
    id: 791,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - CROWN BLDG. STO. TOMAS",
  },
  { id: 792, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - CUTCUT" },
  { id: 793, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - DAHLIA" },
  {
    id: 794,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - E. RODRIGUEZ SR. QC (PURITY)",
  },
  { id: 795, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - EPL" },
  { id: 796, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - FAIRVIEW" },
  { id: 797, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - FIL AM" },
  {
    id: 798,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - FRIENDSHIP ANGELES",
  },
  {
    id: 799,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - GENERAL AVENUE",
  },
  { id: 800, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - GUN-OB" },
  { id: 801, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - HAGONOY" },
  { id: 802, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - HARMONY" },
  { id: 803, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - HERMOSA" },
  {
    id: 804,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - HERMANOS SAN PABLO",
  },
  {
    id: 805,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - HILARIO SAN PABLO",
  },
  { id: 806, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - HILL SIDE" },
  {
    id: 807,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - HOLIDAY ISLAND B.SILANG",
  },
  {
    id: 808,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - HOMES ANTIPOLO",
  },
  { id: 809, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - KAMBAL ROAD" },
  { id: 810, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - KAMUNING" },
  { id: 811, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - LAGRO" },
  { id: 812, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - LANCASTER" },
  {
    id: 813,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - LIGTASAN TARLAC",
  },
  {
    id: 814,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - LOYOLA HEIGHTS QC",
  },
  { id: 815, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - MAGINHAWA" },
  { id: 816, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - MAGALANG" },
  { id: 817, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - MAKATI" },
  { id: 818, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - MANHATTAN" },
  {
    id: 819,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - MARIPOSA ARCADE KAPASIGAN",
  },
  { id: 820, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - MARKET CITY" },
  { id: 821, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - MATATALAIB" },
  {
    id: 822,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - METRO PLAZA B.SILANG",
  },
  { id: 823, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - N' DOMINGO" },
  { id: 824, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - NAGA ROAD" },
  {
    id: 825,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - NAIC CAVITE CITY",
  },
  {
    id: 826,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - NEWTOWN MACTAN",
  },
  { id: 827, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - OLD SAUYO" },
  {
    id: 828,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - ONE MERCEDES",
  },
  {
    id: 829,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - ORANI BATAAN",
  },
  { id: 830, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - P TUAZON" },
  { id: 831, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - PAJAC" },
  { id: 832, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - PANDAN" },
  { id: 833, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - PARDO" },
  { id: 834, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - PATEROS" },
  {
    id: 835,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - PEMBO MAKATI",
  },
  { id: 836, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - PILILLA" },
  { id: 837, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - PIO" },
  { id: 838, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - POBLACION" },
  {
    id: 839,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - PULUNG CACUTUD",
  },
  {
    id: 840,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - ROBLU CAINTA",
  },
  { id: 841, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - ROOSEVELT" },
  {
    id: 842,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - SACRED HEART",
  },
  {
    id: 843,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - SAN FRANCISCO SAN PABLO",
  },
  {
    id: 844,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - SAN LUCAS SAN PABLO",
  },
  { id: 845, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SAN MATEO" },
  { id: 846, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SAN MIGUEL" },
  {
    id: 847,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - SAN SEBASTIAN TARLAC",
  },
  { id: 848, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SAN SIMON" },
  {
    id: 849,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - SAN VICENTE TARLAC",
  },
  { id: 850, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SANDOVAL" },
  { id: 851, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SANTOLAN" },
  { id: 852, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SILANG" },
  { id: 853, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SKYLINE" },
  { id: 854, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SOLANA" },
  { id: 855, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - STAMFORD" },
  { id: 856, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - STARHOMES" },
  {
    id: 857,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - STO TOMAS PASIG",
  },
  {
    id: 858,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - THE EMERALD COURT PROJECT 6",
  },
  { id: 859, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - THE LINK" },
  { id: 860, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - TOWN CENTER" },
  { id: 861, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - TUMANA" },
  {
    id: 862,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - BF RESORT LP",
  },
  {
    id: 863,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - BUHAY NA TUBIG",
  },
  {
    id: 864,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - ALIMA BAY BACOOR",
  },
  {
    id: 865,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - MARCOS ALVAREZ",
  },
  { id: 866, account: "ROBINSONS", outlet: "ROBINSONS EASYMART - SAN LORENZO" },
  {
    id: 867,
    account: "ROBINSONS",
    outlet: "ROBINSONS EASYMART - P. BURGOS CAVITE CITY",
  },
  { id: 868, account: "ROBINSONS", outlet: "ROBINSONS EASYMART -BINANGONAN" },
  { id: 869, account: "ROBINSONS", outlet: "ROBINSONS IBA, ZAMBALES (.50)" },
  {
    id: 870,
    account: "ROBINSONS",
    outlet: "ROBINSONS PLACE - ABUCAY TACLOBAN",
  },
  { id: 871, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ANGELES" },
  { id: 872, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ANTIPOLO" },
  { id: 873, account: "ROBINSONS", outlet: "ROBINSONS PLACE - BUTUAN" },
  { id: 874, account: "ROBINSONS", outlet: "ROBINSONS PLACE - CAGAYAN DE ORO" },
  { id: 875, account: "ROBINSONS", outlet: "ROBINSONS PLACE - CAINTA" },
  { id: 876, account: "ROBINSONS", outlet: "ROBINSONS PLACE - CEBU FUENTE" },
  { id: 877, account: "ROBINSONS", outlet: "ROBINSONS PLACE - DASMARINAS" },
  { id: 878, account: "ROBINSONS", outlet: "ROBINSONS PLACE - DUMAGUETE" },
  { id: 879, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ERMITA-1" },
  { id: 880, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ERMITA-2" },
  { id: 881, account: "ROBINSONS", outlet: "ROBINSONS PLACE - GALLERIA" },
  { id: 882, account: "ROBINSONS", outlet: "ROBINSONS PLACE - GENERAL TRIAS" },
  { id: 883, account: "ROBINSONS", outlet: "ROBINSONS PLACE - GENERAL SANTOS" },
  { id: 884, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ILIGAN" },
  { id: 885, account: "ROBINSONS", outlet: "ROBINSONS PLACE - IMUS" },
  { id: 886, account: "ROBINSONS", outlet: "ROBINSONS PLACE - JARO ILOILO" },
  { id: 887, account: "ROBINSONS", outlet: "ROBINSONS PLACE - LAS PINAS" },
  { id: 888, account: "ROBINSONS", outlet: "ROBINSONS PLACE - LIMA EXCHANGE" },
  { id: 889, account: "ROBINSONS", outlet: "ROBINSONS PLACE - LIPA" },
  { id: 890, account: "ROBINSONS", outlet: "ROBINSONS PLACE - MALABON" },
  { id: 891, account: "ROBINSONS", outlet: "ROBINSONS PLACE - MALOLOS" },
  {
    id: 892,
    account: "ROBINSONS",
    outlet: "ROBINSONS PLACE - MANDALAGAN BACOLOD",
  },
  { id: 893, account: "ROBINSONS", outlet: "ROBINSONS PLACE - METROEAST" },
  { id: 894, account: "ROBINSONS", outlet: "ROBINSONS PLACE - MAGNOLIA" },
  { id: 895, account: "ROBINSONS", outlet: "ROBINSONS PLACE - NAGA" },
  { id: 896, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ORMOC" },
  { id: 897, account: "ROBINSONS", outlet: "ROBINSONS PLACE - PALAWAN" },
  { id: 898, account: "ROBINSONS", outlet: "ROBINSONS PLACE - PAMPANGA" },
  { id: 899, account: "ROBINSONS", outlet: "ROBINSONS PLACE - PANGASINAN" },
  { id: 900, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ROXAS" },
  { id: 901, account: "ROBINSONS", outlet: "ROBINSONS PLACE - SANTIAGO" },
  { id: 902, account: "ROBINSONS", outlet: "ROBINSONS PLACE - STA ROSA" },
  { id: 903, account: "ROBINSONS", outlet: "ROBINSONS PLACE - TACLOBAN" },
  { id: 904, account: "ROBINSONS", outlet: "ROBINSONS PLACE - TAGUM" },
  { id: 905, account: "ROBINSONS", outlet: "ROBINSONS PLACE - TARLAC" },
  { id: 906, account: "ROBINSONS", outlet: "ROBINSONS PLACE - ILOILO" },
  {
    id: 907,
    account: "ROBINSONS",
    outlet: "ROBINSONS SUPERMARKET - SAN MIGUEL",
  },
  { id: 908, account: "ROBINSONS", outlet: "ROBINSONS STA. CRUZ" },
  { id: 909, account: "ROBINSONS", outlet: "ROBINSONS TUGUEGARAO" },
  { id: 910, account: "ROBINSONS", outlet: "ROBINSONS-CULIAT" },
  { id: 911, account: "ROBINSONS", outlet: "ROBINSONS-DON ANTONIO" },
  { id: 912, account: "ROBINSONS", outlet: "ROBINSONS-EASYMART SKYLINE" },
  { id: 913, account: "ROBINSONS", outlet: "ROBINSONS-MIRANILA" },
  { id: 914, account: "ROBINSONS", outlet: "ROBINSONS - TOWNVILLE CABANATUAN" },
  { id: 915, account: "ROBINSONS", outlet: "SHOPWISE - ALABANG" },
  { id: 916, account: "ROBINSONS", outlet: "SHOPWISE - ANTIPOLO" },
  { id: 917, account: "ROBINSONS", outlet: "SHOPWISE - ARANETA CUBAO" },
  { id: 918, account: "ROBINSONS", outlet: "SHOPWISE - BATANGAS" },
  { id: 919, account: "ROBINSONS", outlet: "SHOPWISE - CDOC" },
  { id: 920, account: "ROBINSONS", outlet: "SHOPWISE - CIRCUIT" },
  { id: 921, account: "ROBINSONS", outlet: "SHOPWISE - IMUS" },
  { id: 922, account: "ROBINSONS", outlet: "SHOPWISE - LANCASTER" },
  { id: 923, account: "ROBINSONS", outlet: "SHOPWISE - MAKATI" },
  { id: 924, account: "ROBINSONS", outlet: "SHOPWISE - MAMBALING" },
  { id: 925, account: "ROBINSONS", outlet: "SHOPWISE - PACITA" },
  { id: 926, account: "ROBINSONS", outlet: "SHOPWISE - SAN FERNANDO" },
  { id: 927, account: "ROBINSONS", outlet: "SHOPWISE - STA.ROSA(PASEO)" },
  { id: 928, account: "ROBINSONS", outlet: "SHOPWISE - SUCAT" },
  { id: 929, account: "ROBINSONS", outlet: "SHOPWISE EXPRESS - Q. AVE" },
  { id: 930, account: "ROBINSONS", outlet: "THE MARKET PLACE - MAGALLANES" },
  { id: 931, account: "ROBINSONS", outlet: "THE MARKET PLACE - MAKATI" },
  { id: 932, account: "ROBINSONS", outlet: "THE MARKETPLACE - 30TH" },
  { id: 933, account: "ROBINSONS", outlet: "THE MARKETPLACE - ALPHALAND" },
  { id: 934, account: "ROBINSONS", outlet: "THE MARKETPLACE - AYALA" },
  { id: 935, account: "ROBINSONS", outlet: "THE MARKETPLACE - AYALA ALABANG" },
  { id: 936, account: "ROBINSONS", outlet: "THE MARKETPLACE - BAGUIO" },
  { id: 937, account: "ROBINSONS", outlet: "THE MARKETPLACE - BANAWA" },
  { id: 938, account: "ROBINSONS", outlet: "THE MARKETPLACE - BGC" },
  { id: 939, account: "ROBINSONS", outlet: "THE MARKETPLACE - CAPITOL" },
  { id: 940, account: "ROBINSONS", outlet: "THE MARKETPLACE - CDOC" },
  { id: 941, account: "ROBINSONS", outlet: "THE MARKETPLACE - CENTURY" },
  { id: 942, account: "ROBINSONS", outlet: "THE MARKETPLACE - CORINTHIAN" },
  { id: 943, account: "ROBINSONS", outlet: "THE MARKETPLACE - EASTBAY" },
  { id: 944, account: "ROBINSONS", outlet: "THE MARKETPLACE - EASTWOOD" },
  { id: 945, account: "ROBINSONS", outlet: "THE MARKETPLACE - FESTIVE WALK" },
  {
    id: 946,
    account: "ROBINSONS",
    outlet: "THE MARKETPLACE - GALLERIA SELECTION CEBU",
  },
  { id: 947, account: "ROBINSONS", outlet: "THE MARKETPLACE - GROOVE" },
  { id: 948, account: "ROBINSONS", outlet: "THE MARKETPLACE - KATIPUNAN" },
  { id: 949, account: "ROBINSONS", outlet: "THE MARKETPLACE - MAGNOLIA" },
  { id: 950, account: "ROBINSONS", outlet: "THE MARKETPLACE - METLIVE" },
  { id: 951, account: "ROBINSONS", outlet: "THE MARKETPLACE - OAKRIDGE" },
  { id: 952, account: "ROBINSONS", outlet: "THE MARKETPLACE - OPUS" },
  { id: 953, account: "ROBINSONS", outlet: "THE MARKETPLACE - P.GUEVARRA" },
  { id: 954, account: "ROBINSONS", outlet: "THE MARKETPLACE - PARQAL" },
  { id: 955, account: "ROBINSONS", outlet: "THE MARKETPLACE - PASEO DE ROXAS" },
  { id: 956, account: "ROBINSONS", outlet: "THE MARKETPLACE - ROCKWELL" },
  { id: 957, account: "ROBINSONS", outlet: "THE MARKETPLACE - SAN ANTONIO" },
  { id: 958, account: "ROBINSONS", outlet: "THE MARKETPLACE - SANTOLAN" },
  { id: 959, account: "ROBINSONS", outlet: "THE MARKETPLACE - SHANGRI-LA" },
  { id: 960, account: "ROBINSONS", outlet: "THE MARKETPLACE - TOMAS MORATO" },
  { id: 961, account: "ROBINSONS", outlet: "THE MARKETPLACE - TWO CENTRAL" },
  { id: 962, account: "ROBINSONS", outlet: "THE MARKETPLACE - UPTOWN" },
  { id: 963, account: "ROBINSONS", outlet: "THE MARKETPLACE - WESTBORROUGH" },
  { id: 964, account: "ROBINSONS", outlet: "THE MARKETPLACE- SHANGRI-LA" },
  { id: 965, account: "SOUTH", outlet: "SOUTH - GROCERS BF" },
  { id: 966, account: "SOUTH", outlet: "SOUTH LIPA" },
  { id: 967, account: "SOUTH", outlet: "SOUTH MALOLOS" },
  { id: 968, account: "SOUTH", outlet: "SOUTH MARIKINA" },
  { id: 969, account: "SOUTH", outlet: "SOUTH PASIG" },
  { id: 970, account: "SOUTH", outlet: "SOUTH BRENT" },
  { id: 971, account: "SOUTH", outlet: "SOUTH STO TOMAS" },
  {
    id: 972,
    account: "SOUTH",
    outlet: "SOUTH SUPERMARKET - ALABANG FILINVEST",
  },
  { id: 973, account: "SOUTH", outlet: "SOUTH SUPERMARKET - PAMPANGA" },
  { id: 974, account: "SOUTH", outlet: "SOUTH SUPERMARKET -LOS BANOS" },
  { id: 975, account: "SOUTH", outlet: "SOUTH SUPERMARKET -PASEO STA ROSA" },
  { id: 976, account: "SOUTH", outlet: "SOUTH VALENZUELA" },
  { id: 977, account: "SUPER 8", outlet: "SUPER 8 - ALABANG" },
  { id: 978, account: "SUPER 8", outlet: "SUPER 8 - ANGELES" },
  { id: 979, account: "SUPER 8", outlet: "SUPER 8 - ANGONO" },
  { id: 980, account: "SUPER 8", outlet: "SUPER 8 - ANTIPOLO" },
  { id: 981, account: "SUPER 8", outlet: "SUPER 8 - BACLARAN" },
  { id: 982, account: "SUPER 8", outlet: "SUPER 8 - BAGONG SILANG" },
  { id: 983, account: "SUPER 8", outlet: "SUPER 8 - BAGUMBAYAN" },
  { id: 984, account: "SUPER 8", outlet: "SUPER 8 - BALANGA" },
  { id: 985, account: "SUPER 8", outlet: "SUPER 8 - BALINTAWAK" },
  { id: 986, account: "SUPER 8", outlet: "SUPER 8 - BINANGONAN" },
  { id: 987, account: "SUPER 8", outlet: "SUPER 8 - BLUMENTRITT" },
  { id: 988, account: "SUPER 8", outlet: "SUPER 8 - CAA LAS PINAS" },
  { id: 989, account: "SUPER 8", outlet: "SUPER 8 - CAINTA" },
  { id: 990, account: "SUPER 8", outlet: "SUPER 8 - CAMARIN" },
  { id: 991, account: "SUPER 8", outlet: "SUPER 8 - COGEO" },
  { id: 992, account: "SUPER 8", outlet: "SUPER 8 - COMMONWEALTH" },
  { id: 993, account: "SUPER 8", outlet: "SUPER 8 - DASMARINAS" },
  { id: 994, account: "SUPER 8", outlet: "SUPER 8 - ERMIN GARCIA" },
  { id: 995, account: "SUPER 8", outlet: "SUPER 8 - FARMERS" },
  { id: 996, account: "SUPER 8", outlet: "SUPER 8 - GAGALANGIN" },
  { id: 997, account: "SUPER 8", outlet: "SUPER 8 - GEN. T VALENZUELA" },
  { id: 998, account: "SUPER 8", outlet: "SUPER 8 - GMA" },
  { id: 999, account: "SUPER 8", outlet: "SUPER 8 - GUADALUPE" },
  { id: 1000, account: "SUPER 8", outlet: "SUPER 8 - GUAGUA" },
  { id: 1001, account: "SUPER 8", outlet: "SUPER 8 - HAGONOY" },
  { id: 1002, account: "SUPER 8", outlet: "SUPER 8 - HULONG DUHAT" },
  { id: 1003, account: "SUPER 8", outlet: "SUPER 8 - JACKMAN" },
  { id: 1004, account: "SUPER 8", outlet: "SUPER 8 - KARUHATAN" },
  { id: 1005, account: "SUPER 8", outlet: "SUPER 8 - LA HUERTA" },
  { id: 1006, account: "SUPER 8", outlet: "SUPER 8 - LAS PINAS" },
  { id: 1007, account: "SUPER 8", outlet: "SUPER 8 - LIBERTAD" },
  { id: 1008, account: "SUPER 8", outlet: "SUPER 8 - LIPA" },
  { id: 1009, account: "SUPER 8", outlet: "SUPER 8 - LITEX" },
  { id: 1010, account: "SUPER 8", outlet: "SUPER 8 - MALOLOS" },
  { id: 1011, account: "SUPER 8", outlet: "SUPER 8 - MAKATI" },
  { id: 1012, account: "SUPER 8", outlet: "SUPER 8 - MALIBAY" },
  { id: 1013, account: "SUPER 8", outlet: "SUPER 8 - MANAOAG" },
  { id: 1014, account: "SUPER 8", outlet: "SUPER 8 - MASINAG" },
  { id: 1015, account: "SUPER 8", outlet: "SUPER 8 - MOLINO" },
  { id: 1016, account: "SUPER 8", outlet: "SUPER 8 - MOLAVE" },
  { id: 1017, account: "SUPER 8", outlet: "SUPER 8 - MORONG" },
  { id: 1018, account: "SUPER 8", outlet: "SUPER 8 - MUNTINLUPA" },
  { id: 1019, account: "SUPER 8", outlet: "SUPER 8 - NAPINDAN" },
  { id: 1020, account: "SUPER 8", outlet: "SUPER 8 - NOVA 2" },
  { id: 1021, account: "SUPER 8", outlet: "SUPER 8 - ORTIGAS EXT. CAINTA" },
  { id: 1022, account: "SUPER 8", outlet: "SUPER 8 - P. BURGOS" },
  { id: 1023, account: "SUPER 8", outlet: "SUPER 8 - PACO" },
  { id: 1024, account: "SUPER 8", outlet: "SUPER 8 - PRITIL" },
  { id: 1025, account: "SUPER 8", outlet: "SUPER 8 - PULILAN" },
  { id: 1026, account: "SUPER 8", outlet: "SUPER 8 - RECTO" },
  { id: 1027, account: "SUPER 8", outlet: "SUPER 8 - ROSARIO" },
  { id: 1028, account: "SUPER 8", outlet: "SUPER 8 - ROSARIO 2" },
  { id: 1029, account: "SUPER 8", outlet: "SUPER 8 - SAN JUAN" },
  { id: 1030, account: "SUPER 8", outlet: "SUPER 8 - SAN JOAQUIN" },
  { id: 1031, account: "SUPER 8", outlet: "SUPER 8 - SAN PABLO" },
  { id: 1032, account: "SUPER 8", outlet: "SUPER 8 - SAPANG PALAY" },
  { id: 1033, account: "SUPER 8", outlet: "SUPER 8 - SHAW" },
  { id: 1034, account: "SUPER 8", outlet: "SUPER 8 - SIGNAL (FTI)" },
  { id: 1035, account: "SUPER 8", outlet: "SUPER 8 - STA MARIA" },
  { id: 1036, account: "SUPER 8", outlet: "SUPER 8 - STA ROSA" },
  { id: 1037, account: "SUPER 8", outlet: "SUPER 8 - SUCAT 2" },
  { id: 1038, account: "SUPER 8", outlet: "SUPER 8 - TANDANG SORA" },
  { id: 1039, account: "SUPER 8", outlet: "SUPER 8 - TARLAC 2" },
  { id: 1040, account: "SUPER 8", outlet: "SUPER 8 - TATALON" },
  { id: 1041, account: "SUPER 8", outlet: "SUPER 8 - TANAY" },
  { id: 1042, account: "SUPER 8", outlet: "SUPER 8 - TAYTAY 1" },
  { id: 1043, account: "SUPER 8", outlet: "SUPER 8 - TAYTAY 2" },
  { id: 1044, account: "SUPER 8", outlet: "SUPER 8 - TINAJEROS" },
  { id: 1045, account: "SUPER 8", outlet: "SUPER 8 - TRECE" },
  { id: 1046, account: "SUPER 8", outlet: "SUPER 8 - URDANETA" },
  { id: 1047, account: "ULTRAMEGA", outlet: "ULTRAMEGA -  CABUYAO MAMATID" },
  { id: 1048, account: "ULTRAMEGA", outlet: "ULTRAMEGA - ANTIPOLO" },
  { id: 1049, account: "ULTRAMEGA", outlet: "ULTRAMEGA - ARAYAT" },
  { id: 1050, account: "ULTRAMEGA", outlet: "ULTRAMEGA - ARITAO" },
  { id: 1051, account: "ULTRAMEGA", outlet: "ULTRAMEGA - BAGONG SILANG" },
  { id: 1052, account: "ULTRAMEGA", outlet: "ULTRAMEGA - BALIBAGO" },
  { id: 1053, account: "ULTRAMEGA", outlet: "ULTRAMEGA - BALAGTAS" },
  { id: 1054, account: "ULTRAMEGA", outlet: "ULTRAMEGA - BALIUAG BAYAN" },
  { id: 1055, account: "ULTRAMEGA", outlet: "ULTRAMEGA - BALIUAG HIGHWAY" },
  { id: 1056, account: "ULTRAMEGA", outlet: "ULTRAMEGA - CANDABA" },
  { id: 1057, account: "ULTRAMEGA", outlet: "ULTRAMEGA - CANLUBANG 1" },
  { id: 1058, account: "ULTRAMEGA", outlet: "ULTRAMEGA - CANLUBANG 2" },
  { id: 1059, account: "ULTRAMEGA", outlet: "ULTRAMEGA - CORDON" },
  { id: 1060, account: "ULTRAMEGA", outlet: "ULTRAMEGA - DEPARO" },
  { id: 1061, account: "ULTRAMEGA", outlet: "ULTRAMEGA - GAGALANGIN" },
  { id: 1062, account: "ULTRAMEGA", outlet: "ULTRAMEGA - GEN. TRIAS" },
  { id: 1063, account: "ULTRAMEGA", outlet: "ULTRAMEGA - GUAGUA" },
  { id: 1064, account: "ULTRAMEGA", outlet: "ULTRAMEGA - IFUGAO" },
  { id: 1065, account: "ULTRAMEGA", outlet: "ULTRAMEGA - LEMERY" },
  { id: 1066, account: "ULTRAMEGA", outlet: "ULTRAMEGA - MADDELA ISABELA" },
  { id: 1067, account: "ULTRAMEGA", outlet: "ULTRAMEGA - MONTALBAN" },
  { id: 1068, account: "ULTRAMEGA", outlet: "ULTRAMEGA - MUNTINLUPA" },
  { id: 1069, account: "ULTRAMEGA", outlet: "ULTRAMEGA - NAIC" },
  { id: 1070, account: "ULTRAMEGA", outlet: "ULTRAMEGA - NOVALICHES" },
  { id: 1071, account: "ULTRAMEGA", outlet: "ULTRAMEGA - PADRE GARCIA" },
  { id: 1072, account: "ULTRAMEGA", outlet: "ULTRAMEGA - PALIPARAN" },
  { id: 1073, account: "ULTRAMEGA", outlet: "ULTRAMEGA - ROSARIO" },
  { id: 1074, account: "ULTRAMEGA", outlet: "ULTRAMEGA - SANGANDAAN" },
  { id: 1075, account: "ULTRAMEGA", outlet: "ULTRAMEGA - SAN MATEO" },
  { id: 1076, account: "ULTRAMEGA", outlet: "ULTRAMEGA - SAN MATEO ISABELA" },
  { id: 1077, account: "ULTRAMEGA", outlet: "ULTRAMEGA - SAN MIGUEL" },
  { id: 1078, account: "ULTRAMEGA", outlet: "ULTRAMEGA - SAPANG PALAY" },
  { id: 1079, account: "ULTRAMEGA", outlet: "ULTRAMEGA - TAGAYTAY" },
  { id: 1080, account: "ULTRAMEGA", outlet: "ULTRAMEGA - TAGUIG" },
  { id: 1081, account: "ULTRAMEGA", outlet: "ULTRAMEGA - TANAUAN" },
  { id: 1082, account: "ULTRAMEGA", outlet: "ULTRAMEGA - TANAY" },
  { id: 1083, account: "ULTRAMEGA", outlet: "ULTRAMEGA - TARLAC" },
  { id: 1084, account: "ULTRAMEGA", outlet: "ULTRAMEGA - TUTUBAN" },
  {
    id: 1085,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - ALTARAZA",
  },
  {
    id: 1086,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - ANTIPOLO",
  },
  {
    id: 1087,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - ARAYAT",
  },
  {
    id: 1088,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BACOOR",
  },
  {
    id: 1089,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BALANGA BATAAN",
  },
  {
    id: 1090,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BALIUAG",
  },
  {
    id: 1091,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BATANGAS",
  },
  {
    id: 1092,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BEL-AIR",
  },
  {
    id: 1093,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BICUTAN",
  },
  {
    id: 1094,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CABANATUAN",
  },
  {
    id: 1095,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CABUYAO",
  },
  {
    id: 1096,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CALOOCAN",
  },
  {
    id: 1097,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CANDELARIA",
  },
  {
    id: 1098,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CAPAS",
  },
  {
    id: 1099,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CARMONA",
  },
  {
    id: 1100,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - CONCEPCION",
  },
  {
    id: 1101,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - DASMA",
  },
  {
    id: 1102,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - E.ROD",
  },
  {
    id: 1103,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - GAPAN",
  },
  {
    id: 1104,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - GEN. TRIAS",
  },
  {
    id: 1105,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - GUIGUINTO",
  },
  {
    id: 1106,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - IMUS",
  },
  {
    id: 1107,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - JUNCTION",
  },
  {
    id: 1108,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - LOS BANOS",
  },
  {
    id: 1109,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - MAKATI",
  },
  {
    id: 1110,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - MAKILING",
  },
  {
    id: 1111,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - MALOLOS",
  },
  {
    id: 1112,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - MUNTINLUPA WEST",
  },
  {
    id: 1113,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - NAIC",
  },
  {
    id: 1114,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - NASUGBU",
  },
  {
    id: 1115,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - NORTH EDSA",
  },
  {
    id: 1116,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - PAMPANGA",
  },
  {
    id: 1117,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - PANIQUI",
  },
  {
    id: 1118,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - PASCUAL",
  },
  {
    id: 1119,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - PASAY",
  },
  {
    id: 1120,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - PLARIDEL",
  },
  {
    id: 1121,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - SAN JOSE",
  },
  {
    id: 1122,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - SILANG",
  },
  {
    id: 1123,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - STA MARIA",
  },
  {
    id: 1124,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - STA. CRUZ",
  },
  {
    id: 1125,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - STA. ROSA",
  },
  {
    id: 1126,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - SUBIC ZAMBALES",
  },
  {
    id: 1127,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - SUCAT",
  },
  {
    id: 1128,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - TAGAYTAY",
  },
  {
    id: 1129,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - TALAVERA",
  },
  {
    id: 1130,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - TANAUAN",
  },
  {
    id: 1131,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - TAYTAY",
  },
  {
    id: 1132,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - TRECE MAR",
  },
  {
    id: 1133,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - VISAYAS AVE",
  },
  {
    id: 1134,
    account: "WALTERMART",
    outlet: "WALTERMART SUPERMARKET, INC. - BALAYAN",
  },
];
// ── Shared helper — builds all maps from raw API data ────────────────────────
function buildAssignmentMaps(allData) {
  const merchandisers = allData.filter(
    (emp) =>
      emp.clientAssigned?.toUpperCase() === "ECOSSENTIAL FOODS CORP" &&
      emp.status?.toLowerCase() === "active",
  );

  const coordinators = allData.filter(
    (emp) =>
      emp.clientAssigned?.toUpperCase() ===
      "ECOSSENTIAL FOODS CORP-COORDINATORS",
  );

  // Merchandiser map — now uses outletsAssigned array (multiple outlets)
  const assignments = {};
  merchandisers.forEach((emp) => {
    if (emp.outletsAssigned && emp.outletsAssigned.length > 0) {
      emp.outletsAssigned.forEach((outletName) => {
        const matched = OUTLET_DATA.find((o) => o.outlet === outletName);
        if (matched) {
          assignments[matched.id] = {
            employeeId: emp._id,
            employeeName: `${emp.firstName} ${emp.lastName}`,
            deployStatus: emp.deployStatus || "Undeployed",
          };
        }
      });
    }
  });

  // Coordinator map — per-outlet status from outletStatusMap
  const coordAssignments = {};
  coordinators.forEach((emp) => {
    if (emp.outletsAssigned && emp.outletsAssigned.length > 0) {
      emp.outletsAssigned.forEach((outletName) => {
        const matched = OUTLET_DATA.find((o) => o.outlet === outletName);
        if (matched) {
          // Build the safe key the same way the backend does
          const safeKey = outletName.replace(/\./g, "_");
          // outletStatusMap comes as a plain object from JSON
          const perOutletStatus = emp.outletStatusMap?.[safeKey] || "Active";
          coordAssignments[matched.id] = {
            employeeId: emp._id,
            employeeName: `${emp.firstName} ${emp.lastName}`,
            status: perOutletStatus,
          };
        }
      });
    }
  });

  return { merchandisers, coordinators, assignments, coordAssignments };
}

export default function OutletList() {
  const [efcEmployees, setEfcEmployees] = useState([]);
  const [efcCoordinators, setEfcCoordinators] = useState([]);
  const [outletAssignments, setOutletAssignments] = useState({});
  const [coordinatorAssignments, setCoordinatorAssignments] = useState({});
  const [filteredOutlets, setFilteredOutlets] = useState(OUTLET_DATA);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Sidebar listener ──────────────────────────────────────────────────────
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

  // ── Fetch + apply — reused on load and after save ─────────────────────────
  const fetchAndApply = async () => {
    try {
      const response = await axios.get(
        "https://api-map.bmphrc.com/get-merch-accounts",
      );
      const { merchandisers, coordinators, assignments, coordAssignments } =
        buildAssignmentMaps(response.data);
      setEfcEmployees(merchandisers);
      setEfcCoordinators(coordinators);
      setOutletAssignments(assignments);
      setCoordinatorAssignments(coordAssignments);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchAndApply();
  }, []);

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
              "&:hover fieldset": { borderColor: "#2e6385ff" },
            },
          }}
        />
      </Box>
    );
  }

  // ── Filter handler ────────────────────────────────────────────────────────
  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setFilterStatus(value);
    if (!value || value === "ALL") {
      setFilteredOutlets(OUTLET_DATA);
    } else if (value === "Deployed") {
      setFilteredOutlets(
        OUTLET_DATA.filter(
          (o) => outletAssignments[o.id]?.deployStatus === "Deployed",
        ),
      );
    } else if (value === "Undeployed") {
      setFilteredOutlets(
        OUTLET_DATA.filter(
          (o) =>
            !outletAssignments[o.id] ||
            outletAssignments[o.id]?.deployStatus === "Undeployed",
        ),
      );
    }
  };

  // ── Modal handlers ────────────────────────────────────────────────────────
  const handleEdit = (outletRow) => {
    const existing = outletAssignments[outletRow.id];
    const existingCo = coordinatorAssignments[outletRow.id];
    setSelectedOutlet({
      outletId: outletRow.id,
      outletName: outletRow.outlet,
      accountName: outletRow.account,
      assignedEmployeeId: existing?.employeeId || "",
      assignedEmployeeName: existing?.employeeName || "",
      deployStatus: existing?.deployStatus || "Undeployed",
      assignedCoordinatorId: existingCo?.employeeId || "",
      assignedCoordinatorName: existingCo?.employeeName || "",
      coordinatorDeployStatus: existingCo ? existingCo.status : "Inactive",
    });
    setIsEditing(false);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedOutlet(null);
    setIsEditing(false);
  };

  const handleSaveChanges = async (data) => {
    try {
      const adminFullName = localStorage.getItem("adminFullName");

      // Save merchandiser assignment
      await axios.put("https://api-map.bmphrc.com/assign-outlet", {
        outletId: data.outletId,
        outletName: data.outletName,
        employeeId: data.assignedEmployeeId,
        deployStatus: data.deployStatus,
        updatedBy: adminFullName,
      });

      // Save coordinator assignment (uses outletsAssigned array — no overwrite)
      await axios.put("https://api-map.bmphrc.com/assign-coordinator", {
        outletName: data.outletName,
        employeeId: data.assignedCoordinatorId,
        deployStatus: data.coordinatorDeployStatus,
        updatedBy: adminFullName,
      });

      // Re-fetch fresh data — rebuilds both maps correctly
      await fetchAndApply();

      setFilterStatus("ALL");
      setFilteredOutlets(OUTLET_DATA);
      alert("Outlet assignment updated successfully!");
      setOpenEditModal(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment.");
    }
  };

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = [
    {
      field: "count",
      headerName: "#",
      width: 60,
      headerAlign: "center",
      align: "center",
    },
    { field: "account", headerName: "Account", width: 180 },
    { field: "outlet", headerName: "Outlet", width: 500 },
    {
      field: "assignedCoordinator",
      headerName: "Coordinator",
      width: 240,
      renderCell: (params) => {
        const assignment = coordinatorAssignments[params.row.id];
        return assignment?.employeeName ? (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {assignment.employeeName}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            No coordinator
          </Typography>
        );
      },
    },
    {
      field: "coordinatorStatus",
      headerName: "Coordinator Status",
      width: 160,
      renderCell: (params) => {
        const assignment = coordinatorAssignments[params.row.id];
        const status = assignment?.status;

        return (
          <Chip
            label={status || "Inactive"}
            color={status === "Active" ? "success" : "default"}
            a
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      field: "assignedEmployee",
      headerName: "Assigned Merchandiser",
      width: 240,
      renderCell: (params) => {
        const assignment = outletAssignments[params.row.id];
        return assignment?.employeeName ? (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {assignment.employeeName}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            No assignment
          </Typography>
        );
      },
    },
    {
      field: "deployStatus",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const assignment = outletAssignments[params.row.id];
        const status = assignment?.deployStatus;
        return (
          <Chip
            label={status || "Undeployed"}
            color={status === "Deployed" ? "success" : "default"}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const role = localStorage.getItem("roleAccount");
        const canEdit = role === "OPERATION";

        return (
          <Tooltip title={canEdit ? "Assign Employee" : "No Permission"}>
            <span>
              <IconButton
                color="primary"
                size="small"
                onClick={() => handleEdit(params.row)}
                disabled={!canEdit}
                sx={{
                  "&:hover": {
                    backgroundColor: canEdit
                      ? "rgba(46, 99, 133, 0.1)"
                      : "transparent",
                  },
                  "&.Mui-disabled": { color: "#b0bec5" },
                }}
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
        );
      },
    },
  ];

  const rows = filteredOutlets.map((outlet, index) => ({
    ...outlet,
    count: index + 1,
  }));

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

          {/* ── Assign Employee Modal ── */}
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
                  transform: "translate(-50%, -50%)",
                  width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
                  maxHeight: "90vh",
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
                    "&:hover": { background: "#555" },
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

                {/* Modal Body */}
                {selectedOutlet && (
                  <Box sx={{ p: 4 }}>
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
                          <BusinessIcon /> Outlet & Assignment Details
                        </Typography>

                        <Grid container spacing={2.5}>
                          {/* Outlet info */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Account"
                              fullWidth
                              value={selectedOutlet.accountName || ""}
                              InputProps={{ readOnly: true }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Outlet"
                              fullWidth
                              value={selectedOutlet.outletName || ""}
                              InputProps={{ readOnly: true }}
                              variant="outlined"
                            />
                          </Grid>

                          {/* Assigned Employee */}
                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
                              <FormControl fullWidth>
                                <InputLabel>Assign Employee</InputLabel>
                                <Select
                                  value={
                                    selectedOutlet.assignedEmployeeId || ""
                                  }
                                  label="Assign Employee"
                                  onChange={(e) =>
                                    setSelectedOutlet({
                                      ...selectedOutlet,
                                      assignedEmployeeId: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="">
                                    <em>— No Assignment —</em>
                                  </MenuItem>
                                  {efcEmployees.map((emp) => (
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
                                label="Assigned Employee"
                                fullWidth
                                value={(() => {
                                  if (!selectedOutlet.assignedEmployeeId)
                                    return "No assignment";
                                  const emp = efcEmployees.find(
                                    (e) =>
                                      e._id ===
                                      selectedOutlet.assignedEmployeeId,
                                  );
                                  return emp
                                    ? `${emp.firstName} ${emp.lastName}${emp.position ? " — " + emp.position : ""}`
                                    : "No assignment";
                                })()}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>

                          {/* Deploy Status */}

                          <Grid item xs={12} sm={6}>
                            {isEditing ? (
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
                                  onChange={(e) =>
                                    setSelectedOutlet({
                                      ...selectedOutlet,
                                      deployStatus: e.target.value,
                                    })
                                  }
                                >
                                  <MenuItem value="Deployed">Deployed</MenuItem>
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
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>

                          {/* Coordinator Divider */}
                          <Grid item xs={12}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: "#64748b",
                                borderBottom: "1px solid #e2e8f0",
                                pb: 1,
                                mt: 1,
                              }}
                            >
                              Coordinator Assignment
                            </Typography>
                          </Grid>

                          {/* Assign Coordinator */}
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
                                      </Box>
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
                                  const emp = efcCoordinators.find(
                                    (e) =>
                                      e._id ===
                                      selectedOutlet.assignedCoordinatorId,
                                  );
                                  return emp
                                    ? `${emp.firstName} ${emp.lastName}${emp.position ? " — " + emp.position : ""}`
                                    : "No coordinator";
                                })()}
                                InputProps={{ readOnly: true }}
                              />
                            )}
                          </Grid>

                          {/* Coordinator Deploy Status */}
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
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
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
                          }}
                        >
                          Edit Assignment
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSaveChanges(selectedOutlet)}
                            disabled={
                              !selectedOutlet.assignedEmployeeId &&
                              !selectedOutlet.assignedCoordinatorId
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
                            onClick={() => setIsEditing(false)}
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
