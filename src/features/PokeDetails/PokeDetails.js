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
  }, [id]);
  return (
    <div className="pokedetails">
      {loading ? (
        "Loading"
      ) : error ? (
        "There's an error, please refresh the page"
      ) : (
        <div>
          <div className="pokedetails__info_section">
            <img
              className="pokedetails__image"
              src={poke.sprites.front_default}
              alt=""
            />
            <div className="pokedetails__info_box">
              <p className="pokedetails__name">{poke.name}</p>

              <div className="pokedetails__info">
                <p>TYPE</p>
                <div className="pokedetails__types">
                  {poke.types.map((item) => (
                    <div
                      className="pokedetails__type_item"
                      key={item.type.name}
                    >
                      {item.type.name}
                    </div>
                  ))}
                </div>
                <p>HEIGHT</p>
                <p className="">{poke.height} m</p>
                <p>WEIGHT</p>
                <p className="">{poke.weight} kg</p>
              </div>
            </div>
          </div>

          <div className="pokedetails__abilities_box">
            <div className="pokedetails__abilities_title">Abilities</div>
            <div className="pokedetails__abilities">
              {poke.abilities.map((item) => (
                <div key={item.ability.name}>{item.ability.name}</div>
              ))}
            </div>
          </div>
          <div className="pokedetails__stats_box">
            <div className="pokedetails__stats_title">Stats</div>
            <div className="pokedetails__stats_grid">
              {poke.stats.map((item) => (
                <div className="pokedetails__stats_item" key={item.stat.name}>
                  <div>{item.stat.name}</div>
                  <div className="pokedetails__stats_value">
                    {item.base_stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pokedetails__moves_box">
            <div className="pokedetails__moves_title">Moves</div>
            <div className="pokedetails__moves_grid">
              {poke.moves.map((item) => (
                <div key={item.move.name}>{item.move.name}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeDetails;
