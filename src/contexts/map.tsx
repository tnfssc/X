import { createContext, useContext } from "react";

export const MapContext = createContext<google.maps.Map | null>(null);
export const useMap = () => useContext(MapContext);
