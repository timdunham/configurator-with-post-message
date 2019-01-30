import React, { Component } from 'react';

const iframeStyle = {
  width: "100%",
  height: "800px"
};

export class Settings extends Component {
  displayName = Settings.name
  constructor(props) {
    super(props);
    this.state = { 
      loading: true
    };
    fetch('api/Configurator/GetSettings')
      .then(response => response.json())
      .then(data=>{
        this.setState(data)
        this.setState({loading: false})
      });
  }
  
  onMessageHandler(event) {
    this.setState({url: null, data: JSON.stringify(event.data) })
    console.log("onmessage", arguments);
  }
  onConfigure() {
    
    fetch('api/Configurator/PrepareForInteractive/' + this.state.namespace + '/' + this.state.ruleset)
      .then(response => response.json())
      .then(data => {
        this.setState({url: data.url, data: null})
      });
  }


  render() {
    return (
      <div>
        <h1>Call Configurator</h1>
        <label>Namespace</label><input type="text" value={this.state.namespace} />
        <label>Ruleset</label><input type="text" value={this.state.ruleset} />
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
      ? <div><input style={iframeStyle} type="textblock" value={this.state.data} /> </div>
      : "";
  }
}
