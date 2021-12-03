import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DATA = { id: 0, firstName: "", lastName: "", emailId: "" };

export default function ViewEmployee() {
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

  return (
    <Container>
      <Row>
        <h1>Employee Details</h1>
      </Row>
      <Row>
        <Card style={{ width: "40rem", margin: "auto" }}>
          <Card.Body>
            <Row as={Card.Title}>First Name: {employee.firstName}</Row>
            <Row as={Card.Title}>Last Name: {employee.lastName}</Row>
            <Row as={Card.Title}>Email: {employee.emailId}</Row>
            <Row sm="auto">
              <Col sm={{ span: 3, offset: 9 }}>
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
