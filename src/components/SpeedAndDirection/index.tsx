import { useGeolocation } from "../../contexts/geolocation";
import { useRef, useEffect } from "react";

const SpeedAndDirection = () => {
  const geolocation = useGeolocation();
  const speedRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (geolocation.current.coords) {
      const { speed, heading } = geolocation.current.coords;
      const speedText = `Speed: ${speed} m/s`;
      const directionText = `Direction: ${heading}°`;
      if (speedRef.current) speedRef.current.innerHTML = speedText;
      if (directionRef.current) directionRef.current.innerHTML = directionText;
    }
  });
  return (
    <div>
      <div ref={speedRef}>Speed: {`${geolocation.current.coords?.speed}`}</div>
      <div ref={directionRef}>Direction: {`${geolocation.current.coords?.heading}`}</div>
    </div>
  );
};

export default SpeedAndDirection;
