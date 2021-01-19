import {dbAccess} from './sqlite-service';

const getExpenseDetails = () => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      select
        e.*,
        a.name as accountName,
        c.name as categoryName,
        s.name as subcategoryName
      from Expenses e inner join Accounts a
        on e.accountId = a.id
      inner join Categories c
        on e.categoryId = c.id
      left outer join Subcategories s
        on e.subcategoryId = s.id
      order by e.date desc;
    `,
    [],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
}

const addExpense = (categoryId, subcategoryId, description, amount, accountId, date) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      insert into Expenses (categoryId, subcategoryId, description, amount, accountId, date)
      values (?, ?, ?, ?, ?, ?)
    `,
    [categoryId, subcategoryId, description, amount, accountId, date],
    (_, { insertId }) => {
      resolve(insertId)
    },
    reject);
  }));
};

const updateExpense = (id, categoryId, subcategoryId, description, amount, accountId, date) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      update Expenses 
      set categoryId = ?, 
        subcategoryId = ?,
        description = ?,
        amount = ?,
        accountId = ?,
        date = ?
      where id = ?;
    `,
    [categoryId, subcategoryId, description, amount, accountId, date, id],
    resolve(),
    reject);
  }));
}

export const expensesService = {
  getExpenseDetails,
  addExpense,
  updateExpense
};