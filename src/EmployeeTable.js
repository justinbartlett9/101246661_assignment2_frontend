import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const DATA = [{ id: 0, firstName: "", lastName: "", emailId: "" }];

export default function EmployeeTable() {
  const [employees, setEmployees] = useState(DATA);
  const [deleteEmployee, setDeleteEmployee] = useState(DATA[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    axios.get("http://localhost:9090/api/v1/employees/").then((res) => {
      setEmployees(res.data);
    });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:9090/api/v1/employees/${deleteEmployee.id}`)
      .then((res) => {
        window.location.reload(false);
      });
  };

  let navigate = useNavigate();

  return (
    <Container>
      <Row style={{ marginBottom: "20px" }}>
        <h1>Employee List</h1>
      </Row>
      <Row sm="auto" style={{ marginBottom: "20px" }}>
        <Button
          onClick={() => {
            navigate("/add-employee");
          }}
        >
          Add Employee
        </Button>
      </Row>
      <Row>
        <Table striped hover bordered responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.emailId}</td>
                  <td style={{ maxWidth: "8rem" }}>
                    <Button
                      className="mx-2"
                      onClick={() => {
                        navigate(`/update-employee/${e.id}`);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      className="mx-2"
                      variant="danger"
                      onClick={() => {
                        setDeleteEmployee(e);
                        handleShow();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      className="mx-2"
                      variant="info"
                      onClick={() => {
                        navigate(`/view-employee/${e.id}`);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Delete {deleteEmployee.firstName} {deleteEmployee.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
