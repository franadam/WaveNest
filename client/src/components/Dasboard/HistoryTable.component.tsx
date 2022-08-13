import React from 'react';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { History } from 'interfaces/Users.interface';

interface Props {
  history: History[];
}

export const HistoryTable: React.FC<Props> = ({ history }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Amount Paid</th>
            <th>Order ID</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={`history_${item.id}`}>
              <td>
                <Moment to={item.created_at} />
              </td>
              <td>
                {item.items.map((guitar) => (
                  <div key={`item_${guitar.id}`}>
                    <Link to={`/guitar_detail/${guitar.id}`}>
                      {guitar.brand.name} {guitar.model}
                    </Link>
                  </div>
                ))}
              </td>
              <td>{item.amount}</td>
              <td>{item.order_id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
