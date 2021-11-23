import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicList } = this.props;
    return (
      <div>
        {musicList.map((music, index) => (
          index === 0 ? (
            <div>
              <p data-testid="artist-name">{music.artistName}</p>
              <p data-testid="album-name">{music.collectionName}</p>
            </div>
          ) : (
            <div key={ music.trackName }>
              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento.
                <code>audio</code>
              </audio>
            </div>
          )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.number.isRequired,
};

export default MusicCard;
