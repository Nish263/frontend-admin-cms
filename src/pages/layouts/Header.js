import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../system-state/systemSlice";
import { useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.admin);
  return (
    <div>
      <Navbar variant="light" bg="primary" expand="md">
        <Container>
          <Button variant="primary" onClick={() => dispatch(toggleSidebar())}>
            <i className="fa-solid fa-bars"></i>
          </Button>
          <LinkContainer to="/">
            <Navbar.Brand>My Store Admin</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user._id ? (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link> Register</Nav.Link>
                  </LinkContainer>

                  <Link to="/" className="nav-link">
                    login
                  </Link>
                </>
              ) : (
                <i className="fa-solid fa-bell"></i>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
