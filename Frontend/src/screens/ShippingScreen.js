import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/shippingAction'
import CheckoutSteps from '../components/CheckoutSteps'
import '../index.css'

function ShippingScreen({history}) {
    const shipping = useSelector(state => state.cart)
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setPostCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    
    const submitHandler = () => {
        dispatch(saveShippingAddress({
            'address': address,
            'phone': phone,
            'city': city,
            'postCode': postCode,
            'country': country
        }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps /> 
            <h4>Thông Tin Địa Chỉ</h4>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Địa chỉ:</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Nhập Địa Chỉ'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='phone' className="my-2">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Nhập Số Điện Thoại'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='city' className="my-2">
                    <Form.Label>City:</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Nhập Tên Thành Phố'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='postCode' className="my-2">
                    <Form.Label>Mã Bưu Điện:</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Nhập Mã Bưu Điện'
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className="my-2">
                    <Form.Label>Quốc Gia:</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Nhập Tên Quốc Gia:'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Button type='submit' variant="primary" className="my-2 .card-btn">Tiếp Tục</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
