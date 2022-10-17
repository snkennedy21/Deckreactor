import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import SearchResults from "./SearchResults";
import { useState } from "react";
import { searchActions } from "../../store/store";
import { useDispatch } from "react-redux";

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
  const [colorlessChecked, setColorlessChecked] = useState(false);
  const [exactColors, setExactColors] = useState(false);
  const [legendary, setLegendary] = useState(false);
  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [format, setFormat] = useState("");

  const dispatch = useDispatch();

  function colorChangeHandler(e) {
    setColorlessChecked(false);
    const index = e.target.id;
    const newArray = colorsArray;
    newArray[index].checked = !newArray[index].checked;
    setColors([...newArray]);
  }

  function uncheckColorsHandler() {
    setColorlessChecked(!colorlessChecked);
    colorsArray.forEach((color) => {
      color.checked = false;
    });
    console.log(colorsArray);
    setColors(colorsArray);
  }

  function convertColorNameToMagicLetter() {
    const magicColors = [];
    colors.forEach((color) => {
      if (color.checked === true) {
        if (color.name === "Blue") {
          magicColors.push("U");
        } else magicColors.push(color.name[0]);
      }
    });
    return magicColors.join("");
  }

  function submitHandler(e) {
    let manaColors = convertColorNameToMagicLetter();
    e.preventDefault();
    dispatch(
      searchActions.updateSearch(
        `name:${name} color:${manaColors} rarity:${rarity} t:${type} format:${format}`
      )
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
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
              <Form.Check
                label="Colorless"
                onChange={uncheckColorsHandler}
                checked={colorlessChecked}
              ></Form.Check>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Exact Colors"
                onChange={(e) => setExactColors(!exactColors)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Legendary"
                onChange={(e) => setLegendary(!legendary)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Rarity</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setRarity(e.target.value)}
              >
                <option>Open this select menu</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Mythic Rare">Mythic Rare</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setType(e.target.value)}
              >
                <option>Open this select menu</option>
                <option value="Artifact">Artifact</option>
                <option value="Conspiracy">Conspiracy</option>
                <option value="Creature">Creature</option>
                <option value="Emblem">Emblem</option>
                <option value="Enchantment">Enchantment</option>
                <option value="Hero">Hero</option>
                <option value="Instant">Instant</option>
                <option value="Land">Land</option>
                <option value="Phenomenon">Phenomenon</option>
                <option value="Plane">Plane</option>
                <option value="Planeswalker">Planeswalker</option>
                <option value="Scheme">Scheme</option>
                <option value="Sorcery">Sorcery</option>
                <option value="Tribal">Tribal</option>
                <option value="Vanguard">Vanguard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Format</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setFormat(e.target.value)}
              >
                <option>Open this select menu</option>
                <option value="Standard">Standard</option>
                <option value="Future Standard">Future Standard</option>
                <option value="Historic">Historic</option>
                <option value="Gladiator">Gladiator</option>
                <option value="Pioneer">Pioneer</option>
                <option value="Explorer">Explorer</option>
                <option value="Modern">Modern</option>
                <option value="Legacy">Legacy</option>
                <option value="Pauper">Pauper</option>
                <option value="Vintage">Vintage</option>
                <option value="Pennyy Dreadful">Pennyy Dreadful</option>
                <option value="Commander">Commander</option>
                <option value="Brawl">Brawl</option>
                <option value="Historic Brawl">Historic Brawl</option>
                <option value="Pauper Commander">Pauper Commander</option>
                <option value="Duel Commander">Duel Commander</option>
                <option value="Old School 93/94">Old School 93/94</option>
                <option value="Premodern">Premodern</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col>
          <SearchResults />
        </Col>
      </Row>
    </Container>
  );
}

export default AdvancedSearch;
