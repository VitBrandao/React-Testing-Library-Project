import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound', () => {
  it('Testa se página contém um heading h2 com o devido texto', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading',
      { name: /Page requested not found/i });

    expect(notFoundText).toBeDefined();
  });

  it('Testa se página mostra a imagem', () => {
    render(<NotFound />);

    const imageNotFound = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imageNotFound.src).toBe(URL);
  });
});
