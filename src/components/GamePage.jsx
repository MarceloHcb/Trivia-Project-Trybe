import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GamePage extends Component {
  state = {
    results: [],
    answers: [],
    isLoading: true,
  };

  componentDidMount() {
    this.requestQuestions();
  }

  createButtons = (data) => {
    const magicNumber = 0.5;
    const answers = (
      <button
        data-testid="correct-answer"
        type="button"
        key="5"
      >
        {data.results[0].correct_answer}

      </button>);
    const incAnswers = (
      data.results[0].incorrect_answers.map((inc, index) => (
        <button
          data-testid={ `wrong-answer-${index}` }
          type="button"
          key={ index }
        >
          {inc}

        </button>
      ))
    );

    this.setState({
      results: data.results,
      answers: [...incAnswers, answers].sort(() => Math.random() - magicNumber),
      isLoading: false,
    });
  };

  requestQuestions = async () => {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.createButtons(data);
    }
  };

  render() {
    const { results, isLoading, answers } = this.state;
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
            <div data-testid="answer-options">
              {answers}

            </div>
          </div>
        )}
      </div>
    );
  }
}

GamePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default GamePage;
