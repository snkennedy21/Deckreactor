import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useState } from "react";

function AdvancedSearch() {
  const [name, setName] = useState("");
  const [manaCost, setManaCost] = useState(25);
  const [colorsArray, setColorsArray] = useState([]);
  const [isColorlessChecked, setIsColorlessChecked] = useState(false);

  function colorChangeHandler(e) {
    let newArray = [...colorsArray, e.target.value];
    if (colorsArray.includes(e.target.value)) {
      newArray = newArray.filter((color) => color !== e.target.value);
    }
    setColorsArray(newArray);
    console.log(colorsArray);
  }

  function colorlessChangeHandler(e) {
    setColorsArray([]);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Converted Mana Cost</Form.Label>
              <Form.Group as={Row}>
                <Col xs="9">
                  <Form.Range
                    value={manaCost}
                    onChange={(e) => setManaCost(e.target.value)}
                  />
                </Col>
                <Col xs="3">
                  <Form.Control
                    value={manaCost}
                    onChange={(e) => setManaCost(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </Form.Group>

            <Form.Group>
              <Form.Label>Colors</Form.Label>
              <Form.Check
                onChange={colorChangeHandler}
                inline
                value="White"
                label="White"
                name="group1"
                type="checkbox"
                id={`inline-radio-1`}
              />
              <Form.Check
                onChange={colorChangeHandler}
                inline
                value="Blue"
                label="Blue"
                name="group1"
                type="checkbox"
                id={`inline-radio-2`}
              />
              <Form.Check
                onChange={colorChangeHandler}
                inline
                value="Black"
                label="Black"
                name="name"
                type="checkbox"
                id={`inline-radio-3`}
              />
              <Form.Check
                onChange={colorChangeHandler}
                inline
                value="Red"
                label="Red"
                name="group1"
                type="checkbox"
                id={`inline-radio-1`}
              />
              <Form.Check
                onChange={colorChangeHandler}
                inline
                value="Green"
                label="Green"
                name="group1"
                type="checkbox"
                id={`inline-radio-2`}
              />
              <Form.Check
                onChange={colorlessChangeHandler}
                inline
                value="Colorless"
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
