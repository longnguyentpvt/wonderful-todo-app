import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  date?: dayjs.Dayjs;
  onDateChange?: (date: dayjs.Dayjs | null) => void;
  withTime?: boolean;
  isInvalid?: boolean;
  minDate?: dayjs.Dayjs;
}

const Input: React.FC<DatePickerInputProps> = ({
  onDateChange, withTime, date, isInvalid, minDate
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newDate: Date | null): void => {
    setSelectedDate(newDate);

    if (onDateChange) {
      onDateChange(newDate ? dayjs(newDate) : null);
    }
  };

  useEffect(() => {
    if (date) {
      setSelectedDate(date.toDate());
    } else {
      setSelectedDate(null);
    }
  }, [date]);

  const format = withTime ? "dd/MM/YYYY HH:mm" : "dd/MM/YYYY";
  const startDate = minDate ? minDate.toDate() : new Date();

  return (
    <FormGroup>
      <DatePicker
        minDate={ startDate }
        wrapperClassName="w-100"
        selected={ selectedDate }
        showTimeSelect={ withTime }
        onChange={ handleDateChange }
        dateFormat={ format }
        className={ `form-control d-block w-100${ isInvalid ? " is-invalid" : "" }` } />
    </FormGroup>
  );
};

export default memo(Input);
