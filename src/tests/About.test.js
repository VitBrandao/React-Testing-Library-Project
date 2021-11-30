import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Testa se a página About contém as informações sobre a Pokédex', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(aboutTitle).toBeDefined();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const text1 = 'This application simulates a Pokédex, ';
    const text2 = 'a digital encyclopedia containing all Pokémons';
    const fullText = text1 + text2;
    const firstParagraph = screen.getByText(fullText);
    expect(firstParagraph).toBeDefined();

    const secondParagraph = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(secondParagraph).toBeDefined();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    render(<About />);

    const pokedexImg = screen.getByAltText(/Pokédex/i);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImg.src).toContain(URL);
  });
});
