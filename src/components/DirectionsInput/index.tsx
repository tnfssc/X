import AutoCompleteInput from "../AutoCompleteInput";
import { useState } from "react";

interface DirectionsInputProps {
  onGo: (from: string, to: string) => void;
  onClear?: () => void;
}

const DirectionsInput: React.FC<DirectionsInputProps> = ({ onGo, onClear }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const handleGo = () => {
    onGo(from, to);
  };
  return (
    <>
      <button onClick={onClear}>Clear</button>
      <AutoCompleteInput onChange={setFrom} placeholder="From" />
      <AutoCompleteInput onChange={setTo} placeholder="To" />
      <button onClick={handleGo}>Go</button>
    </>
  );
};

export default DirectionsInput;
