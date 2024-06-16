import { useRouter } from "next/router";
import Col from "react-bootstrap/Col";
import DropdownDivider from "react-bootstrap/DropdownDivider";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Row from "react-bootstrap/Row";

import ChevronRightIcon from "@app/components/icons/chevron-right";

import { PlatformUrl } from "@app/data/app";

export default function Menu(): React.ReactElement {
  const {
    push: redirectPush
  } = useRouter();

  const signout = (): void => {
    // invalidateAccount();

    redirectPush(PlatformUrl.Login);
  };

  return (
    <DropdownMenu>
      <DropdownItem><strong>Long Nguyen</strong></DropdownItem>
      <DropdownItem>longnguyentpvt@gmail.com</DropdownItem>
      <DropdownDivider />
      <DropdownItem>
        <Row className="g-0">
          <Col>
            Language: English
          </Col>
          <Col xs="auto">
            <div>
              <ChevronRightIcon />
            </div>
          </Col>
        </Row>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem>Setting</DropdownItem>
      <DropdownItem onClick={ signout }>Sign out</DropdownItem>
    </DropdownMenu>
  );
}
