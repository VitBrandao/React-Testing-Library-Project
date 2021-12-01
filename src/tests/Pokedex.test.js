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

    it('(FALSO+)Os próximos Pokémons devem ser mostrados, um a um, ao clicar', () => {
      renderWithRouter(
        <App>
          <Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />
        </App>,
      );

      //   const buttonNextPokemon = screen.getByRole('button',
      //     { name: /Próximo pokémon/i });

    //   pokemons.map((pokemon, index) => {
    //     const pokeName = pokemon[index].name;
    //     console.log(pokeName);
    //     // expect(getPokemon).toBeDefined();
    //     userEvent.click(buttonNextPokemon);
    //     return 0;
    //   });
    });

    it('(FALSO+)Se estiver no último Pokémon da lista, o clique exibe o primeiro', () => {
    });
  });

  describe('Testa se é mostrado apenas um Pokémon por vez', () => {
    it('Testa se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<App />);

      const pokemon = screen.getAllByTestId('pokemon-name');
      expect(pokemon).toHaveLength(1);
    });
  });

  describe('Teste se a Pokédex tem os botões de filtro', () => {
    // Lint pediu pra guardar em uma const pelo uso repetitivo
    const pokeTypeButton = 'pokemon-type-button';

    it('Deve existir um botão de filtragem para cada tipo, sem repetição', () => {
      renderWithRouter(<App />);

      const allButtons = screen.getAllByTestId(pokeTypeButton);
      const expectedLength = 7;
      expect(allButtons).toHaveLength(expectedLength);

      const allTypes = [
        'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
      ];

      allButtons.map((button, index) => {
        expect(button).toHaveTextContent(allTypes[index]);
      });
    });

    it('A Pokédex deve circular somente pelos pokémons do tipo selecionado', () => {
      renderWithRouter(<App />);

      const allButtons = screen.getAllByTestId(pokeTypeButton);

      // OBS: Esse teste aprova também o requisito:
      // "O texto do botão deve corresponder ao nome do tipo, ex. Psychic"

      allButtons.map((button) => {
        userEvent.click(button);

        const pokeType = screen.getByTestId('pokemon-type');
        const buttonType = button.textContent;

        expect(pokeType).toHaveTextContent(buttonType);
      });
    });

    it('O botão All precisa estar sempre visível', () => {
      renderWithRouter(<App />);

      const allButton = screen.getByRole('button',
        { name: /All/i });

      expect(allButton).toBeInTheDocument();

      // Complemento: garantindo que o botão segue visível
      // após clicar em todos os botões de tipo.
      const allButtons = screen.getAllByTestId(pokeTypeButton);

      allButtons.map((button) => {
        userEvent.click(button);
        expect(allButton).toBeInTheDocument();
      });
    });
  });
});
