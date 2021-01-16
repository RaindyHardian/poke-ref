import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import { Link, useParams } from "react-router-dom";
import typeColor from "../../components/TypeList/typeColor";
import api from "../../api/api";
import "./pokedetails.css";

const PokeDetails = () => {
  const { id } = useParams();
  const [poke, setPoke] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data, error } = await api.getPokemon(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (error) {
          throw new Error(error);
        }
        setPoke(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  return (
    <div className="pokedetails">
      {loading ? (
        window.innerWidth >= 420 ? (
          <ContentLoader
            width={"550"}
            backgroundColor={"#e3e1e3"}
            foregroundColor={"#d4d4d4"}
            title="Loading Pokemon"
            data-testid="pokedetails-loading"
            style={{ height: "100vh" }}
          >
            <rect x="0" y="0" rx="4" ry="4" width="200" height="200" />
            <rect x="230" y="0" rx="4" ry="4" width="320" height="200" />
            <rect x="0" y="220" rx="4" ry="4" width="100%" height="100" />
            <rect x="0" y="340" rx="4" ry="4" width="100%" height="200" />
          </ContentLoader>
        ) : (
          <div data-testid="pokedetails-loading">Loading</div>
        )
      ) : error ? (
        <div data-testid="pokedetails-error">
          {error}, please refresh the page
        </div>
      ) : (
        <div className="pokedetails__content_wrap">
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
                      className={
                        "pokedetails__type_item " + typeColor(item.type.name)
                      }
                      key={item.type.name}
                    >
                      <Link
                        to={"/type/" + item.type.name}
                        className="pokedetails__type_link"
                      >
                        {item.type.name}
                      </Link>
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
