import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useState } from "react";

const colorsArray = [
  { name: "White", checked: false, id: "0" },
  { name: "Blue", checked: false, id: "1" },
  { name: "Black", checked: false, id: "2" },
  { name: "Red", checked: false, id: "3" },
  { name: "Green", checked: false, id: "4" },
];

function AdvancedSearch() {
  const [name, setName] = useState("");
  const [manaCost, setManaCost] = useState(25);
  const [colors, setColors] = useState(colorsArray);

  function colorChangeHandler(e) {
    const index = e.target.id;
    console.log(index);
    const newArray = colorsArray;
    newArray[index].checked = !newArray[index].checked;
    console.log(newArray);
    setColors([...newArray]);
  }

  function uncheckColorsHandler() {
    colorsArray.forEach((color) => {
      color.checked = false;
    });
    console.log(colorsArray);
    setColors(colorsArray);
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
              {colorsArray.map((color, index) => {
                return (
                  <Form.Check
                    onChange={colorChangeHandler}
                    key={color.name}
                    id={color.id}
                    value={color.name}
                    label={color.name}
                    checked={color.checked}
                    type="checkbox"
                  ></Form.Check>
                );
              })}
              <Form.Check onChange={uncheckColorsHandler}></Form.Check>
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
