// Wrap with Promise
const open = (name, version, upgradeProc) => {
  return new Promise((resolve, reject) => {
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
};

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
    console.warn('Already initialized');
    return Promise.resolve(indexedStorage);
  }

  console.log('Initializing indexedStorage...');
  return open('indexed-storage', 1, createScheme).then((db) => {
    indexedStorage = db;
    return db;
  });
}

export const setItem = (key, value) => {
  if (!indexedStorage) {
    console.error('IndexedDB not support!');
    return;
  }
  return write(indexedStorage, STORE_NAME, key, value);
};

export const getItem = (key) => {
  if (!indexedStorage) {
    console.error('IndexedDB not support!');
    return;
  }
  return read(indexedStorage, STORE_NAME, key);
};
