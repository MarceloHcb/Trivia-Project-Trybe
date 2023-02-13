import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const correctAnwers = 3;
    const { assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        {
          assertions >= correctAnwers ? 'Well Done!' : 'Could be better...'
        }
      </div>
    );
  }
}
Feedback.propTypes = {
  assertions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
