import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../RenderWIthRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <App>
        <Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />
      </App>,
    );

    const pokedexTitle = screen.getByRole('heading',
      { name: /Encountered pokémons/i });

    expect(pokedexTitle).toBeDefined();
  });

  describe('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      renderWithRouter(
        <App>
          <Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />
        </App>,
      );

      const buttonNextPokemon = screen.getByRole('button',
        { name: /Próximo pokémon/i });

      expect(buttonNextPokemon).toBeDefined();
    });

    it('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar', () => {
      renderWithRouter(
        <App>
          <Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />
        </App>,
      );

      const buttonNextPokemon = screen.getByRole('button',
        { name: /Próximo pokémon/i });

      pokemons.map((pokemon, index) => {
        const pokeName = pokemon[index].name;
        console.log(pokeName);
        // expect(getPokemon).toBeDefined();
        userEvent.click(buttonNextPokemon);
        return 0;
      });
    });

    it('Se estiver no último Pokémon da lista, o clique exibe o primeiro', () => {
    });
  });
});
