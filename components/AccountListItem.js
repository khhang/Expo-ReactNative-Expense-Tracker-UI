import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {formatBalance} from './../services/format-service';

const AccountListItem = ({account}) => {

  const navigation = useNavigation();
  const [isPositive, setIsPositive] = useState(false);

  useEffect(() => {
    if(!account.currentBalance){
      setIsPositive(true);
    } else {
      const value = parseFloat(parseFloat(account.currentBalance).toFixed(0));
      setIsPositive(parseFloat(value) >= 0);
    }
  }, []);

  return (
    <View style={[styles.itemContainer, isPositive ? styles.itemContainerPositive : styles.itemContainerNegative]}>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Balance:</Text>
        <Text style={[isPositive ? styles.amountPositive : styles.amountNegative]}>{formatBalance(account.currentBalance)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    padding: 5,
    marginVertical: 3
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
  },
  amountPositive: {
    color: '#5cb85c',
  },
  amountNegative: {
    color: '#d9534f',
  }
});

export default AccountListItem;
