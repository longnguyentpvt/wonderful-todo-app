import {
  ReactElement
} from "react";

import { DefaultIconProps } from "@app/types/components";

const Icon = (props: DefaultIconProps): ReactElement => {
  const {
    className
  } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
      className={ `svg-icon svg-icon__droplet-fill${ className ? ` ${ className }` : "" }` }
      fill="currentColor"
      style={ props.style }>
      <path fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5
        0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
};

export default Icon;
