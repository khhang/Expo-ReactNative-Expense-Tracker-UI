import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Expenses from './../views/Expenses';
import EditExpense from './../views/EditExpense';
import MenuHeaderButton from './../components/MenuHeaderButton';

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
  </Stack.Navigator>
  );
};

export default ExpensesStackNavigator;