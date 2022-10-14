import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useEffect } from "react";
import { useGetCardsQuery } from "../../store/scryfallApi";

function NavScrollExample() {
  const [search, setSearch] = useState("");
  const { data } = useGetCardsQuery(search);

  function updateSearchTermHandler(e) {
    setSearch(e.target.value);
  }

  function queryScryfallHandler(e) {
    e.preventDefault();
    fetchCardDataFromScryfall(search);
  }

  async function fetchCardDataFromScryfall(search) {
    const scryfallUrl = `http://localhost:8000/scryfall/${search}`;
    const scryfallResponse = await fetch(scryfallUrl);

    if (scryfallResponse.ok) {
      const scryfallData = await scryfallResponse.json();
      console.log(scryfallData);
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form onSubmit={queryScryfallHandler} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={updateSearchTermHandler}
              value={search}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
