import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from './../components/Product.js'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loading from './../components/Loading'
import Message from './../components/Message'
import Paginate from './../components/Paginate'
import SearchBox from '../components/SearchBox'
import Carousel from '../components/Carousel'

function HomeScreen({history}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages } = productList
    let keyword = history.location.search 

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            <Carousel />
            <SearchBox />
            <h1>Danh Sách Sản Phẩm</h1>
            {loading ? <Loading/>
                : error ? <Message>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
            
        </div>
    )
}

export default HomeScreen
