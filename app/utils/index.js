/* eslint-disable no-console */
import { saveToFirebase } from './firebase-api';
import * as idb from './indexed-storage';

const VERSION = 2;
const BUCKET = `just-repeat:v${VERSION}`;

const migrateFromLocalStorage = () => {
  const oldData = localStorage.getItem(BUCKET);
  if (oldData) {
    return idb.setItem(BUCKET, JSON.parse(oldData))
      .then(() => {
        localStorage.removeItem(BUCKET);
      });
  }
};

export const loadState = () => {
  return idb.init()
    .then(migrateFromLocalStorage)
    .then(() => idb.getItem(BUCKET))
    .then((decks) => decks || {});
};

export const saveState = state => {
  const { user, decks } = state;
  const saving = idb.getItem(BUCKET)
    .then((data) => idb.setItem(`${BUCKET}.bakup`, data))
    .then(() => idb.setItem(BUCKET, decks.byId));

  if (user.isAuthenticated) {
    saving
      .then(saveToFirebase(user.uid, decks.byId))
      .then(() => console.log('Saved to firebase'));
  }
  saving.then(() => console.info(`Saved ${decks.allIds.length} decks`));
};

export const restoreState = () => {
  return idb.getItem(`${BUCKET}.bakup`)
            .then((prev) => idb.setItem(BUCKET, prev));
};
