import AutoCompleteInput from "../AutoCompleteInput";
import { useGeolocation } from "../../contexts/geolocation";
import { useStore } from "../../contexts/store";
import { useState } from "react";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { Checkbox } from "baseui/checkbox";
import { ChevronDown, ChevronUp, ChevronLeft } from "baseui/icon";

interface DirectionsInputProps {
  onGo: (from: string, to: string) => void;
  onClear?: () => void;
}

const DirectionsInput: React.FC<DirectionsInputProps> = ({ onGo, onClear }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [show, setShow] = useState(true);
  const geolocation = useGeolocation();
  const { followGeolocation } = useStore();

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
    setFrom(geolocation.current.pos?.lat + "," + geolocation.current.pos?.lng);
  };
  return (
    <Block
      width="100%"
      marginTop={!show ? "-146px" : "0px"}
      overrides={{ Block: { style: { transition: "margin 300ms ease", pointerEvents: "none" } } }}
    >
      <Block width="100%" overrides={{ Block: { style: { pointerEvents: "all" } } }}>
        <Block width="100%" display="flex">
          <AutoCompleteInput onChange={setFrom} value={from} placeholder="From" />
          <Button onClick={handleCurrentLocation} kind="secondary">
            <ChevronLeft />
          </Button>
        </Block>
        <AutoCompleteInput onChange={setTo} value={to} placeholder="To" />
        <Block width="100%" display="flex">
          <Block backgroundColor="rgb(238, 238, 238)" display="flex" justifyContent="center" alignItems="center">
            <Checkbox
              checked={followGeolocation.value}
              onChange={(e) => followGeolocation.set((e.target as unknown as { checked: boolean }).checked)}
              checkmarkType="toggle_round"
              title="Follow my location"
            />
          </Block>
          <Button onClick={handleClear} kind="secondary">
            Clear
          </Button>
          <Button $style={{ flexGrow: 1 }} onClick={handleGo} kind="primary">
            Go
          </Button>
        </Block>
      </Block>
      <Block width="100%" display="flex" justifyContent="center">
        <Button
          overrides={{ BaseButton: { style: { pointerEvents: "all" } } }}
          kind="secondary"
          shape="pill"
          size="mini"
          onClick={() => setShow((p) => !p)}
        >
          {show ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </Button>
      </Block>
    </Block>
  );
};

export default DirectionsInput;
