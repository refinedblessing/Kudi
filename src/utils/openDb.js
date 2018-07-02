import idb from 'idb';

const currencyConversionDB = () => {
  if (navigator.serviceWorker) {
    return idb.open('currency-converter-db', 1, (upgradeDb) => {
      upgradeDb.createObjectStore('rates', { keyPath: 'query' });
    });
  }
};

const openConversionRatesDB = {
  get(query) {
    return currencyConversionDB().then(db => db.transaction('rates').objectStore('rates').get(query));
  },
  set(query, rate) {
    return currencyConversionDB().then((db) => {
      const tx = db.transaction('rates', 'readwrite');
      tx.objectStore('rates').put({ query, rate });
      return tx.complete;
    });
  },
};

export default openConversionRatesDB;
