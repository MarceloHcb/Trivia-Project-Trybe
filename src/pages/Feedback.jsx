import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const correctAnwers = 3;
    const { assertions, score, name, userImage, history } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <section>
          <img src={ userImage } alt="Avatar" data-testid="header-profile-picture" />
          <h4 data-testid="header-player-name">{ name }</h4>
          <p data-testid="header-score">{ score }</p>
        </section>
        {
          assertions >= correctAnwers ? <h2 data-testid="feedback-text">Well Done!</h2>
            : <h2 data-testid="feedback-text">Could be better...</h2>
        }
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-total-question">
          { assertions }
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  userImage: state.player.userImage,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  userImage: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
