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

const getCategorySummary = (startDate, endDate) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      select
        c.name as categoryName,
        e.categoryId,
        sum(e.amount) as totalAmount,
        count(*) as numTransactions
      from Expenses e inner join Categories c
        on e.categoryId = c.id
      where 
        e.date >= ? and e.date <= ?
      group by
        e.categoryId
      order by c.name asc;
    `,
    [startDate, endDate],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
}

const getSubcategorySummaryByCategoryId = (categoryId, startDate, endDate) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      select
        sc.name as categoryName,
        e.subcategoryId,
        sum(e.amount) as totalAmount
      from Expenses e left outer join Subcategories sc
        on e.subcategoryId = sc.id
      where 
        e.date >= ? and e.date <= ?
        and e.categoryId = ?
      group by
        e.subcategoryId
      order by sc.name asc;
    `,
    [startDate, endDate, categoryId],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
};

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
  updateExpense,
  getCategorySummary,
  getSubcategorySummaryByCategoryId
};