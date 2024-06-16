import Breadcrumb from "react-bootstrap/Breadcrumb";

const PageBreadcrumb = (props: {
  items: string[]
}): React.ReactElement => {
  const {
    items = []
  } = props;

  return (
    <Breadcrumb>
      {
        items.map((item, idx, { length }) => (
          <Breadcrumb.Item key={ item } active={ length === (idx + 1) }>{ item }</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
