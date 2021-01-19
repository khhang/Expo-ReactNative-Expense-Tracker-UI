import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import {expensesService} from './../services/expenses-service';
import ExpenseListItem from './../components/ExpenseListItem';

/**
 * Need to keep track of:
 * -Date
 * -Category
 * -Subcategory
 * -Description
 * -Amount
 * -Account
 */

const Expenses = ({navigation, route}) => {

  const [expenseDetails, setExpenseDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setExpenseDetails(await expensesService.getExpenseDetails());
    };

    const addExpense = async(description, amount, accountId, categoryId, subcategoryId, date) => {
      await expensesService.addExpense(categoryId, subcategoryId, description, amount, accountId, date);
    };

    const updateExpense = async(id, description, amount, accountId, categoryId, subcategoryId, date) => {
      await expensesService.updateExpense(id, categoryId, subcategoryId, description, amount, accountId, date);
    }

    const { expense } = route.params || {};

    if(expense){
      if(expense.id){
        updateExpense(expense.id, expense.description, expense.amount, expense.accountId, expense.categoryId, expense.subcategoryId, expense.date);
      }else{
        addExpense(expense.description, expense.amount, expense.accountId, expense.categoryId, expense.subcategoryId, expense.date);
      }
    }

    fetchData();
  }, [route.params?.expense]);

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={expenseDetails}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (<ExpenseListItem expenseDetail={item}/>)}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.navigate('EditExpense');
          }}
          title="New Expense"
        ></Button>
      </View>
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

export default Expenses;