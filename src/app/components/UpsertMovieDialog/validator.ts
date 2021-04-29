import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";

/**
 * Props to be excepted
 */
const EXCEPTION: Array<string> = ["id"];

/**
 * Require validator
 */
export const requireValidator = (value: any): { [key: string]: boolean } => {
  const errors = Object.keys(omit(value, EXCEPTION)).reduce((acc, key) => {
    const isRequired: boolean = isEmpty(value?.[key]?.toString());
    return isRequired ? { ...acc, [key]: isRequired } : { ...acc };
  }, {});

  return errors;
};
