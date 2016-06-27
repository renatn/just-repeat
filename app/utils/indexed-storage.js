// Wrap with Promise
const open = (name, version, upgradeProc) => new Promise((resolve, reject) => {
  const request = indexedDB.open(name, version);

  request.onupgradeneeded = (e) => {
    const db = e.target.result;
    if (upgradeProc) {
      upgradeProc(db);
    }
  };

  request.onsuccess = (e) => {
    resolve(e.target.result);
  };
  request.onfailure = reject;
});


const write = (db, table, id, data) => {
    const transaction = db.transaction([table], 'readwrite');
    const store = transaction.objectStore(table);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
      return store.put(data, id);
    });
};

const read = (db, table, id) => {
  const transaction = db.transaction([table], 'readonly');
  const store = transaction.objectStore(table);
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onerror = reject;
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
  });
};


let indexedStorage;
const STORE_NAME = 'indexed-storage';

const createScheme = (db) => {
    db.createObjectStore(STORE_NAME);
};

export const init = () => {
  if (indexedStorage) {
    return Promise.resolve(indexedStorage);
  }

  return open('indexed-storage', 1, createScheme).then((db) => {
    indexedStorage = db;
    return db;
  });
}

export const setItem = (key, value) =>
  init().then((storage) => write(storage, STORE_NAME, key, value));

export const getItem = (key) =>
  init().then((storage) => read(storage, STORE_NAME, key));
