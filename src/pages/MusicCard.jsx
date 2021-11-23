import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favorites: false,
    };

    this.favorite = this.favorite.bind(this);
    this.restore = this.restore.bind(this);
  }

  componentDidMount() {
    this.restore();
  }

  restore() {
    const { musics: { trackId } } = this.props;
    getFavoriteSongs().then((response) => {
      this.setState({
        favorites: response.some((music) => music.trackId === trackId) });
    });
  }

  favorite() {
    const {
      state: { favorites },
      props: { musics },
    } = this;
    if (!favorites) {
      this.setState({
        loading: false,
        favorites: true,
      });
      addSong(musics).then(() => {
        this.setState({
          loading: true,
        });
      });
    } else {
      this.setState({
        favorites: false,
      }, (() => removeSong(musics)));
    }
  }

  render() {
    const {
      props: { checkboxMusicId, previewUrl, musicName },
      state: { loading, favorites },
      favorite,
    } = this;
    return (
      !loading ? <Loading /> : (
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
