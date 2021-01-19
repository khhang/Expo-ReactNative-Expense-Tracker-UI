import {categoriesService} from './categories-service';
import {accountsService} from './accounts-service';
import {expensesService} from './expenses-service';
import {initializeTables, dropTables} from './sqlite-service';

const formatAmount = (value) => {
  if(!value) return '0';

  value = value.replace(',', '')
  const matchNegative = value.match(/\(\d+\.\d+\)/g);

  if(matchNegative?.length){
    return '-' + matchNegative[0]
      .replace('(', '')
      .replace(')', '')
  }

  const matchPositive = value.match(/\d+\.\d+/g);

  if(matchPositive?.length){
    return matchPositive[0];
  }

  return '0';
};

const importCsvData = async (csvData, appFormat = false) => {
  // wipe data and make tables
  await dropExpenseTables();
  await initializeTables();


  const addedAccounts = {};
  const addedCategories = [];

  for(let row of csvData){
    let t;

    if(appFormat){
      t = {
        description: row['description'].trim(),
        amount: row['amount'],
        accountName: row['accountName'].trim(),
        categoryName: row['categoryName'].trim(),
        subcategoryName: row['subcategoryName'].trim(),
        date: row['date']
      }
    }else{
      t = {
        description: row['Description'].trim(),
        amount: formatAmount(row[' Amount ']),
        accountName: row['Account'].trim(),
        categoryName: row['Category'].trim(),
        subcategoryName: row['Sub Category'].trim(),
        date: row['Date']
      }
    }

    if(!t.accountName || !t.categoryName || !t.amount){
      return;
    } else {

      // add accounts if they don't exist
      let account = addedAccounts[t.accountName];
      if(!account){
        const accountId = await accountsService.addAccount(t.accountName, 0);
        account = addedAccounts[t.accountName] = accountId;
      }

      // add categories if they dont exist
      let category = addedCategories[t.categoryName];
      if(!category){
        const categoryId = await categoriesService.addCategory(t.categoryName);
        category = addedCategories[t.categoryName] = { id: categoryId, subcategories: {}};
      }

      let subcategory = category.subcategories[t.subcategoryName];
      if(!subcategory && t.subcategoryName){
        const subcategoryId = await categoriesService.addSubcategory(category.id, t.subcategoryName);
        subcategory = category.subcategories[t.subcategoryName] = subcategoryId;
      }

      // add expenses
      await expensesService.addExpense(category.id, subcategory, t.description, t.amount, account, new Date(t.date).toISOString());

    }
  }
};

export const csvService = {
  importCsvData
};