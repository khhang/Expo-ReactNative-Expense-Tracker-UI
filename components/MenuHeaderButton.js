import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const MenuHeaderButton = () => {
  const navigation = useNavigation();

  return(
    <View style={{marginBottom: 18, marginRight: 20}}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons
          name="menu-sharp"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MenuHeaderButton;