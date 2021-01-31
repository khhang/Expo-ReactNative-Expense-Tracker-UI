import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Expenses from './../views/Expenses';
import EditExpense from './../views/EditExpense';
import MenuHeaderButton from './../components/MenuHeaderButton';
import DateRangeFilter from './../views/DateRangeFilter';

const Stack = createStackNavigator();

const headerRightButtonStyle = {marginBottom: 18};

const ExpensesStackNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        paddingBottom: 20,
        paddingTop: 0
      },
      headerStyle:{
        height: 40
      }
    }}
  >
    <Stack.Screen
      name="Expenses"
      component={Expenses}    
      options={{
        headerRight: () => (
          <MenuHeaderButton/>
        ),
      }}
    />
    <Stack.Screen
      name="EditExpense"
      component={EditExpense}
      options={{
        headerRightContainerStyle: headerRightButtonStyle
      }}
    />
    <Stack.Screen
      name="DateRangeFilter"
      component={DateRangeFilter}
      options={{
        title: 'Date Range',
        headerRightContainerStyle: headerRightButtonStyle
      }}
    />
  </Stack.Navigator>
  );
};

export default ExpensesStackNavigator;