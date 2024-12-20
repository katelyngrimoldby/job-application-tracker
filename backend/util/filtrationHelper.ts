import { Order } from '@sequelize/core';
import { Status } from '../types';

const getOrder = (sort: string | undefined): Order => {
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
      return [['applied', 'DESC']];
    case 'oldest':
      return [['applied', 'ASC']];
    default:
      return [['applied', 'DESC']];
  }
};

const getFilter = (
  status: Status | undefined
): { status?: Status } | Record<string, never> => {
  if (status) {
    return { status: status };
  }

  return {};
};
export { getOrder, getFilter };
