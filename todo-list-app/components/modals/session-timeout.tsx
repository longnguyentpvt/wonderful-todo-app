import { useRouter } from "next/router";
import React from "react";
import { Modal, Button } from "react-bootstrap";

import { PlatformUrl } from "@app/data/app";

export interface SessionTimeoutModalProps {
  show: boolean;
}

const SessionTimeoutModal: React.FC<SessionTimeoutModalProps> = ({ show }) => {
  const router = useRouter();

  const handleBackToLogin = (): void => {
    // Add any additional logic you need before redirecting to login
    router.push(PlatformUrl.Login);
  };

  return (
    <Modal show={ show } centered>
      <Modal.Header closeButton>
        <Modal.Title>Session Timeout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your session has timed out. Please log in again to continue.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={ handleBackToLogin }>
          Back to Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionTimeoutModal;
