import AutoCompleteInput from "../AutoCompleteInput";
import { useGeolocation } from "../../contexts/geolocation";
import { useState } from "react";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { Check as CheckIcon, ChevronDown, ChevronUp } from "baseui/icon";

interface DirectionsInputProps {
  onGo: (from: string, to: string) => void;
  onClear?: () => void;
}

const DirectionsInput: React.FC<DirectionsInputProps> = ({ onGo, onClear }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [show, setShow] = useState(true);
  const geolocation = useGeolocation();

  const handleGo = () => {
    onGo(from, to);
  };
  const handleClear = () => {
    setFrom("");
    setTo("");
    onClear && onClear();
  };
  const handleCurrentLocation = () => {
    handleClear();
    setFrom(geolocation.current?.lat + "," + geolocation.current?.lng);
  };
  return (
    <Block marginTop={!show ? "-146px" : "0px"} overrides={{ Block: { style: { transition: "margin 300ms ease" } } }}>
      <AutoCompleteInput onChange={setFrom} value={from} placeholder="From" />
      <AutoCompleteInput onChange={setTo} value={to} placeholder="To" />
      <Block width="100%" display="flex">
        <Button onClick={handleCurrentLocation} kind="secondary">
          <CheckIcon />
        </Button>
        <Button onClick={handleClear} kind="secondary">
          Clear
        </Button>
        <Button $style={{ flexGrow: 1 }} onClick={handleGo} kind="primary">
          Go
        </Button>
      </Block>
      <Block width="100%" display="flex" justifyContent="center">
        <Button kind="secondary" shape="pill" size="mini" onClick={() => setShow((p) => !p)}>
          {show ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </Button>
      </Block>
    </Block>
  );
};

export default DirectionsInput;
