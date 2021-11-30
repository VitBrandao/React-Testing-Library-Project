import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWIthRouter';

describe('Testando o componente App.js', () => {
  describe('Testa se o topo da aplicação contém links de navegação', () => {
    it('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeDefined();
    });

    it('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeDefined();
    });

    it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      renderWithRouter(<App />);

      const favoritePokemonsLink = screen.getByRole('link',
        { name: /Favorite Pokémons/i });
      expect(favoritePokemonsLink).toBeDefined();
    });
  });

  describe('Testa se os redirecionamentos estão funcionando', () => {
    it('Testa se redireciona para a página inicial ao clicar no link Home', () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeDefined();

      userEvent.click(homeLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    it('Testa se redireciona para a página about ao clicar no link About', () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeDefined();

      userEvent.click(aboutLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    it('Testa se redireciona para favoritos ao clicar em Favorite Pokemons', () => {
      const { history } = renderWithRouter(<App />);

      const favoritePokemonsLink = screen.getByRole('link',
        { name: /Favorite Pokémons/i });
      expect(favoritePokemonsLink).toBeDefined();

      userEvent.click(favoritePokemonsLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    it('Testa se redireciona para Not Found ao inserir uma URL inexistente', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/que-nao-existe/');

      const notFoundText = screen.getByRole('heading',
        { name: /Page requested not found/i });

      expect(notFoundText).toBeDefined();
    });
  });
});
