import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <Modal
            isOpen={isShowing}
            toggle={() => setIsShowing(!isShowing)}
        >
            <ModalHeader toggle={() => setIsShowing(!isShowing)}
            >
                Hey , Sures
            </ModalHeader>
        </Modal>
    </React.Fragment>
) : null;

export default Modal;