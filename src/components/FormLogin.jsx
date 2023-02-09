import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FormLogin extends Component {
  state = {
    name: '',
    email: '',
  };

  validation = () => {
    const { name, email } = this.state;
    const validationInput = name.length > 0 && email.length > 0;
    return !validationInput;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    localStorage.setItem('token', token.token);
    history.push('/gamepage');
  };

  render() {
    return (
      <div>
        <label htmlFor="inputName">
          Nome:
          <input
            type="text"
            name="name"
            id="inputName"
            data-testid="input-player-name"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputEmail">
          Email:
          <input
            type="text"
            name="email"
            id="inputEmail"
            data-testid="input-gravatar-email"
            placeholder="Email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ this.validation() }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play

        </button>
      </div>
    );
  }
}

FormLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
