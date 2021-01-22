import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {formatBalance} from './../services/format-service';

const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const ExpenseListItem = ({expenseDetail}) => {
  const navigation = useNavigation();

  const isPositive = expenseDetail.amount >= 0;

  return (
    <View style={[styles.itemContainer, isPositive ? styles.itemContainerPositive : styles.itemContainerNegative]}>
      <View style={styles.row}>
        <Text style={{fontWeight: 'bold', maxWidth: 300}}>{expenseDetail.description || '~'}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditExpense', {expense: {...expenseDetail}});
          }}
        >
          <Ionicons name="pencil-sharp" size={20} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{expenseDetail.subcategoryName ? 
          `${expenseDetail.categoryName} / ${expenseDetail.subcategoryName}` : `${expenseDetail.categoryName}`}</Text>
      </View>
      <Text>{expenseDetail.accountName}</Text>
      <View style={styles.row}>
        <Text style={{color: '#696969'}}>{formatDate(new Date(expenseDetail.date))}</Text>
        <Text style={[isPositive ? styles.amountPositive : styles.amountNegative]}>{formatBalance(expenseDetail.amount)}</Text>
      </View>
    </View>
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
  }
});

export default ExpenseListItem;