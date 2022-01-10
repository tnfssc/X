import Map from "./components/Map";
import AutoCompleteInput from "./components/AutoCompleteInput";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const handleChange = (value: string) => {
    setValue(value);
  };
  return (
    <Map>
      <AutoCompleteInput onChange={handleChange} value={value} placeholder="From" />
    </Map>
  );
}
