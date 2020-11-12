import axios from "axios";

const get = async (url = "", params = {}) => {
  const apis = axios.create({
    // baseURL: "https://pokeapi.co/api/v2/",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const result = {
    data: [],
    error: null
  };

  try {
    const res = await apis.get(url);
    if (res.status !== 200) {
      throw new Error("Error when fetching data");
    }
    result.data = res.data;
  } catch (err) {
    result.error = err.message;
  } finally {
    return result;
  }
};

const httpClient = { get };

export default httpClient;
