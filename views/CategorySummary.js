import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {formatBalance, getMonthName} from './../services/format-service';
import {expensesService} from './../services/expenses-service';
import CategorySummaryListItem from './../components/CategorySummaryListItem';

const CategorySummary = ({route}) => {

  const params = route.params;
  const categorySummary = {
    ...params.categorySummary,
    totalAmount: parseFloat(params.categorySummary.totalAmount),
    startDate: new Date(params.categorySummary.startDate),
    endDate: new Date(params.categorySummary.endDate)
  }

  const [subcategorySummary, setSubcategorySummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const isPositive = parseFloat(params.categorySummary.totalAmount) >= 0;

  const fetchData = async() => {
    setSubcategorySummary(await expensesService.getSubcategorySummaryByCategoryId(
      categorySummary.categoryId,
      categorySummary.startDate.toISOString(),
      categorySummary.endDate.toISOString()));

      setLoading(false);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
        <Text style={{color: '#696969'}}>{`${getMonthName(categorySummary.endDate.getMonth())} ${categorySummary.endDate.getFullYear()}`}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <Text>{categorySummary.categoryName?.toUpperCase()}</Text>
        {loading ? (<ActivityIndicator size="large" color="#2196F3"/>) : (<Text
          style={[
            {fontSize: 24, letterSpacing: 1},
            isPositive ? styles.amountPositive : styles.amountNegative
          ]}
        >{formatBalance(categorySummary.totalAmount)}</Text>)}
      </View>
      <View style={{flex: 1, paddingTop: 10}}>
        {loading ? (<View style={{height: '100%', justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="#2196F3"/>
        </View>) : (<FlatList
          data={subcategorySummary}
          keyExtractor={item => item.subcategoryId ? item.subcategoryId.toString() : '0'}
          renderItem={({item}) => (<CategorySummaryListItem item={item} clickEnabled={false}/>)}
        ></FlatList>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    justifyContent: 'space-between',
    height: '100%'
  },
  categoryContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 2,
    alignItems: 'center'
  },
  amountPositive: {
    color: '#5cb85c',
  },
  amountNegative: {
    color: '#d9534f',
  }
});

export default CategorySummary;