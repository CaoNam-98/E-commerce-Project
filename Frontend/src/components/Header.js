import React, { useEffect } from 'react' // rfce
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 
    const dispatch = useDispatch()
    let history = useHistory()

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [history, userInfo])

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <Image 
                                src="https://cdn.pnj.io/images/logo/pnj.com.vn.png" 
                                fluid 
                                thumbnail 
                                style={{ width: '80px'}}
                            />  
                            {' '}Shop Hải Anh
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link className="nav-item" ><i class="fas fa-shopping-cart"></i>  {' '}Cart</Nav.Link>
                        </LinkContainer>
                        
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/logout" onClick={logoutHandler}>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ):(
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i class="fas fa-user"></i>Login
                                </Nav.Link>
                            </LinkContainer> 
                        )} 
                        {userInfo && userInfo.isAdmin ? (
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <LinkContainer to="/admin/userlist">
                                    <NavDropdown.Item>User List</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />  
                                <LinkContainer to="/admin/productlist">
                                    <NavDropdown.Item>Product List</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />  
                                <LinkContainer to="/admin/orderlist">
                                    <NavDropdown.Item>Order List</NavDropdown.Item>
                                </LinkContainer>                                 
                          </NavDropdown>
                        ) : ''}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
