
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Categories from './../views/Categories';
import EditCategory from './../views/EditCategory';
import EditSubcategory from '../views/EditSubcategory';
import MenuHeaderButton from './../components/MenuHeaderButton';

const Stack = createStackNavigator();

const headerLeftButtonStyle = {marginBottom: 18};

const CategoriesStackNavigator = () => {
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
        name="Categories"
        component={Categories}
        options={{
          headerLeft: () => (
            <MenuHeaderButton/>
          ),
        }}/>
      <Stack.Screen 
        name="EditCategory" 
        component={EditCategory}
        options={{
          headerLeftContainerStyle: headerLeftButtonStyle
        }}
        />
      <Stack.Screen
        name="EditSubcategory"
        component={EditSubcategory}
        options={{
          headerLeftContainerStyle: headerLeftButtonStyle
        }}
      />
    </Stack.Navigator>
  );
}

export default CategoriesStackNavigator;
