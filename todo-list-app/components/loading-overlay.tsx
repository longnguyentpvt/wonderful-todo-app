import React from "react";
import Spinner from "react-bootstrap/Spinner";

export interface LoadingSpinnerProps {
  loading: boolean;
  text?: string,
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading, text, fullPage }) => (
  loading
    ? <div
        className={
          `${ fullPage ? "position-fixed" : "position-absolute" }`
          + " top-0 start-0 w-100 h-100"
          + " d-flex flex-column justify-content-center align-items-center"
        }
        style={ { backgroundColor: "rgba(255, 255, 255, 0.9)", zIndex: 999 } }>
      <Spinner animation="border" role="status" variant="primary">
      </Spinner>

      {
        text && (
          <div className="mt-2">
            { text }
          </div>
        )
      }

    </div> : <></>
);

export default LoadingSpinner;
