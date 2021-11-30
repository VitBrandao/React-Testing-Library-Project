import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from '../RenderWIthRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testa o componente Favorite Pokemons', () => {
  it('Testa se é exibido na tela a mensagem No Favorite Pokemon Found', () => {
    render(<FavoritePokemons pokemons={ [] } />);

    const noFoundText = screen.getByText(/No Favorite Pokemon Found/i);
    expect(noFoundText).toBeDefined();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const pokemonsInTheScreen = screen.queryAllByText('pokemon-name');

    pokemonsInTheScreen.map((pokemon) => expect(pokemon).toBeDefined());
  });
});
