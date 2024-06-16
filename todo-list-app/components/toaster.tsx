import { memo, useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import {
  ToastMsg,
  subscribe,
  unsubscribe,
  closeMsg
} from "@app/services/toast";

function Toaster(): React.ReactElement {
  const [toastMsgs, setToastMsgs] = useState<ToastMsg[]>([]);

  useEffect(() => {
    const onData = (messages: ToastMsg[]): void => {
      setToastMsgs(messages);
    };

    subscribe(onData);

    return (): void => {
      unsubscribe(onData);
    };
  }, []);

  return (
    <ToastContainer position="top-center" className="p-3">
      {
        toastMsgs?.map(({
          id, status, header, message
        }) => (
          <Toast key={ id } bg={ status } delay={ 10000 } autohide onClose={ () => closeMsg(id ?? 0) }>
            <Toast.Header>
              <strong className="me-auto">{ header }</strong>
            </Toast.Header>
            <Toast.Body>{ message }</Toast.Body>
          </Toast>
        ))
      }
    </ToastContainer>
  );
}

export default memo(Toaster);
