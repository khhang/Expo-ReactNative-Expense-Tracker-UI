import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import InputLabel from './../components/InputLabel';
import CustomTextInput from './../components/CustomTextInput';

const AddMode = 'AddMode';
const EditMode = 'EditMode';

const EditSubcategory = ({navigation, route}) => {
  const { params } = route;
  const [pageMode, setPageMode] = useState(AddMode);
  const [subcatName, setSubcatName] = useState('');

  useEffect(() => {
    if(params?.subcat){
      setSubcatName(route.params.subcat.name);
      setPageMode(EditMode);
      navigation.setOptions({
        title: `Editing - ${params.subcat.name}`
      });
    } else {
      navigation.setOptions({
        title: 'Add Subcategory'
      });
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      
      <View>
        <InputLabel label="Category"/>
        <CustomTextInput
          value={params.category.name}
          editable={false}
        />
      </View>

      <View style={{ marginTop: 25 }}>
        <InputLabel
          label="Subcategory Name"
          required={true}
        />
        <CustomTextInput
          onChangeText={text => setSubcatName(text)}
          value={subcatName}
        />
      </View>
    
      <View
        style={styles.buttonContainer}
      >
        <Button
          title={pageMode === AddMode ? 'Add' : 'Update'}
          onPress={ async () => {
            navigation.navigate('Categories', { 
              subcat: {
                id: params?.subcat?.id,
                name: subcatName,
                category: params.category
              },
              category: null
            });
          }}
          disabled={!subcatName || (pageMode === EditMode && params.subcat.name === subcatName)}
        ></Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20
  },
  buttonContainer: {
    paddingTop: 40
  }
});

export default EditSubcategory;