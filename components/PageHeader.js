import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

const PageHeader = ({ pageName }) => {
  return (
    <View>
      <View style={{paddingTop: StatusBar.currentHeight}}/>
      <View style={styles.container}>
        <Text style={styles.text}>{pageName}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  text: {
    fontSize: 20,
  }
});

export default PageHeader;