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
    value.length > 0 && value.trim() !== '';

const checkPatternValidity = (value: string, pattern: RegExp) => pattern.test(value);

export const validateFormData = (formData: FormData) => {
    const validationResults: { [key: string]: boolean } = {};
    Object.entries(formData).map(([key, value]) => {
        const isNotEmpty = checkFieldNotEmpty(value);
        const patternValue = key === FormFieldName.Phone ? value.replace(/[^+\d]/g, '') : value;
        const isPatternValid = checkPatternValidity(patternValue, ValidationPattern[key as keyof typeof ValidationPattern]
        );
        validationResults[key] = isNotEmpty && isPatternValid;
    });

    return validationResults;
};

export const formatPhoneNumber = (phoneNumber: string, type?: string): string => {
    phoneNumber = phoneNumber.replace(/[^\d]/g, "");
    if (type === 'view') {
        return `+${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7, 9)}-${phoneNumber.substring(9, 12)}`;
    }

    return `+${phoneNumber.substring(0, 1)} ${phoneNumber.substring(1, 4)} ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7, 9)}-${phoneNumber.substring(9, 12)}`;
}

