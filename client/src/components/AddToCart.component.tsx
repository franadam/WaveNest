import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
  errorType: string;
  isModalOpen: boolean;
  closeModal: () => void;
  verifyAccount: () => Promise<void>;
}

export const AddToCart: React.FC<Props> = ({
  isModalOpen,
  errorType,
  closeModal,
  verifyAccount,
}) => {
  return (
    <>
      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title> Sorry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorType === 'auth' ? (
            <div>You need to register or sign in to continue </div>
          ) : (
            <div>You need to verify yor account</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {errorType === 'auth' ? (
            <LinkContainer to="/auth/login">
              <Button variant="primary">Go to Register</Button>
            </LinkContainer>
          ) : (
            <Button variant="primary" onClick={() => verifyAccount()}>
              Send email verification again
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
