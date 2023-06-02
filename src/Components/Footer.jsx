import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiCopyright } from "react-icons/bi";
import "../Style/footer.css";

const Footer = () => {
  return (
    <div>
      <Navbar className="foot bg-dark">
        <Container className="d-flex flex-column">
          <div className="w-100 text-center mt-5">
            <span className="text-light fw-bold fs-5">
              <BiCopyright />
              2023
            </span>
            <span className="text-warning fs-3 fw-bold"> Movies App</span>
            <span className="text-light fs-4">, All Rights Reserved.</span>
          </div>
          <div className="text-center w-100 text-danger d-flex justify-content-center mt-3 mb-5">
            <Nav.Link>About us</Nav.Link>
            <Nav.Link className="mx-4">Terms of use</Nav.Link>
            <Nav.Link>Privacy</Nav.Link>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;
