import Map from "./components/Map";
import Directions from "./components/Directions";
import CurrentPosition from "./components/CurrentPosition";

export default function App() {
  return (
    <Map>
      <Directions draggable />
      <CurrentPosition live />
    </Map>
  );
}
