import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import "./pokedetails.css";

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
    <div className="pokedetails">
      {loading ? (
        "Loading"
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div>
          <p className="pokedetails__name">{poke.name}</p>
          <img
            className="pokedetails__image"
            src={poke.sprites.front_default}
            alt=""
          />
          <div className="pokedetails__types">
            {poke.types.map((item) => (
              <div className="pokedetails__type_item">{item.type.name}</div>
            ))}
          </div>
          <div className="pokedetails__info">
            <div className="pokedetails__info_height">
              <p>Height</p>
              <p className="">{poke.height} m</p>
            </div>
            <div className="pokedetails__info_weight">
              <p>Weight</p>
              <p className="">{poke.weight} kg</p>
            </div>
          </div>
          <div className="pokedetails__abilities">
            <div>Abilities</div>
            {poke.abilities.map((item) => (
              <div>{item.ability.name}</div>
            ))}
          </div>
          <div className="pokedetails__stats">
            <div>Stats</div>
            <div className="pokedetails__stats_grid">
              {poke.stats.map((item) => (
                <div>
                  <div>{item.stat.name}</div>
                  <div>{item.base_stat}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pokedetails__moves">
            <div>Moves</div>
            <div className="pokedetails__moves_grid">
              {poke.moves.map((item) => (
                <div>{item.move.name}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
