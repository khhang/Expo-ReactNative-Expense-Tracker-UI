import {dbAccess} from './sqlite-service';

const addBudget = async(categoryId, limit) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      insert into Budgets (categoryId, limit)
      values (?, ?)
    `,
    [categoryId, limit],
    (_, { insertId }) => {
      resolve(insertId)
    },
    reject);
  }));
};