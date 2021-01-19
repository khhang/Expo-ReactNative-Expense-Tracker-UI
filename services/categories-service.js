import {dbAccess} from './sqlite-service';

const addCategory = (name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      insert into Categories (name)
      values (?)
    `,
    [name],
    (_, { insertId }) => {
      resolve(insertId)
    },
    reject);
  }));
};

const deleteCategory = (id) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      delete from Categories
      where id = ?
    `,
    [id],
    resolve(),
    reject);
  }))
};

const updateCategory = (id, name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      update Categories
      set name = ?
      where id = ?
    `,
    [name, id],
    resolve(),
    reject);
  }));
};

const getCategories = () => {

  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql('select * from Categories order by name asc',
      [],
      (_, { rows: { _array }}) => {
        resolve(_array)
      },
      reject
    );
  }));
};

const getCategoryByName = (name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`select * from Categories where name = '?'`,
      [name],
      (_, { rows: { _array }}) => {
        resolve(_array)
      },
      reject
    );
  }));
};

const getSubcategories = () => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql('select * from Subcategories order by name asc',
    [],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
}

const getSubcategoryByCategoryIdAndName = (categoryId, name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`select * from Subcategories where categoryId = ? and name = '?'`,
    [categoryId, name],
    (_, { rows: { _array }}) => {
      resolve(_array)
    },
    reject)
  }));
};

const addSubcategory = (categoryId, name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      insert into Subcategories (categoryId, name)
      values (?, ?)
    `,
    [categoryId, name],
    (_, { insertId }) => {
      resolve(insertId)
    },
    reject);
  }))
}

const updateSubcategory = (id, name) => {
  return new Promise((resolve, reject) => dbAccess.transaction(tx => {
    tx.executeSql(`
      update Subcategories
      set name = '?'
      where id = ?
    `,
    [name, id],
    resolve(),
    reject);
  }));
}

export const categoriesService = {
  getCategories,
  getCategoryByName,
  addCategory,
  deleteCategory,
  updateCategory,
  getSubcategories,
  getSubcategoryByCategoryIdAndName,
  addSubcategory,
  updateSubcategory
};
