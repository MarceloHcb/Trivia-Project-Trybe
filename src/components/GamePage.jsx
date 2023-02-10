import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GamePage extends Component {
  state = {
    results: [],
    // answers: [],
    isLoading: true,
  };

  componentDidMount() {
    this.requestQuestions();
  }

  // randomAnswers = () => {
  //   const { results } = this.state;
  //   const teste = (results[0].incorrect_answers.map((inc) => inc));
  //   const answers = [...results[0].correct_answer, teste];
  //   this.setState({
  //     answers,
  //   });
  // };

  requestQuestions = async () => {
    const token = localStorage.getItem('token');
    const { history } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    if (data.results.length > 0) {
      this.setState({
        results: data.results,
        isLoading: false,
      });
      this.randomAnswers();
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  render() {
    const { results, isLoading } = this.state;
    // const RandomNumber = Math.floor(Math.random() * 5);
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
              <button
                data-testid="correct-answer"
                type="button"
              >
                {results[0].correct_answer}

              </button>
              {results[0].incorrect_answers.map((inc, index) => (
                <button
                  data-testid={ `wrong-answer-${index}` }
                  key={ index }
                  type="button"
                >
                  {inc}

                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

GamePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default GamePage;
