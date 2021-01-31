import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({onChangeText, value, editable, keyboardType, placeholder}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
      keyboardType={keyboardType}
      style={styles.inputTextbox}
    />
  );
};

const styles = StyleSheet.create({
  inputTextbox: {
    borderRadius: 0.1,
    borderColor: '#696969',
    borderBottomWidth: 1
  }
});

export default CustomTextInput;