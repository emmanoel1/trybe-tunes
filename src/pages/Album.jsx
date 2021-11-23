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
      <div data-testid="page-album">
        <MusicCard musicList={ musicList } />
      </div>
    );
  }
}

export default Album;
