import moment from 'moment';
import { Guitar } from 'interfaces/Guitars.interface';
import { Brand } from 'interfaces/Brands.interface';
import { Picture } from 'interfaces/Pictures.interface';

const filterRows = (filters: string, rows: Guitar[]) => {
  if (!filters) return rows;

  const filtered = rows.filter((row) => {
    if (filters.match(/^\d*$/)) {
      return row.available >= +filters;
    }

    const times = [
      'years',
      'months',
      'weeks',
      'days',
      'minutes',
      'year',
      'month',
      'week',
      'day',
      'minute',
    ];

    if (times.includes(filters.split(' ').slice(-1).join(''))) {
      const createdAt = moment(row.created_at).toNow(true);
      const res = filters.toLowerCase().match(`${createdAt.slice(0, -1)}`);
      return !!res;
    }

    return row.model.toLowerCase().includes(filters.toLowerCase());
  });
  console.log('filtered :>> ', filtered);

  return filtered;
};

const sortHelper = (
  order: number,
  A: string | number | boolean | Brand | Picture[],
  B: string | number | boolean | Brand | Picture[]
) => {
  if (A > B) return order;
  else return -order;
};

const handleSort = (products: Guitar[], key: keyof Guitar, order: number) => {
  const sorted = products.sort((a: Guitar, b: Guitar) => {
    const A = a[key];
    const B = b[key];
    if (typeof A === 'string' && typeof B === 'string') {
      return sortHelper(
        order,
        A.toLowerCase().split(/s*/).join(''),
        B.toLowerCase().split(/s*/).join('')
      );
    } else {
      return sortHelper(order, A, B);
    }
  });
  console.log('sorted', key, order, sorted);
  return sorted;
};

const paginationHelper = {
  filterRows,
  sortHelper,
  handleSort,
};

export default paginationHelper;
