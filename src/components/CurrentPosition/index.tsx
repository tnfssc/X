import { useMap } from "../../contexts/map";
import { useStore } from "../../contexts/store";
import { useGeolocation } from "../../contexts/geolocation";
import { useEffect, useRef, useCallback, useMemo } from "react";

const markerIcon: google.maps.Symbol = {
  path: 3,
  scale: 8,
  fillColor: "red",
  fillOpacity: 1,
  strokeColor: "white",
  strokeWeight: 3,
};

const createMarker = (map: google.maps.Map, latLng?: google.maps.LatLng, rotation?: number) =>
  new google.maps.Marker({
    position: latLng,
    map,
    title: "You are here",
    icon: {
      ...markerIcon,
      rotation: ((rotation ?? 0) + 180) % 360,
    },
  });

const CurrentPosition: React.FC<{ live?: boolean; follow?: boolean; disable?: boolean }> = ({
  live = false,
  disable = false,
}) => {
  const map = useMap();
  const geolocation = useGeolocation();
  const marker = useRef<google.maps.Marker>();
  const watchIdRef = useRef<number>();
  const {
    followGeolocation: { value: follow },
  } = useStore();
  const options = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }),
    [],
  );
  const onPositionUpdate = useCallback(
    (position: GeolocationPosition, follow = true) => {
      const { latitude, longitude } = position.coords;
      const latLng = new google.maps.LatLng(latitude, longitude);
      geolocation.current = position;
      geolocation.current.pos = latLng.toJSON();
      const rotation = ((position.coords.heading ?? 0) + 180) % 360;
      if (marker.current) {
        marker.current.setPosition(latLng);
        marker.current.setIcon({
          ...((marker.current.getIcon() as google.maps.Symbol) || markerIcon),
          rotation,
        });
      } else {
        marker.current = createMarker(map, latLng, rotation);
      }
      if (follow && map) {
        map.panTo(latLng);
        map.setTilt(rotation);
      }
    },
    [geolocation, map],
  );
  const onPositionError = useCallback((error: GeolocationPositionError) => {
    console.error(error);
  }, []);
  const getGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(onPositionUpdate, onPositionError, options);
  }, [onPositionError, onPositionUpdate, options]);
  const watchGeolocation = useCallback(
    (follow?: boolean) => {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (p) => onPositionUpdate(p, follow),
        onPositionError,
        options,
      );
    },
    [onPositionError, onPositionUpdate, options],
  );
  const clearWatch = useCallback(() => {
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
  }, []);

  useEffect(() => {
    if (marker.current) marker.current.setMap(null);
    marker.current = createMarker(map);
    if (!disable) {
      getGeolocation();
      if (live) watchGeolocation(follow);
    }
    return () => {
      clearWatch();
    };
  }, [clearWatch, disable, follow, getGeolocation, live, map, watchGeolocation]);
  return <></>;
};

export default CurrentPosition;
