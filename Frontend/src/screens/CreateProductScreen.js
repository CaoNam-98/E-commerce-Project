import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'
import {createProduct} from '../actions/productActions'

function CreateProductScreen({history}) {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(userInfo){
    //         history.push(redirect)
    //     }
    // }) // bỏ cái này , [history, userInfo, redirect] cũng được

    const submitHandler = (e) => {
        e.preventDefault()
        if (!userInfo && !userInfo.isAdmin) {
            history.push('/login')
        } else {
            dispatch(createProduct(name, image, category, description, price))
        }
    }

    return (
        <FormContainer>
            <h1>Thêm Sản Phẩm</h1>
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
            <Row className="my-2">
            </Row>
        </FormContainer>
    )
}

export default CreateProductScreen
