import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';

const ErrorAlert = ({ show, onCancel, onConfirm, errorMessage }) => {
    return (
        <SweetAlert
            title="Oops! Something failed..."
            show={show}
            error
            confirmBtnText="Ok"
            confirmBtnBsStyle="primary"
            onCancel={onCancel}
            onConfirm={onConfirm}
            focusConfirmBtn
            showCloseButton
        >
            {
                errorMessage + 
                ", try again and if the problem percist try again later"
            }
        </SweetAlert>
    )
}

export default ErrorAlert
