import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Table, Modal, Button, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Loader } from './Loader.component';
import { Guitar } from 'interfaces/Guitars.interface';
import { Column, Order, Page, Sort } from 'interfaces/Filter.interface';
import { CustomPagination } from './Pagination.component';

interface Props {
  products: Guitar[];
  headers: Column[];
  isModalOpen: boolean;
  pageProps: Page;
  sortIcon: (head: Column, sort: Sort) => JSX.Element | '️↕️';
  openModal: (id: number) => void;
  closeModal: () => void;
  deleteProduct: () => void;
  sort: (key: keyof Guitar, order: number) => Guitar[];
  gotoEdit: (id: number) => void;
  gotoPage: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductsTable: React.FC<Props> = ({
  products,
  isModalOpen,
  pageProps,
  headers,
  openModal,
  closeModal,
  sort,
  sortIcon,
  deleteProduct,
  gotoEdit,
  gotoPage,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length) {
      setIsLoading(false);
    }
  }, [products.length, isLoading]);

  const editItem = (id: number) => {
    closeModal();
    gotoEdit(id);
  };

  return (
    <div>
      {isLoading ? (
        <Loader full={true} />
      ) : !isLoading && !products.length ? (
        <h5>
          Oops, we did not find what you were looking for... Reset your search
        </h5>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                {headers.map((head) => {
                  <th key={head.filter}>{head.label}</th>;
                  const order = pageProps.sort.order === Order.ASC ? 1 : -1;
                  return (
                    <th key={head.filter}>
                      <span>{head.label}</span>
                      <button
                        style={{ border: 'navy', background: 'none' }}
                        onClick={() => sort(head.filter, order)}
                      >
                        {sortIcon(head, pageProps.sort)}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {pageProps.calculatedRows.map((guitar) => (
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

          <CustomPagination
            products={products}
            activePage={pageProps.activePage}
            totalPages={pageProps.totalPages}
            gotoPage={gotoPage}
          />

          <hr />
          <LinkContainer to="/dashboard/admin/add_product">
            <Button variant="secondary">Add product</Button>
          </LinkContainer>
        </>
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
