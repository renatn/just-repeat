/* eslint-disable no-console */
import throttle from 'lodash/throttle';
import { v4 } from 'node-uuid';

const VERSION = 2;
const BUCKET = `just-repeat:v${VERSION}`;

export const saveState = throttle(state => {
  const { decks } = state;
  const prev = localStorage.getItem(BUCKET);
  if (prev) {
    localStorage.setItem(`${BUCKET}.bakup`, prev);
  }
  localStorage.setItem(BUCKET, JSON.stringify(decks));

  console.info(`Saved ${decks.length} decks`);
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

    const decks = JSON.parse(db);
    return {
      settings,
      decks,
    };
  } catch (err) {
    return undefined;
  }
};

export const restoreState = () => {
  const prev = localStorage.getItem(`${BUCKET}.bakup`);
  localStorage.setItem(BUCKET, prev);
};
