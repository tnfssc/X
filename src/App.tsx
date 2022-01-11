import Map from "./components/Map";
import Directions from "./components/Directions";
import CurrentPosition from "./components/CurrentPosition";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();

export default function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Map>
          <Directions draggable />
          <CurrentPosition live />
        </Map>
      </BaseProvider>
    </StyletronProvider>
  );
}
