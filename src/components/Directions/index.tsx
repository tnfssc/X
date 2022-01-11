import { DirectionsProvider, useDirections } from "../../contexts/directions";
import getDirections from "../../utils/getDirections";
import DirectionsInput from "../DirectionsInput";
import { useMap } from "../../contexts/map";

const DirectionRenderer: React.FC = () => {
  const { renderer } = useDirections();
  const map = useMap();
  const handleGo = (from: string, to: string) => {
    getDirections(from, to).then((result) => {
      if (result) {
        renderer.setDirections(result);
        renderer.setMap(map);
      }
    });
  };
  const handleClear = () => {
    renderer.setMap(null);
  };
  return <DirectionsInput onGo={handleGo} onClear={handleClear} />;
};

const Direcitons: React.FC = () => {
  return (
    <DirectionsProvider>
      <DirectionRenderer />
    </DirectionsProvider>
  );
};

export default Direcitons;
