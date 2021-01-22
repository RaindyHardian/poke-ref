const typeColor = (type) => {
  if (type === "normal") {
    return "type-normal";
  } else if (type === "fighting") {
    return "type-fighting";
  } else if (type === "flying") {
    return "type-flying";
  } else if (type === "poison") {
    return "type-poison";
  } else if (type === "ground") {
    return "type-ground";
  } else if (type === "rock") {
    return "type-rock";
  } else if (type === "bug") {
    return "type-bug";
  } else if (type === "ghost") {
    return "type-ghost";
  } else if (type === "steel") {
    return "type-steel";
  } else if (type === "fire") {
    return "type-fire";
  } else if (type === "water") {
    return "type-water";
  } else if (type === "grass") {
    return "type-grass";
  } else if (type === "electric") {
    return "type-electric";
  } else if (type === "psychic") {
    return "type-psychic";
  } else if (type === "ice") {
    return "type-ice";
  } else if (type === "dragon") {
    return "type-dragon";
  } else if (type === "dark") {
    return "type-dark";
  } else if (type === "fairy") {
    return "type-fairy";
  } else if (type === "unknown") {
    return "type-unknown";
  } else if (type === "shadow") {
    return "type-shadow";
  }
};

export default typeColor;
