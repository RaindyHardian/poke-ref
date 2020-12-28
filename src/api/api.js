import httpClient from "./httpClient";

async function getAllPokemon(query) {
  const offset = (parseInt(query)-1)*20
  const param = `?offset=${offset}&limit=18`
  try {
    const { data, error } = await httpClient.get(
      "https://pokeapi.co/api/v2/pokemon"+param
    );
    if (error) {
      throw new Error(error);
    }
    return { data };
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

const api = {
  getAllPokemon,
  getPokemon
};
export default api;
