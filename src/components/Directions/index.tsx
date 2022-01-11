import getDirections from "../../utils/getDirections";
import DirectionsInput from "../DirectionsInput";
import { useMap } from "../../contexts/map";
import { useRef } from "react";

const Direcitons: React.FC = () => {
  const renderer = useRef<google.maps.DirectionsRenderer>();
  const map = useMap();
  const handleGo = (from: string, to: string) => {
    getDirections(from, to).then((result) => {
      if (result) {
        renderer.current = new google.maps.DirectionsRenderer({ map });
        renderer.current.setDirections(result);
      }
    });
  };
  const handleClear = () => {
    if (renderer.current) renderer.current.setMap(null);
  };
  return <DirectionsInput onGo={handleGo} onClear={handleClear} />;
};

export default Direcitons;
