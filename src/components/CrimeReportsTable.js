import React, { useEffect, useState } from "react";
import { fetchCrimeReports } from "../api/api";
import { DataGrid } from "@mui/x-data-grid";
import { Container, TextField, Box, Dialog,DialogTitle, DialogContent, IconButton, Grid, Typography  } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const CrimeReportsTable = () => {
  const [crimeReports, setCrimeReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      const data = await fetchCrimeReports();
      setCrimeReports(data);
    };
    getReports();
  }, []);

  // Open modal with selected row's data
  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData);
    setOpen(true);
  };

    // Close modal
    const handleCloseModal = () => {
      setOpen(false);
      setSelectedRow(null);
    };

  // Open image popup
  const handleOpenImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  // Close image popup
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  // Render image links
  const renderImageCell = (params) => {
    if (!params.value) return "No Image";
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleOpenImage(params.value);
        }}
        style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
      >
        View Image
      </a>
    );
  };

  // Define all columns
  const columns = [
    { field: "id", headerName: "ID", width: 80, align: "center", headerAlign: "center" },
    { field: "name", headerName: "Name", width: 250, align: "center", headerAlign: "center" },
    // { field: "gender", headerName: "Gender", width: 120 },
    // { field: "age", headerName: "Age", width: 100 },
    // { field: "state", headerName: "State", width: 150 },
    // { field: "address", headerName: "Address", width: 200 },
    { field: "platform", headerName: "Platform", width: 150, align: "center", headerAlign: "center" },
    // { field: "profileId", headerName: "Profile ID", width: 150 },
    // { field: "url", headerName: "Profile URL", width: 200 },
    // { field: "contentType", headerName: "Content Type", width: 150 },
    { field: "targetType", headerName: "Target Type", width: 150, align: "center", headerAlign: "center" },
    // { field: "crimeNumber", headerName: "Crime Number", width: 150 },
    { field: "firDate", headerName: "FIR Date", width: 150, align: "center", headerAlign: "center" },
    // { field: "accusedStatus", headerName: "Accused Status", width: 180 },
    // { field: "chargesheetDate", headerName: "Chargesheet Date", width: 180 },
    { field: "policeStation", headerName: "Police Station", width: 200 },
    // { field: "profilePhoto", headerName: "Profile Photo", width: 150, renderCell: renderImageCell },
    // { field: "postPhoto", headerName: "Post Photo", width: 150, renderCell: renderImageCell },
    // { field: "firFile", headerName: "FIR File", width: 150, renderCell: renderImageCell },
    // { field: "otherFiles", headerName: "Other Documents", width: 200, renderCell: renderImageCell },
    { 
      field: "view", 
      headerName: "View", 
      width: 100, 
      align: "center", 
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenModal(params.row)} color="gray">
           <FontAwesomeIcon style={{width:"20px"}} icon={faEye} />
        </IconButton>
      ),
    }
  ];

  // Filter crime reports based on search query
  const filteredReports = crimeReports.filter((report) =>
    Object.values(report).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container  maxWidth="flase" sx={{ mt: 3, height: "70vh", width: "100%" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Crime Reports</h2>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <DataGrid
        rows={filteredReports.map((report, index) => ({
          ...report,
          id: index + 1, // Assigning IDs starting from 1
        }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 30]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      {/* Image Popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogContent>
          {selectedImage && <img src={`http://localhost:5000/uploads/${selectedImage}`} alt="Crime Evidence" style={{ width: "100%" }} />}
        </DialogContent>
      </Dialog>

      {/* Modal for Viewing Data */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" sx={{ borderRadius: 2 }}>
      <DialogTitle sx={{ fontWeight: "bold", bgcolor: "#f5f5f5", py: 2, textAlign: "center" }}>
        Crime Report Details
      </DialogTitle>
      <DialogContent sx={{ p: 3, bgcolor: "#fafafa" }}>
        {selectedRow ? (
          <Grid container spacing={2}>
            {Object.entries(selectedRow).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <Typography variant="body2" sx={{ fontWeight: 600, textTransform: "capitalize", color: "#555" }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: "#333" }}>
                  {value || "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" sx={{ color: "#777", textAlign: "center", mt: 2 }}>
            No details available
          </Typography>
        )}
      </DialogContent>
    </Dialog>


    </Container>
  );
};

export default CrimeReportsTable;
