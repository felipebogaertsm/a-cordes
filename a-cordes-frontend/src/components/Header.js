import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'

function Header() {
    return (
        <header>
        <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>à cordes</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link><i className="fas fa-home px-2"></i>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Nav.Link><i className="fas fa-user px-2"></i>Log in</Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header;
