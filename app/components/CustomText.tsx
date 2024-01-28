import React from 'react';
import { Text } from 'react-native';

export default function CustomText(props: any) {
  return (
    <Text
      adjustsFontSizeToFit
      allowFontScaling
      {...props}
      style={[props.style]}>
      {props.children}
    </Text>
  );
}
