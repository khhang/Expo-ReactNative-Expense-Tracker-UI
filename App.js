import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { initializeTables} from './services/sqlite-service';

import HomeStackNavigator from './navigation/HomeStackNavigator';
import AccountsStackNavigator from './navigation/AccountsStackNavigator';
import BudgetsStackNavigator from './navigation/BudgetsStackNavigator';
import CategoriesStackNavigator from './navigation/CategoriesStackNavigator';
import ExpensesStackNavigator from './navigation/ExpensesStackNavigator';
import ExpenseAnalysisStackNavigator from './navigation/ExpenseAnalysisStackNavigator';

const Drawer = createDrawerNavigator();

const App = () => {

  useEffect(() => {

    const init = async() => {
      await initializeTables();
    }

    init();
  }, []);
  
  const [currRoute, setCurrRoute] = useState('Home');
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => setCurrRoute(navigationRef.current.getCurrentRoute().name)}
    >
      <View style={{paddingTop: StatusBar.currentHeight + 15}}/>
      <Drawer.Navigator
        drawerPosition="right"
        initialRouteName={currRoute}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStackNavigator}/>
        <Drawer.Screen
          name="Accounts"
          component={AccountsStackNavigator}
        />
        {/* <Drawer.Screen
          name="Budgets"
          component={BudgetsStackNavigator}
        /> */}
        <Drawer.Screen 
          name="Expenses"
          component={ExpensesStackNavigator}/>
        <Drawer.Screen 
          name="ExpenseAnalysis"
          component={ExpenseAnalysisStackNavigator}
          options={{title: 'Expense Analysis'}}/>
        <Drawer.Screen
          name="Categories"
          component={CategoriesStackNavigator}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
