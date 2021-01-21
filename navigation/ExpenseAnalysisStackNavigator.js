import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExpenseAnalysis from './../views/ExpenseAnalysis';
import MenuHeaderButton from './../components/MenuHeaderButton';

const Stack = createStackNavigator()

// const headerLeftButtonStyle = {marginBottom: 18};

const ExpenseAnalysisStackNavigator = () => {
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
        name="ExpenseAnalysis"
        component={ExpenseAnalysis}
        options={{
          title: 'Expense Analysis',
          headerLeft: () => (
            <MenuHeaderButton/>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ExpenseAnalysisStackNavigator;