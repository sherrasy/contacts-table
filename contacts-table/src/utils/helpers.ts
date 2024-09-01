import { Contact } from '@frontend-types/contact.interface';
import { sortingParams } from './constant';

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
