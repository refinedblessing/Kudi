import https from 'https';

// Data format

// {
//   'results': {
//     'AF': {
//       'alpha3': 'AFG',
//       'currencyId': 'AFN',
//       'currencyName': 'Afghan afghani',
//       'currencySymbol': '؋',
//       'id': 'AF',
//       'name': 'Afghanistan'
//     },
//   }
// }

const countryDetails = (cb) => {
  const url = 'https://free.currencyconverterapi.com/api/v5/countries';
  https.get(url, (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      try {
        cb(JSON.parse(body));
      } catch (e) {
        cb(e);
      }
    });
  }).on('error', (e) => {
    cb(e);
  });
};

export default countryDetails;
