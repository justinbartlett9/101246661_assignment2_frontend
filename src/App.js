import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import EmployeeTable from "./EmployeeTable";
import ViewEmployee from "./ViewEmployee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Employee Management App</Navbar.Brand>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeTable />} />
          <Route path="/view-employee/:id" element={<ViewEmployee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
