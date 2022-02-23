import { Image, ImageProps } from './Themed';

export function QrCode(props: ImageProps) {
  const { source, ...otherProps } = props;
  return <Image {...otherProps} source={source} />;
}
