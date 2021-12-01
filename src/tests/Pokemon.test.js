import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWIthRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  describe('Teste se é renderizado um card com as infos de determinado pokémon', () => {
    beforeEach(() => renderWithRouter(<App />));

    it('O nome correto do Pokémon deve ser mostrado na tela', () => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemons[0].name);
    });

    it('O tipo correto do pokémon deve ser mostrado na tela', () => {
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(pokemons[0].type);
    });

    it('O peso médio do pokémon deve ser exibido no devido formato', () => {
      const pokemonAverageWeight = screen.getByTestId('pokemon-weight');

      // Descobri lá no MDN como pegar o textContent do elemento
      // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/textContent
      const averageText = pokemonAverageWeight.textContent;

      // Teste para o peso
      expect(averageText).toContain(pokemons[0].averageWeight.value);

      // Teste para kg
      expect(averageText).toContain(pokemons[0].averageWeight.measurementUnit);
    });

    it('A imagem do Pokémon deve ser exibida com os devidos src e alt', () => {
      // Só há uma imagem na página Home
      const pokemonImg = screen.getByRole('img');
      expect(pokemonImg).toBeDefined();

      // Teste para src
      expect(pokemonImg.src).toEqual(pokemons[0].image);

      // Teste para alt ('Pikachu sprite')
      const pokeName = pokemons[0].name;
      const pokeAlt = `${pokeName} sprite`;
      expect(pokemonImg.alt).toEqual(pokeAlt);
    });
  });

  describe('Testes para o link More Details', () => {
    it('Testa se o card contém um link de navegação para exibir detalhes', () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link',
        { name: /more details/i });

      const expectedLink = `http://localhost/pokemons/${pokemons[0].id}`;

      expect(moreDetails.href).toBe(expectedLink);
    });

    it('Testa se ao clicar no link de navegação, é feito o redirecionamento', () => {
      renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link',
        { name: /more details/i });

      userEvent.click(moreDetails);
      const detailsTitle = `${pokemons[0].name} Details`;
      const pokemonDetails = screen.getByText(detailsTitle);

      expect(pokemonDetails).toBeDefined();
    });

    it('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {
      const { history } = renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link',
        { name: /more details/i });

      userEvent.click(moreDetails);
      const { pathname } = history.location;

      const expectedLink = `/pokemons/${pokemons[0].id}`;

      expect(pathname).toEqual(expectedLink);
    });
  });
});
