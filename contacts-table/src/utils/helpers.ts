import { Contact } from '@frontend-types/contact.interface';
import { FormFieldName, sortingParams, ValidationPattern } from './constant';
import { FormData } from '@frontend-types/form-data.type';


export const sortContacts = (
    a: Contact,
    b: Contact,
    sortOrder: string | null
) => {
    if (!sortOrder) {
        return 0;
    }
    if (a.name < b.name) return sortOrder === sortingParams[1] ? -1 : 1;
    if (a.name > b.name) return sortOrder === sortingParams[1] ? 1 : -1;
    return 0;
};

const checkFieldNotEmpty = (value: string) =>
    value.trim() !== '';

const checkPatternValidity = (value: string, pattern: RegExp) =>pattern.test(value);

export const validateFormData = (formData:FormData) => {
    const validationResults: { [key: string]: boolean } = {};
    Object.entries(formData).map(([key, value]) => {
      const isNotEmpty = checkFieldNotEmpty(value);
      const isPatternValid =
        key !== FormFieldName.Name
          ? checkPatternValidity(
              value,
              ValidationPattern[key as keyof typeof ValidationPattern]
            )
          : true;
      validationResults[key] = isNotEmpty && isPatternValid;
    });

    return validationResults;
  };
