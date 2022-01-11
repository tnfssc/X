import { useRef, useEffect } from "react";
import { Input, InputProps } from "baseui/input";
interface _AutoCompleteInputProps {
  onChange: (value: string) => void;
  value?: string;
  [key: string]: unknown;
}

export type AutoCompleteInputProps = Omit<InputProps, "onChange"> & _AutoCompleteInputProps;

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
  return <Input inputRef={ref} {...props} />;
};

export default AutoCompleteInput;
