import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import './../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import Loading from './../components/Loading'
import Message from './../components/Message'

function ProductScreen({match, history}) { 
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, productDetail } = productDetails

    useEffect(() => {
        dispatch(detailsProduct(match.params.id))
    }, [dispatch, match.params.id])

    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    return (
        <div className="product_detail">
            <Link to='/' className="btn btn-light">Go Back</Link>
            {loading ? <Loading/>
                : error ? <Message>{error}</Message>
                    :
                    <Row class="card-item">
                        <Col md={6}>
                            <Image src={productDetail.image} alt={productDetail.image}/>
                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h5>{productDetail.name}</h5>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={productDetail.rating} text={`${productDetail.numReviews} reviews`} color={'#FFFF00'}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: {productDetail.price}VNĐ   
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {productDetail.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>{productDetail.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{productDetail.countInStock !== 0 ? 'Còn Hàng' : 'Đã Hết Hàng'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {productDetail.countInStock > 0 ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity:</Col>
                                            <Col>
                                                <Form.Control as="select" rows={2} onChange={(e) => setQuantity(e.target.value)}>
                                                    {
                                                        [...Array(productDetail.countInStock).keys()].map(x => {
                                                            return (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    ) : ''}
                                    <ListGroup.Item>
                                        <Button 
                                            type="button" 
                                            disabled={productDetail.countInStock === 0 ? true : false} 
                                            className="card-btn"
                                            onClick = {addToCardHandler}
                                            >
                                                Thêm Vào Giỏ 
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            } 
        </div>
    )
}

export default ProductScreen
