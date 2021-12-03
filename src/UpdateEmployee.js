import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { Alert, FloatingLabel, Form } from "react-bootstrap";

const DATA = { id: 0, firstName: "", lastName: "", emailId: "" };

export default function UpdateEmployee() {
  const [errorMessage, setErrorMessage] = useState("");
  const params = useParams();
  const [employee, setEmployee] = useState(DATA);

  let navigate = useNavigate();

  useEffect(() => {
    const getEmployee = () => {
      axios
        .get(`http://localhost:9090/api/v1/employees/${params.id}`)
        .then((res) => {
          if (res.data.length === 0) {
            navigate("/");
          } else {
            setEmployee(res.data[0]);
          }
        });
    };
    getEmployee();
  }, [navigate, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let employee = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      emailId: e.target.email.value,
    };

    await axios
      .put(`http://localhost:9090/api/v1/employees/${params.id}`, employee)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <Container>
      <Row>
        <h1>Employee Details</h1>
        <Alert
          variant="danger"
          hidden={!errorMessage}
          style={{ width: "40rem", margin: "auto" }}
        >
          {errorMessage}
        </Alert>
      </Row>
      <Row>
        <Card style={{ width: "40rem", margin: "auto" }}>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel className="mb-3 mt-3" label="First Name">
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                id="firstName"
                defaultValue={employee.firstName}
              ></Form.Control>
            </FloatingLabel>
            <FloatingLabel className="mb-3" label="Last Name">
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                id="lastName"
                defaultValue={employee.lastName}
              ></Form.Control>
            </FloatingLabel>
            <FloatingLabel className="mb-3" label="Email ID">
              <Form.Control
                required
                type="email"
                placeholder="Email"
                id="email"
                defaultValue={employee.emailId}
              ></Form.Control>
            </FloatingLabel>
            <Row sm="auto" className="mb-3">
              <Button type="submit" className="mx-3">
                Update Employee
              </Button>
              <Button
                variant="secondary"
                className="mx-3"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </Button>
            </Row>
          </Form>
        </Card>
      </Row>
    </Container>
  );
}
