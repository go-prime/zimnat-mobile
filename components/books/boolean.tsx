import React from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import FieldContainer from './field';

export default function BooleanField(props) {
  const [value, setValue] = React.useState(props.value);
  React.useEffect(() => {
    props.onChange(value);
  }, [value]);
  return (
    <FieldContainer input={props.isInput} label={props.label}>
      <Switch 
        onValueChange={() => setValue(!value)}
        value={value}/>
    </FieldContainer>
  );
}

