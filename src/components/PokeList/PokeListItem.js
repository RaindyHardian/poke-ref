import React, { useEffect, useState } from "react";
import api from "../../api/api";

const PokeListItem = ({ name, url }) => {
  const [poke, setPoke] = useState({});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await api.getPokemon(url);
      setPoke(data);
      setError(error);
      setLoading(false);
    };
    fetch();
  }, [url]);
  return (
    <div>
      {loading ? (
        "loading"
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div>
          <img src={poke.sprites.front_default} alt="" />
          <div>{poke.name}</div>
        </div>
      )}
    </div>
  );
};

export default PokeListItem;
