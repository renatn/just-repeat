import * as fb from '../utils/firebase-api';

const userAuthenticated = user => ({
  type: 'USER_AUTHENTICATED',
  ...user,
});

const receiveDecks = (decks) => ({
  type: 'RECEIVE_DECKS',
  decks,
});

const userNotAuthenticated = () => ({
  type: 'USER_NOT_AUTHENTICATED',
});

export const connectToFirebase = () => dispatch => {
  dispatch({
    type: 'REQUEST_DECKS_FROM_FIREBASE',
  });

  fb.init(user => {
    if (user) {
      dispatch(userAuthenticated(user));
      fb.loadDecks(user.uid).then(decks => dispatch(receiveDecks(decks)));
    } else {
      dispatch(userNotAuthenticated());
    }
  });
};

export const userSignIn = () => dispatch => {
  dispatch({
    type: 'USER_WANTS_SINGIN',
  });
  fb.signIn();
};

export const userSignOut = () => dispatch => {
  dispatch({
    type: 'USER_WANTS_SIGNOUT',
  });
  fb.signOut();
};

