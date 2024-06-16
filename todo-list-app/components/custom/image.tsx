import Image, { ImageProps } from "next/image";

export default function CustomImage(props: ImageProps): React.ReactElement {
  const { src, ...leftProps } = props;

  return <Image src={ `/todo-app/${ src }` } { ...leftProps } />;
}
