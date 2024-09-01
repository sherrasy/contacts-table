import { ContactsState } from "@/types/state.type";
import { REDUCER_NAME } from "@/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts } from "./api-actions";

const initialState: ContactsState = {
    contacts: null,
    sorting: null,
    isLoading: false,
    hasError: false
  };

  export const contactsData = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {  
      setCurrentSorting: (state, action: PayloadAction<string|null>) => {
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
    }
  });
  
  export const { setCurrentSorting } = contactsData.actions;
