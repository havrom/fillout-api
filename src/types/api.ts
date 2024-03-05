export const DEFAULT_OFFSET = 0;
export const DEFAULT_LIMIT = 150;

export type FilterClauseType = {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
};

// each of these filters should be applied like an AND in a "where" clause
// in SQL
export type ResponseFiltersType = FilterClauseType[];

export type ApiQueryParams = {
  limit?: number;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status?: 'in_progress' | 'finished';
  includeEditLink?: boolean;
  sort?: 'asc' | 'desc';
};

export type QuestionItem = {
  id: string;
  value: string | number;
  type: string;
};

export type ResponseItem = { questions: QuestionItem[] };

export type ApiResponse = {
  responses: ResponseItem[];
  totalResponses: number;
  pageCount: number;
};

export type ApiError = {
  statusCode: number;
  error: string;
  message: string;
};
