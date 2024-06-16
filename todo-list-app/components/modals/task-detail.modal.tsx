import dayjs from "dayjs";
import { memo } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";

import OffcavasFooter from "@app/components/custom/offcanvas-footer";
import LoadingSpinner from "@app/components/loading-overlay";

import { TaskInfo } from "@app/apis/task-api";

export type DetailModalProps = {
  show: boolean;
  onHide: () => void;
  onAction: (taskId: number, action: "delete" | "complete") => void,
  data?: TaskInfo
};

const DEFAULT_DATA: TaskInfo = {
  id: 0,
  name: "",
  description: "",
  dueDate: "",
  status: "Pending"
};

const TaskDetailModal: React.FC<DetailModalProps> = ({
  show, onHide, onAction, data
}) => {
  const onClose = (): void => {
    onHide();
  };

  const {
    id: taskId,
    name,
    description,
    dueDate,
    completedDate = ""
  } = data ?? DEFAULT_DATA;

  const dueDateStr = dayjs(dueDate).format("DD/MM/YYYY HH:mm");
  const completedDateStr = completedDate ? dayjs(completedDate).format("DD/MM/YYYY HH:mm") : null;

  return (
    <Offcanvas show={ show } onHide={ onClose } placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Detail</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row className="g-3">
          <Col xs={ 12 }>
            <div className="fw-bolder">To Do</div>
            <div className="text-gray-600">{ name }</div>
          </Col>
          <Col xs={ 12 }>
            <div className="fw-bolder">Status</div>
            <div className="text-gray-600">Pending</div>
          </Col>
          <Col xs={ 12 }>
            <div className="fw-bolder">Due date</div>
            <div className="text-gray-600">{ dueDateStr }</div>
          </Col>
          {
            completedDateStr && (
              <Col xs={ 12 }>
                <div className="fw-bolder">Completed date</div>
                <div className="text-gray-600">{ completedDateStr }</div>
              </Col>
            )
          }
          <Col xs={ 12 }>
            <div className="fw-bolder">Description</div>
            <p className="text-gray-600 mb-0">{ description }</p>
          </Col>
        </Row>
      </Offcanvas.Body>

      <OffcavasFooter>
        <Row>
          <Col xs={ 6 }>
            <div className="d-grid">
              <Button variant="success" onClick={ () => onAction(taskId, "complete") }>
                COMPLETE
              </Button>
            </div>
          </Col>
          <Col xs={ 6 }>
            <div className="d-grid">
              <Button variant="danger" onClick={ () => onAction(taskId, "delete") }>
                DELETE
              </Button>
            </div>
          </Col>
        </Row>

      </OffcavasFooter>
      <LoadingSpinner loading={ false } />
    </Offcanvas>
  );
};

export default memo(TaskDetailModal);
