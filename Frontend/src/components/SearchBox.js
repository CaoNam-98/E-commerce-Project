import React, {useState} from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom' 
import './../index.css'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.location.pathname)
        }
    }

    return (
        <div>
            <Row className="search_input" style={{marginTop: "1rem"}}>
                <Col md={2} className="search_input-item">
                    Trang Sức
                </Col>
                <Col md={2} className="search_input-item">
                    Trang Sức Cưới
                </Col>
                <Col md={2} className="search_input-item">
                    Đồng Hồ
                </Col>
                <Col md={2} className="search_input-item">
                    Quà Tặng
                </Col>
                <Col md={4} className="search_input-item">
                    <Form onSubmit={submitHandler} style={{display: 'flex'}}>
                        <Form.Control
                            placeholder="Tìm kiếm"
                            type="text"
                            className="search_input-form"
                            onChange= {(e) => setKeyword(e.target.value)}
                        />
                        <Button 
                            type="submit"
                            variant="outline-secondary" 
                            className="search_input-btn"
                            >
                                <i className="fas fa-search search_input-icon"></i>
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default SearchBox
