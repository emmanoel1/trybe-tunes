import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

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
        apiResponse: 'Nenhum álbum foi encontrado',
        loaded: false,
        queryedApi: [],
      });
    } else {
      this.setState({
        apiResponse: `Resultado de álbuns de: ${artist}`,
        loaded: false,
        queryedApi: searched,
      });
    }
  }

  render() {
    const { artist, btnDisabled, loaded, queryedApi, apiResponse } = this.state;

    return (
      <div data-testid="page-search">
        {loaded ? <Loading /> : (
          <div>
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
          </div>
        )}
        <div>
          <h3>{ apiResponse }</h3>
          <div>
            {queryedApi.map((array) => (
              <div key={ array.collectionId }>
                <img src={ array.artworkUrl100 } alt={ `${array.collectionName}` } />
                <p>{ array.collectionName }</p>
                <Link
                  data-testid={ `link-to-album-${array.collectionId}` }
                  to={ `/album/${array.collectionId}` }
                >
                  Ir Para o Album
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
