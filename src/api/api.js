import httpClient from "./httpClient";

async function getAllPokemon(query) {
  const offset = (parseInt(query) - 1) * 20;
  const param = `?offset=${offset}&limit=18`;
  try {
    const { data, error } = await httpClient.get(
      "https://pokeapi.co/api/v2/pokemon" + param
    );
    if (error) {
      throw new Error(error);
    }
    const temp = data;
    await Promise.all(
      data.results.map(async (res, idx) => {
        const { data, error } = await api.getPokemon(res.url);
        if (error) {
          throw new Error(error);
        }
        temp.results[idx].id = data.id;
        temp.results[idx].sprite = data.sprites.front_default;
        temp.results[idx].name = data.name;
      })
    );
    return { data: temp };
  } catch (error) {
    return { error: error.message };
  }
}

async function getPokemon(url) {
  try {
    const { data, error } = await httpClient.get(url);
    if (error) {
      throw new Error(error);
    }
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

async function getAllTypes() {
  try {
    const { data, error } = await httpClient.get(
      "https://pokeapi.co/api/v2/type"
    );
    if (error) {
      throw new Error(error);
    }
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

async function getType(url) {
  try {
    const { data, error } = await httpClient.get(url);
    if (error) {
      throw new Error(error);
    }
    const temp = data;
    await Promise.all(
      data.pokemon.map(async (res, idx) => {
        const pokeUrl = res.pokemon.url.substring(
          0,
          res.pokemon.url.length - 1
        );
        const { data, error } = await api.getPokemon(pokeUrl);
        if (error) {
          throw new Error(error);
        }
        temp.pokemon[idx].pokemon.id = data.id;
        temp.pokemon[idx].pokemon.sprite = data.sprites.front_default;
        temp.pokemon[idx].pokemon.name = data.name;
      })
    );
    return { data: temp };
  } catch (error) {
    return { error: error.message };
  }
}

const api = {
  getAllPokemon,
  getPokemon,
  getAllTypes,
  getType,
};
export default api;
