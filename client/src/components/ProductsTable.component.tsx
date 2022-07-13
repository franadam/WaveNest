import React from 'react';
import Moment from 'react-moment';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Guitar } from 'interfaces/Guitars.interface';
import { Table, Modal, Button } from 'react-bootstrap';
import { Loader } from './Loader.component';
import { useAppDispatch } from 'hooks/use-type-selector.hook';
import { deleteGuitar, updateGuitar } from 'store/reducers/guitars.reducer';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
  products: Guitar[];
  isModalOpen: boolean;
  openModal: (id: number) => void;
  closeModal: () => void;
  deleteProduct: () => void;
  sort: (key: keyof Guitar, order: number) => Guitar[];
  gotoEdit: (id: number) => void;
}

export const ProductsTable: React.FC<Props> = ({
  products,
  isModalOpen,
  openModal,
  closeModal,
  sort,
  deleteProduct,
  gotoEdit,
}) => {
  const dispatch = useAppDispatch();

  console.log('products', products);

  const editItem = (id: number) => {
    closeModal();
    // dispatch(updateGuitar(id))
  };

  return (
    <div>
      {products.length ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Created
                  <>
                    <div onClick={() => sort('created_at', -1)}>
                      <ArrowDropUpIcon />
                    </div>
                    <div onClick={() => sort('created_at', 1)}>
                      <ArrowDropDownIcon />
                    </div>
                  </>
                </th>
                <th>
                  Model
                  <>
                    <div onClick={() => sort('created_at', -1)}>
                      <ArrowDropUpIcon />
                    </div>
                    <div onClick={() => sort('created_at', 1)}>
                      <ArrowDropDownIcon />
                    </div>
                  </>
                </th>
                <th>
                  Available
                  <>
                    <div onClick={() => sort('created_at', -1)}>
                      <ArrowDropUpIcon />
                    </div>
                    <div onClick={() => sort('created_at', 1)}>
                      <ArrowDropDownIcon />
                    </div>
                  </>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((guitar) => (
                <tr key={guitar.id}>
                  <td>
                    <Moment to={guitar.created_at} />
                  </td>
                  <td>{guitar.model}</td>
                  <td>{guitar.available}</td>
                  <td
                    className="action_btn remove_btn"
                    onClick={() => openModal(guitar.id)}
                  >
                    Remove
                  </td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => editItem(guitar.id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <hr />
          <LinkContainer to="/dashboard/admin/add_product">
            <Button variant="secondary">Add product</Button>
          </LinkContainer>
        </>
      ) : (
        <Loader full={true} />
      )}
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>There is no going back</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => closeModal()} variant="secondary">
            Oops close this now
          </Button>
          <Button onClick={() => deleteProduct()} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
