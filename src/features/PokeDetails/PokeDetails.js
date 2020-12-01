import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const PokeDetails = () => {
  const { id } = useParams();
  const [poke, setPoke] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await api.getPokemon(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPoke(data);
      setError(error);
      setLoading(false);
    };
    fetch();
  }, []);
  return (
    <div>
      {loading ? (
        "Loading"
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div>
          <img src={poke.sprites.front_default} alt="" />
          <p>{poke.name}</p>
          <p>{poke.weight}</p>
          {poke.types.map((item) => (
            <div>{item.type.name}</div>
          ))}
          {poke.stats.map((item) => (
            <div>
              <div>{item.stat.name}</div>
              <div>{item.base_stat}</div>
            </div>
          ))}
          {poke.abilities.map((item) => (
            <div>{item.ability.name}</div>
          ))}
          {poke.moves.map((item) => (
            <div>{item.move.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
