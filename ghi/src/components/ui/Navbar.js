import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import {
  useLogOutMutation,
  useGetTokenQuery,
} from "../../store/RTK_Query/accountApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchActions } from "../../store/store";
import logo from "../../images/logo.png";

import React from "react";

function LogoutButton() {
  const [logOut] = useLogOutMutation();

  return (
    <Link to="/">
      <Button
        className={`${styles["button-primary"]}`}
        onClick={logOut}
        style={{
          backgroundColor: "#1877f2",
          border: "none",
          marginRight: "10px",
        }}
      >
        Logout
      </Button>
    </Link>
  );
}

function LoginButton() {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <Button
      className={`${styles["button-primary"]}`}
      onClick={navigateToLogin}
      style={{
        backgroundColor: "#1877f2",
        border: "none",
        marginRight: "10px",
      }}
    >
      Login
    </Button>
  );
}

function NavScrollExample() {
  const { data: token } = useGetTokenQuery();
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

  function navigateToHome(e) {
    navigate("/");
  }

  return (
    <Navbar className={`${styles["navbar"]}`}>
      <Container fluid>
        <Navbar.Brand onClick={navigateToHome} style={{ cursor: "pointer" }}>
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
            <Nav.Link eventKey="/advanced-search">Advanced Search</Nav.Link>
            {token ? (
              <Nav.Link eventKey="/collection">My Collection</Nav.Link>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {token ? (
              <Nav.Link eventKey="/decks">My Decks</Nav.Link>
            ) : (
              <React.Fragment></React.Fragment>
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

            {/* <Button
              type="submit"
              style={{
                backgroundColor: "#d81159",
                border: "none",
                marginRight: "10px",
              }}
            >
              Search
            </Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
