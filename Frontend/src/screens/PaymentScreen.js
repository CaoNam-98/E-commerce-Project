import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'
import {saveShippingAddress, savePaymentMethod} from '../actions/shippingAction'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen({history}) {
    const shipping = useSelector(state => state.cart)
    const {shippingAddress} = shipping
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('')
    
    if(!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (paymentMethod !== '') {
            dispatch(savePaymentMethod(paymentMethod))
        }
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps />
            <h4>Chọn Hình Thức Thanh Toán</h4>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Check 
                        type="radio" 
                        label="Thẻ tín dụng/Ghi nợ" 
                        name="payment"
                        onChange={() => {
                            setPaymentMethod('Tag signal')}
                        }
                    />
                    <Form.Check 
                        type="radio" 
                        label="Chuyển khoản ngân hàng" 
                        name="payment"
                        onChange={() => setPaymentMethod('Move account')}
                    />
                    <Form.Check 
                        type="radio" 
                        label="Thẻ ATM nội địa (Internet Banking)" 
                        name="payment"
                        onChange={() => setPaymentMethod('ATM Credit')}
                    />
                    <Form.Check 
                        type="radio" 
                        label="Trả góp bằng thẻ tín dụng" 
                        name="payment"
                        onChange={() => setPaymentMethod('Down Payment')}
                    />
                    <Form.Check 
                        type="radio" 
                        label="Thanh toán khi nhận hàng" 
                        name="payment"
                        onChange={() => setPaymentMethod('Payment on delivery')}
                    />
                </Form.Group>
                <Button type='submit' variant="primary" className="my-2">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
