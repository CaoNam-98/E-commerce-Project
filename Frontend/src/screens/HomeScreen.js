import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from './../components/Product.js'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loading from './../components/Loading'
import Message from './../components/Message'

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList
    
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Danh Sách Sản Phẩm</h1>
            {loading ? <Loading/>
                : error ? <Message>{error}</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            }
            
        </div>
    )
}

export default HomeScreen
