import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
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
                <Col md={8} className="info__place-order"> 
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <h3>?????a Ch??? Giao H??ng</h3>
                            <i class="fas fa-address-card"></i>{' '}
                            ?????a ch???: {cart.shippingAddress.address}, {' '}
                            {cart.shippingAddress.city}, {' '}
                            { cart.shippingAddress.country }
                            <br/>
                            <i class="fas fa-phone"></i>{' '}
                            S??? ??i???n tho???i: {cart.shippingAddress.phone}
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h3>Ph????ng Th???c Thanh To??n</h3>
                            <i class="fab fa-cc-amazon-pay"></i>{' '}
                            Ph????ng th???c: {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h3>????n H??ng</h3>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">Kh??ng c?? s???n ph???m n??o</Message>
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
                <Col md={4} className="place-order">
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Ho?? ????n</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>T???ng ti???n h??ng:</Col>
                                <Col md={6}>{itemPrice.toFixed(3)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Ph?? V???n Chuy???n:</Col>
                                {totalItems > 50 ? (
                                    <Col md={6}>0</Col>
                                ):(
                                    <Col md={6}>{shippingPrice.toFixed(3)}</Col>
                                )}     
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Thu???:</Col>
                                <Col md={6}>{taxPrice.toFixed(3)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>T???ng Thanh To??n:</Col>
                                <Col md={6}>{totalPrice.toFixed(3)}</Col>
                            </Row>
                        </ListGroup.Item>
                            {error && 
                                <ListGroup.Item>
                                    <Message variant='danger'>{error}</Message>
                                </ListGroup.Item>
                            }
                        <ListGroup.Item>
                            <Button type='submit' variant="primary" className="my-2" onClick={placeOrderHandler}>?????t H??ng</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
