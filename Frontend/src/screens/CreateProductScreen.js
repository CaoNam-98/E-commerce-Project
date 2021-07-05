import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import FormContainer from '../components/FormContainer'
import {createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

function CreateProductScreen({history}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, loading } = productCreate

    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        if (!userInfo.isAdmin) {
            history.push('/login')
        } 
    },[dispatch, history, userInfo, successCreate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProduct(name, image, category, description, price))
        history.push('/admin/productlist')
    }

    return (
        <FormContainer>
            <h1>Thêm Sản Phẩm</h1>
            {loading ? <Loading /> : (
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
                            placeholder='Enter Link Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
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
                    <Button type='submit' variant="primary" className="my-2">Thêm Sản Phẩm</Button>
                </Form>
            )}
        </FormContainer>
    )
}

export default CreateProductScreen
