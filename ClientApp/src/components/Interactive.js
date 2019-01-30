import React, { Component } from 'react';

export class Interactive extends Component {
  displayName = Interactive.name

  constructor(props) {
    super(props);
    this.state = { 
      namespace: "AMC",
      ruleset: "Bike"
    };
 
  }

  onConfigure() {
    
    fetch('api/Configurator/PrepareForInteractive/' + this.state.namespace + '/' + this.state.ruleset)
      .then(response => response.json())
      .then(data => {
        this.setState({url: data.url})
      });
  }


  render() {
    return (
      <div>
        <h1>Call Configurator</h1>
        <label>Namespace</label><input type="text" text={this.state.namespace} />
        <label>Ruleset</label><input type="text" text={this.state.ruleset} />
        <button onClick={this.onConfigure.bind(this)}>Configure</button>
        {this.renderConfigurator()}
      </div>
    );
  }

  renderConfigurator() {
    return (this.state.url)
      ? <div><iframe src={this.state.url} /></div>
      : "";
  }
}
