import { Router } from 'express';
import {
  filterApiResponses,
  getExtApiResponse,
  paginateResponses,
} from '../utils';
import {
  ApiError,
  ApiQueryParams,
  ApiResponse,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  ResponseFiltersType,
} from '../types/api';

const router = Router();

router.get('/:formId/filteredResponses', async (req, res) => {
  const { formId } = req.params;
  const { filters, ...params } = req.query;

  // get filters from query string
  let parsedFilters: ResponseFiltersType;
  try {
    parsedFilters = JSON.parse(filters as string);
  } catch (error) {
    parsedFilters = [];
  }

  try {
    const data = (await getExtApiResponse({
      formId,
      authToken: req.headers.authorization || '',
      queryParams: params as ApiQueryParams,
      // disabling external api pagination to keep meaningful page count and total responses when filtering
      disablePagination: true,
    })) as ApiResponse;

    // diff shows how many responses got filtered out
    const { responses, diff } = filterApiResponses(
      data.responses,
      parsedFilters,
    );

    const pageOffset =
      Number((params as ApiQueryParams).offset) || DEFAULT_OFFSET;
    const reqPerPageLimit =
      Number((params as ApiQueryParams).limit) || DEFAULT_LIMIT;
    const totalResponses = data.totalResponses - diff;

    res.json({
      responses: paginateResponses(responses, pageOffset, reqPerPageLimit),
      totalResponses,
      pageCount: Math.ceil(totalResponses / reqPerPageLimit),
    });
  } catch (error) {
    res.status((error as ApiError).statusCode).json({ ...(error as ApiError) });
  }
});

export default router;
