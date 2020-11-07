import httpClient from "./httpClient";

async function getAllPokemon() {
  try {
    const { data, error } = await httpClient.get("/pokemon");
    if (error) {
      throw new Error(error);
    }
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

const api = {
  getAllPokemon
};
export default api;
