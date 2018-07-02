import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import Converter from './Converter.jsx';

class App extends Component {
  render() {
    return (
      <Container className="raised very padded text segment" style={{'marginTop': 50}}>
        <Header as="h1" style={{'textAlign': 'center'}}>Convert your Kudi</Header>
        <Converter />
      </Container>
    );
  }
}

export default App;
