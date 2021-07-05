import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import './../index.css'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../actions/productActions'
import Loading from './../components/Loading'
import Message from './../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { createProductReview } from '../actions/productActions'
import '../index.css'

function ProductScreen({match, history}) { 
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, productDetail } = productDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productCreateReview = useSelector(state => state.productCreateReview)

    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productCreateReview

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(detailsProduct(match.params.id))
    }, [dispatch, match.params.id, successProductReview])

    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <div className="product_detail">
            <Link to='/' className="btn btn-light">Go Back</Link>
            {loading ? <Loading/>
                : error ? <Message>{error}</Message>
                    : (
                        <div>
                            <Row class="card-item">
                                <Col md={6}>
                                    <Image src={productDetail.image} alt={productDetail.image}/>
                                </Col>
                                <Col md={3}>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <strong className="product-detail_name">{productDetail.name}</strong>
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
                            
                            <Row>
                                <Col md={6}>
                                    <h4>Đánh Giá Sản Phẩm</h4>
                                    {productDetail.reviews && productDetail.reviews.length === 0 && <Message variant='info'>Chưa có bình luận nào cho sản phẩm này</Message>}

                                    <ListGroup variant='flush'>
                                        { productDetail.reviews && productDetail.reviews.length > 0 && productDetail.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Viết Đánh Giá</h4>

                                            {loadingProductReview && <Loading />}
                                            {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating' className="py-2">
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment' className="py-2">
                                                        <Form.Label>Đánh Giá</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                        className="py-2"
                                                    >
                                                        Đăng Bình Luận
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Vui lòng <Link to='/login'>đăng nhập</Link> để tạo đánh giá</Message>
                                                )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                    
                        </div>
                    ) 
            } 
        </div>
    )
}

export default ProductScreen
