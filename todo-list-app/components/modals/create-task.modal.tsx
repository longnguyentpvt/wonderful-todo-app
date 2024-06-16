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

const TaskModal: React.FC<DetailModalProps> = ({
  show, onHide, onCreate
}) => {
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | undefined>();
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const onClose = (): void => {
    setDueDate(undefined);
    onHide();
  };

  const create = (): void => {
    const name = nameRef.current?.value || "";
    const description = descRef.current?.value || "";
    const dueDateFormatted = dueDate ? dueDate.toISOString() : "";
    onCreate(name, description, dueDateFormatted);
  };

  const onDateChange = (date: dayjs.Dayjs | null): void => {
    setDueDate(date || undefined);
  };

  return (
    <Offcanvas show={ show } onHide={ onClose } placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Detail</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="g-3">
          <Col xs={ 12 }>
            <FormLabel>Summary</FormLabel>
            <FormControl type="text" placeholder="Enter name of your task" ref={ nameRef } />
          </Col>
          <Col xs={ 12 }>
            <FormLabel>Due date</FormLabel>
            <DatePickerInput date={ dueDate } onDateChange={ onDateChange } withTime />
          </Col>
          <Col xs={ 12 }>
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" rows={ 3 } placeholder="Enter name of your task" ref={ descRef } />
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
