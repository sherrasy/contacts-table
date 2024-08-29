import { Contact } from "@frontend-types/contact.interface";
import { State } from "@frontend-types/state.type";

export const getIsLoading = (state: State ): boolean => state.isLoading;
export const getContacts = (state: State ): null|Contact[] => state.contacts;
export const getHasError = (state: State ): boolean => state.hasError;