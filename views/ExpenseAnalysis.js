import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import {expensesService} from './../services/expenses-service';
import {Ionicons} from '@expo/vector-icons';
import CategorySummaryListItem from './../components/CategorySummaryListItem';
import {formatBalance, getMonthName} from './../services/format-service';

const ExpenseAnalysis = () => {
  const [categorySummary, setCategorySummary] = useState([]);
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  
  const setNextDate = async (date) => {
    setLoading(true);
    setSelectedEndDate(new Date(date.getFullYear(), date.getMonth() + 2, 0));
  };

  const setPreviousDate = async (date) => {
    setLoading(true);
    setSelectedEndDate(new Date(date.getFullYear(), date.getMonth(), 0));
  };

  const getFirstDateOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const getNetGain = () => {
    let sum = 0;
    categorySummary.forEach(x => sum += x.totalAmount);
    return sum;
  };

  const fetchData = async () => {
    setCategorySummary(await expensesService.getCategorySummary(
      getFirstDateOfMonth(selectedEndDate).toISOString(),
      selectedEndDate.toISOString())
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedEndDate]);

  return (
    <View style={styles.screenContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
        <TouchableOpacity onPress={() => {
          setNextDate(selectedEndDate)
        }}>
          <Ionicons name="chevron-back-sharp" size={20} color="#696969"></Ionicons>
        </TouchableOpacity>
        <View>
          <Text style={{color: '#696969'}}>{`${getMonthName(selectedEndDate.getMonth())} ${selectedEndDate.getFullYear()}`}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          setPreviousDate(selectedEndDate)
        }}>
          <Ionicons name="chevron-forward-sharp" size={20} color="#696969"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.netGainContainer}>
        <Text>NET GAIN</Text>
        {loading ? (<ActivityIndicator size="large" color="#2196F3"/>) : 
          (
            <Text style={[{fontSize: 24, letterSpacing: 1}, getNetGain() >= 0 ? styles.amountPositive : styles.amountNegative]}>{formatBalance(getNetGain())}</Text>
          )
        }
      </View>
      <View style={{flex: 1, paddingTop: 10}}>
        {loading ? (
        <View style={{height: '100%', justifyContent: 'center', backgroundColor: 'white'}}>
          <ActivityIndicator size="large" color="#2196F3"/>
        </View>) : 
        categorySummary.length ?
          (<FlatList
            data={categorySummary}
            keyExtractor={item => item.categoryId.toString()}
            renderItem={({item}) => (<CategorySummaryListItem clickEnabled={true} item={{
              ...item,
              startDate: getFirstDateOfMonth(selectedEndDate).toISOString(),
              endDate: selectedEndDate.toISOString()
            }}/>)}
          />) :
          (
            <View style={{height: '100%', justifyContent: 'center', backgroundColor: 'white'}}>
              <Text style={{textAlign: 'center', paddingBottom: 250}}>No summary for this month</Text>
            </View>
          )}
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
  netGainContainer: {
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

export default ExpenseAnalysis;