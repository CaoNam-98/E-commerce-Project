import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    // Khi thành công do location.search (chuỗi sau dấu ? là null) => redirect sang /
    var redirect = location.search ? location.search.split('=')[1] : '/' 
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }) // bỏ cái này , [history, userInfo, redirect] cũng được

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password không trùng nhau')
        }else{
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loading />}
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className="my-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className="my-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                            
                        </Form.Control>
                </Form.Group>
                <Button type='submit' variant="primary" className="my-2">Register</Button>
            </Form>
            <Row className="my-2">
                <Col>
                    Bạn đã có tài khoản? {' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Đăng Nhập
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
