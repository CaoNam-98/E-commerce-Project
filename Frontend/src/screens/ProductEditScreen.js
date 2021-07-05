import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { detailsProduct } from '../actions/productActions'

function ProductEditScreen({ history, match }) {
    const productId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(0)
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [numReviews, setNumReviews] = useState(0)

    const productDetails = useSelector(state => state.productDetails)
    const { productDetail } = productDetails
    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (errorUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
        } 
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!productDetail || !productDetail.name || productDetail._id !== parseInt(productId)) {
                dispatch(detailsProduct(productId))
            }else{
                setName(productDetail.name)
                setBrand(productDetail.brand)
                setCategory(productDetail.category)
                setDescription(productDetail.description)
                setRating(productDetail.rating)
                setPrice(productDetail.price)
                setCountInStock(productDetail.countInStock)
                setNumReviews(productDetail.numReviews)
            }
        }
    }, [dispatch, productDetail, productId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct
            ({ 
                _id: productId, 
                name, 
                image: image.split('\\')[2],
                brand, 
                category, 
                description, 
                rating, 
                price, 
                countInStock, 
                numReviews 
            })
        )
    }

    return (
        <div>
            <Link to='/admin/productlist' className='btn btn-light'>
                Quay Lại
            </Link>
            <FormContainer>
                <h1>Cập Nhật Sản Phẩm</h1>
                {loadingUpdate ? <Loading /> : errorUpdate ? <Message variant='danger'>{errorUpdate}</Message>
                    : ( 
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Tên Sản Phẩm</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image' className="my-2">
                                <Form.Label>Hình Ảnh</Form.Label> <br/>
                                <Form.Control 
                                    type='file' 
                                    onChange={(e) => setImage(e.target.value)}
                                    style={{color: 'red'}}
                                    > 
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='brand' className="my-2">
                                <Form.Label>Loại Hàng</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Enter Brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category' className="my-2">
                                <Form.Label>Loại Hàng</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Enter Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description' className="my-2">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Enter Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price' className="my-2">
                                <Form.Label>Giá</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='rating' className="my-2">
                                <Form.Label>Số Sao</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter Rating'
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock' className="my-2">
                                <Form.Label>Số Lượng</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter Count In Stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='numReviews' className="my-2">
                                <Form.Label>Số Lượng Đánh Giá</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    placeholder='Enter Number Reviews'
                                    value={numReviews}
                                    onChange={(e) => setNumReviews(e.target.value)}
                                    >  
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant="primary" className="my-2">Cập Nhật</Button>
                        </Form>
                    )}   
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
