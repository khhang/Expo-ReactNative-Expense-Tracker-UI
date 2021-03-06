import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExpenseAnalysis from './../views/ExpenseAnalysis';
import MenuHeaderButton from './../components/MenuHeaderButton';
import CategorySummary from './../views/CategorySummary';

const Stack = createStackNavigator()

const headerRightButtonStyle = {marginBottom: 18};

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
          headerRight: () => (
            <MenuHeaderButton/>
          ),
        }}
      />
      <Stack.Screen
        name="CategorySummary"
        component={CategorySummary}
        options={{
          headerRightContainerStyle: headerRightButtonStyle,
          title: 'Category Summary'
        }}
      />
    </Stack.Navigator>
  );
};

export default ExpenseAnalysisStackNavigator;