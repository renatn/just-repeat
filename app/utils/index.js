/* eslint-disable no-console */
import throttle from 'lodash/throttle';
import { v4 } from 'node-uuid';
import { saveToFirebase } from './firebase-client';

const VERSION = 2;
const BUCKET = `just-repeat:v${VERSION}`;

export const saveState = throttle(state => {
  const { user, decks } = state;
  const prev = localStorage.getItem(BUCKET);
  if (prev) {
    localStorage.setItem(`${BUCKET}.bakup`, prev);
  }
  localStorage.setItem(BUCKET, JSON.stringify(decks.byId));

  if (user.isAuthenticated) {
    saveToFirebase(user.uid, decks.byId).then((status) => {
      console.log('Saved to firebase', status);
    });
  }

  console.info(`Saved ${decks.allIds.length} decks`);
}, 1000);

export const loadState = () => {
  try {
    const isDisclaimerOpen = localStorage.getItem('hide-disclaimer') !== 'true';
    const settings = {
      showUndo: false,
      isDisclaimerOpen,
    };

    const db = localStorage.getItem(BUCKET);
    if (!db) {
      return {
        settings
      }
    }

    const byId = JSON.parse(db);
    const allIds = Object.keys(byId);

    return {
      settings,
      decks: {
        byId,
        allIds
      },
    };
  } catch (err) {
    return undefined;
  }
};

export const restoreState = () => {
  const prev = localStorage.getItem(`${BUCKET}.bakup`);
  localStorage.setItem(BUCKET, prev);
};
