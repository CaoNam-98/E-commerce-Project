import React from 'react' //rfce
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className='justify-content-center py-4'> 
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login">
                        <Navbar.Item>Đăng Nhập</Navbar.Item>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Login</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping">
                        <Navbar.Item>Địa Chỉ</Navbar.Item>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment">
                        <Navbar.Item>Payment</Navbar.Item>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Order</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeOrder">
                        <Navbar.Item>Đặt Hàng</Navbar.Item>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )   
}

export default CheckoutSteps
