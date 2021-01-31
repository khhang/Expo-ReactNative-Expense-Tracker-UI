import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {formatBalance} from './../services/format-service';

const ExpenseListItem = ({expenseDetail}) => {
  const navigation = useNavigation();

  const isPositive = expenseDetail.amount >= 0;

  return (
    <TouchableOpacity style={[styles.itemContainer, isPositive ? styles.itemContainerPositive : styles.itemContainerNegative]}
      onLongPress={() => {
        navigation.navigate('EditExpense', {expense: {...expenseDetail}});
      }}
    >
      <View style={styles.row}>
        <View>
          <Text style={{fontWeight: 'bold', maxWidth: 300}}>{expenseDetail.description || '~'}</Text>
          <Text>{expenseDetail.subcategoryName ? 
            `${expenseDetail.categoryName} / ${expenseDetail.subcategoryName}` : `${expenseDetail.categoryName}`}</Text>
          <Text>{expenseDetail.accountName}</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={[styles.numberText, isPositive ? styles.amountPositive : styles.amountNegative]}>{formatBalance(expenseDetail.amount)}</Text>
        </View>
      </View>

      {/* <View style={styles.row}>
        <Text style={{fontWeight: 'bold', maxWidth: 300}}>{expenseDetail.description || '~'}</Text>
      </View>
      <View>
        <Text>{expenseDetail.subcategoryName ? 
          `${expenseDetail.categoryName} / ${expenseDetail.subcategoryName}` : `${expenseDetail.categoryName}`}</Text>
      </View>
      <View style={styles.row}>
        <Text>{expenseDetail.accountName}</Text>
        <Text style={[isPositive ? styles.amountPositive : styles.amountNegative]}>{formatBalance(expenseDetail.amount)}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 5,
    marginVertical: 3
  },
  itemContainerPositive: {
    borderLeftColor: '#5cb85c',
    borderLeftWidth: 3,
  },
  itemContainerNegative: {
    borderLeftColor: '#d9534f',
    borderLeftWidth: 3,
  },
  amountPositive: {
    color: '#5cb85c',
  },
  amountNegative: {
    color: '#d9534f',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  numberContainer: {
    paddingRight: 10,
    justifyContent: 'center'
  },
  numberText: {
    fontSize: 16
  }
});

export default ExpenseListItem;