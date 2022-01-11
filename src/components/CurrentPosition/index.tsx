import { useMap } from "../../contexts/map";
import { useGeolocation } from "../../contexts/geolocation";
import { useEffect, useRef } from "react";

const CurrentPosition: React.FC<{ live?: boolean; disable?: boolean }> = ({ live = false, disable = false }) => {
  const map = useMap();
  const geolocation = useGeolocation();
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
              geolocation.current = { lat: latitude, lng: longitude };
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
              geolocation.current = { lat: latitude, lng: longitude };
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
      geolocation.current = undefined;
    };
  }, [map, live, disable, geolocation]);
  return <></>;
};

export default CurrentPosition;
