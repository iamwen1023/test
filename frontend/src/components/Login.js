import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useContext,  useState } from 'react';
import { UserContext } from '../context/UserContext.js';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () =>{

  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [inputs, setInputs] = useState({
    email: "john@example.com",
    password: "securepassword",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const addUserHandler = (newUser) => setUser(newUser);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("here");
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const newUser = { email: inputs.email, password: inputs.password };
    addUserHandler(newUser);
    const mydata = {
      data: {
        type: "token",
        attributes: { ...newUser },
      }
    }
    try {
      const loginResponse = await axios.post('/login', mydata,{
        headers: {
          "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json", 'Access-Control-Allow-Credentials': true },
      });
      // const response = await AuthService.login(myData);
      console.log(loginResponse);
      // localStorage.setItem("token", response.access_token, response.refresh_token);
      handleLogin();
      navigate("/landing");
      // authContext.login(response.access_token, response.refresh_token);
    } catch (res) {
      console.log(res);
    }

    return () => {
      setInputs({
        email: "",
        password: "",
      });

      setErrors({
        emailError: false,
        passwordError: false,
      });
    };
  };

    return (
      <>
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" label="Email" value={inputs.email} name="email" onChange={changeHandler}  />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              label="Password"
                              name="password"
                              value={inputs.password}
                              onChange={changeHandler}
                    
                            />
                          </InputGroup>
                        </FormGroup>
  
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
      </>
    );
}

export default Login;
