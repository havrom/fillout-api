import { FilterClauseType, QuestionItem } from '../types/api';

const filterQuestionsByConditions = (
  questions: QuestionItem[],
  conditions: Map<string, FilterClauseType>,
) => {
  // filter array of questions based on provided condition collection where question id is key
  return questions.filter((question) => {
    const conditionClause = conditions.get(question.id);
    //   include question if no matching clause found
    if (!conditionClause) return true;

    const isDateClause = question.type === 'DatePicker';
    //   when working with dates conditions greater_than and less_than should be reversed
    if (isDateClause) {
      const questionTime = new Date(question.value).getTime();
      const clauseTime = new Date(conditionClause.value).getTime();
      switch (conditionClause.condition) {
        case 'does_not_equal':
          return questionTime !== clauseTime;
        case 'equals':
          return questionTime === clauseTime;
        case 'greater_than':
          return questionTime < clauseTime;
        case 'less_than':
          return questionTime > clauseTime;
        default:
          return true;
      }
    } else {
      switch (conditionClause.condition) {
        case 'does_not_equal':
          return question.value !== conditionClause.value;
        case 'equals':
          return question.value === conditionClause.value;
        case 'greater_than':
          return question.value > conditionClause.value;
        case 'less_than':
          return question.value < conditionClause.value;
        default:
          return true;
      }
    }
  });
};

export default filterQuestionsByConditions;
