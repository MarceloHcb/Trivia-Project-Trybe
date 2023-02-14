import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetState } from '../redux/actions';

class Ranking extends Component {
  reset = () => {
    const { history, dispatch } = this.props;
    localStorage.removeItem('token');
    history.push('/');
    dispatch(resetState());
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.reset }
          data-testid="btn-go-home"
        >
          VOLTAR PARA O INICIO
        </button>
      </div>
    );
  }
}

Ranking.defaultProps = {
  history: {},
};

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
