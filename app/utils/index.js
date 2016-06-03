import throttle from 'lodash/throttle';

export const saveState = throttle(state => {
  const { decks } = state;
  const prev = localStorage.getItem('react-flashcards-v1');
  localStorage.setItem('react-flashcards-v1.bak', prev);
  localStorage.setItem('react-flashcards-v1', JSON.stringify(decks));
  console.info(`Saved ${decks.length} decks`);
}, 1000);

export const loadState = () => {
  try {
    const decksJSON = localStorage.getItem('react-flashcards-v1') || [];
    const isDisclaimerOpen = localStorage.getItem('hide-disclaimer') !== 'true';
    return {
      decks: JSON.parse(decksJSON),
      spa: {
        showUndo: false,
        isDisclaimerOpen,
      },
    };
  } catch (err) {
    return undefined;
  }
};

export const restoreState = () => {
  const prev = localStorage.getItem('react-flashcards-v1.bak');
  localStorage.setItem('react-flashcards-v1', prev);
};

