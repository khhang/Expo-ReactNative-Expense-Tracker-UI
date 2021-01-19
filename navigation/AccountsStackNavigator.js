import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Accounts from './../views/Accounts';
import EditAccount from '../views/EditAccount';
import MenuHeaderButton from './../components/MenuHeaderButton';

const Stack = createStackNavigator()

const headerLeftButtonStyle = {marginBottom: 18};

const AccountsStackNavigator = () => {
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
        name="Accounts"
        component={Accounts}
        options={{
          headerLeft: () => (
            <MenuHeaderButton/>
          ),
        }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{
          headerLeftContainerStyle: headerLeftButtonStyle
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountsStackNavigator;