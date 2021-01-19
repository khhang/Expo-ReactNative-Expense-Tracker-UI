import {dbAccess} from './sqlite-service';

const getAccounts2 = () => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      select * from Accounts order by name asc;
    `,
    [],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
}

const getAccounts = () => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      select 
        a.*,
        sum(e.amount) + a.startingBalance as currentBalance
      from Accounts a left join Expenses e 
        on a.id = e.accountId
      group by
        a.id
      order by id;
    `,
    [],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
}

const getAccountByName = (name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      select * from Accounts where name = '?';
    `,
    [name],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
}

const addAccount = (name, startingBalance) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      insert into Accounts (name, startingBalance)
      values (?, ?);
    `,
    [name, startingBalance],
    (_, { insertId }) => {
      resolve(insertId)
    },
    reject);
  }));
};

const updateAccount = (id, name, startingBalance) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      update Accounts
      set name = ?,
        startingBalance = ?
      where id = ?;
    `,
    [name, startingBalance, id]),
    resolve(),
    reject
  }));
};

export const accountsService = {
  getAccounts,
  getAccounts2,
  getAccountByName,
  addAccount,
  updateAccount
};