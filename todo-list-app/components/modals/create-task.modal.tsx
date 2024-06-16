import dayjs from "dayjs";
import { memo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";

import OffcavasFooter from "@app/components/custom/offcanvas-footer";
import DatePickerInput from "@app/components/date-picker/date-picker-input";
import LoadingSpinner from "@app/components/loading-overlay";

export type DetailModalProps = {
  show: boolean;
  onHide: () => void;
  onCreate: (name: string, description: string, dueDate: string) => void
};

type FormInput = "name" | "description" | "dueDate";

type FormError = Record<FormInput, boolean>;

const TaskModal: React.FC<DetailModalProps> = ({
  show, onHide, onCreate
}) => {
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | undefined>();
  const [minDate, setMinDate] = useState<dayjs.Dayjs | undefined>();
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const [formError, setFormError] = useState<FormError>({
    name: false,
    description: false,
    dueDate: false
  });

  const onClose = (): void => {
    setDueDate(undefined);
    onHide();

    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (descRef.current) {
      descRef.current.value = "";
    }
    setDueDate(undefined);
  };

  const create = (): void => {
    const name = nameRef.current?.value || "";
    const description = descRef.current?.value || "";
    const dueDateFormatted = (dueDate && dueDate.isAfter(dayjs())) ? dueDate.toISOString() : "";

    if (!name || !description || !dueDateFormatted) {
      setFormError({
        name: !name,
        description: !description,
        dueDate: !dueDateFormatted
      });

      return;
    }

    onCreate(name, description, dueDateFormatted);
  };

  const onInputChange = (input: FormInput): void => {
    setFormError((prev) => ({
      ...prev,
      [input]: false
    }));
  };

  const onDateChange = (date: dayjs.Dayjs | null): void => {
    setDueDate(date || undefined);
    onInputChange("dueDate");
  };

  const onOpen = (): void => {
    setMinDate(dayjs());
  };

  const {
    name: invalidName, description: invalidDescription, dueDate: invalidDueDate
  } = formError;

  return (
    <Offcanvas show={ show } onShow={ onOpen } onHide={ onClose } placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Detail</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="g-3">
          <Col xs={ 12 }>
            <FormLabel>Summary</FormLabel>
            <FormControl
              isInvalid={ invalidName } type="text"
              onChange={ () => onInputChange("name") }
              placeholder="Enter name of your task" ref={ nameRef } maxLength={ 255 } />
            <FormControl.Feedback type="invalid">
              Please provide a valid summary.
            </FormControl.Feedback>
          </Col>
          <Col xs={ 12 }>
            <FormLabel>Due date</FormLabel>
            <DatePickerInput
              isInvalid={ invalidDueDate } date={ dueDate } minDate={ minDate }
              onDateChange={ onDateChange } withTime />
            <FormControl.Feedback type="invalid" className={ `${ invalidDueDate ? "d-block" : "" }` }>
              Please select a valid due date.
            </FormControl.Feedback>
          </Col>
          <Col xs={ 12 }>
            <FormLabel>Description</FormLabel>
            <FormControl
              isInvalid={ invalidDescription } as="textarea" rows={ 3 } onChange={ () => onInputChange("description") }
              placeholder="Enter name of your task" ref={ descRef } maxLength={ 2000 } />
            <FormControl.Feedback type="invalid">
              Please fill a valid description
            </FormControl.Feedback>
          </Col>
        </Row>
      </Offcanvas.Body>

      <OffcavasFooter>
        <div className="d-grid">
          <Button variant="primary" onClick={ create }>
            CREATE TASK
          </Button>
        </div>
      </OffcavasFooter>
      <LoadingSpinner loading={ false } />
    </Offcanvas>
  );
};

export default memo(TaskModal);
