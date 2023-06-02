import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../Style/header.css";
import { getSearchResults } from "../Redux/Slices/SearchSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(query));
  }, [dispatch, query]);

  const handleform = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar className="bg-dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="text-warning fw-bold fs-3" as={Link} to="/">
            Movies App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/series">
                Series
              </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleform}>
              <div className="me-4">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Link to="/searchresult">
                <Button
                  variant="outline-info"
                  onClick={() => dispatch(getSearchResults(query))}
                >
                  Search
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline-primary" className="ms-3">
                  Login
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
