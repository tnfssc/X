import { useMap } from "../../contexts/map";
import { useEffect, useRef } from "react";

const CurrentPosition: React.FC<{ live?: boolean; disable?: boolean }> = ({ live = false, disable = false }) => {
  const map = useMap();
  const marker = useRef<google.maps.Marker>();
  const watchIdRef = useRef<number>();
  useEffect(() => {
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    if (marker.current) marker.current.setMap(null);
    marker.current = new google.maps.Marker({
      position: { lat: 0, lng: 0 },
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "red",
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 3,
      },
    });
    if (navigator.geolocation && !disable) {
      if (live) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (marker.current) {
              marker.current.setPosition({ lat: latitude, lng: longitude });
            }
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        );
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (marker.current) {
              marker.current.setPosition({ lat: latitude, lng: longitude });
            }
          },
          (error) => {
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
        );
      }
    }
    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (marker.current) marker.current.setMap(null);
    };
  }, [map, live, disable]);
  return <></>;
};

export default CurrentPosition;
