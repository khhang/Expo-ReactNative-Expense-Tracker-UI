import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  Button,
  Alert
} from 'react-native';
import {categoriesService} from './../services/categories-service';
import CategoriesListHeader from './../components/CategoriesListHeader';
import SubcategoryListItem from './../components/SubcategoryListItem';
import ListDividerFooter from './../components/ListDividerFooter';

const Categories = ({navigation, route}) => {
  const [categoriesList, setCategoriesList] = React.useState([]);

  const generateCategoriesList = async () => {
    const categories = await categoriesService.getCategories();
    const subcategories = await categoriesService.getSubcategories();

    return categories.map(x => {
      return {
        id: x.id,
        name: x.name,
        data: subcategories.filter(y => y.categoryId === x.id)
      }
    })
  };

  useEffect(() => {
    const fetchData = async () => {
      setCategoriesList(await generateCategoriesList());
    };

    const addCategory = async (name) => {
      if(categoriesList.find(x => x.name === name.trim())){
        Alert.alert('Adding Category', `The category with the name "${name}" already exists.`);
        return;
      }
      await categoriesService.addCategory(name);
    };

    const updateCategory = async (id, name) => {
      if(categoriesList.find(x => x.name === name.trim())){
        Alert.alert('Updating Category', `The category with the name "${name}" already exists.`);
        return;
      }
      await categoriesService.updateCategory(id, name);
    };

    const addSubcategory = async (categoryId, name) => {
      const category = categoriesList.find(x => x.id === categoryId);
      if(category.data.find(x => x.name === name.trim())){
        Alert.alert('Adding Subcategory', `The subcategory with the name "${name}" already exists in "${category.name}".`);
        return;
      }

      await categoriesService.addSubcategory(categoryId, name);
    }

    const updateSubcategory = async (id, name, categoryId) => {
      const category = categoriesList.find(x => x.id === categoryId);
      if(category.data.find(x => x.name === name.trim())){
        Alert.alert('Updating Subcategory', `The subcategory with the name "${name}" already exists in "${category.name}".`);
        return;
      }

      await categoriesService.updateSubcategory(id, name);
    }

    const { category, subcat } = route.params || {};

    // add or edit category
    if(category){
      if(category.id){
        updateCategory(category.id, category.name);
      } else {
        addCategory(category.name);
      }
    }

    // add or edit subcategory
    if(subcat){
      if(subcat.id){
        updateSubcategory(subcat.id, subcat.name, subcat.category.id);
      } else {
        addSubcategory(subcat.category.id, subcat.name);
      }
    }

    fetchData();
  }, [route.params?.category, route.params?.subcat]);

  return (
    <View style={styles.screenContainer}>
      <View style={{ flexGrow: 1, overflow: 'scroll'}}>
        <SectionList
          sections={categoriesList}
          renderItem={({ section, item }) => <SubcategoryListItem subcat={item} category={section}></SubcategoryListItem>}
          renderSectionHeader={({section}) => (<CategoriesListHeader category={{
            id: section.id, 
            name: section.name
          }}/>)}
          renderSectionFooter={() => (<ListDividerFooter/>)}
        />
      </View>
      <View style={styles.buttonContainer}>
          <Button
            title="New Category"
            onPress={() => {
              navigation.navigate('EditCategory');
            }}
          ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90%'
  },
  buttonContainer: {
    marginTop: 20
  }
});

export default Categories;