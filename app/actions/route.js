export const route = (route) => (
  {
    type: 'ROUTE',
    route,
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

export const routeAddDeck = () => {
  return {
    type: 'ROUTE',
    route: '/ADD_DECK',
  };
};

export const routeEditDeck = (deckId) => {
  return {
    type: 'ROUTE',
    route: '/EDIT_DECK',
    deckId,
  };
};
