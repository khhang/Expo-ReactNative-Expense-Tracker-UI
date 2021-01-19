import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import InputLabel from './../components/InputLabel';

const AddMode = 'AddMode';
const EditMode = 'EditMode';

const EditAccount = ({navigation, route}) => {
  const { params } = route;

  const [pageMode, setPageMode] = useState(AddMode);
  const [accountName, setAccountName] = useState('');
  const [startingBalance, setStartingBalance] = useState('');

  const isButtonDisabled = () => {
    return !accountName 
      || !startingBalance
      || (params && params.account.name === accountName && params.account.startingBalance === startingBalance)
      || isNaN(startingBalance);
  }

  useEffect(() => {
    if(params?.account){
      setAccountName(params.account.name);
      setStartingBalance(params.account.startingBalance.toString());
      setPageMode(EditMode);
      navigation.setOptions({
        title: `Editing - ${params.account.name}`
      });
    } else {
      navigation.setOptions({
        title: 'Add Account'
      });
    }
  }, [])

  return (
    <View style={styles.screenContainer}>

      <View>
        <InputLabel label="Account Name" required={true}/>
        <CustomTextInput
          onChangeText={text => setAccountName(text)}
          value={accountName}
        />
      </View>

      <View style={{marginTop: 25}}>
        <InputLabel label="Starting Balance" required={true}/>
        <CustomTextInput
          onChangeText={text => {
            const balance = text.replace(/[^0-9.-]/g, '');
            setStartingBalance(balance);
          }}
          value={startingBalance}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={pageMode === AddMode ? 'Add' : 'Update'}
          onPress={() => {
            navigation.navigate('Accounts', { 
              account: {
                id: params?.account?.id,
                name: accountName,
                startingBalance: startingBalance
              }
            });
          }}
          disabled={isButtonDisabled()}
        ></Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20
  },
  buttonContainer: {
    paddingTop: 40
  }
});

export default EditAccount;
