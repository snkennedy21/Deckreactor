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
  const [colorStatus, setColorStatus] = useState("exactly");
  const [rarity, setRarity] = useState("");
  const [type, setType] = useState("");
  const [legalStatus, setLegalStatus] = useState("legal");
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

  function getSelectedManaColors() {
    const selectedMagicColors = [];
    colors
      .filter((color) => color.checked === true)
      .forEach((color) => {
        if (color.name === "Blue") {
          selectedMagicColors.push("U");
        } else selectedMagicColors.push(color.name[0]);
      });
    return selectedMagicColors.join("");
  }

  function getUnselectedManaColors() {
    const unselectedMagicColors = [];
    colors
      .filter((color) => color.checked === false)
      .forEach((color) => {
        if (color.name === "Blue") {
          unselectedMagicColors.push("U");
        } else unselectedMagicColors.push(color.name[0]);
      });

    return unselectedMagicColors.join("");
  }

  function submitHandler(e) {
    e.preventDefault();
    let selectedManaColors = getSelectedManaColors();
    let unselectedManaColors = getUnselectedManaColors();

    // Base Query
    let queryString = `cmc<=${manaCost}`;
    if (name !== "") {
      queryString += ` ${name}`;
    }

    // Handle Colors
    if (selectedManaColors !== "") {
      if (colorStatus === "exactly") {
        queryString += ` color=${selectedManaColors}`;
      } else if (colorStatus === "including") {
        queryString += ` color>=${selectedManaColors}`;
      } else if (colorStatus === "at most") {
        queryString += ` color<=${selectedManaColors}`;
      }
    }

    if (rarity !== "") {
      queryString += ` rarity:${rarity}`;
    }
    if (type !== "") {
      queryString += ` t:${type}`;
    }
    if (format !== "") {
      queryString += ` ${legalStatus}:${format}`;
    }

    console.log(queryString);

    dispatch(searchActions.updateSearch(queryString));
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
              <Form.Label>Maximum CMC</Form.Label>
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
              <Row>
                {colorsArray.map((color, index) => {
                  return (
                    <Col key={color.name}>
                      <Form.Check
                        onChange={colorChangeHandler}
                        id={color.id}
                        value={color.name}
                        label={color.name}
                        checked={color.checked}
                        type="checkbox"
                      ></Form.Check>
                    </Col>
                  );
                })}
                <Col>
                  <Form.Check
                    label="Colorless"
                    onChange={uncheckColorsHandler}
                    checked={colorlessChecked}
                  ></Form.Check>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setColorStatus(e.target.value)}
              >
                <option value="exactly">Exactly These Colors</option>
                <option value="including">Including These Colors</option>
                <option value="at most">At Most These Colors</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Rarity</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setRarity(e.target.value)}
              >
                <option value="0">Open this select menu</option>
                <option value="c">Common</option>
                <option value="u">Uncommon</option>
                <option value="r">Rare</option>
                <option value="m">Mythic Rare</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="0">Open this select menu</option>
                <option value="artifact">Artifact</option>
                <option value="creature">Creature</option>
                <option value="enchantment">Enchantment</option>
                <option value="instant">Instant</option>
                <option value="land">Land</option>
                <option value="planeswalker">Planeswalker</option>
                <option value="sorcery">Sorcery</option>
                <option value="tribal">Tribal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row>
                <Form.Label>Format</Form.Label>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setLegalStatus(e.target.value)}
                  >
                    <option value="legal">Legal</option>
                    <option value="restricted">Restricted</option>
                    <option value="banned">Banned</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setFormat(e.target.value)}
                  >
                    <option value="0">Open this select menu</option>
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
                </Col>
              </Row>
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
