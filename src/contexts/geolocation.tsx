import { createContext, useContext } from "react";

export const GeolocationContext = createContext<React.MutableRefObject<google.maps.LatLngLiteral | undefined>>({
  current: undefined,
});
export const useGeolocation = () => useContext(GeolocationContext);
