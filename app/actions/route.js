export const route = (path) => (
  {
    type: 'ROUTE',
    route: path,
  }
);

export const routeRoot = () => ({
  type: 'ROUTE',
  route: '/',
});

export const routeAddCard = deckId => ({
  type: 'ROUTE',
  route: '/ADD_CARD',
  deckId,
});

export const routeAddDeck = () => (
  {
    type: 'ROUTE',
    route: '/ADD_DECK',
  }
);

export const routeEditDeck = (deckId) => (
  {
    type: 'ROUTE',
    route: '/EDIT_DECK',
    deckId,
  }
);
