import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import axios from "axios";
import { notDeepEqual } from "assert";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

type PokemonData = {
  name: string;
  id: number;
  order: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: [
    {
      slot: number;
      type: {
        name: string;
      };
    }
  ];
};

const pokemonDataObj: PokemonData = {
  name: "bulbasaur",
  id: 6,
  order: 1,
  sprites: {
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
      },
    },
  ],
};

beforeEach(() =>
  mockedAxios.all.mockImplementation(() =>
    Promise.resolve([{ data: pokemonDataObj }])
  )
);

describe("Testando Pagina Home", () => {
  test("Buscando Pokemons", async () => {
    render(<Home />);

    const TextPokemon = pokemonDataObj.name;
    const ImgPokemon = pokemonDataObj.sprites.other.dream_world.front_default;

    await waitFor(() =>
      expect(screen.getByText(TextPokemon)).toBeInTheDocument()
    );

    expect(screen.queryByRole("img", { name: ImgPokemon })).toBeInTheDocument();
  });
  test("Filtro Pokemmons", async () => {
    render(<Home />);

    const TextPokemon = pokemonDataObj.name;

    const InputText = screen.getByTestId("pokemon-filter") as HTMLInputElement;

    await waitFor(() =>
      expect(screen.getByText(TextPokemon)).toBeInTheDocument()
    );

    fireEvent.change(InputText, { target: { value: "BULBASAUR" } });

    expect(InputText.value).toEqual("BULBASAUR");
    expect(screen.getByText(TextPokemon)).toBeInTheDocument();

    fireEvent.change(InputText, { target: { value: "BULBASSAUR" } });

    expect(InputText.value).toEqual("BULBASSAUR");
    expect(screen.queryByText("BULBASAUR")).not.toBeInTheDocument();

    expect(screen.getByTestId("color-ring-svg")).toBeInTheDocument()
  });
});
