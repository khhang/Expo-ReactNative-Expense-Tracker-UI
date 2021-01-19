import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

/*
  Id
  CategoryId
  Limit
  Deleted Date -- for tracking history (can be null)
*/

const Budgets = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>This page isn't ready yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  buttonContainer: {
    marginTop: 20
  }
});

export default Budgets;