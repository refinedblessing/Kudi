import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';

class App extends Component {
  render () {
    return (
      <Container className="raised very padded text segment">
        <Header as="h1">Convert your Kudi</Header>
      </Container>
    )
  }
}

export default App;