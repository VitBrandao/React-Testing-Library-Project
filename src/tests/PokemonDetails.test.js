import React from 'react';
import { screen } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../RenderWIthRouter';
import App from '../App';

describe('Testa o componente Pokemon Details', () => {
  describe('Testa se as informações do Pokémon selecionado são mostradas', () => {
    it('A página deve conter um texto <name> Details', () => {
      // Aprendi lá no Stack Overflow como fazer essa desestruturação a partir do render
      // Link: https://bit.ly/3DhwkoG (reduzido por questões de lint)
      const { history } = renderWithRouter(<App />);

      history.push('/pokemons/25');

      const pokeName = screen.getByTestId('pokemon-name');
      expect(pokeName).toBeDefined();
      expect(pokeName).toHaveTextContent(/Pikachu/i);

      const nameDetails = screen.getByRole('heading',
        { name: /pikachu details/i});
        
      expect(nameDetails).toBeDefined();
    });

    it('Não deve existir o link de navegação para os detalhes', () => {
      const { history } = renderWithRouter(<App />);

      // O link deve ser 'resgatado' antes de ir para a página de detalhes
      const moreDetails = screen.getByRole('link', 
        { name: /more details/i });

      history.push('/pokemons/25');

      expect(moreDetails).not.toBeInTheDocument();      
    });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pokemons/25');

      const summaryText = screen.getByRole('heading', 
        { name: /Summary/i });

      expect(summaryText).toBeDefined();
    });

    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pokemons/25');

      const paragraph1 = 'This intelligent Pokémon roasts hard berries ';
      const paragraph2 = 'with electricity to make them tender enough to eat.';
      const fullParagraph = paragraph1 + paragraph2;
      
      const paragraphDetails = screen.getByText(fullParagraph);

      expect(paragraphDetails).toBeDefined();
    });
  });

})