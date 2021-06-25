import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loading() {
    return (
        <Spinner animation="border" role="status" style={{
            display: 'flex',
            margin: 'auto',
            alignItem: 'center',
            justifyContent: 'center'
        }}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loading
