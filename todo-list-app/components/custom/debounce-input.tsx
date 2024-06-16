import React, {
  useState, useEffect, useRef, memo
} from "react";
import FormControl, { FormControlProps } from "react-bootstrap/FormControl";

type SearchDebounceProps = FormControlProps & {
  onCall: (value: string) => void;
  delay?: number;
};

const SearchDebounce: React.FC<SearchDebounceProps> = ({
  onCall,
  delay = 500,
  ...rest
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setSearchText(value);
  };

  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(() => {
      onCall(searchText);
    }, delay);
  }, [searchText, onCall, delay]);

  return (
    <FormControl
      value={ searchText }
      { ...rest }
      onChange={ handleSearchTextChange } />
  );
};

export default memo(SearchDebounce);
