import React, { Component } from 'react';
import SettingsStore from '../storage/Settings';
import { TextBox, CheckBox } from './Controls';


const iframeStyle = {
  width: "100%",
  height: "800px"
};

export class Interactive extends Component {
  displayName = Interactive.name
  constructor(props) {
    super(props);
    this.state = Object.assign({ 
      namespace: "AMC",
      ruleset: "Classic Window",
      usePopup: false
    }, SettingsStore.get());

    window.addEventListener("message", this.onMessageHandler.bind(this))
  }
  
  onMessageHandler(event) {
    this.setState({url: null, data: JSON.stringify(event.data) })
    console.log("onmessage", arguments);
  }
  onConfigure() {
    fetch('api/Configurator/PrepareForInteractive', {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify(this.state)
    })
    .then(response=> response.json())
    .then(data=>{
      var configuratorWindow = window;
      if (this.state.usePopup)
        configuratorWindow = window.open(data.url);
      else
        this.setState({url: data.url, data: null});

      configuratorWindow.addEventListener("message", this.onMessageHandler.bind(this))
      
    });    
  
  }


  render() {
    return (
      <div>
        <h1>Call Configurator</h1>
        <TextBox caption="Namespace" value={this.state.namespace} onChange={value=>this.setState({ namespace: value} )} />
        <TextBox caption="Ruleset" value={this.state.ruleset} onChange={value=>this.setState({ ruleset: value} )} />
        <CheckBox caption="Use Popup" value={this.state.usePopup} onClick={value=>this.setState({ usePopup: value} )} />
        <button onClick={this.onConfigure.bind(this)}>Configure</button>
        {this.renderConfigurator()}
        {this.renderData()}
      </div>
    );
  }
  renderConfigurator() {
    return (this.state.url)
      ? <div><iframe style={iframeStyle} src={this.state.url} /></div>
      : "";
  }
  renderData() {
    return (this.state.data)
      ? <div><input style={iframeStyle} type="textblock" readOnly value={this.state.data} /> </div>
      : "";
  }
}
