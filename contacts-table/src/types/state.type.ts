import { store } from "@/store";
import { Contact } from "./contact.interface";

export type ContactsState = {
    contacts: Contact[] | null; 
    sorting: string | null; 
    isLoading: boolean;
    isPosting: boolean;
    hasError: boolean; 
    hasPostingError: boolean; 
  };

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;
