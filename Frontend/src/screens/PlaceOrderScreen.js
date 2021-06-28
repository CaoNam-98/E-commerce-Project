import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Button, Row, Col, ListGroup, Image, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import './../index.css'
import { createOrder, listMyOrders} from '../actions/orderActions'
import { cartItemReset } from '../actions/cartActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const itemPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.price*item.quantity
    },0)
    const taxPrice = itemPrice*0.25
    const shippingPrice = 0.06*itemPrice
    const totalItems = cart.cartItems.reduce((acc, item) => {
        return acc + parseInt(item.quantity)
    },0)
    const totalPrice = itemPrice + shippingPrice + taxPrice

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }))
    }

    if (!cart.paymentMethod) {
        history.push('/payment')
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
            dispatch(listMyOrders())
            dispatch(cartItemReset())
        }
    }, [history, success, dispatch])

    return (
        <div>
            <CheckoutSteps />
            <Row>
                <Col md={8}> 
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <h3>Địa Chỉ Giao Hàng</h3>
                            <i class="fas fa-address-card"></i>{' '}
                            Địa chỉ: {cart.shippingAddress.address}, {' '}
                            {cart.shippingAddress.city}, {' '}
                            { cart.shippingAddress.country }
                            <br/>
                            <i class="fas fa-phone"></i>{' '}
                            Số điện thoại: {cart.shippingAddress.phone}
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h3>Phương Thức Thanh Toán</h3>
                            <i class="fab fa-cc-amazon-pay"></i>{' '}
                            Phương thức: {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h3>Đơn Hàng</h3>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">Không có sản phẩm nào</Message>
                            ): (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={6}>
                                                    {item.name}
                                                </Col>
                                                <Col md={5}>
                                                    {item.price} x {item.quantity} = {item.price * item.quantity}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Hoá Đơn</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Tổng tiền hàng:</Col>
                                <Col md={6}>{itemPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Phí Vận Chuyển:</Col>
                                {totalItems > 50 ? (
                                    <Col md={6}>0</Col>
                                ):(
                                    <Col md={6}>{shippingPrice}</Col>
                                )}     
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Thuế:</Col>
                                <Col md={6}>{taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Tổng Thanh Toán:</Col>
                                <Col md={6}>{totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='submit' variant="primary" className="my-2" onClick={placeOrderHandler}>Đặt Hàng</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
