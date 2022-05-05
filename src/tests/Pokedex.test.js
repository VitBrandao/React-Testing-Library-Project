import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../RenderWIthRouter';
import App from '../App';

describe('Testa o componente Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading',
      { name: /Encountered pokémons/i });

    expect(pokedexTitle).toBeDefined();
  });

  // Lint pediu para guardar texto em uma const
  const pokeNameString = 'pokemon-name';

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

    it('Os próximos Pokémons devem ser mostrados, um a um, ao clicar', () => {
      renderWithRouter(
        <App>
          <Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />
        </App>,
      );

      const buttonNextPokemon = screen.getByRole('button',
        { name: /Próximo pokémon/i });

      const pokemonNames = [];
      pokemons.map((pokemon) => pokemonNames.push(pokemon.name));

      pokemonNames.forEach((poke) => {
        const pokeNameId = screen.getByTestId(pokeNameString);
        expect(pokeNameId).toHaveTextContent(poke);
        userEvent.click(buttonNextPokemon);
      });
    });

    it('Se estiver no último Pokémon da lista, o clique exibe o primeiro', () => {
      renderWithRouter(
        <App>
          <Pokedex isPokemonFavoriteById={ {} } pokemons={ pokemons } />
        </App>,
      );

      const buttonNextPokemon = screen.getByRole('button',
        { name: /Próximo pokémon/i });

      // É preciso clicar 8x em Próximo Pokémon para chegar ao último
      const maxClicks = 8;
      for (let index = 0; index < maxClicks; index += 1) {
        userEvent.click(buttonNextPokemon);
      }
      const pokeNameId = screen.getByTestId(pokeNameString);
      expect(pokeNameId).toHaveTextContent(/Dragonair/i);

      // Novo clique a partir do último pokémon
      userEvent.click(buttonNextPokemon);
      expect(pokeNameId).toHaveTextContent(/Pikachu/i);
    });
  });

  describe('Testa se é mostrado apenas um Pokémon por vez', () => {
    it('Testa se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<App />);

      const pokemon = screen.getAllByTestId(pokeNameString);
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

      // const pokeTypes = [];
      // pokemons.forEach((pokemon) => { pokeTypes.push(pokemon.type) });
      // console.log(pokeTypes);

      const allTypes = [
        'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
      ];

      allButtons.forEach((button, index) => {
        expect(button).toHaveTextContent(allTypes[index]);
      });
    });

    it('A Pokédex deve circular somente pelos pokémons do tipo selecionado', () => {
      renderWithRouter(<App />);

      const allButtons = screen.getAllByTestId(pokeTypeButton);

      // OBS: Esse teste aprova também o requisito:
      // "O texto do botão deve corresponder ao nome do tipo, ex. Psychic"

      allButtons.forEach((button) => {
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

      allButtons.forEach((button) => {
        userEvent.click(button);
        expect(allButton).toBeInTheDocument();
      });
    });
  });
});

// Lint reclamou, então precisei separar os blocos de describe
describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('O texto do botão deve ser All', () => {
    const allButton = screen.getByRole('button',
      { name: /All/i });

    expect(allButton).toBeDefined();
    expect(allButton).toHaveTextContent(/All/i);
  });

  it('Quando o botão All for clicado, deve mostrar os Pokémons sem filtros', () => {
    const allButton = screen.getByRole('button',
      { name: /All/i });
    const pokeType = screen.getByTestId('pokemon-type');

    userEvent.click(allButton);
    expect(pokeType).toHaveTextContent(/Electric/i);

    // Ao clicar em 'Próximo Pokémon', o tipo deve mudar de Electric para Fire.
    const buttonNextPokemon = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    userEvent.click(buttonNextPokemon);

    expect(pokeType).toHaveTextContent(/Fire/i);
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {

  });
});
