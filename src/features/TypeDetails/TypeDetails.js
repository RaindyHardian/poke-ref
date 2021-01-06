import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import typeColor from "../../components/TypeList/typeColor";
import TypeListItem from "../../components/TypeList/TypeListItem";
import "./typedetails.css";

const TypeDetails = () => {
  const { id } = useParams();
  const [type, setType] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data, error } = await api.getPokemon(
          "https://pokeapi.co/api/v2/type/" + id
        );
        if (error) {
          throw new Error(error);
        }
        setType(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);
  return (
    <div className="typedetails">
      <h1 className="typedetails__title">{id} type</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}, please refresh the page</div>
      ) : (
        <div>
          <div className="typedetails__damage">
            <div className="typedetails__damage_attack">
              <h2 className="typedetails__damage_title">
                Attack Pros and Cons
              </h2>

              <div className="typedetails__damage_block">
                <div className="typedetails__damage_desc">
                  <svg
                    className="icon-check typedetails__check"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="typedetails__p">
                    {id} moves are super-effective against:
                  </p>
                </div>
                <div className="typedetails__types">
                  {type.damage_relations.double_damage_to.map(({ name }) => (
                    <div
                      key={name}
                      className={"typedetails__type " + typeColor(name)}
                    >
                      <Link to={"/type/" + name} className="typedetails__link">
                        {name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="typedetails__damage_block">
                <div className="typedetails__damage_desc">
                  <svg
                    className="icon-cross typedetails__check"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p className="typedetails__p">
                    {id} moves are not very effective against:
                  </p>
                </div>
                <div className="typedetails__types">
                  {type.damage_relations.half_damage_to.map(({ name }) => (
                    <div
                      key={name}
                      className={"typedetails__type " + typeColor(name)}
                    >
                      <Link to={"/type/" + name} className="typedetails__link">
                        {name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="typedetails__damage_defence">
              <h2 className="typedetails__damage_title">
                Defence Pros and Cons
              </h2>

              <div className="typedetails__damage_block">
                <div className="typedetails__damage_desc">
                  <svg
                    className="icon-check typedetails__check"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="typedetails__p">
                    These types are not very effective against {id} Pokémon
                  </p>
                </div>
                <div className="typedetails__types">
                  {type.damage_relations.half_damage_from.map(({ name }) => (
                    <div
                      key={name}
                      className={"typedetails__type " + typeColor(name)}
                    >
                      <Link to={"/type/" + name} className="typedetails__link">
                        {name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="typedetails__damage_block">
                <div className="typedetails__damage_desc">
                  <svg
                    className="icon-cross typedetails__check"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p className="typedetails__p">
                    These types are super-effective against {id} Pokémon
                  </p>
                </div>
                <div className="typedetails__types">
                  {type.damage_relations.double_damage_from.map(({ name }) => (
                    <div
                      key={name}
                      className={"typedetails__type " + typeColor(name)}
                    >
                      <Link to={"/type/" + name} className="typedetails__link">
                        {name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeDetails;