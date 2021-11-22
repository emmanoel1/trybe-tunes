import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      loaded: '',
      searchedName: '',
      inputDisabled: false,
      btnDisabled: true,
    };
    this.searchHandle = this.searchHandle.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  searchHandle({ target }) {
    const { searchInput } = this.state;
    this.setState({
      searchInput: target.value,
    });
    if (searchInput.length + 1 >= 2) {
      this.setState({
        btnDisabled: false,
      });
    }
  }

  btnClick() {
    const {
      searchInput,
    } = this.state;

    this.setState({
      searchInput: '',
      inputDisabled: true,
      btnDisabled: true,
      loaded: 'carregando',
    });

    searchAlbumsAPI(`${searchInput}`)
      .then((artist) => this.setState({
        loaded: 'Load Finished',
        searchedName: `${artist}`,
      }));
  }

  render() {
    const { searchedName, inputDisabled, btnDisabled, loaded } = this.state;

    if (loaded === 'carregando') {
      return <Loading />;
    }
    if (loaded === 'Load Finished') {
      return <p>{ `Resultado de álbuns de: ${searchedName}` }</p>;
    }
    return (
      <div data-testid="page-search">
        <input
          disabled={ inputDisabled }
          type="text"
          onChange={ this.searchHandle }
          data-testid="search-artist-input"
        />

        <button
          type="submit"
          disabled={ btnDisabled }
          onClick={ this.btnClick }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
