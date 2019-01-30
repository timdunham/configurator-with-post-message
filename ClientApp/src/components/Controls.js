import React, { Component } from 'react';

const labelStyle = {
  "width": "100px"
};
const textboxStyle = {
  "width": "calc(100% - 150px)"
};

export class TextBox extends Component {

  onChangeHandler({target}) {
    this.props.onChange(target.value);
  }
  render() {
    return (
      <div>
        <label style={labelStyle}>{this.props.caption}</label>
        <input 
          style={textboxStyle} 
          type="text" 
          title={this.props.caption} 
          readOnly = {this.props.readonly}
          value={this.props.value} 
          onChange={this.onChangeHandler.bind(this)} />
      </div>
    );
  }
  
}

export class CheckBox extends Component {

  onChangeHandler({target}) {
    this.props.onClick(target.checked);
  }
  render() {
    return (
      <div>
        <label style={labelStyle}>{this.props.caption}</label>
        <input 
          type="checkbox" 
          title={this.props.caption} 
          checked={this.props.value} 
          onClick={this.onChangeHandler.bind(this)} />
      </div>
    );
  }
  
}
