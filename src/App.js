import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import CrimeReportsTable from "./components/CrimeReportsTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import ModalReports from "./components/Modal Reports";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Bootstrap Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/"><strong>Social Media Monitoring</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="m-3" as={Link} to="/">Home</Nav.Link>
                <Nav.Link className="m-3" as={Link} to="/add-report">Add Entry</Nav.Link>
                <Nav.Link className="m-3" as={Link} to="/view-reports">View Reports</Nav.Link>
                {/* <Nav.Link className="m-3" as={Link} to="/modal-reports">Modal Reports</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Page Content */}
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<h2 className="text-center" style={{marginTop:"30vh"}}>Welcome to Social Media Monitoring</h2>} />
            <Route path="/add-report" element={<FormComponent />} />
            <Route path="/view-reports" element={<CrimeReportsTable />} />
            <Route path="/modal-reports" element={<ModalReports />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
