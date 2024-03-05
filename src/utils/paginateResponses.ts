import { ResponseItem } from '../types/api';

const paginateResponses = (
  allResponses: ResponseItem[],
  offset?: number,
  limit?: number,
) => {
  if (!limit) return allResponses.slice(offset);

  const pageSize = limit;
  const pageIndex = offset || 0;

  return allResponses.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
};

export default paginateResponses;
