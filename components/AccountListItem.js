import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AccountListItem = ({account}) => {

  const navigation = useNavigation();

  const formatBalance = (balance) => {
    if(!balance) return '$ 0.00';

    const value = parseFloat(balance);
    const formattedNumber = value >= 0 ? `$ ${value.toFixed(2)}` 
    : `-$ ${Math.abs(value).toFixed(2)}`;

    return formattedNumber === '-$ 0.00' ? '$ 0.00' : formattedNumber;
  }

  const isPositive = (number) => {
    if(!number) return true;
    const value = parseFloat(parseFloat(number).toFixed(0));
    return parseFloat(value) >= 0;
  }

  return (
    <View style={[styles.itemContainer, isPositive(account.currentBalance) ? styles.itemContainerPositive : styles.itemContainerNegative]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{account.name}</Text>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('EditAccount', {account});
          }}
        >
          <Ionicons name="pencil-sharp" size={16} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
      <Text>Balance: {formatBalance(account.currentBalance)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 5,
    marginVertical: 8
  },
  itemContainerPositive: {
    borderLeftColor: '#5cb85c',
    borderLeftWidth: 3,
  },
  itemContainerNegative: {
    borderLeftColor: '#d9534f',
    borderLeftWidth: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default AccountListItem;
