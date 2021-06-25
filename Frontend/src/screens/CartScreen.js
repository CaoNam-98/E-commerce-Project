import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap'
import Message from './../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ match, location, history}) {
    const productId = match.params.id
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping') // nếu đã login thì redirect đến /shipping, nếu chưa thì sang /login
    }

    return (
        <Row>
            <Col md={8}>
                <h3>Giỏ Hàng</h3>
                {cartItems.length === 0 ? (
                    <Message>Không có sản phẩm nào trong giỏ hàng <Link to='/' style={{
                        textDecoration: 'none',
                        color: 'red',
                    }}>Go Back</Link></Message>
                ) : (
                    <ListGroup>
                        {
                            cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} rounded fluid/>
                                        </Col>
                                        <Col md={4}>
                                            <Link to='/'>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            {item.price}Đ
                                        </Col>
                                        <Col md={2} style={{marginLeft: '15px'}}>
                                            <Form.Control as="select" rows={2} onChange={(e) => dispatch(addToCart(item.product ,e.target.value))} value={item.quantity}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x => {
                                                        return (
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                                <i class="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }
                        
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col md={4}>
                                <h5>
                                    Tổng Tiền  
                                    ({cartItems.reduce((total, item) => {
                                        return total + item.quantity
                                    }, 0)})
                                </h5>
                            </Col>
                            <Col md={3}>
                                <h5>
                                    {cartItems.reduce((total, item) => {
                                        return total + item.quantity*item.price
                                    }, 0)}
                                </h5>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button 
                            type="button" 
                            className="card-btn" 
                            disabled={cartItems.length === 0 ? true : false}
                            onClick={checkoutHandler}
                        >
                            PROCEED TO CHECKOUT
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default CartScreen
