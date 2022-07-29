import React from 'react';
import { Modal, Button, Pagination } from 'react-bootstrap';
import { Column, Page, Sort } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';

interface Props {
  products: Guitar[];
  activePage: number;
  // limit: number;
  // calculatedRows: Guitar[];
  // count: number;
  totalPages: number;
  // sort: Sort;
  // sortIcon: (head: Column, sort: Sort) => JSX.Element | '️↕️';
  // sort: (key: keyof Guitar, order: number) => Guitar[];
  // gotoEdit: (id: number) => void;
  gotoPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CustomPagination: React.FC<Props> = ({
  products,
  activePage,
  totalPages,
  gotoPage,
}) => {
  const goToPrePage = () => {
    gotoPage((activePage) => activePage - 1);
  };

  const goToNextPage = () => {
    gotoPage((activePage) => activePage + 1);
  };

  const resetSearch = () => {};

  return (
    <>
      {products.length ? (
        <Pagination>
          {activePage > 1 && (
            <>
              <Pagination.Prev onClick={() => goToPrePage()} />
              <Pagination.Item onClick={() => goToPrePage()}>
                {activePage - 1}
              </Pagination.Item>
            </>
          )}
          <Pagination.Item active>{activePage}</Pagination.Item>

          {activePage < totalPages && (
            <>
              <Pagination.Item onClick={() => goToNextPage()}>
                {activePage + 1}
              </Pagination.Item>
              <Pagination.Next onClick={() => goToNextPage()} />
            </>
          )}
        </Pagination>
      ) : (
        <div>
          <div>Sorry Nothing was found</div>
          <Button
            className="mt-3"
            variant="primary"
            onClick={() => resetSearch()}
          >
            Reset Search
          </Button>
        </div>
      )}
    </>
  );
};
