import { isArray, isString } from '../type-checks';

export const slice = (value: string | unknown[], rule: string) => {
  if (!isString(value) && !isArray(value)) {
    throw new Error('value must be a string or an array');
  }

  const rules = rule.split(':');
  if (rules.length !== 2) {
    throw new Error('rule must be in the format "start:end"');
  }
  const [start, end] = rules;

  const startIndex = start ? parseInt(start, 10) : 0;
  const endIndex = end ? parseInt(end, 10) : value.length;

  if (isNaN(startIndex) || isNaN(endIndex)) {
    throw new Error('start and end must be integers');
  }
  return value.slice(startIndex, Math.min(endIndex + 1, value.length));
};
