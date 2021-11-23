import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: false,
    };

    this.favorite = this.favorite.bind(this);
  }

  async favorite() {
    const { musics } = this.props;
    const { favorites } = this.state;
    if (!favorites) {
      this.setState({
        loading: true,
        favorites: true,
      });
      const favoriteSong = await addSong(musics);
      if (favoriteSong === 'OK') {
        this.setState({
          loading: false,
        });
      }
    } else {
      this.setState({
        favorites: false,
      });
    }
  }

  render() {
    const {
      props: { checkboxMusicId, previewUrl, musicName },
      state: { loading, favorites },
      favorite,
    } = this;
    return (
      loading ? <Loading /> : (
        <div>
          <p>
            { musicName }
          </p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor={ checkboxMusicId }>
            <input
              data-testid={ checkboxMusicId }
              type="checkbox"
              id={ checkboxMusicId }
              name="favorites"
              checked={ favorites }
              onChange={ favorite }
            />
            Favorita
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape().isRequired,
  checkboxMusicId: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
};

export default MusicCard;
