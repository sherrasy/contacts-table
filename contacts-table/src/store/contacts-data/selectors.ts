import { Contact } from "@frontend-types/contact.interface";
import { State } from "@frontend-types/state.type";
import { createSelector } from "@reduxjs/toolkit";

export const getIsLoading = (state: State ): boolean => state.isLoading;
export const getHasError = (state: State ): boolean => state.hasError;
export const getContacts = (state: State ): null|Contact[] => state.contacts;
export const getContactById = (id?:string)=> createSelector(
    [getContacts],
    (contacts): Contact | null => (id && contacts) ? contacts.find((item)=> item.id === +id ) || null : null  );