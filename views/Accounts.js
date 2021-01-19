import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Button, FlatList, Alert, Text } from 'react-native';
import {accountsService} from './../services/accounts-service';
import AccountListItem from './../components/AccountListItem';

/* 
  // Add current balances once expenses are sorted out
*/

const Accounts = ({navigation, route}) => {

  const [accounts, setAccounts] = useState([]);

  const getNetWorth = () => {
    let sum = 0;
    accounts.forEach(val => {
      if(val.currentBalance){
        sum += val.currentBalance;
      }
    });

    return sum;
  };

  useEffect(() => {
    const fetchData = async () => {
      setAccounts(await accountsService.getAccounts());
    };

    const addAccount = async (name, startingBalance) => {
      if(accounts.find(x => x.name === name)){
        Alert.alert('Adding Account', `The account with the name "${name}" already exists.`);
        return;
      }

      await accountsService.addAccount(name, startingBalance);
    };

    const updateAccount = async (id, name, startingBalance) => {
      if(accounts.find(x => x.name === name && x.id !== id)){
        Alert.alert('Updating Category', `The account with the name "${name}" already exists.`);
        return;
      }

      await accountsService.updateAccount(id, name, startingBalance);
    }

    const { account } = route.params || {};

    if(account){
      if(account.id){
        updateAccount(account.id, account.name, account.startingBalance);
      } else{
        addAccount(account.name, account.startingBalance);
      }
    }

    fetchData();
  }, [route.params?.account])

  return (
    <View style={styles.screenContainer}>
      <View style={styles.netWorthContainer}>
        <Text>NET WORTH</Text>
        <Text style={{fontSize: 24, letterSpacing: 1}}>{getNetWorth().toFixed(2)}</Text>
      </View>
      <View style={{ flexGrow: 1, overflow: 'scroll'}}>
        <FlatList
          data={accounts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (<AccountListItem account={item}/>)}
        />
      </View>
      <View style={styles.buttonContainer}>
          <Button
            title="New Account"
            onPress={() => {
              navigation.navigate('EditAccount');
            }}
          ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90%'
  },
  buttonContainer: {
    marginTop: 20
  },
  netWorthContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 2,
    alignItems: 'center'
  }
});

export default Accounts;
