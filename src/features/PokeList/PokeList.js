import React, { useEffect, useState } from "react";
import api from "../../api/api";

const PokeList = () => {
  const [poke, setPoke] = useState({});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await api.getAllPokemon();
      setPoke(data);
      setError(error);
      setLoading(false);
    };
    fetch();
  }, []);
  
  return (
    <div>
      {loading
        ? "Loading"
        : error
        ? "There's an error, please refresh the page"
        : poke.results.map((res, idx) => <div key={idx}>{res.name}</div>)}
    </div>
  );
};

export default PokeList;
