import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWIthRouter';
import App from '../App';

describe('Testa o componente Pokemon Details', () => {
  // Declarando em uma constante por questões de lint
  const pikachuURL = '/pokemons/25';

  describe('Testa se as informações do Pokémon selecionado são mostradas', () => {
    it('A página deve conter um texto <name> Details', () => {
      // Aprendi lá no Stack Overflow como fazer essa desestruturação a partir do render
      // Link: https://bit.ly/3DhwkoG (reduzido por questões de lint)
      const { history } = renderWithRouter(<App />);

      history.push(pikachuURL);

      const pokeName = screen.getByTestId('pokemon-name');
      expect(pokeName).toBeDefined();
      expect(pokeName).toHaveTextContent(/Pikachu/i);

      const nameDetails = screen.getByRole('heading',
        { name: /pikachu details/i });

      expect(nameDetails).toBeDefined();
    });

    it('Não deve existir o link de navegação para os detalhes', () => {
      const { history } = renderWithRouter(<App />);

      // O link deve ser 'resgatado' antes de ir para a página de detalhes
      const moreDetails = screen.getByRole('link',
        { name: /more details/i });

      history.push(pikachuURL);

      expect(moreDetails).not.toBeInTheDocument();
    });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuURL);

      const summaryText = screen.getByRole('heading',
        { name: /Summary/i });

      expect(summaryText).toBeDefined();
    });

    it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
      const { history } = renderWithRouter(<App />);
      history.push(pikachuURL);

      const paragraph1 = 'This intelligent Pokémon roasts hard berries ';
      const paragraph2 = 'with electricity to make them tender enough to eat.';
      const fullParagraph = paragraph1 + paragraph2;

      const paragraphDetails = screen.getByText(fullParagraph);

      expect(paragraphDetails).toBeDefined();
    });
  });

  describe('Testa se existe uma seção com os mapas contendo as localizações', () => {
    // Testando especificações para um novo pokemon
    const charmanderURL = 'pokemons/4';

    it('Deverá existir um heading h2 com o texto Game Locations of <name>', () => {
      const { history } = renderWithRouter(<App />);
      history.push(charmanderURL);

      const gameLocationsOf = screen.getByRole('heading',
        { name: /Game Locations of/i });

      expect(gameLocationsOf).toHaveTextContent(/charmander/i);
    });

    it('Todas as localizações devem ser mostradas na seção de detalhes', () => {
      const { history } = renderWithRouter(<App />);
      history.push(charmanderURL);

      // OBS: Esse teste também já cobre o requisito:
      // 'A imagem da localização deve ter um alt <name> location'

      const charmanderLocation = screen.getAllByAltText(/Charmander location/i);
      // Há um total de 4 localizações
      const expectedLength = 4;
      expect(charmanderLocation).toHaveLength(expectedLength);
    });

    it('Devem ser exibidos, o nome da localização e uma imagem do mapa', () => {
      const { history } = renderWithRouter(<App />);
      history.push(charmanderURL);

      // Localizações charmander: 3 locais em Kanto, 1 local em Alola;
      const kantoLocations = screen.getAllByText(/Kanto/i);
      const expectedLength = 3;
      expect(kantoLocations).toHaveLength(expectedLength);

      const alolaLocations = screen.getAllByText(/Alola/i);
      expect(alolaLocations).toHaveLength(1);
    });

    it('A imagem da localização deve ter um src com a URL da localização', () => {
      const { history } = renderWithRouter(<App />);
      history.push(charmanderURL);

      const charmanderLocation = screen.getAllByAltText(/Charmander location/i);

      const locationsSrc = [
        'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      ];

      charmanderLocation.map(
        (location, index) => expect(location.src).toBe(locationsSrc[index]),
      );
    });
  });

  describe('Teste se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const caterpieURL = 'pokemons/10';

    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      const { history } = renderWithRouter(<App />);
      history.push(caterpieURL);

      // OBS: Esse teste já cobre o requisito:
      // " O label do checkbox deve conter o texto Pokémon favoritado?; "
      const checkbox = screen.getByLabelText(/Pokémon Favoritado/i);
      expect(checkbox).toBeDefined();
    });

    it('Cliques alternados na checkbox devem adicionar e remover', () => {
      const { history } = renderWithRouter(<App />);
      history.push(caterpieURL);

      const checkbox = screen.getByLabelText(/Pokémon Favoritado/i);

      // Primeiro clique
      userEvent.click(checkbox);

      // Ao clicar, surge um novo elemento img
      const altText = 'Caterpie is marked as favorite';
      const isFavorite = screen.getByAltText(altText);
      expect(isFavorite).toBeDefined();

      // Segundo clique
      userEvent.click(checkbox);
      expect(isFavorite).not.toBeInTheDocument();
    });
  });
});
