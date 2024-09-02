import { ContactsState } from '@frontend-types/state.type';
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REDUCER_NAME } from '@utils/constant';
import { addContact, editContact, fetchContacts } from './api-actions';

export const contactsAdapter = createEntityAdapter();

const defaultState: ContactsState = {
  ids:[],
  entities: {},
  sorting: null,
  isLoading: false,
  isPosting: false,
  hasError: false,
  hasPostingError: false,
};

export const contactsData = createSlice({
  name: REDUCER_NAME,
  initialState:contactsAdapter.getInitialState(defaultState),
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
      .addCase(fetchContacts.fulfilled, (state, {payload}) => {
        contactsAdapter.addMany(state, payload)
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
      .addCase(addContact.fulfilled, (state, {payload}) => {
        contactsAdapter.addOne(state, payload)
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
      .addCase(editContact.fulfilled, (state, {payload}) => {
        contactsAdapter.updateOne(state, {id:payload.id,changes:payload});
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
