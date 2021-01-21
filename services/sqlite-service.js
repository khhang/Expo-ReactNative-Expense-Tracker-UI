import * as SQLite from 'expo-sqlite';

export const dbAccess = SQLite.openDatabase('expensetracker.db');

export const initializeTables = () => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      create table if not exists Categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name NVARCHAR(50) NOT NULL
      )
    `);

    tx.executeSql(
      `create table if not exists Subcategories(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        categoryId INTEGER NOT NULL,
        name NVARCHAR(50) NOT NULL,
        FOREIGN KEY (categoryId)
          REFERENCES Categories (id)
      )`
    );

    tx.executeSql(
      `create table if not exists Accounts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name NVARCHAR(50) NOT NULL,
        startingBalance REAL NOT NULL
      )`
    );

    tx.executeSql(
      `create table if not exists Expenses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoryId INTEGER NOT NULL,
        subcategoryId INTEGER,
        description NVARCHAR(100),
        amount REAL NOT NULL,
        accountId INTEGER NOT NULL,
        date TEXT NOT NULL,
        FOREIGN KEY (categoryId)
          REFERENCES Categories (id),
        FOREIGN KEY (subcategoryId)
          REFERENCES Subcategories (id),
        FOREIGN KEY (accountId)
          REFERENCES Accounts (id)
      )`
    );

    tx.executeSql(`
        create table if not exists Budgets(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          categoryId INTEGER NOT NULL,
          deletedDate TEXT,
          cap REAL NOT NULL
        )
    `);
  },
  reject,
  () => {
    resolve()
  }));
};

export const dropExpenseTables = () => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql('drop table Expenses');
    tx.executeSql('drop table Accounts');
    tx.executeSql('drop table Subcategories');
    tx.executeSql('drop table Categories');
  },
  reject,
  () => {
    resolve();
  }));
};
