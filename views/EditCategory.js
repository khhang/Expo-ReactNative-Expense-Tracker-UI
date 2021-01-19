import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import InputLabel from './../components/InputLabel';
import CustomTextInput from './../components/CustomTextInput';

const AddMode = 'AddMode';
const EditMode = 'EditMode';

const EditCategory = ({navigation, route}) => {
  const { params } = route;
  const [pageMode, setPageMode] = useState(AddMode);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if(params?.category){
      setCategoryName(params.category.name);
      setPageMode(EditMode);
      navigation.setOptions({ 
        title: `Editing - ${params.category.name}`
      });
    } else {
      navigation.setOptions({ 
        title: 'Add Category'
      });
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <InputLabel label="Category Name" required={true}/>
      <View>
        <CustomTextInput
          onChangeText={text => setCategoryName(text)}
          value={categoryName}
          style={styles.inputTextbox}/>
      </View>
      <View
        style={styles.buttonContainer}
      >
        <Button
          title={pageMode === AddMode ? 'Add' : 'Update'}
          onPress={ async () => {
            navigation.navigate('Categories', { 
              category: {
                id: route.params?.category.id,
                name: categoryName
              },
              subcat: null
            });
          }}
          disabled={!categoryName || (pageMode === EditMode && params.category.name === categoryName)}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20
  },
  inputLabel: {
    color: '#696969'
  },
  inputTextbox:  {
    borderRadius: 0.1,
    borderColor: '#696969',
    borderBottomWidth: 1
  },
  buttonContainer: {
    paddingTop: 40
  }
});

export default EditCategory;
