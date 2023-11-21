const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const nextState = store.getState()?.game;

  localStorage.setItem('kryptle_data', JSON.stringify(nextState));

  return result;
};

export default localStorageMiddleware;
