const localStorageMiddleware = store => next => action => {
    const result = next(action);
  
    const syncProperties = ['Game/playButtonClicked', 'Game/equationUpdated'];
  
    if (syncProperties.includes(action.type)) {
      const currentLocalStorageData = JSON.parse(localStorage.getItem('kryptle_data'));
      const newLocalStorageData = formatLocalStorageObject(currentLocalStorageData, action.payload);

      localStorage.setItem('kryptle_data', JSON.stringify(newLocalStorageData));
    }
    return result;
  };

const formatLocalStorageObject = (currentObject, newData) => {
    return {
        ...currentObject,
        ...newData
    }
}
  
  export default localStorageMiddleware;