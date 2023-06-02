import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRef, useState } from "react";
import "../Style/login.css";
import { Link, useNavigate } from "react-router-dom";
import { SiGithub } from "react-icons/si";
import { BsGoogle } from "react-icons/bs";

const LogIn = (users) => {
  const email = useRef();
  const [emailError, setEmailError] = useState(false);
  const pass = useRef();
  const [passError, setPassError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginForm = (e) => {
    e.preventDefault();
    const myEmail = email.current.value;
    const myPass = pass.current.value;

    if (myEmail === "" || myPass === "") {
      setEmailError(true);
      setPassError(true);
    } else {
      setEmailError(false);
      setPassError(false);
      localStorage.email = myEmail;
      navigate("/", { state: { email } });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center fw-bold login-div container">
      <div className="container">
        <Form onSubmit={loginForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              ref={email}
              type="text"
              placeholder="Enter email"
              className="fw-bold"
            />
            {emailError && (
              <p className="text-danger">Please enter your email address.</p>
            )}
            <Form.Text className="text-info">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-light">Password</Form.Label>
            <InputGroup>
              <Form.Control
                ref={pass}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="fw-bold"
              />

              <InputGroup.Text
                onClick={togglePasswordVisibility}
                className="bg-light text-primary fw-bold fs-5"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </InputGroup.Text>
            </InputGroup>
            {passError && (
              <p className="text-danger">Please enter a valid Password.</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              className="text-light"
            />
          </Form.Group>
          <div className="w-100 d-flex align-items-center justify-content-center mt-3">
            <Button variant="primary" type="submit" className="me-5 log">
              Login
            </Button>
            <Link to="/signup">
              <Button variant="primary" type="submit" className="crt-btn">
                Create New Account
              </Button>
            </Link>
          </div>
        </Form>
        <hr className="text-white mt-3" />
      </div>
      <div>
        <div className="w-100 d-flex align-items-center justify-content-center mt-3 ms-4">
          <Button
            variant="dark"
            className="me-5 d-flex align-items-center git-btn"
          >
            <SiGithub className="me-1" />
            Sign-in with Github
          </Button>
          <Button
            variant="danger"
            className="me-5 d-flex align-items-center g-btn"
          >
            <BsGoogle className="me-1" /> Sign-in with Google Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
