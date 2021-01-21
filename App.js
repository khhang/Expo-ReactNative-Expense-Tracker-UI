import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import {dropExpenseTables, initializeTables} from './services/sqlite-service';

import HomeStackNavigator from './navigation/HomeStackNavigator';
import AccountsStackNavigator from './navigation/AccountsStackNavigator';
import BudgetsStackNavigator from './navigation/BudgetsStackNavigator';
import CategoriesStackNavigator from './navigation/CategoriesStackNavigator';
import ExpensesStackNavigator from './navigation/ExpensesStackNavigator';
import ExpenseAnalysisStackNavigator from './navigation/ExpenseAnalysisStackNavigator';

import {categoriesService} from './services/categories-service';
import {accountsService} from './services/accounts-service';
import {expensesService} from './services/expenses-service';

const Drawer = createDrawerNavigator();

const App = () => {

  useEffect(() => {
    const seedData = async() => {
      // Categories
      await categoriesService.addCategory('Transportation');
      await categoriesService.addSubcategory(1, 'Car');
      await categoriesService.addSubcategory(1, 'Uber');
      await categoriesService.addSubcategory(1, 'Gas');
      await categoriesService.addCategory('Groceries');
      await categoriesService.addSubcategory(2, 'Vons');
      await categoriesService.addSubcategory(2, 'Ralphs');
      await categoriesService.addCategory('Food');
      await categoriesService.addSubcategory(3, 'Restaraunsolts');
      await categoriesService.addSubcategory(3, 'Uber Eats');
      await categoriesService.addCategory('Entertainment');
      await categoriesService.addSubcategory(4, 'Movies');
      await categoriesService.addSubcategory(4, 'Computer');
      await categoriesService.addSubcategory(4, 'Games');
      await categoriesService.addSubcategory(4, 'AirBnB');

      // Accounts
      await accountsService.addAccount('Chase Credit', '100.50');
      await accountsService.addAccount('HSBC Debit', '69.69');

      // Expenses
      await expensesService.addExpense(1, 1, 'Car Payment', -25.60, 1, new Date().toISOString());
      await expensesService.addExpense(2, 4, 'Vons groceries', -62.10, 1, new Date().toISOString());
      await expensesService.addExpense(1, 1, 'Servicing', 100.81, 1, new Date().toISOString());
      await expensesService.addExpense(1, 2, 'Uber', -55.29, 2, new Date().toISOString());
      await expensesService.addExpense(2, null, 'Sheba', -62.10, 1, new Date().toISOString());
      await expensesService.addExpense(4, 10, null, 62.10, 1, new Date().toISOString());
    }

    const init = async() => {
      // await dropExpenseTables();
      await initializeTables();
    }

    init();
    // seedData();
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
        initialRouteName={currRoute}
      >
        <Drawer.Screen
          name="Home"
          component={HomeStackNavigator}/>
        <Drawer.Screen
          name="Accounts"
          component={AccountsStackNavigator}
        />
        <Drawer.Screen
          name="Budgets"
          component={BudgetsStackNavigator}
        />
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
