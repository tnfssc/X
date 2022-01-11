import { createContext, useContext, useRef, useState, useEffect } from "react";
import { useMap } from "./map";

interface DirectionsContextType {
  renderer: google.maps.DirectionsRenderer;
}

export const DirectionsContext = createContext<DirectionsContextType>({
  renderer: null,
} as unknown as DirectionsContextType);
export const useDirections = () => useContext(DirectionsContext);

export const DirectionsProvider: React.FC = ({ children }) => {
  const map = useMap();
  const directionsRenderer = useRef<google.maps.DirectionsRenderer>();
  const [value, setValue] = useState<DirectionsContextType>({
    renderer: directionsRenderer.current,
  } as DirectionsContextType);
  useEffect(() => {
    directionsRenderer.current = new google.maps.DirectionsRenderer();
    setValue({ renderer: directionsRenderer.current });
  }, [map]);
  return <DirectionsContext.Provider value={value}>{children}</DirectionsContext.Provider>;
};
