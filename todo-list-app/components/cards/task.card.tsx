import dayjs from "dayjs";
import React from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { BootstrapColor } from "@app/types/components";

import { TaskInfo } from "@app/apis/task-api";

import styles from "@app/styles/task-card.module.scss";

export type TaskCardProps = {
  data: TaskInfo
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const {
    name, description, dueDate, status
  } = props.data;

  const dueDateFormatted = dayjs(dueDate).format("DD/MM/YYYY HH:mm");

  let statusColor: BootstrapColor;
  let statusName = "";
  switch (status) {
    case "Done":
      statusColor = "green";
      statusName = "Done";
      break;
    case "InProgress":
      statusColor = "blue";
      statusName = "In Progress";
      break;
    default:
      statusColor = "yellow";
      statusName = "Pending";
      break;
  }

  const overDue = dayjs().isAfter(dueDate) && status !== "Done";
  const dueDateColor: BootstrapColor = overDue ? "red" : "light-blue";

  return (
    <Card className={ styles["task-card"] }>
      <Card.Body>
        <Row className="g-3 g-desktop-2 align-items-center">
          <Col xs={ 12 } desktop={ 8 }>
            <div className="fw-bolder text-truncate">{ name }</div>
            <p className="text-gray-600 mb-0 text-truncate">{ description }</p>
          </Col>
          <Col xs={ 12 } desktop={ 2 }>
            <div className="fw-bolder">Due date</div>
            <p className={ `text-${ dueDateColor } mb-0` }>{ dueDateFormatted }</p>
          </Col>
          <Col xs={ 12 } desktop={ 2 } className="text-desktop-center">
            <Badge bg={ statusColor }>{ statusName }</Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
