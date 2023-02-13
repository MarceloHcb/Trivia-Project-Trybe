import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore } from '../redux/actions';

class GamePage extends Component {
  state = {
    results: [],
    isLoading: true,
    correct: [],
    // wrong: [],
    border: '',
    borderRed: '',
    timer: 30,
    isDisabled: false,
  };

  componentDidMount() {
    this.requestQuestions();
    this.handleTimer();
  }

  requestQuestions = async () => {
    const magicNumber = 0.5;
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log(data);

    if (data.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        results: data.results,
        isLoading: false,
        correct: data.results[0].correct_answer,
        // wrong: data.results[0].incorrect_answers.map((inc) => inc),
        answers: [...data.results[0].incorrect_answers.map((inc) => inc),
          data.results[0].correct_answer].sort(() => Math.random() - magicNumber),
      });
    }
  };

  handleClick = ({ target }) => {
    let { value } = target;
    const { dispatch } = this.props;
    const { timer } = this.state;
    const medium = 2;
    const hard = 3;
    const easy = 1;
    switch (value) {
    case 'easy':
      value = easy;
      break;
    case 'medium':
      value = medium;
      break;
    case 'hard':
      value = hard;
      break;
    case 'true':
      value = hard;
      break;

    default:
      break;
    }
    this.setState({
      borderRed: '3px solid red',
      border: '3px solid rgb(6, 240, 15)',
    });
    const fixedValue = 10;
    let totalScore = 0;
    if (value === 'wrong' || value === false) {
      totalScore = 0;
      return;
    }
    totalScore = fixedValue + (timer * value);
    dispatch(updateScore(totalScore));
  };

  handleTimer = () => {
    const { timer } = this.state;
    const intervalTimer = 1000;
    let tim = timer;
    const timerInterval = setInterval(() => {
      tim -= 1;
      this.setState({
        timer: tim,
      });
      console.log(tim);
      if (tim === 0) {
        clearInterval(timerInterval);
        this.setState({
          isDisabled: true,
        });
      }
    }, intervalTimer);
  };

  render() {
    const { results, isLoading, correct, border, borderRed,
      answers, timer, isDisabled } = this.state;
    return (
      <div>
        {isLoading === true ? <p>Loading...</p> : (
          <div>
            <h1 data-testid="question-category">
              {results[0].category}
            </h1>
            <h2 data-testid="question-text">
              {results[0].question}
            </h2>
            <h2>
              {' '}
              Timer:
              {' '}
              {timer}
            </h2>
            <div data-testid="answer-options">
              { answers.map((answer, index) => (
                answer === correct ? (
                  <button
                    key="8"
                    type="button"
                    value={ results[0].difficulty }
                    data-testid="correct-answer"
                    style={ { border } }
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    {answer}
                  </button>
                )
                  : (

                    <button
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      key={ index }
                      value="wrong"
                      style={ { border: borderRed } }
                      disabled={ isDisabled }
                      onClick={ this.handleClick }
                    >
                      {answer}

                    </button>
                  )
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

GamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(GamePage);
