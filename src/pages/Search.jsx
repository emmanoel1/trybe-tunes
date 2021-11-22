import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      disabled: true,
    };
    this.searchHandle = this.searchHandle.bind(this);
  }

  searchHandle({ target }) {
    const { searchInput } = this.state;
    this.setState({
      searchInput: target.value,
    });

    if (searchInput.length + 1 >= 2) {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <input
          type="text"
          onChange={ this.searchHandle }
          data-testid="search-artist-input"
        />

        <button
          type="submit"
          disabled={ disabled }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
