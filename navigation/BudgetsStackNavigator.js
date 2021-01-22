import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuHeaderButton from './../components/MenuHeaderButton';
import Budgets from '../views/Budgets';

const Stack = createStackNavigator();

// const headerRightButtonStyle = {marginBottom: 18};

const BudgetsStackNavigator = () => {
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
        name="Budgets"
        component={Budgets}
        options={{
          headerRight: () => (
            <MenuHeaderButton/>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default BudgetsStackNavigator;