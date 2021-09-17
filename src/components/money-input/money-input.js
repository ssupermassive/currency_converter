import React from 'react';

class MoneyInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.value || ''};

    this.valueChangeHandler = this.valueChangeHandler.bind(this);
  }

  componentDidUpdate(props) {
    if (props.value !== this.props.value) {
      this.setState({value: this.props.value});
    }
  }

  valueChangeHandler(event) {
    const value = event.target.value;
    const lastSymbol = value[value.length - 1];
    const parsedValue = parseFloat(value);

    if (!parsedValue) {
      this._updateValue('');
      return;
    }

    if (this.props.onlyPositive && parsedValue < 0) {
      return;
    }

    if (lastSymbol === '.') {
      this._updateValue(value);
      return;
    }

    this._updateValue(String(parsedValue));
  }

  _updateValue(value) {
    this.setState({ value });

    if (this.props.onChangeCallback) {
      this.props.onChangeCallback(value);
    }
  }

  render() {
    return (
      <input
        className={this.props.className}
        type='text'
        value={this.state.value}
        onChange={this.valueChangeHandler}
      />
    );
  }
}

export default MoneyInput;
