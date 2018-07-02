import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const Select = props => (
  <Dropdown
    placeholder={props.placeholder}
    fluid
    search
    selection
    options={props.options}
    name={props.name}
    onChange={props.handleChange}
    value={props.value}
    style={{ margin: '10px auto', maxWidth: 500 }}
  />
);

Select.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Select;
