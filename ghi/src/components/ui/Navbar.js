import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import {
  useLogOutMutation,
  useGetTokenQuery,
  useLogInMutation,
} from "../../store/accountApi";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchActions } from "../../store/store";
import logo from "../../images/logo.png";

function LogoutButton() {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const navigate = useNavigate();
  const [logOut, { data }] = useLogOutMutation();

  return (
    <Button onClick={logOut} variant="outline-danger mx-2">
      Logout
    </Button>
  );
}

function LoginButton() {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <Button onClick={navigateToLogin} variant="outline-success mx-2">
      Login
    </Button>
  );
}

function NavScrollExample() {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const {
    account: { roles = [] },
  } = token || { account: {} };
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function updateSearchTermHandler(e) {
    setSearch(e.target.value);
  }

  function queryScryfallHandler(e) {
    e.preventDefault();
    dispatch(searchActions.updateSearch(search));
    navigate("/search");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <Image src={logo} style={{ width: "4rem" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            onSelect={(selectedKey) => navigate(selectedKey)}
          >
            <Nav.Link eventKey="/advanced-search">AdvancedSearch</Nav.Link>
            <Nav.Link eventKey="/signup">Signup</Nav.Link>
            {token ? (
              <Nav.Link eventKey="/collection">My Collection</Nav.Link>
            ) : (
              <></>
            )}
          </Nav>
          {token ? <LogoutButton /> : <LoginButton />}
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
