import axios from 'axios';

import openConversionRatesDB from './openDb';

const currencyConverter = (fromCurrency, toCurrency) => {
  if (!fromCurrency || !toCurrency) return Promise.resolve(0);
  if (fromCurrency === toCurrency) return Promise.resolve(1);
  const fromCurrencyID = encodeURIComponent(fromCurrency);
  const toCurrencyID = encodeURIComponent(toCurrency);
  const query = `${fromCurrencyID}_${toCurrencyID}`;
  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;

  return openConversionRatesDB
    .get(query)
    .then((rateData) => {
      if (rateData && rateData.rate) {
        return Promise.resolve(rateData.rate);
      }
      return axios.get(url)
        .then(({ data }) => {
          if (data && data[query]) {
            openConversionRatesDB.set(query, data[query]);
            return Promise.resolve(data[query]);
          }
        });
    });
};

export default currencyConverter;
