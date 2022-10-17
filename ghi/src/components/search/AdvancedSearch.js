import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useState } from "react";

function AdvancedSearch() {
  const [value, setValue] = useState(25);

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Converted Mana Cost</Form.Label>
              <Form.Group as={Row}>
                <Col xs="9">
                  <Form.Range
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Col>
                <Col xs="3">
                  <Form.Control value={value} />
                </Col>
              </Form.Group>
            </Form.Group>

            <Form.Group>
              <Form.Label>Colors</Form.Label>
              <Form.Check
                inline
                label="White"
                name="group1"
                type="checkbox"
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Blue"
                name="group1"
                type="checkbox"
                id={`inline-radio-2`}
              />
              <Form.Check
                inline
                label="Black"
                name="name"
                type="checkbox"
                id={`inline-radio-3`}
              />
              <Form.Check
                inline
                label="Red"
                name="group1"
                type="checkbox"
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Green"
                name="group1"
                type="checkbox"
                id={`inline-radio-2`}
              />
              <Form.Check
                inline
                label="Colorless"
                name="3"
                type="checkbox"
                id={`inline-radio-3`}
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Exact Colors"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check type="switch" id="custom-switch" label="Legendary" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Rarity</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Type</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Format</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <div>Hello</div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvancedSearch;
