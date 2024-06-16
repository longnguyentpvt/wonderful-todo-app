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
      className={ `svg-icon svg-icon__person-fill${ className ? ` ${ className }` : "" }` }
      fill="currentColor"
      style={ props.style }>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
    </svg>
  );
};

export default Icon;
