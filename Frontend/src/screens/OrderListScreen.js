import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import { listOrders } from '../actions/orderActions'

function OrderListScreen({ history }) {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList
    console.log(orders)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    return (
        <div className="order__list-info">
            <h3>Danh Sách Đơn Hàng</h3>
            {loading
                ? (<Loading />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr className="list__title-info">
                                    <th>Mã Số</th>
                                    <th>Khách Hàng</th>
                                    <th>Ngày</th>
                                    <th>Tổng Tiền</th>
                                    <th>Đã Thanh Toán</th>
                                    <th>Đã Vận Chuyển</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                { orders.map(order => (
                                    <tr key={order._id} className="list__title-value">
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice} VNĐ</td>

                                        <td>{order.isPaid ? (
                                            <i class="fas fa-check" style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>{order.isDelivered ? (
                                            <i class="fas fa-check" style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}
                                        </td>

                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default OrderListScreen