import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormComponent.css";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    state: "",
    address: "",
    platform: "",
    profileId: "",
    url: "",
    contentType: "",
    targetType: "",
    crimeNumber: "",
    firDate: "",
    accusedStatus: "",
    chargesheetDate: "",
    policeStation: "",
    postPhoto: null,
    firFile: null,
    otherFiles: [],
  });

  const [photoFileName, setPhotoFileName] = useState("");// Stores file name
  const [photoPreview, setPhotoPreview] = useState(null); // Stores preview URL
  const [postFileName, setPostFileName] = useState("");// Stores file name
  const [postFilePreview, setPostFilePreview] = useState(null); // Stores preview URL
  const [firFileName, setFirFileName] = useState("");// Stores file URL
  const [firFilePreview, setFirFilePreview] = useState(null); // Stores preview URL
  const [otherFilesName, setOtherFilesName] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size exceeds 5MB. Please select a smaller file.");
        return;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePhoto: file, // Add file to formData
      }));
      setPhotoFileName(file.name);
      setPhotoPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };
  

  // Function to remove selected image
const handleRemovePhoto = () => {
  setPhotoFileName(null);
  setPhotoPreview(null);
};

const handlePostFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File size exceeds 5MB. Please select a smaller file.");
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      postPhoto: file, // Add post to formData
    }));
    setPostFileName(file.name);
    setPostFilePreview(URL.createObjectURL(file)); // Generate preview URL
  }
};


  // Function to remove selected post file
const handleRemovePostFile = () => {
  setPostFileName(null);
  setPostFilePreview(null);
};

const handleFirFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File size exceeds 5MB. Please select a smaller file.");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      firFile: file, // Add post to formData
    }));
    setFirFileName(file.name);
    setFirFilePreview(URL.createObjectURL(file)); // Generate preview URL
  }
};

// Function to remove selected FIR file
  const handleRemoveFirFile = () => {
    setFirFileName(null);
    setFirFilePreview(null);
  };

  // const handleOtherFilesChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setOtherFilesName((prev) => [...prev, ...files.map((file) => file.name)]); 
  // };
  const handleOtherFilesChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Maximum number of files allowed
    if (files.length + otherFilesName.length > 20) {
      alert("You can upload a maximum of 20 files.");
      return;
    }
  
    // File size check (each file should be less than 50MB)
    const validFiles = files.filter((file) => file.size < 50 * 1024 * 1024); // 50MB in bytes
  
    if (validFiles.length !== files.length) {
      alert("Some files exceed the 50MB size limit and were not added.");
    }

  setFormData((prevFormData) => ({
      ...prevFormData,
      otherFiles: files, // Add post to formData
    }));
    setOtherFilesName((prev) => [...prev, ...validFiles.map((file) => file.name)]);
  };
  

  const handleDeleteFile = (fileName) => {
    setOtherFilesName((prev) => prev.filter((file) => file !== fileName)); 
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Form submitted successfully!");
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  if(formData.name === "") {
    alert("Enter Valid Name")
  }else{
  console.log(formData)
  const formDataToSend = new FormData();
  Object.keys(formData).forEach((key) => {
    if (key === "otherFiles") {
      formData[key].forEach((file) => {
        formDataToSend.append("otherFiles", file);
      });
    } else {
      formDataToSend.append(key, formData[key]);
    }
  });

  try {
    const response = await fetch(
      "https://social-media-monitoring-backend-production.up.railway.app/submit-form",
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    let data;
    try {
      data = await response.json(); // Attempt to parse JSON response
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      alert("Unexpected server response. Please try again.");
      return;
    }

    if (response.ok) {
      alert("Form submitted successfully!");

      // Reset form fields
      setFormData({
        name: "",
        gender: "",
        age: "",
        state: "",
        address: "",
        platform: "",
        profileId: "",
        url: "",
        contentType: "",
        targetType: "",
        crimeNumber: "",
        firDate: "",
        accusedStatus: "",
        chargesheetDate: "",
        policeStation: "",
        profilePhoto: null,
        postPhoto: null,
        firFile: null,
        otherFiles: [],
      });
      setPhotoPreview(null)
      setPostFilePreview(null)
      setFirFilePreview(null)
      setOtherFilesName([])
      // Clear file inputs manually
      //document.getElementById("profilePhoto").value = null;
      // document.getElementById("postPhoto").value = "";
      // document.getElementById("firFile").value = "";
      // document.getElementById("otherFiles").value = "";
    } else {
      alert("Submission failed: " + (data.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting form. Please try again.");
  }
}
};


  
  return (
    <form className="container mt-3" onSubmit={handleSubmit}>
                    {/* Profile & Address Section */}
      <div className="container mt-3">
        <h3>Profile Section:</h3>
        <div className="row border rounded p-3 bg-light">
            {/* Left Section (Name, Photo, Gender, Age, State) */}
            <div className="col-md-6">
                <div className="row">
                    {/* Name Input */}
                    <div className="col-md-8">
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
                        required
                    />
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="col-md-4 d-flex align-items-center">
                    <div className="profile-photo-upload w-100">
                      {/* Image Preview */}
                      {photoPreview && (
                        <div className="photo-preview position-relative">
                          {/* Cancel Button */}
                          <button 
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                            onClick={handleRemovePhoto}
                          >
                            ✕
                          </button>

                         <img src={photoPreview} alt="Profile Preview" className="photo-preview-image" />
                        </div>
                      )}

                        {/* Hidden File Input */}
                        <input type="file" id="profile-photo" name="profilePhoto" accept="image/*" className="profile-file-input" onChange={handlePhotoChange} />

                        {/* Upload Button */}
                        <label htmlFor="profile-photo" className="profile-file-label">
                          Profile Photo
                        </label>

                        {/* File Name Display */}
                        {/* <span className="profile-file-name">{photoFileName || "No file selected"}</span> */}
                      </div>
                    </div>
                </div>

                {/* Gender, Age, State Selection */}
                <div className="row mt-2 ">
                    <div className="col-md-6 mt-2">
                    <FormControl component="fieldset">
                        <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                    </div>

                    <div className="col-md-2" style={{marginTop:"-8px"}}>
                    <TextField
                        label="Age"
                        name="age"
                        type="text"
                        value={formData.age}
                        fullWidth
                        margin="dense"
                        onChange={handleChange}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        onBlur={(e) => {
                          if (e.target.value > 110) {
                            setFormData((prevData) => ({ ...prevData, age: "110" })); // Set to max value if exceeded
                          }
                        }}
                         onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                    />
                    </div>

                    <div className="col-md-4">
                    <FormControl fullWidth>
                        <InputLabel>State</InputLabel>
                        <Select searchable name="state" value={formData.state} onChange={handleChange} label="State">
                        <MenuItem value="Telangana">Telangana</MenuItem>
                        <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </div>
            </div>
 
            {/* Right Section (Address) */}
            <div className="col-md-6">
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    fullWidth
                    multiline
                    rows={4}
                    margin="dense"
                    onChange={handleChange}
                />
            </div>
        </div>
      </div>

                    {/* Crime Section */}
      <div className="container mt-3">
        <h3>Crime Section:</h3>
        <div className="row border rounded p-3 bg-light">
            {/* First Row */}
            <div className="row mb-3">
                {/* Platform Dropdown */}
                <div className="col-md-2">
                    <FormControl fullWidth >
                    <InputLabel>Platform</InputLabel>
                    <Select name="platform" value={formData.platform} onChange={handleChange} label="Platform">
                        <MenuItem value="Instagram ">Instagram</MenuItem>
                        <MenuItem value="Facebook ">Facebook</MenuItem>
                        <MenuItem value="Twitter ">Twitter</MenuItem>
                        <MenuItem value="Youtube ">Youtube</MenuItem>
                    </Select>
                    </FormControl>
                </div>

                {/* Profile ID Input */}
                <div className="col-md-3">
                    <TextField
                    label="Profile ID"
                    name="profileId"
                    value={formData.profileId}
                    fullWidth
                    onChange={handleChange}
                    />
                </div>

                {/* URL Input */}
                <div className="col-md-7">
                    <TextField
                    label="URL"
                    name="url"
                    value={formData.url}
                    fullWidth
                    onChange={handleChange}
                    />
                </div>
            </div>

            {/* Second Row */}
            <div className="row mb-3">

            {/* Upload Crime Post */}
              <div className="col-md-3">
              <div className="file-upload position-relative">
                {/* Image Preview */}
                {postFilePreview && (
                  <div className="file-preview position-relative">
                    {/* Cancel Button */}
                    <button 
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                      onClick={handleRemovePostFile}
                    >
                      ✕
                    </button>

                    <img src={postFilePreview} alt="Crime Post Preview" className="preview-image" />
                  </div>
                )}

                  {/* Hidden File Input */}
                  <input type="file" id="crime-post" accept="image/*" className="file-input" onChange={handlePostFileChange} />

                  {/* Upload Button */}
                  <label htmlFor="crime-post" className="file-label">
                    Upload Crime Post
                  </label>

                  {/* File Name Display */}
                  {/* <span className="profile-file-name">{postFileName || "No file selected"}</span> */}
                </div>
              </div>

            {/* Content Type Dropdown */}
            <div className="col-md-6">
                <FormControl fullWidth>
                  <InputLabel>Content Type</InputLabel>
                    <Select
                      name="contentType"
                      value={formData.contentType}
                      onChange={handleChange}
                      label="Content Type"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxWidth: "20%", // Ensures dropdown width does not exceed the container
                            whiteSpace: "wrap", // Prevents text wrapping
                            overflow:"auto",
                          },
                        },
                      }}
                    >
                      <MenuItem value="criminal_defamation">Criminal defamation / Section 499 IPC [356(1) BNS] & 500 IPC [356(2) BNS]</MenuItem>
                      <MenuItem value="false_news">Spreading false or inflammatory news / Section 505 IPC [353 BNS]</MenuItem>
                      <MenuItem value="intentional_insult">Intentional insult / Section 504 IPC [352 BNS]</MenuItem>
                      <MenuItem value="promoting_enmity">Promoting enmity between different groups / Section 153A IPC [196 BNS]</MenuItem>
                      <MenuItem value="misleading_info">False or misleading information / Section [197(1)(d) BNS]</MenuItem>
                      <MenuItem value="contempt_of_court">Publishing content that disrespects the judiciary or obstructs justice / Contempt of Courts Act, 1971</MenuItem>
                      <MenuItem value="derogatory_women">Obscene, indecent, or derogatory representation of women / Indecent Representation of Women (Prohibition) Act, 1986</MenuItem>
                      <MenuItem value="obscene_material">Publishing or transmitting obscene material in electronic form / Sec. 67 of The Information Technology Act, 2000</MenuItem>
                      <MenuItem value="child_exploit_content">Publishing or transmitting of material depicting children in sexually explicit act / Sec. 67B of The Information Technology Act, 2000</MenuItem>
                      <MenuItem value="sexually_explicit">Publishing or transmitting of material containing sexually explicit act / Sec. 67A of The Information Technology Act, 2000</MenuItem>

                  </Select>
                </FormControl>
            </div>

            {/* Target Type Dropdown */}
            <div className="col-md-3">
                <FormControl fullWidth>
                <InputLabel>Target Type</InputLabel>
                <Select name="targetType" value={formData.targetType} onChange={handleChange} label="Target Type">
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Government">Government</MenuItem>
                    <MenuItem value="CM">CM</MenuItem>
                    <MenuItem value="Politicians">Politicians</MenuItem>
                    <MenuItem value="Politician's Families">Politician's Families</MenuItem>
                    <MenuItem value="Celebrity">Celebrity</MenuItem>
                </Select>
                </FormControl>
            </div>
            </div>
        </div>
      </div> 

                    {/* FIR Section */}
      <div className="container mt-3">
        <h3>FIR Section:</h3>
        <div className="row border rounded p-3 bg-light">
            <div className="row mb-3">
                <div className="col-md-3">
                    <TextField label="Crime Number" value={formData.crimeNumber} name="crimeNumber" fullWidth margin="dense" onChange={handleChange} />
                </div>
                <div className="col-md-3">
                    <TextField label="FIR Date" value={formData.firDate} name="firDate" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Accused Status</InputLabel>
                        <Select value={formData.accusedStatus} name="accusedStatus" onChange={handleChange} label="Accused Status">
                            <MenuItem value="Arrested">Arrested</MenuItem>
                            <MenuItem value="Notice">Notice </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-3">
                    <TextField label="Charge Sheet Date" value={formData.chargesheetDate} name="chargesheetDate" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </div>
                {/* <div className="col-md-3">
                    <TextField label="Crime Number" name="crimeNumber" fullWidth margin="dense" onChange={handleChange} />
                </div> */}
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <FormControl fullWidth margin="outlined">
                        <InputLabel>Police Station</InputLabel>
                        <Select value={formData.policeStation} name="policeStation" onChange={handleChange} label="Police Station">
                            <MenuItem value="Police Station 1">Police Station 1</MenuItem>
                            <MenuItem value="Police Station 2">Police Station 2</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                    {/* FIR File Upload */}
                <div className="col-md-3">
                <div className="fir-file-upload position-relative">
                {/* Image Preview */}
                {firFilePreview && (
                  <div className="fir-file-preview position-relative">
                    {/* Cancel Button */}
                    <button 
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                      onClick={handleRemoveFirFile}
                    >
                      ✕
                    </button>
                        <img src={firFilePreview} alt="FIR Preview" className="preview-image" />
                      </div>
                    )}

                    {/* Hidden File Input */}
                    <input type="file" id="fir-file" name="firFile" accept="image/*" onChange={handleFirFileChange} className="fir-file-input" />
                    
                    {/* Upload Button */}
                    <label htmlFor="fir-file" className="fir-file-label">
                      Upload FIR File
                    </label>

                    {/* File Name Display */}
                    {/* <span className="fir-file-name">{firFileName || "No file selected"}</span> */}
                  </div>
                </div>
                     {/* Other Files Upload */}
                  <div className="col-md-3">
                    <div className="other-files-upload">
                      <input
                        type="file"
                        id="other-files"
                        name="otherFiles"
                        multiple
                        onChange={handleOtherFilesChange}
                        className="other-files-input"
                      />
                      <label htmlFor="other-files" className="other-files-label">
                        Upload Other Documents
                      </label>
                      <div className="other-files-name">
                      {otherFilesName.map((file, index) => (
                        <span key={index} className="other-file-name">
                          {file}{" "}
                          <button type="button" onClick={() => handleDeleteFile(file)}>x</button>
                        </span>
                      ))}
                        {/* {otherFilesName.length > 0 ? (
                          otherFilesName.map((file, index) => (
                            <span key={index} className="other-file-name">
                              {file}{" "}
                              <button type="button" onClick={() => handleDeleteFile(file)}>x</button>
                            </span>
                          ))
                        ) : (
                          <span className="no-file">No files selected</span>
                        )} */}
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="mb-5" style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <Button type="button" onClick={handleSubmit} variant="contained" color="primary">Save</Button>
        <Button variant="outlined" color="secondary" style={{ marginLeft: "10px" }}>Cancel</Button>
      </div>
    </form>
  );
};

export default FormComponent;
