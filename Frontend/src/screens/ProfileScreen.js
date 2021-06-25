import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,  updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILES_RESET } from '../constants/userConstants'

function ProfileScreen({history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    // Khi thành công do location.search (chuỗi sau dấu ? là null) => redirect sang /
    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILES_RESET })
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, dispatch, userInfo, user, success]) 

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password không trùng nhau')
        }else{
            console.log('nam cao')
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }
    }

    return (
        <Row> 
            <Col md={3}>
                <h2>User Profile</h2>
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
            </Col>
            <Col md={9}>
                <h2>User Orders</h2>
            </Col>
        </Row>
        
    )
}

export default ProfileScreen
