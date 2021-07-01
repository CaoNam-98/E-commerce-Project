import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import {Button, Row, Col, ListGroup, Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import './../index.css'
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import { ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails
    const cart = useSelector(state => state.cart)
    var totalItems = cart.cartItems.reduce((acc, item) => {
        return acc + parseInt(item.quantity)
    }, 0)

    // const totalPrice = (parseInt(itemPrice) + parseInt(shippingPrice) + parseInt(taxPrice)).toFixed(2)
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    var orderPrice = 0
    if(!loading && !error) {
        orderPrice = (order.orderItems.reduce((acc, item) => {
            return acc + item.price*item.qty
        },0)).toFixed(2)
    }

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
        if(!order || order._id !== Number(orderId)) {
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, history, userInfo, order, orderId, successDeliver])

    const onHanlerDelivered = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loading/>
    ): error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h3>Mã đơn hàng: {order._id}</h3>
            <Row>
                <Col md={8}> 
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <h3>Địa Chỉ Giao Hàng</h3>
                            <p>
                                <i class="fas fa-user-alt"></i>{' '}
                                <strong>Tên khách hàng: {order.user.name}</strong>
                            </p>
                            <p>
                                <i class="fas fa-envelope"></i>{' '}
                                <strong>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></strong>
                            </p>
                            <i class="fas fa-address-card"></i>{' '}
                            Địa chỉ: {order.shippingAddress.address}, {' '}
                            {order.shippingAddress.city}, {' '}
                            { order.shippingAddress.country }
                            <br/>
                            {order.isDelivered ? (
                                <Message variant="success">Đã giao hàng vào lúc: {order.deliveredAt.substring(0,10)}</Message>
                            ) : (
                                <Message variant="warning">Chưa giao hàng</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h3>Phương Thức Thanh Toán</h3>
                            <i class="fab fa-cc-amazon-pay"></i>{' '}
                            Phương thức: {order.paymentMethod}
                            {order.isPaid ? (
                                <Message variant="success">Đã thanh toán</Message>
                            ) : (
                                <Message variant="warning">Chưa thanh toán</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item className="pt-4">
                            <h3>Đơn Hàng</h3>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">Không có sản phẩm nào</Message>
                            ): (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col md={6}>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.price} x {item.qty} = {item.price * item.qty}
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
                            <h3>Hoá Đơn Chi Tiết</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Tổng tiền hàng:</Col>
                                <Col md={6}>{orderPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Phí Vận Chuyển:</Col>
                                {totalItems > 50 ? (
                                    <Col md={6}>0</Col>
                                ):(
                                    <Col md={6}>{order.shippingPrice}</Col>
                                )}     
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Thuế:</Col>
                                <Col md={6}>{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={6}>Tổng Thanh Toán:</Col>
                                <Col md={6}>{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                            {loadingDeliver && <Loading />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button 
                                        type='button' 
                                        onClick={ onHanlerDelivered }
                                    >
                                        Đã Giao Hàng
                                    </Button>
                                </ListGroup.Item>
                            )}   
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen

