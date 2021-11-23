import React from 'react';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
    };
    this.namehandle = this.namehandle.bind(this);
  }

  componentDidMount() {
    this.namehandle();
  }

  async namehandle() {
    const urlFilter = window.location.pathname.split('/');
    const music = await getMusics(urlFilter[2]);
    this.setState({
      musicList: music,
    });
  }

  render() {
    const {
      musicList,
    } = this.state;
    console.log(musicList);
    return (
      <div>
        {musicList.map((music, index) => (
          index === 0 ? (
            <div>
              <p data-testid="artist-name">{music.artistName}</p>
              <p data-testid="album-name">{music.collectionName}</p>
            </div>
          ) : (
            <MusicCard
              checkboxMusicId={ `checkbox-music-${music.trackId}` }
              key={ music.trackId }
              previewUrl={ music.previewUrl }
              musics={ music }
              musicId={ music.trackId }
              musicName={ music.trackName }
            />
          )))}
      </div>
    );
  }
}

export default Album;
