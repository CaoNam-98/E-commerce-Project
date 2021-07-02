import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import '../index.css'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if (keyword) {
        console.log(keyword.split('?keyword='))
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    
    return (pages > 1 && (
        <Pagination className="product-list_pagination">
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                        `/?keyword=${keyword}&page=${x + 1}`
                        : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate