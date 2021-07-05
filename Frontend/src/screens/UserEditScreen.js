import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { updateUser, getUserDetails } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen({ history, match }) {
    const userId = match.params.id
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const userDetails = useSelector(state => state.userDetails)
    const { user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user || !user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light'>
                Quay Lại
            </Link>
            <FormContainer>
                <h1>Cập Nhật Thông Tin</h1>
                {loadingUpdate ? <Loading /> : errorUpdate ? <Message variant='danger'>{errorUpdate}</Message>
                    : ( 
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
                            <Form.Group controlId="isAdmin" className="my-2">
                                <Form.Check 
                                    type="checkbox" 
                                    label="isAdmin" 
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                            </Form.Group>
                            <Button type='submit' variant="primary" className="my-2">Cập Nhật</Button>
                        </Form>
                    )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen
