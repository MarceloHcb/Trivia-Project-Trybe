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
    questionNum: 0,
    showNext: false,
  };

  componentDidMount() {
    this.requestQuestions();
    this.handleTimer();
  }

  requestQuestions = async () => {
    const { history } = this.props;
    const { questionNum } = this.state;
    const magicNumber = 0.5;
    const token = localStorage.getItem('token');
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
        correct: data.results[questionNum].correct_answer,
        // wrong: data.results[0].incorrect_answers.map((inc) => inc),
        answers: [...data.results[questionNum].incorrect_answers.map((inc) => inc),
          data.results[questionNum].correct_answer]
          .sort(() => Math.random() - magicNumber),
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
    clearInterval(this.timerInterval);
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
      showNext: true,
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

  handleNext = () => {
    const { questionNum } = this.state;
    this.setState({
      questionNum: questionNum + 1,
    });
  };

  handleTimer = () => {
    const { timer } = this.state;
    const intervalTimer = 1000;
    let tim = timer;
    this.timerInterval = setInterval(() => {
      tim -= 1;
      this.setState({
        timer: tim,
      });
      if (tim === 0) {
        clearInterval(this.timerInterval);
        this.setState({
          isDisabled: true,
        });
      }
    }, intervalTimer);
  };

  render() {
    const { results, isLoading, correct, border, borderRed,
      answers, timer, isDisabled, questionNum, showNext } = this.state;
    return (
      <div>
        {isLoading === true ? <p>Loading...</p> : (
          <div>
            <h1 data-testid="question-category">
              {results[questionNum].category}
            </h1>
            <h2 data-testid="question-text">
              {results[questionNum].question}
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
                    value={ results[questionNum].difficulty }
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
              <div>
                { showNext && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                  >
                    next

                  </button>
                )}
              </div>
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
