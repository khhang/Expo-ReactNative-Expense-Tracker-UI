import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './../views/Home';
import MenuHeaderButton from './../components/MenuHeaderButton';

const Stack = createStackNavigator()

const HomeStackNavigator = () => {
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
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <MenuHeaderButton/>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;