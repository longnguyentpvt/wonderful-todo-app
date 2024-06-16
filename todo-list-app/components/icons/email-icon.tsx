import {
  ReactElement
} from "react";

import { DefaultIconProps } from "@app/types/components";

const EmailIcon = (props: DefaultIconProps): ReactElement => {
  const {
    className
  } = props;

  return (
    <svg
      className={ `svg-icon svg-icon__email${ className ? ` ${ className }` : "" }` }
      style={ props.style }
      viewBox="0 0 48 48">
      <path
        d="M0 0h48v48H0z"
        fill="none" />
      <path
        fill="currentColor"
        d="M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0
      28H8V16l16 10 16-10v20zM24 22L8 12h32L24 22z" />
    </svg>
  );
};

export default EmailIcon;
