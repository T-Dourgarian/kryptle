const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const nextGameState = store.getState()?.game;
  const nextUserState = store.getState()?.user;

  localStorage.setItem('kryptle_data', JSON.stringify(nextGameState));
  localStorage.setItem('user_data', JSON.stringify(nextUserState))

  return result;
};

export default localStorageMiddleware;
