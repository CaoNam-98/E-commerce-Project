import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({children}) {
    return (
        <Alert variant='danger' className="message-error">
            {children}
        </Alert>
    )
}

export default Message
