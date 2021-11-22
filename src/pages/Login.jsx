import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      disabled: true,
      loaded: '',
    };
    this.clickHandle = this.clickHandle.bind(this);
    this.inputHandle = this.inputHandle.bind(this);
  }

  clickHandle() {
    const {
      nameInput,
    } = this.state;
    this.setState({
      loaded: 'carregando',
    });
    createUser({ name: `${nameInput}` })
      .then(() => this.setState({ loaded: 'Load Finished' }));
  }

  inputHandle({ target }) {
    const {
      nameInput,
    } = this.state;
    this.setState({ nameInput: target.value });
    const limit = 3;
    if (nameInput.length + 1 >= limit) {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const {
      nameInput,
      disabled,
      loaded,
    } = this.state;

    if (loaded === 'carregando') {
      return <Loading />;
    }
    if (loaded === 'Load Finished') {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <label htmlFor="nameInput">
          Digite:
          <input
            type="text"
            value={ nameInput }
            onChange={ this.inputHandle }
            id="nameInput"
            data-testid="login-name-input"
          />
        </label>
        <button
          disabled={ disabled }
          type="submit"
          onClick={ this.clickHandle }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
