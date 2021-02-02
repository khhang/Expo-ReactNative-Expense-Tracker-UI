import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseListHeader = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5
  },
  headerText: {
    color: '#696969'
  }
});

export default ExpenseListHeader;