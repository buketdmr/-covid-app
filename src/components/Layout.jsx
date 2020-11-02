import React from "react";
import { Container } from "react-bootstrap";

export const Layout = props => {
  return (
    <Container className="justify-content-md-center">
      {props.children}
    </Container>
  );
};
