import AutoCompleteInput from "../AutoCompleteInput";
import { useState } from "react";
import { Button } from "baseui/button";
import { Block } from "baseui/block";

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
    <Block>
      <AutoCompleteInput onChange={setFrom} placeholder="From" />
      <AutoCompleteInput onChange={setTo} placeholder="To" />
      <Block width="100%" display="flex">
        <Button onClick={onClear} kind="secondary">
          Clear
        </Button>
        <Button $style={{ flexGrow: 1 }} onClick={handleGo} kind="primary">
          Go
        </Button>
      </Block>
    </Block>
  );
};

export default DirectionsInput;
