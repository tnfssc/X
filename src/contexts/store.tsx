import { createContext, useContext } from "react";

export interface StoreValue {
  followGeolocation: { value: boolean; set: (value: boolean) => void };
}

export const StoreContext = createContext<StoreValue>({ followGeolocation: { value: false, set: () => undefined } });
export const useStore = () => useContext(StoreContext);
