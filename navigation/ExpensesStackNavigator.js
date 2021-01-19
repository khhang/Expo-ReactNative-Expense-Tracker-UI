import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Expenses from './../views/Expenses';
import EditExpense from './../views/EditExpense';
import MenuHeaderButton from './../components/MenuHeaderButton';

const Stack = createStackNavigator();

const headerLeftButtonStyle = {marginBottom: 18};

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
        headerLeft: () => (
          <MenuHeaderButton/>
        ),
      }}
    />
    <Stack.Screen
      name="EditExpense"
      component={EditExpense}
      options={{
        headerLeftContainerStyle: headerLeftButtonStyle
      }}
    />
  </Stack.Navigator>
  );
};

export default ExpensesStackNavigator;