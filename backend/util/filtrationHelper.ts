import { Order } from 'sequelize';
import { Status } from '../types';

const getApplicationOrder = (sort: string | undefined): Order => {
  switch (sort) {
    case 'company-asc':
      return [['company', 'ASC']];
    case 'company-desc':
      return [['company', 'DESC']];
    case 'position-asc':
      return [['positionTitle', 'ASC']];
    case 'position-desc':
      return [['positionTitle', 'DESC']];
    case 'newest':
      return [['applyDate', 'DESC']];
    case 'oldest':
      return [['applyDate', 'ASC']];
    default:
      return [['applyDate', 'DESC']];
  }
};

const getApplicationFilter = (
  status: Status | undefined
): { status?: Status } | Record<string, never> => {
  if (status) {
    return { status: status };
  }

  return {};
};
export { getApplicationOrder, getApplicationFilter };
