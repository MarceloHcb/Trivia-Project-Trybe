import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    const { email } = this.props;
    const avatar = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${avatar}` } alt="Avatar" />
        <h2 data-testid="header-player-name">nomedapessoa</h2>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

Game.propTypes = {
  email: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,

});

export default connect(mapStateToProps)(Game);
