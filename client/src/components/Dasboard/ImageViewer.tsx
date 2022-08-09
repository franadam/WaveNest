import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Picture } from 'interfaces/Pictures.interface';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface Props {
  images: Picture[];
  deleteImage: (id: string) => void;
}

export const ImageViewer: React.FC<Props> = ({ images, deleteImage }) => {
  const [idToRemove, setIdToRemove] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('props>> images', images);

  const openModal = (id: string) => {
    setIsModalOpen(true);
    setIdToRemove(id);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImage = () => {
    closeModal();
    console.log('idToRemove :>> ', idToRemove);
    deleteImage(idToRemove);
    setIdToRemove('');
  };

  return (
    <div style={{ display: 'flex' }}>
      {images.length && images[0].id
        ? images.map(({ id, url }) => (
            <div
              key={id}
              className="pic_block"
              onClick={() => openModal(id)}
              style={{ background: `url(${url})` }}
            ></div>
          ))
        : null}
      <Modal size="lg" centered show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleImage()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
