import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import InputLabel from './../components/InputLabel';
import CustomTextInput from './../components/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {categoriesService} from './../services/categories-service';
import {accountsService} from './../services/accounts-service';
import {formatDateFromObj} from './../services/format-service';

const AddMode = 'AddMode';
const EditMode = 'EditMode';

const EditExpense = ({navigation, route}) => {
  const { params } = route;

  const [pageMode, setPageMode] = useState(AddMode);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subcatId, setSubcatId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const isButtonDisabled = () => {
    return amount === null
      || isNaN(amount)
      || accountId === null
      || categoryId === null
      || date === null;
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const formatAmount = (amount) => {
    return amount.replace(/[^0-9.-]/g, '')
  }

  useEffect(() => {
    const fetchData = async () => {
      setAccounts(await accountsService.getAccounts());
      setCategories(await categoriesService.getCategories());
      setSubcategories(await categoriesService.getSubcategories());
    };

    if(params?.expense){
      setPageMode(EditMode);
      setDescription(params.expense.description);
      setAmount(params.expense.amount.toString());
      setAccountId(params.expense.accountId);
      setCategoryId(params.expense.categoryId);
      setSubcatId(params.expense.subcategoryId);
      setDate(new Date(params.expense.date));

      navigation.setOptions({
        title: 'Editing Expense'
      });
    } else {
      navigation.setOptions({
        title: 'Add Expense'
      });
    }

    fetchData();
  }, []);

  return (
    <KeyboardAwareScrollView 
    style={styles.screenContainer}
    >
      <View style={styles.inputSection}>
        <InputLabel label="Description"/>
        <CustomTextInput
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </View>
      <View style={styles.inputSection}>
        <InputLabel label="Amount" required={true}/>
        <CustomTextInput
          onChangeText={text => {
            setAmount(formatAmount(text))
          }}
          value={amount}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputSection}>
        <InputLabel label="Account" required={true}/>
        <Picker
          selectedValue={accountId}
          onValueChange={id => setAccountId(id)}
        >
          <Picker.Item key="0" label="-" value={null}/>
          {accounts.map(x => (<Picker.Item key={x.id.toString()} label={x.name} value={x.id}/>))}
        </Picker>
      </View>
      <View>
        <InputLabel label="Category" required={true}/>
        <Picker
          selectedValue={categoryId}
          onValueChange={id => setCategoryId(id)}
        >
          <Picker.Item key="0" label="-" value={null}/>
          {categories.map(x => (<Picker.Item key={x.id.toString()} label={x.name} value={x.id}/>))}
        </Picker>
      </View>
      <View>
        <InputLabel label="Subcategory"/>
        <Picker
          selectedValue={subcatId}
          onValueChange={id => setSubcatId(id)}
          enabled={!!subcategories.find(x => x.categoryId === categoryId)}
        >
          <Picker.Item key="0" label="-" value={null}/>
          {
            subcategories
              .filter(x => x.categoryId === categoryId)
              .map(x => (<Picker.Item key={x.id.toString()} label={x.name} value={x.id}/>))
          }
        </Picker>
      </View>
      <View>
        <InputLabel label="Date" required={true}/>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => {
            setShowDatePicker(true);
          }}
        >
          <Text>{formatDateFromObj(date)}</Text>
        </TouchableOpacity>
        {showDatePicker && 
          (<DateTimePicker
            value={date}
            maximumDate={new Date()}
            onChange={onDateChange}
          ></DateTimePicker>)}
      </View>
      <View style={styles.buttonContainer}>
      <Button
          title={pageMode === AddMode ? 'Add' : 'Update'}
          onPress={() => {
            navigation.navigate('Expenses', { 
              expense: {
                id: params?.expense?.id,
                description: description,
                amount: amount,
                accountId: accountId,
                categoryId: categoryId,
                subcategoryId: subcatId,
                date: date.toISOString()
              }
            });
          }}
          disabled={isButtonDisabled()}
        ></Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputSection: {
    marginTop: 25
  },
  buttonContainer: {
    paddingTop: 40,
    paddingBottom: 40
  },
  dateInput: {
    borderRadius: 0.1,
    borderColor: '#696969',
    borderBottomWidth: 1,
    paddingBottom: 2
  }
});

export default EditExpense;