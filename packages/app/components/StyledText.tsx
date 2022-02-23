import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function FullNameText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontSize: 36 }]} />;
}

export function TeamNameText(props: TextProps) {
  return <Text {...props} style={props.style} />;
}
