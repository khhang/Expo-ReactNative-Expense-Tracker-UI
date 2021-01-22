import React, { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SubcategoryListItem = ({subcat, category}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <Text>{subcat.name}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditSubcategory', { subcat, category })
        }}
      >
        <Ionicons name="pencil-sharp" size={20} color="black"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#ffffff'
  }
});

export default SubcategoryListItem;
