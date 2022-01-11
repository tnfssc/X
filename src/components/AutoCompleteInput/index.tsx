import { useRef, useEffect } from "react";

export interface AutoCompleteInputProps {
  onChange: (value: string) => void;
  value?: string;
  [key: string]: unknown;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onChange, value = "", ...props }) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current)
      new google.maps.places.Autocomplete(ref.current).addListener("place_changed", () => {
        if (ref.current) {
          const place = ref.current.value;
          onChange(place);
        }
      });
  }, [onChange, ref]);
  useEffect(() => {
    if (ref.current) ref.current.value = value;
  }, [value]);
  return <input ref={ref} {...props} />;
};

export default AutoCompleteInput;
