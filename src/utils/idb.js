import idb from 'idb';
import countryDetails from './countryDetails';

idb.open('currency-converter-db', 1, (upgradeDb) => {
  const countryDetailsStore = upgradeDb.createObjectStore('countryDetails');
  countryDetailsStore.put('countries', )
})