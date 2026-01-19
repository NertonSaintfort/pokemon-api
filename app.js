const express = require("express");
const app = express();
const port = 3000;

const POKEMON_TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pokemon", (req, res) => {
  res.send("This is a pokemon");
});

app.get("/pokemon/list", (req, res) => {
  res.send(POKEMON_TYPES);
});

app.get("/pokemon/type/:type/:generation", (req, res) => {
  const { type, generation } = req.params;

  res.send(
    "This is a pokemon with type: " + type + " generation: " + generation
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
