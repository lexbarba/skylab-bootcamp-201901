import React from 'react';

export default function ModalRegistration(props) {

    const handleClose = () => {
        const { closeModal } = props
        closeModal()
    }

    return (
        <div onClick={handleClose} className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content has-text-centered">
                <button className="button is-large is-light is-rounded"><i className="fas fa-check-circle"> </i> You have successfully registered!</button>
            </div>
        </div>
    )
}