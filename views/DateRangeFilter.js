import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import InputLabel from './../components/InputLabel';
import {formatDateFromObj} from './../services/format-service';

const DateRangeFilter = ({navigation, route }) => {
  const { params } = route;

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  useEffect(() => {
    if(params?.startDate){
      setStartDate(new Date(params.startDate));
    }

    if(params?.endDate){
      setEndDate(new Date(params.endDate));
    }
  }, []);

  return(
    <View style={styles.screenContainer}>
      <View>
        <InputLabel label="Start Date" required={true}/>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => {
            setShowStartDatePicker(true);
          }}
        >
          <Text>{formatDateFromObj(startDate)}</Text>
        </TouchableOpacity>
        {showStartDatePicker && 
          (<DateTimePicker
            value={startDate}
            maximumDate={endDate}
            onChange={onStartDateChange}
          ></DateTimePicker>)}
      </View>
      <View style={styles.inputSection}>
        <InputLabel label="End Date" required={true}/>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => {
            setShowEndDatePicker(true);
          }}
        >
          <Text>{formatDateFromObj(endDate)}</Text>
        </TouchableOpacity>
        {showEndDatePicker && 
          (<DateTimePicker
            value={endDate}
            minimumDate={startDate}
            maximumDate={new Date()}
            onChange={onEndDateChange}
          ></DateTimePicker>)}
      </View>
      <View style={styles.buttonContainer}>
        <Button
            title="OK"
            onPress={() => {
              navigation.navigate('Expenses', { 
                expense: null,
                dateRangeFilter: {
                  startDate: startDate.toISOString(),
                  endDate: endDate.toISOString()
                }
              });
            }}
          ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
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

export default DateRangeFilter;