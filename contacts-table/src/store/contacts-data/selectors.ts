import { State } from "@/types/state.type";

export const getIsLoading = (state: State ): boolean => state.isLoading;
export const getHasError = (state: State ): boolean => state.hasError;