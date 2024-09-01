import { ContactsState } from '@/types/state.type';
import { REDUCER_NAME } from '@/utils/constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addContact, editContact, fetchContacts } from './api-actions';

const initialState: ContactsState = {
  contacts: null,
  sorting: null,
  isLoading: false,
  isPosting: false,
  hasError: false,
  hasPostingError: false,
};

export const contactsData = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setCurrentSorting: (state, action: PayloadAction<string | null>) => {
      state.sorting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addContact.pending, (state) => {
        state.isPosting = true;
        state.hasPostingError = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts
          ? state.contacts.push(action.payload)
          : (state.contacts = [action.payload]);
        state.isPosting = false;
        state.hasPostingError = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.isPosting = false;
        state.hasPostingError = true;
      })
      .addCase(editContact.pending, (state) => {
        state.isPosting = true;
        state.hasPostingError = false;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        if (!state.contacts) {
          return;
        }
        const index = state.contacts.findIndex(
          (item) => item.id === action.payload.id
        );
        state.contacts[index] = action.payload;
        state.isPosting = false;
        state.hasPostingError = false;
      })
      .addCase(editContact.rejected, (state) => {
        state.isPosting = false;
        state.hasPostingError = true;
      });
  },
});

export const { setCurrentSorting } = contactsData.actions;
