import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {formatBalance} from './../services/format-service';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const CategorySummaryListItem = ({item, clickEnabled}) => {

  const navigation = useNavigation();
  const isPositive = item.totalAmount >= 0;

  return (
    <TouchableOpacity 
      disabled={!clickEnabled}
      onPress={() => {
        navigation.navigate('CategorySummary', { categorySummary: item })
      }}
    >
      <View style={[styles.itemContainer, isPositive ? styles.itemContainerPositive : styles.itemContainerNegative]}>
        <Text>{item.categoryName || '~'}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[isPositive ? styles.amountPositive : styles.amountNegative]}>{formatBalance(item.totalAmount)}</Text>
          {clickEnabled && <Ionicons style={{lineHeight: 20}} name="chevron-forward-sharp" size={16} color="#696969"></Ionicons>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 5,
    paddingTop: 7,
    paddingBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  itemContainerPositive: {
    borderLeftColor: '#5cb85c',
    borderLeftWidth: 3,
  },
  itemContainerNegative: {
    borderLeftColor: '#d9534f',
    borderLeftWidth: 3,
  },
  amountPositive: {
    color: '#5cb85c',
  },
  amountNegative: {
    color: '#d9534f',
  },
});

export default CategorySummaryListItem;
