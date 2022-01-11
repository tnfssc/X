import Map from "./components/Map";
import DirectionsInput from "./components/DirectionsInput";

export default function App() {
  const handleGo = (from: string, to: string) => {
    console.log({ from, to });
  };
  return (
    <Map>
      <DirectionsInput onGo={handleGo} />
    </Map>
  );
}
