// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

import registerImg from "../../assets/images/register.png";
import userIcon from "../../assets/images/user.png";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
        alert(result.message);
        return;
      }

      // Successful registration
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user: result.user, token: result.token },
      });

      alert("Registration successful! Please login.");
      navigate("/login"); // redirect to login
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={registerImg} alt="" />
              </div>
              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={handleClick} autoComplete="off">
                  <FormGroup>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      required
                      value={credentials.username}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      required
                      value={credentials.email}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </FormGroup>
                  <Button type="submit" className="btn secondary__btn auth__btn">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
