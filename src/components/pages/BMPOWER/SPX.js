import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Modal,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Topbar from "../../topbar/Topbar";
import Sidebar from "../../sidebar/Sidebar";
import dayjs from "dayjs";

export default function BmpowerHO() {
  const [accounts, setAccounts] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEmployee(null);
  };

  const handleSaveChanges = async (updatedEmployee) => {
    try {
      await axios.put(
        `https://api-map.bmphrc.com/update-employee/${updatedEmployee._id}`,
        updatedEmployee
      );
      alert("Employee details updated successfully!");
      setOpenEditModal(false);
      // refresh data after saving
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee details.");
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "https://api-map.bmphrc.com/get-merch-accounts"
        );

        // Filter only MARABOU company AND clientAssigned = "LONG TABLE GROUP INC.- MASAJIRO"
        const marabouAccounts = response.data.filter(
          (acc) =>
            acc.company?.toUpperCase() ===
              "BMPOWER HUMAN RESOURCES CORPORATION" &&
            acc.clientAssigned?.toUpperCase() === "SPX EXPRESS"
        );

        setAccounts(marabouAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const columns = [
    { field: "count", headerName: "#", width: 70 },
    { field: "company", headerName: "Company", width: 400 },
    { field: "remarks", headerName: "Remarks", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "employeeNo", headerName: "Employee No.", width: 120 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "middleName", headerName: "Middle Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "contact", headerName: "Contact", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 150,
      valueGetter: (value, row) => {
        const raw = row?.birthday;
        const dateValue =
          typeof raw === "object" && raw?.$date
            ? raw.$date
            : typeof raw === "string"
            ? raw
            : null;
        return dateValue;
      },
      valueFormatter: (value) => {
        if (!value) return "";
        return dayjs(value).format("DD-MMM-YY");
      },
    },
    { field: "age", headerName: "Age", width: 80 },
    { field: "sss", headerName: "SSS No.", width: 120 },
    { field: "philhealth", headerName: "PHIC No.", width: 120 },
    { field: "hdmf", headerName: "HDMF No.", width: 120 },
    { field: "tin", headerName: "TIN No.", width: 120 },
    { field: "position", headerName: "Position", width: 150 },
    {
      field: "dateHired",
      headerName: "Date Hired",
      width: 150,
      valueGetter: (value, row) => {
        const raw = row?.dateHired;
        const dateValue =
          typeof raw === "object" && raw?.$date
            ? raw.$date
            : typeof raw === "string"
            ? raw
            : null;
        return dateValue;
      },
      valueFormatter: (value) => {
        if (!value) return "";
        return dayjs(value).format("DD-MMM-YY");
      },
    },
    { field: "homeAddress", headerName: "Home Address", width: 250 },
    { field: "silBalance", headerName: "SIL Balance", width: 120 },
    { field: "clientAssigned", headerName: "Client Assigned", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  // Assign a unique ID for DataGrid
  const rows = accounts.map((acc, index) => ({
    id: acc._id || index,
    count: index + 1,
    ...acc,
  }));

  return (
    <div className="accountPage">
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: "#003554",
            minHeight: "auto",
            color: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Employee Accounts for SPX EXPRESS
          </Typography>
          <Box
            sx={{
              height: "100%",
              maxWidth: 1700,
              maxHeight: "80vh",
              marginTop: 2,
              overflow: "hidden",
              "& .MuiDataGrid-root": {
                backgroundColor: "#fff",
              },
            }}
          >
            <Modal
              open={openEditModal}
              onClose={handleCloseEditModal}
              aria-labelledby="edit-employee-modal"
              aria-describedby="edit-employee-details"
            >
              <Box
                sx={{
                  padding: 4,
                  backgroundColor: "white",
                  margin: { xs: "10% auto", md: "5% auto" },
                  width: { xs: "90%", sm: "70%", md: "50%" },
                  maxHeight: "80vh",
                  overflowY: "auto",
                  boxShadow: 24,
                  borderRadius: 2,
                }}
              >
                <Typography
                  id="edit-employee-modal"
                  variant="h6"
                  component="h2"
                >
                  Employee Full Details
                </Typography>

                {selectedEmployee && (
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    {/* COMPANY DROPDOWN */}
                    {isEditing ? (
                      <FormControl fullWidth>
                        <InputLabel>Company</InputLabel>
                        <Select
                          value={selectedEmployee.company || ""}
                          label="Company"
                          onChange={(e) =>
                            setSelectedEmployee({
                              ...selectedEmployee,
                              company: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                            MARABOU EVERGREEN RESOURCES INC
                          </MenuItem>
                          <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                            BMPOWER HUMAN RESOURCES CORPORATION
                          </MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        label="Company"
                        fullWidth
                        value={selectedEmployee.company || ""}
                        InputProps={{ readOnly: true }}
                      />
                    )}

                    {/* STATUS */}
                    {isEditing ? (
                      <TextField
                        select
                        label="Status"
                        fullWidth
                        value={selectedEmployee.status || ""}
                        onChange={(e) =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            status: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </TextField>
                    ) : (
                      <TextField
                        label="Status"
                        fullWidth
                        value={selectedEmployee.status || ""}
                        InputProps={{ readOnly: true }}
                      />
                    )}

                    {/* REMARKS DROPDOWN */}
                    {isEditing ? (
                      <FormControl fullWidth>
                        <InputLabel>Remarks</InputLabel>
                        <Select
                          value={selectedEmployee.remarks || ""}
                          label="Remarks"
                          onChange={(e) =>
                            setSelectedEmployee({
                              ...selectedEmployee,
                              remarks: e.target.value,
                            })
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
                    ) : (
                      <TextField
                        label="Remarks"
                        fullWidth
                        value={selectedEmployee.remarks || ""}
                        InputProps={{ readOnly: true }}
                      />
                    )}

                    {/* EMPLOYEE NO */}
                    <TextField
                      label="Employee No."
                      fullWidth
                      value={selectedEmployee.employeeNo || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          employeeNo: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    {/* FIRST, MIDDLE, LAST NAME */}
                    <TextField
                      label="First Name"
                      fullWidth
                      value={selectedEmployee.firstName || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          firstName: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />
                    <TextField
                      label="Middle Name"
                      fullWidth
                      value={selectedEmployee.middleName || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          middleName: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      value={selectedEmployee.lastName || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          lastName: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    {/* CONTACT + EMAIL */}
                    <TextField
                      label="Contact Number"
                      fullWidth
                      value={selectedEmployee.contact || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          contact: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      value={selectedEmployee.email || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          email: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    {/* BIRTHDAY */}
                    <TextField
                      label="Birthday"
                      fullWidth
                      type="date"
                      value={
                        selectedEmployee.birthday
                          ? dayjs(selectedEmployee.birthday).format(
                              "YYYY-MM-DD"
                            )
                          : ""
                      }
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          birthday: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="Age"
                      fullWidth
                      value={selectedEmployee.age || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          age: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="SSS No."
                      fullWidth
                      value={selectedEmployee.sss || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          sss: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="PHIC No."
                      fullWidth
                      value={selectedEmployee.philhealth || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          philhealth: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="HDMF No."
                      fullWidth
                      value={selectedEmployee.hdmf || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          hdmf: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="TIN No."
                      fullWidth
                      value={selectedEmployee.tin || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          tin: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="Position"
                      fullWidth
                      value={selectedEmployee.position || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          position: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    {/* DATE HIRED */}
                    <TextField
                      label="Date Hired"
                      fullWidth
                      type="date"
                      value={
                        selectedEmployee.dateHired
                          ? dayjs(selectedEmployee.dateHired).format(
                              "YYYY-MM-DD"
                            )
                          : ""
                      }
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          dateHired: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="Home Address"
                      fullWidth
                      value={selectedEmployee.homeAddress || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          homeAddress: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    <TextField
                      label="SIL Balance"
                      fullWidth
                      value={selectedEmployee.silBalance || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          silBalance: e.target.value,
                        })
                      }
                      InputProps={{ readOnly: !isEditing }}
                    />

                    {/* CLIENT ASSIGNED DROPDOWN */}
                    {isEditing ? (
                      <FormControl fullWidth>
                        <InputLabel>Client Assigned</InputLabel>
                        <Select
                          value={selectedEmployee.clientAssigned || ""}
                          label="Client Assigned"
                          onChange={(e) =>
                            setSelectedEmployee({
                              ...selectedEmployee,
                              clientAssigned: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="ASIAN STREAK BROKERAGE CO">
                            ASIAN STREAK BROKERAGE CO
                          </MenuItem>
                          <MenuItem value="BMPOWER HUMAN RESOURCES CORPORATION">
                            BMPOWER HUMAN RESOURCES CORPORATION
                          </MenuItem>
                          <MenuItem value="CARMENS BEST">CARMENS BEST</MenuItem>
                          <MenuItem value="ECOSSENTIAL FOODS CORP">
                            ECOSSENTIAL FOODS CORP
                          </MenuItem>
                          <MenuItem value="ECOSSENTIAL FOODS CORP-HEAD OFFICE">
                            ECOSSENTIAL FOODS CORP-HEAD OFFICE
                          </MenuItem>
                          <MenuItem value="ENGKANTO">ENGKANTO</MenuItem>
                          <MenuItem value="J-GYU INC">J-GYU INC</MenuItem>
                          <MenuItem value="LONG TABLE GROUP INC.- MASAJIRO">
                            LONG TABLE GROUP INC. - MASAJIRO
                          </MenuItem>
                          <MenuItem value="MAGIS DISTRIBUTION INC.">
                            MAGIS DISTRIBUTION INC.
                          </MenuItem>
                          <MenuItem value="MARABOU EVERGREEN RESOURCES INC">
                            MARABOU EVERGREEN RESOURCES INC
                          </MenuItem>
                          <MenuItem value="MCKENZIE DISTRIBUTION CO.">
                            MCKENZIE DISTRIBUTION CO.
                          </MenuItem>
                          <MenuItem value="METRO PACIFIC DAIRY FARM">
                            METRO PACIFIC DAIRY FARM
                          </MenuItem>
                          <MenuItem value="METRO PACIFIC FRESH FARM">
                            METRO PACIFIC FRESH FARM
                          </MenuItem>
                          <MenuItem value="PLDT TELESCOOP">
                            PLDT TELESCOOP
                          </MenuItem>
                          <MenuItem value="RC">RC SALES AGENT</MenuItem>
                          <MenuItem value="ROYAL CANIN PHILS.">
                            ROYAL CANIN PHILS.
                          </MenuItem>
                          <MenuItem value="SHELFMATE">SHELFMATE</MenuItem>
                          <MenuItem value="SPX EXPRESS">SPX EXPRESS</MenuItem>
                          <MenuItem value="UNIVERSAL HARVESTER DAIRY FARM INC">
                            UNIVERSAL HARVESTER DAIRY FARM INC
                          </MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        label="Client Assigned"
                        fullWidth
                        value={selectedEmployee.clientAssigned || ""}
                        InputProps={{ readOnly: true }}
                      />
                    )}

                    {/* BUTTONS */}
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      sx={{ mt: 2 }}
                    >
                      {!isEditing ? (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#0A21C0",
                            color: "#FFFFFF",
                            "&:hover": { backgroundColor: "#0A21C0" },
                          }}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#0A21C0",
                              color: "#FFFFFF",
                              "&:hover": { backgroundColor: "#0A21C0" },
                            }}
                            onClick={() => handleSaveChanges(selectedEmployee)}
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#A31D1D",
                              color: "#FFFFFF",
                              "&:hover": { backgroundColor: "#A31D1D" },
                            }}
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Modal>

            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                columns: {
                  columnVisibilityModel: {
                    contactNum: false,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },
                },
              }}
              disableDensitySelector
              disableColumnFilter
              disableColumnSelector
              pageSizeOptions={[5, 10, 20, 50]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
