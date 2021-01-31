import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, SectionList } from 'react-native';
import {expensesService} from './../services/expenses-service';
import ExpenseListItem from './../components/ExpenseListItem';
import ExpenseListHeader from './../components/ExpenseListHeader';
import ListDividerFooter from './../components/ListDividerFooter';

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
  const [expenseDetailsGroupedByDate, setExpenseDetailsGroupedByDate] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    const expenseDetails = await expensesService.getExpenseDetails();
    const dateGroupedDetails = buildTransactionsByDate(groupDetailsByDate(expenseDetails));

    setExpenseDetailsGroupedByDate(dateGroupedDetails);
    setLoading(false);
  };

  const groupDetailsByDate = (expenseDetails) => {
    const dateGroupedDetails = {};

    expenseDetails.forEach(ed => {
      const date = ed.date.slice(0, 10);

      if(dateGroupedDetails[date]){
        dateGroupedDetails[date].push(ed);
      }else{
        dateGroupedDetails[date] = [ed];
      }
    });

    return dateGroupedDetails;
  };

  const buildTransactionsByDate = (dateGroupedDetails) => {
    const results = [];

    Object.keys(dateGroupedDetails).forEach((key) => {
      const expenseDetailsByDate = {
        title: key,
        data: dateGroupedDetails[key]
      };

      results.push(expenseDetailsByDate);
    });

    return results.sort((a, b) => b.title.localeCompare(a.title));
  };

  useEffect(() => {
    setLoading(true);

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
      <SectionList
        sections={expenseDetailsGroupedByDate}
        onRefresh={async () => {
          setLoading(true);
          await fetchData();
        }}
        refreshing={loading}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (<ExpenseListItem expenseDetail={item}/>)}
        renderSectionHeader={({section: {title}}) => (<ExpenseListHeader title={title}/>)}
        renderSectionFooter={() => (<ListDividerFooter/>)}
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