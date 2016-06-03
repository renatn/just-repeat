/* eslint-disable no-console */
import throttle from 'lodash/throttle';
import { v4 } from 'node-uuid';

const VERSION = 2;
const BUCKET_PREV = 'react-flashcards-v1';
const BUCKET = `db-v${VERSION}`;

export const saveState = throttle(state => {
  const { decks } = state;
  const prev = localStorage.getItem(BUCKET);
  if (prev) {
    localStorage.setItem(`${BUCKET}.bakup`, prev);
  }
  localStorage.setItem(BUCKET, JSON.stringify(decks));
  console.info(`Saved ${decks.length} decks`);
}, 1000);

const migrate = (decks) => decks.map(deck => ({
  ...deck,
  id: deck.id || v4(),
  cards: deck.cards.map(card => ({
    ...card,
    id: card.id || v4(),
  })),
})
);

export const loadState = () => {
  try {
    const isDisclaimerOpen = localStorage.getItem('hide-disclaimer') !== 'true';
    let decks = undefined;
    const db = localStorage.getItem(BUCKET);
    if (!db) {
      const oldDb = localStorage.getItem(BUCKET_PREV);
      if (!oldDb) {
        return undefined;
      }

      console.log('Found old format data, start migrate...');
      decks = migrate(JSON.parse(oldDb));
      saveState({ decks });
      localStorage.removeItem(BUCKET_PREV);
    } else {
      decks = JSON.parse(db);
    }

    return {
      spa: {
        showUndo: false,
        isDisclaimerOpen,
      },
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

