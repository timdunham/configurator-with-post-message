import React, { Component } from 'react';

import {TextBox, CheckBox} from './Controls';
import SettingsStore from '../storage/Settings';

export class Settings extends Component {
  displayName = Settings.name
  constructor(props) {
    super(props);
    
    this.state = SettingsStore.get();
  }

  onSave(){
    SettingsStore.set(this.state);
  }

  render() {
    return (
      <div>
        <h1>Configurator Settings</h1>
        <TextBox caption="Base Url" value={this.state.baseUrl} onChange={ (value)=>{ this.setState({baseUrl: value}) } } />
        <TextBox caption="Tenant Id" value={this.state.tenantId} onChange={(value)=>{this.setState({tenantId: value})} } />
        <TextBox caption="Redirect Url" value={this.state.redirectUrl} onChange={(value)=>{this.setState({redirectUrl: value})} } />
        <CheckBox caption="Use API Key" value={this.state.useApiKey} onClick={(value)=>{this.setState({useApiKey: value})} } />
        {this.renderAuthorization()}
        <button onClick={this.onSave.bind(this)}>Save</button>
      </div>
    );
  }
  renderAuthorization(){
    return (this.state.useApiKey)
    ? <TextBox caption="API Key" value={this.state.apiKey} onChange={(value)=>{this.setState({apiKey: value})} } />
    : <div>
        <TextBox caption="Key" value={this.state.key} onChange={(value)=>{this.setState({key: value})} } />
        <TextBox caption="Secret" value={this.state.secret} onChange={(value)=>{this.setState({secret: value})} } />
       </div>;
  }
 
}

