import App from '../App';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testa página Ranking', () => {
  
  it('Será validado se exibir o título Ranking', () => {
    renderWithRouterAndRedux(<Ranking />);
    
    const title = screen.getByRole('heading', {level: 1, name: /Ranking/i} )
    expect(title).toBeInTheDocument();
    })
})