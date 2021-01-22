import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const CategoriesListHeader = ({category}) => {
  const navigation = useNavigation();

  return (
    <View 
      style={styles.headerContainer}
    >
      <Text style={styles.headerText}>{category.name}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditSubcategory', {category});
          }}
        >
          <Ionicons name="add-circle-sharp" size={20} color="white"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('EditCategory', {category})
          }}
        >
          <Ionicons name="pencil-sharp" size={20} color="white"></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2196F3',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 2
  },
  headerText: {
    color: 'white'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    marginLeft: 5,
  }
});

export default CategoriesListHeader;