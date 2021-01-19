import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const formatDate = (date) => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const ExpenseListItem = ({expenseDetail}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.itemContainer, expenseDetail.amount >= 0 ? styles.itemContainerPositive : styles.itemContainerNegative]}>
      <View style={styles.row}>
        <Text style={{fontWeight: 'bold', maxWidth: 300}}>{expenseDetail.description || '~'}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditExpense', {expense: {...expenseDetail}});
          }}
        >
          <Ionicons name="pencil-sharp" size={16} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{expenseDetail.subcategoryName ? 
          `${expenseDetail.categoryName} / ${expenseDetail.subcategoryName}` : `${expenseDetail.categoryName}`}</Text>
      </View>
      <Text>{expenseDetail.accountName}</Text>
      <View style={styles.row}>
        <Text style={{color: '#696969'}}>{formatDate(new Date(expenseDetail.date))}</Text>
        <Text>{expenseDetail.amount >= 0  ? `$ ${expenseDetail.amount}` : `-$ ${Math.abs(expenseDetail.amount)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 5,
    marginVertical: 8
  },
  itemContainerPositive: {
    borderLeftColor: '#5cb85c',
    borderLeftWidth: 3,
  },
  itemContainerNegative: {
    borderLeftColor: '#d9534f',
    borderLeftWidth: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ExpenseListItem;