import "./index.css";

import { Wrapper as MapsWrapper, Status } from "@googlemaps/react-wrapper";
import { useRef, useState, useEffect } from "react";
import { MapContext } from "../../contexts/map";

const render = (status: Status) => {
  if (status === Status.FAILURE) return <>Error</>;
  return <>Loading</>;
};

const MapComponent = ({
  map,
  setMap,
}: {
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        }),
      );
    }
  });
  return <div id="map" ref={ref} />;
};

const Map: React.FC = ({ children }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  return (
    <MapsWrapper
      libraries={["places"]}
      apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      render={render}
    >
      <MapComponent map={map} setMap={setMap} />
      <MapContext.Provider value={map}>{children}</MapContext.Provider>
    </MapsWrapper>
  );
};

export default Map;
