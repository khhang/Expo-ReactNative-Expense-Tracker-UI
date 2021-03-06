import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, SectionList, ActivityIndicator } from 'react-native';
import {expensesService} from './../services/expenses-service';
import ExpenseListItem from './../components/ExpenseListItem';
import ExpenseListHeader from './../components/ExpenseListHeader';
import ListDividerFooter from './../components/ListDividerFooter';
import CustomTextInput from './../components/CustomTextInput';
import {Ionicons} from '@expo/vector-icons';
import {formatNumber, formatDateFromObj} from './../services/format-service';

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
  const [totalExpenseCount, setTotalExpenseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubcategory] = useState(null);

  const fetchData = async () => {
    const dateGroupedDetails = await getExpenseDetailedGroupedByDate(searchText, startDate, endDate);
    setExpenseDetailsGroupedByDate(dateGroupedDetails);
    setLoading(false);
  };

  const getExpenseDetailedGroupedByDate = async (searchText, startDate, endDate) => {
    const expenseDetails = await expensesService.getExpenseDetails(searchText, startDate, endDate);

    setTotalExpenseCount(expenseDetails.length);
    return buildTransactionsByDate(groupDetailsByDate(expenseDetails));
  };

  const groupDetailsByDate = (expenseDetails) => {
    const dateGroupedDetails = {};

    expenseDetails.forEach(ed => {
      const date = formatDateFromObj(new Date(ed.date));

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

    return results;
  };

  const addExpense = async(description, amount, accountId, categoryId, subcategoryId, date) => {
    await expensesService.addExpense(categoryId, subcategoryId, description, amount, accountId, date);
  };

  const updateExpense = async(id, description, amount, accountId, categoryId, subcategoryId, date) => {
    await expensesService.updateExpense(id, categoryId, subcategoryId, description, amount, accountId, date);
  }

  useEffect(() => {
    setLoading(true);
    const { expense, dateRangeFilter } = route.params || {};

    if(expense){
      if(expense.id){
        updateExpense(expense.id, expense.description, expense.amount, expense.accountId, expense.categoryId, expense.subcategoryId, expense.date);
      }else{
        addExpense(expense.description, expense.amount, expense.accountId, expense.categoryId, expense.subcategoryId, expense.date);
      }
    }

    if(dateRangeFilter){
      if(dateRangeFilter.startDate != startDate){
        setStartDate(dateRangeFilter.startDate ? new Date(dateRangeFilter.startDate) : null);
      }

      if(dateRangeFilter.endDate != endDate){
        setEndDate(dateRangeFilter.endDate ? new Date(dateRangeFilter.endDate) : null);
      }
      setLoading(false);
      return;
    }
    fetchData();
  }, [route.params?.expense, route.params?.dateRangeFilter]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [searchText, startDate, endDate]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchContainer}>
        <View style={{flexGrow: 1, flexShrink: 0, flexBasis: 0}}>
          <CustomTextInput
            placeholder="Search"
            value={searchText}
            onChangeText={async (text) => setSearchText(text)}
          />
        </View>
      </View>
      <View style={styles.listHeaderContainer}>
        <View style={styles.totalContainer}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>TOTAL</Text>
          {loading ? (<ActivityIndicator size="large" color="#2196F3"/>) : 
            (<Text style={{fontSize: 16}}>{formatNumber(totalExpenseCount)}</Text>)}
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DateRangeFilter', { 
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString() 
              });
            }}
          >
            <View style={{flexDirection: 'row'}}>
              <Ionicons style={{marginRight: 5}} name="calendar-sharp" size={16} color="#696969"></Ionicons>
              {endDate || startDate ? (<Text>{startDate ? formatDateFromObj(startDate) : 'Beginning'} - {endDate ? formatDateFromObj(endDate) : 'Present'}</Text>) :
                (<Text>All Time</Text>)
              }
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons style={{marginRight: 5}} name="md-list" size={16} color="#696969"></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  totalContainer: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 2,
    marginRight: 5
  },
  optionsContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    borderRadius: 2
  },
  buttonContainer: {
    marginTop: 20
  }
});

export default Expenses;