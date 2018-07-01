import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const Select = props => (
  <Dropdown
    placeholder='Select CurrencyID'
    fluid
    search
    selection
    options={props.options}
    name={props.name}
    onChange={props.handleChange}
    value={props.value}
  />
);

Select.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};

export default Select;
