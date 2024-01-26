export type PokemonType = {
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
  }