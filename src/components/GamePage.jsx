import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GamePage extends Component {
  state = {
    results: [],
    isLoading: true,
    correct: [],
    wrong: [],
    border: '',
    borderRed: '',
  };

  componentDidMount() {
    this.requestQuestions();
  }

  requestQuestions = async () => {
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
        wrong: data.results[0].incorrect_answers.map((inc) => inc),
      });
    }
  };

  handleClick = () => {
    this.setState({
      borderRed: '3px solid red',
      border: '3px solid rgb(6, 240, 15)',
    });
  };

  render() {
    const magicNumber = 0.5;
    const { results, isLoading, correct, wrong, border, borderRed } = this.state;
    const answers = [...wrong, correct].sort(() => Math.random() - magicNumber);
    console.log(answers);
    console.log(wrong);
    console.log(correct);
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
              { answers.map((answer, index) => (
                answer === correct ? (
                  <button
                    key="8"
                    type="button"
                    value={ answer }
                    data-testid="correct-answer"
                    style={ { border } }
                    onClick={ this.handleClick }
                  >
                    {' '}
                    {answer}
                  </button>
                )
                  : (

                    <button
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      key={ index }
                      value={ answer }
                      style={ { border: borderRed } }
                      className="green"
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default GamePage;
