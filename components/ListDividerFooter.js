import React from 'react';
import {View, StyleSheet} from 'react-native';

const ListDividerFooter = () => {
  return (
    <View style={styles.spacer}></View>
  );
};

const styles = StyleSheet.create({
  spacer: {
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  }
});

export default ListDividerFooter;