import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
// Ao clicar no botão de Pesquisar, limpe o valor do input e faça uma requisição utilizando a função do arquivo searchAlbumsAPIs.js. Lembre-se que essa função espera receber uma string com o nome da banda ou artista.
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      apiResponse: '',
      searchInput: '',
      loaded: false,
      btnDisabled: true,
      queryedApi: [],
    };
    this.searchHandle = this.searchHandle.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  searchHandle({ target }) {
    const { searchInput } = this.state;
    const { value } = target;
    this.setState({
      searchInput: value,
      artist: value,
    });
    if (searchInput.length + 1 >= 2) {
      this.setState({
        btnDisabled: false,
      });
    }
  }

  async btnClick() {
    const { artist } = this.state;

    this.setState({
      artist: '',
      loaded: true,
    });

    const searched = await searchAlbumsAPI(artist);
    if (searched.length === 0) {
      this.setState({
        apiResponse: 'Nenhum álbum foi encontrado', // userResponse
        loaded: false,
        queryedApi: [],
      });
    } else {
      this.setState({
        loaded: false,
        apiResponse: `Resultado de álbuns de: ${artist}`,
        queryedApi: [searched],
      });
    }
  }

  render() {
    const { artist, btnDisabled, loaded, queryedApi, apiResponse } = this.state;

    console.log(queryedApi);
    console.log(apiResponse);

    return (
      <div data-testid="page-search">
        {load ? (
          <Loading />
        ) : (
          <form action="">
            <input
              type="text"
              value={ artist }
              placeholder="Nome Do Artista"
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
          </form>
        )}
      </div>
    );
  }
}
export default Search;
