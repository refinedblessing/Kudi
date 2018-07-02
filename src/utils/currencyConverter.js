import axios from 'axios';

import openConversionRatesDB from './openDb';

const currencyConverter = (amount, fromCurrency, toCurrency) => {
  if (!fromCurrency || !toCurrency) return Promise.resolve(0);
  const fromCurrencyID = encodeURIComponent(fromCurrency);
  const toCurrencyID = encodeURIComponent(toCurrency);
  const query = `${fromCurrencyID}_${toCurrencyID}`;

  openConversionRatesDB
    .get(query)
    .then(({ rate }) => {
      if (rate) {
        const total = rate * amount;
        return Math.round(total * 100) / 100;
      }
    }).catch(err => err);

  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  return axios.get(url)
    .then(({ data }) => {
      const rate = data[query];
      if (rate) {
        openConversionRatesDB.set(query, rate);
        const total = rate * amount;
        return Math.round(total * 100) / 100;
      }
    }).catch(err => err);
};

export default currencyConverter;
