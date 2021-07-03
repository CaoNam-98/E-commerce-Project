import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col, Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,  updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILES_RESET } from '../constants/userConstants'
import {listMyOrders} from '../actions/orderActions'
import { orderListMyReducer } from '../reducers/orderReducers'

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

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading, error, orders } = orderListMy
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILES_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
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
                <h2>Khách Hàng</h2>
                {message && <Message variant='danger'>{message}</Message>}
                <Form onSubmit={submitHandler} className="form__current-user">
                    <Form.Group controlId='name'>
                        <Form.Label>Tên Khách Hàng</Form.Label>
                        <Form.Control 
                            type='name' 
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className="my-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            >
                                
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className="my-2">
                        <Form.Label>Mật Khẩu</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            >
                                
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className="my-2">
                        <Form.Label>Nhập Lại Mật Khẩu</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                                
                            </Form.Control>
                    </Form.Group>
                <Button type='submit' variant="primary" className="my-2">Cập Nhật</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>Thông tin các đơn hàng đã mua</h2>
                {loading ? (
                    <Loading/>
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr className="user__profile-title-order">
                                <th>Mã Số</th>
                                <th>Ngày Đặt</th>
                                <th>Tổng Tiền</th>
                                <th>Thanh Toán</th>
                                <th>Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr className="user__profile-value-order">
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        <i class="fas fa-check"></i>
                                    ) : (
                                        <i class="fas fa-times"></i>
                                    )}</td>
                                    <td>
                                        <Link to={`/order/${order._id}`}>
                                            <Button type="button" class="btn btn-default">Xem Chi Tiết</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
        
    )
}

export default ProfileScreen
