import { useGeolocation } from "../../contexts/geolocation";
import { useRef, useEffect, useState } from "react";

const SpeedAndDirection = () => {
  const geolocation = useGeolocation();
  const speedRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<HTMLDivElement>(null);

  if (speedRef.current) speedRef.current.innerHTML = `Speed: ${geolocation.current.coords?.speed} m/s`;
  if (directionRef.current) directionRef.current.innerHTML = `Direction: ${geolocation.current.coords?.heading}°`;

  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    const l = setTimeout(() => {
      setForceUpdate((p) => p + 1);
    }, 1000);
    return () => clearTimeout(l);
  });
  return (
    <div>
      <div ref={speedRef}>Speed: {`${geolocation.current.coords?.speed}`}</div>
      <div ref={directionRef}>Direction: {`${geolocation.current.coords?.heading}`}</div>
    </div>
  );
};

export default SpeedAndDirection;
