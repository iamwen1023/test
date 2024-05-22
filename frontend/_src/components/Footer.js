import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col sm={6}>
            <h5>About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quam erat, vestibulum eget ante vel, eleifend pretium nisi. Donec pulvinar leo ac aliquam placerat.</p>
          </Col>
          <Col sm={6} className="d-flex align-items-center justify-content-end">
            <p>© {new Date().getFullYear()} Airbnb Clone</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
