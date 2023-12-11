const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const nextGameState = store.getState()?.game;
  const nextUserState = store.getState()?.user;
  const nextNavigationState = store.getState()?.navigation;

  localStorage.setItem('kryptle_data', JSON.stringify(nextGameState));
  localStorage.setItem('user_data', JSON.stringify(nextUserState))
  localStorage.setItem('navigation', JSON.stringify(nextNavigationState))

  return result;
};

export default localStorageMiddleware;
