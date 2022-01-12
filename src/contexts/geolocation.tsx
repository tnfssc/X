import { createContext, useContext } from "react";

export type GeolocationValue = Partial<{
  pos: google.maps.LatLngLiteral | null;
  coords: GeolocationCoordinates | null;
  timestamp: number | null;
}>;

export const GeolocationContext = createContext<React.MutableRefObject<GeolocationValue>>({
  current: {},
});
export const useGeolocation = () => useContext(GeolocationContext);
