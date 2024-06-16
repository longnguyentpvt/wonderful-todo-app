import { forwardRef, useState } from "react";
import { Container } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

import Image from "@app/components/custom/image";
import BellIcon from "@app/components/icons/bell-icon";
import PersonFillIcon from "@app/components/icons/person-fill-icon";
import ProfileDropdownMenu from "@app/components/profile-dropdown-menu";

interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (event: unknown) => void;
}

const DefaultProfileCircle = forwardRef<HTMLDivElement, CustomToggleProps>(({ onClick }, ref) => (
  <div
    ref={ ref }
    className="topbar__profile-avatar border-2 border rounded-circle p-1"
    onClick={ (e) => {
      e.preventDefault();
      onClick(e);
    } }>
    <PersonFillIcon className="topbar__profile-avatar-icon text-gray-600" />
  </div>
));
DefaultProfileCircle.displayName = "DefaultProfileCircle";

export default function Topbar(): React.ReactElement {
  const [noAlerts] = useState<number>(10);

  return (
    <div className="db-layout__top-profile-bar shadow-sm fixed-top">
      <div className="bg-white">
        <Container className="db-layout__top-profile-bar-container">
          <Row className="h-100 g-0">
            <Col xs="auto" className="d-flex align-items-center">
              <Image
                className="top-logo"
                alt="Wonderful Todo - Logo"
                src="/next.svg"
                width={ 180 }
                height={ 37 } />
            </Col>
            <Col>
              <div className="h-100 d-flex justify-content-end align-items-center pe-3">
                <Row className="topbar__profile-menu g-3 align-items-center">
                  <Col xs="auto">
                    <div className="topbar_notification position-relative">
                      <BellIcon className="text-gray-600" />

                      <Badge
                        className="topbar_noti-message-badge  position-absolute"
                        bg="danger">{ noAlerts }</Badge>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="topbar__profile-menu-item">
                      <Dropdown>
                        <Dropdown.Toggle as={ DefaultProfileCircle }>
                          Dropdown Button
                        </Dropdown.Toggle>
                        <ProfileDropdownMenu />
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
