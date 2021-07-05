import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image} from 'react-bootstrap'
import Loading from './Loading'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function ProductsTopCarousel() {
    const dispatch = useDispatch()
    const productsTop = useSelector(state => state.productsTop)
    const { loading, error, products } = productsTop

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        loading ? <Loading /> 
            : error ? <Message variant="danger">{ error }</Message> 
                : (
                    <Carousel pause='hover' className='bg-dark'>
                        {products.length > 0 && products.map(product => (
                            <Carousel.Item key={product._id}>
                                <Image src={ product.image } alt={product.name} fluid  />
                                <Carousel.Caption className='carousel.caption py-2'>
                                    <h4>{product.name}</h4>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )
    )
}

export default ProductsTopCarousel
