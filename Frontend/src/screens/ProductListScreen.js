import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import { deleteProduct } from '../actions/productActions'

function ProductListScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
    console.log(loadingDelete)
    console.log(successDelete)
    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate
    // const productDelete = useSelector(state => state.productDelete)
    // const { success} = productDelete

    let keyword = history.location.search
    console.log(keyword)

    useEffect(() => {
        console.log('dòng 22')
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts(keyword))
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, userInfo.admin, successDelete, keyword])

    const deleteHandler = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này không?')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <div>
            <Row>
                <Col className="my-2">
                    <h3>Thông Tin Các Sản Phẩm</h3>
                </Col>
                <Col style={{ display: 'flex' }}>
                    <LinkContainer to='/admin/createproduct' style={{  marginLeft: 'auto' }}>
                        <Button >
                            <i className='fas fa-plus'></i> Thêm Sản Phẩm
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            
            {loading
                ? (<Loading />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm my-2'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Brand</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate page={page} pages={pages} isAdmin={true} />
                        </div>
                    )}
        </div>
    )
}

export default ProductListScreen