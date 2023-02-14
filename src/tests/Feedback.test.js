import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testa página Feedback', () => {

  it('Será validado se exibir a imagem do Gravatar', () => {
    renderWithRouterAndRedux(<Feedback />);
    const image = screen.getByTestId('header-profile-picture');
    expect(image).toBeInTheDocument();
  });

  it('Será validado se exibir o e-mail', () => {
    renderWithRouterAndRedux(<Feedback />);
    const email = screen.getByTestId('header-player-name');
    expect(email).toBeInTheDocument();
  });

  it('Será validado se exibir o valor do placar', () => {
    renderWithRouterAndRedux(<Feedback />);
    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
  });

  it('Testa se exibe o número acertos de questões aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const questions = screen.getByTestId('feedback-total-question');
    expect(questions).toBeInTheDocument();
  });

  it('Testa se exibe o número de acertos aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />);
    const assertions = screen.getByTestId('feedback-total-score');
    expect(assertions).toBeInTheDocument();
  });

  it('Testa botão "Play Again"', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const aboutLink = screen.getByRole('button', { name: 'Play Again' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa botão "Ranking"', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnRanking = screen.getByRole('button', { name: 'Ranking' });
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });

});