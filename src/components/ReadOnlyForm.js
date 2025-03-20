import React from "react";
import { TextField, FormControl, FormControlLabel, Radio, RadioGroup, Select, MenuItem, InputLabel } from "@mui/material";

const ReadOnlyForm = ({ formData }) => {
  return (
    <form className="container mt-3">
      <div className="container mt-3">
        <h3>Profile Section:</h3>
        <div className="row border rounded p-3 bg-light">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-8">
                <TextField label="Name" value={formData.name} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              </div>
              <div className="col-md-4 d-flex align-items-center">
                {formData.profilePhoto && <img src={formData.profilePhoto} alt="Profile" className="photo-preview-image" />}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 mt-2">
                <FormControl component="fieldset">
                  <RadioGroup row value={formData.gender}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" disabled />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" disabled />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" disabled />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-2">
                <TextField label="Age" value={formData.age} fullWidth margin="dense" InputProps={{ readOnly: true }} />
              </div>
              <div className="col-md-4">
                <FormControl fullWidth margin="dense">
                  <InputLabel>State</InputLabel>
                  <Select value={formData.state} disabled label="State">
                    <MenuItem value={formData.state}>{formData.state}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <TextField label="Address" value={formData.address} fullWidth multiline rows={4} margin="dense" InputProps={{ readOnly: true }} />
          </div>
        </div>
      </div>
      
      <div className="container mt-3">
        <h3>Crime Section:</h3>
        <div className="row border rounded p-3 bg-light">
          <div className="col-md-2">
            <TextField label="Platform" value={formData.platform} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          </div>
          <div className="col-md-3">
            <TextField label="Profile ID" value={formData.profileId} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          </div>
          <div className="col-md-7">
            <TextField label="URL" value={formData.url} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          </div>
        </div>
      </div>
      
      <div className="container mt-3">
        <h3>FIR Section:</h3>
        <div className="row border rounded p-3 bg-light">
          <div className="col-md-3">
            <TextField label="Crime Number" value={formData.crimeNumber} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          </div>
          <div className="col-md-3">
            <TextField label="FIR Date" value={formData.firDate} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          </div>
          <div className="col-md-3">
            <FormControl fullWidth margin="dense">
              <InputLabel>Accused Status</InputLabel>
              <Select value={formData.accusedStatus} disabled label="Accused Status">
                <MenuItem value={formData.accusedStatus}>{formData.accusedStatus}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <TextField label="Chargesheet Date" value={formData.chargesheetDate} fullWidth margin="dense" InputProps={{ readOnly: true }} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReadOnlyForm;