import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatBalance} from './../services/format-service';

const CategorySummaryListItem = ({item}) => {

  return (
    <View style={styles.itemContainer}>
      <Text>{item.categoryName}</Text>
      <Text style={[item.totalAmount >= 0 ? styles.amountPositive : styles.amountNegative]}>{formatBalance(item.totalAmount)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  amountPositive: {
    color: '#5cb85c',
  },
  amountNegative: {
    color: '#d9534f',
  },
});

export default CategorySummaryListItem;
