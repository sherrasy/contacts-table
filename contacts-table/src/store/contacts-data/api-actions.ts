import { AppDispatch, State } from "@frontend-types/state.type";
import { Contact } from "@frontend-types/contact.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ApiActionName, REDUCER_NAME } from "@utils/constant";

export const fetchContacts = createAsyncThunk<
  Contact[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${REDUCER_NAME}/${ApiActionName.FetchContacts}`,
  async (_, { extra: api }) => {
    try {
      const { data } = await api.get<Contact[]>('');
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);