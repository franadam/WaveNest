import React from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { Guitar } from 'interfaces/Guitars.interface';

interface Props {
  products: Guitar[];
  activePage: number;
  totalPages: number;
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
                {activePage < totalPages && activePage + 1}
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
