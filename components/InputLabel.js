import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InputLabel = ({label, required}) => {

  let star;
  if(required){
    star = <Text style={styles.required}>*</Text>
  }

  return (
    <View style={styles.labelContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      {star}
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row'
  },
  inputLabel: {
    color: '#696969',
    fontSize: 14
  },
  required: {
    color: 'red',
    marginLeft: 5
  }
});

export default InputLabel;