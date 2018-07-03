import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';
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
      fromCurrencySymbol: '',
      toCurrencySymbol: '',
      input: 0,
      currencyIds: [],
      currencySymbols: {},
      convertedAmt: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name = 'input', value = parseFloat(document.getElementById('input').value) } = {}) {
    const {
      input,
      fromCurrencyID,
      toCurrencyID,
      currencySymbols,
    } = { ...this.state, [name]: value };
    const fromCurrencySymbol = currencySymbols[fromCurrencyID.slice(0, 2)];
    const toCurrencySymbol = currencySymbols[toCurrencyID.slice(0, 2)];
    this.setState({
      [name]: value,
      fromCurrencySymbol,
      toCurrencySymbol,
    });
    if (fromCurrencyID && toCurrencyID) {
      if (fromCurrencyID === toCurrencyID) {
        return this.setState({convertedAmt: input});
      }

      currencyConverter(fromCurrencyID, toCurrencyID)
        .then((rate) => {
          const total = rate * input;
          const convertedAmt = Math.round(total * 100) / 100;
          this.setState({ convertedAmt });
        });
    }
  }

  componentDidMount() {
    countryDetails(({ results }) => {
      const currencyIds = [];
      const currencySymbols = {};
      for (const country in results) {
        const { currencyId, currencySymbol } = results[country];
        currencyIds.push({ value: currencyId, key: country, text: currencyId });
        currencySymbols[country] = currencySymbol;
      }
      this.setState({
        currencyIds,
        currencySymbols,
      });
    });
  }

  render() {
    const {
      fromCurrencyID, toCurrencyID,
      input, convertedAmt,
      currencyIds, toCurrencySymbol, fromCurrencySymbol,
    } = this.state;
    return (
      <div className="Converter">
        <div>
          <Select options={currencyIds} placeholder={'Currency to convert from'} name={'fromCurrencyID'} value={fromCurrencyID} handleChange={this.handleChange}/>
        </div>
        <div>
          <Select options={currencyIds} placeholder={'Currency to convert to'} name={'toCurrencyID'} value={toCurrencyID} handleChange={this.handleChange}/>
        </div>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', margin: 5 }}>
            <h5 style={{ textAlign: 'center' }}>Input Value</h5>
            <Input labelPosition='left' type='number' placeholder='' >
              <Label basic>{fromCurrencySymbol}</Label>
              <input value={input} id={'input'} onChange={this.handleChange} min='0' type='number'/>
            </Input>
          </div>
          <div style={{ display: 'inline-block', margin: 5 }}>
            <h5 style={{ textAlign: 'center' }}>Output Value</h5>
            <Input labelPosition='left' type='number' placeholder='Amount' disabled>
              <Label basic>{toCurrencySymbol}</Label>
              <input value={convertedAmt}/>
            </Input>
          </div>
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
