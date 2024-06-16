import { memo } from "react";
import { Col, Row } from "react-bootstrap";

import Breadcrumb from "./page-header-breadcrumb";

const TEST_ITEMS: string[] = ["Home", "Todo List"];

function ContentHeader(): React.ReactElement {
  return (
    <div className="pb-4">
      <Row className="g-0">
        <Col>
          <div className="d-flex align-items-end">
            <div className="fs-3">Todo List</div>
            <div className="pb-1 ps-3">
              <Breadcrumb items={ TEST_ITEMS } />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default memo(ContentHeader);
