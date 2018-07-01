import https from 'https';

const currencyConverter = (amount, fromCurrency, toCurrency, cb) => {
  const fromCurrencyID = encodeURIComponent(fromCurrency);
  const toCurrencyID = encodeURIComponent(toCurrency);
  const query = `${fromCurrencyID}_${toCurrencyID}`;

  const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  https.get(url, (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      try {
        const jsonObj = JSON.parse(body);
        const val = jsonObj[query];
        if (val) {
          const total = val * amount;
          cb(null, Math.round(total * 100) / 100);
        } else {
          const err = new Error(`Value not found for ${query}`);
          cb(err);
        }
      } catch (e) {
        cb(e);
      }
    });
  }).on('error', (e) => {
    cb(e);
  });
};

export default currencyConverter;
