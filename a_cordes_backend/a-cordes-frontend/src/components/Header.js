import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import React from 'react'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    };

    return (
        <header className="">
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" id="header">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>à cordes</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link><i className="fas fa-home px-2"></i>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart px-2"></i>Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link><i className="fas fa-arrow-circle-right px-2"></i>About us</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Nav>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user px-2"></i>Log in</Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.is_admin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userList'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productList'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderList'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            <SearchBox />
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
