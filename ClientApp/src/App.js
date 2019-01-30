import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Interactive } from './components/Interactive';
import { Settings } from './components/Settings';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Interactive} />
        <Route exact path='/settings' component={Settings} />
      </Layout>
    );
  }
}
