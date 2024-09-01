import { AppDispatch, State } from "@frontend-types/state.type";
import { Contact } from "@frontend-types/contact.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { ApiActionName, REDUCER_NAME } from "@utils/constant";
import { AddContactDto } from "@/dto/add-contact.dto";
import { EditContactDto } from "@/dto/edit-contact.dto";

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

export const addContact = createAsyncThunk<
  Contact,
  AddContactDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${REDUCER_NAME}/${ApiActionName.AddContact}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await api.post<Contact>('', dto);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const editContact = createAsyncThunk<
  Contact,
  EditContactDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${REDUCER_NAME}/${ApiActionName.EditContact}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await api.patch<Contact>(`/${dto.id}`, dto);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);