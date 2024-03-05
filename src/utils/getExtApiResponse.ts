import { ApiError, ApiQueryParams, ApiResponse } from '../types/api';

type IReqParams = {
  formId: string;
  authToken: string;
  queryParams: ApiQueryParams;
  disablePagination?: boolean;
};

const getExtApiResponse = async ({
  formId,
  authToken,
  queryParams,
  disablePagination,
}: IReqParams): Promise<ApiResponse | ApiError> => {
  // create query params string
  const params = Object.keys(queryParams).reduce((acc, key) => {
    if (disablePagination && (key === 'limit' || key === 'offset')) {
      return acc;
    }
    const queryValue = queryParams[key as keyof ApiQueryParams];
    if (queryValue) {
      return acc + `${key}=${queryValue}&`;
    }
    return acc;
  }, '');

  // compose url
  const url = `${
    process.env.EXT_API_BASE_URL || 'https://api.fillout.com'
  }/v1/api/forms/${formId}/submissions?${params}`;

  // send request
  const res = await fetch(url, {
    headers: {
      Authorization: authToken,
    },
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw data;
  }
};

export default getExtApiResponse;
