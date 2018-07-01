import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select.jsx';
import currencyConverter from '../utils/currencyConverter';
import countryDetails from '../utils/countryDetails';

class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromCurrencyID: '',
      toCurrencyID: '',
      input: 0,
      currencyIds: [],
      currencySymbols: [],
      convertedAmt: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name = 'input', value = parseFloat(document.getElementById('input').value) } = {}) {
    const {
      input,
      fromCurrencyID,
      toCurrencyID,
    } = { ...this.state, [name]: value };
    currencyConverter(input, fromCurrencyID, toCurrencyID, (err, convertedAmt = 0) => {
      this.setState({
        convertedAmt,
        [name]: value,
      });
    });
  }

  componentDidMount() {
    countryDetails(({ results }) => {
      const currencyIds = [];
      const currencySymbols = [];
      for (const country in results) {
        const { currencyId, currencySymbol } = results[country];
        currencyIds.push({ value: currencyId, key: country, text: currencyId });
        currencySymbols.push(currencySymbol);
      }
      this.setState({
        currencyIds,
        currencySymbols,
      });
    });
  }

  render() {
    const {
      fromCurrencyID, toCurrencyID, input, convertedAmt, currencyIds,
    } = this.state;
    return (
      <div className="Converter">
        <div>
          <Select options={currencyIds} name={'fromCurrencyID'} value={fromCurrencyID} handleChange={this.handleChange}/>
        </div>
        <div>
          <Select options={currencyIds} name={'toCurrencyID'} value={toCurrencyID} handleChange={this.handleChange}/>
        </div>
        <div>
          Input Value: <input value={input} onChange={this.handleChange} id={'input'} type="number" min="0"/>
        </div>
        <div>
          <p>Converted To: {convertedAmt}</p>
        </div>
      </div>
    );
  }
}

Converter.propTypes = {
  currencyIds: PropTypes.array,
  currencySymbols: PropTypes.array,
};

export default Converter;
