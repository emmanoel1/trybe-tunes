import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: '',
      username: '',
    };
    this.headerName = this.headerName.bind(this);
  }

  componentDidMount() {
    this.headerName();
  }

  headerName() {
    this.setState({
      loaded: 'carregando',
    });
    getUser().then((name) => this.setState({
      username: `${name.name}`,
      loaded: 'Load Finished',
    }));
  }

  render() {
    const { loaded, username } = this.state;

    if (loaded === 'carregando') {
      return <Loading />;
    }

    return (
      <div>
        <header data-testid="header-component">
          <p data-testid="header-user-name">{username}</p>
        </header>
      </div>
    );
  }
}

export default Header;
