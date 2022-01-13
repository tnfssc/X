import { useGeolocation } from "../../contexts/geolocation";
import { useRef, useEffect, useState } from "react";
import { Block } from "baseui/block";
import { Input } from "baseui/input";

const SpeedAndDirection = () => {
  const geolocation = useGeolocation();
  const speedRef = useRef<HTMLInputElement>(null);
  const directionRef = useRef<HTMLInputElement>(null);

  if (speedRef.current) speedRef.current.value = `Speed: ${geolocation.current.coords?.speed} m/s`;
  if (directionRef.current) directionRef.current.value = `Direction: ${geolocation.current.coords?.heading}°`;

  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    const l = setTimeout(() => {
      setForceUpdate((p) => p + 1);
    }, 1000);
    return () => clearTimeout(l);
  });
  return (
    <Block width="100%" justifyContent="flex-end" display="flex">
      <Block>
        <Input
          onChange={(e) => e.preventDefault()}
          inputRef={speedRef}
          value={`Speed: ${geolocation.current.coords?.speed}`}
        />
        <Input
          onChange={(e) => e.preventDefault()}
          inputRef={directionRef}
          value={`Direction: ${geolocation.current.coords?.heading}`}
        />
      </Block>
    </Block>
  );
};

export default SpeedAndDirection;
