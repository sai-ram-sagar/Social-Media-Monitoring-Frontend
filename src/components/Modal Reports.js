import React, { useEffect, useState } from "react";
import { fetchCrimeReports } from "../api/api";
import { DataGrid } from "@mui/x-data-grid";
import { Container, TextField, Box, Dialog, DialogTitle, DialogContent, IconButton, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ReadOnlyForm from "./ReadOnlyForm";

const ModalReports = () => {
  const [crimeReports, setCrimeReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getReports = async () => {
      const data = await fetchCrimeReports();
      setCrimeReports(data);
    };
    getReports();
  }, []);

  // Open details modal
  const handleOpenDetailsModal = (rowData) => {
    setSelectedRow(rowData);
    setOpenDetailsModal(true);
  };

  // Close details modal
  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedRow(null);
  };

  // Open image modal
  const handleOpenImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  // Close image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
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
          handleOpenImageModal(params.value);
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
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "state", headerName: "State", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "platform", headerName: "Platform", width: 150, align: "center", headerAlign: "center" },
    { field: "profileId", headerName: "Profile ID", width: 150 },
    { field: "url", headerName: "Profile URL", width: 200 },
    { field: "contentType", headerName: "Content Type", width: 150 },
    { field: "targetType", headerName: "Target Type", width: 150, align: "center", headerAlign: "center" },
    { field: "crimeNumber", headerName: "Crime Number", width: 150 },
    { field: "firDate", headerName: "FIR Date", width: 150, align: "center", headerAlign: "center" },
    { field: "accusedStatus", headerName: "Accused Status", width: 180 },
    { field: "chargesheetDate", headerName: "Chargesheet Date", width: 180 },
    { field: "policeStation", headerName: "Police Station", width: 200 },
    { field: "profilePhoto", headerName: "Profile Photo", width: 150, renderCell: renderImageCell },
    { field: "postPhoto", headerName: "Post Photo", width: 150, renderCell: renderImageCell },
    { field: "firFile", headerName: "FIR File", width: 150, renderCell: renderImageCell },
    { field: "otherFiles", headerName: "Other Documents", width: 200, renderCell: renderImageCell },
    { 
      field: "view", 
      headerName: "View", 
      width: 100, 
      align: "center", 
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenDetailsModal(params.row)} color="gray">
           <FontAwesomeIcon style={{width:"20px"}} icon={faEye} />
        </IconButton>
      ),
    }
  ];

// Filter reports based on selected fields
  const filteredReports = crimeReports.filter(
    (report) =>
      report.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.crimeNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="flase" sx={{ mt: 3, height: "70vh", width: "100%" }}>
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
        rows={filteredReports.map((report, index) => ({ ...report, id: report.id || index + 1 }))}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 30]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      {/* Image Modal */}
      <Dialog open={openImageModal} onClose={handleCloseImageModal} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <img src={`http://localhost:5000/uploads/${selectedImage}`} alt="Crime Evidence" style={{ width: "100%" }} />
          )}
        </DialogContent>
      </Dialog>

      {/* Details Modal */}
      {/* Modal for Viewing Data */}
        <Dialog open={openDetailsModal} onClose={handleCloseDetailsModal} maxWidth="xl" fullWidth>
        <DialogTitle>Crime Report Details</DialogTitle>
        <DialogContent>
            {selectedRow && <ReadOnlyForm formData={selectedRow} />}
        </DialogContent>
        </Dialog>

    </Container>
  );
};

export default ModalReports;