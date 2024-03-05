import {
  FilterClauseType,
  ResponseFiltersType,
  ResponseItem,
} from '../types/api';
import filterQuestionsByConditions from './filterQuestionsByConditions';

const filterApiResponses = (
  responses: ResponseItem[],
  filters?: ResponseFiltersType,
) => {
  if (!filters) return { responses, diff: 0 };

  // create collection of clauses
  const conditions = new Map<string, FilterClauseType>();
  filters.forEach((filter) => {
    conditions.set(filter.id, filter);
  });

  const filteredResponses = responses.filter((response) => {
    const filteredQuestions = filterQuestionsByConditions(
      response.questions,
      conditions,
    );

    //   include response if no questions got filtered out
    return filteredQuestions.length === response.questions.length;
  });

  return {
    responses: filteredResponses,
    diff: responses.length - filteredResponses.length,
  };
};

export default filterApiResponses;
