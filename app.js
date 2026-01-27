/*
  
Basic Idea:
  The Idea of this API is to provide basic description of pokemon types
  and names

Details:
  Shows all the pokemon types: /pokemon/types

  Show All pokemon by name alphabetical /pokemon/all

  //Investigate and complete
  Show a specific pokemon with description /pokemon/name/{name}

  Show all pokemon by type /pokemon/type/{type}

*/

//How you can run this now -> nodemon app.js

const express = require("express");
const app = express();
const port = 3000;

//import our pokemon data
<<<<<<< HEAD
const { pokedex } = require("./data/pokedex.generated");
=======
const { pokedex } = require("./data/pokedex.generated")
>>>>>>> a498d835a069693610f7b3cffd2070fcf95e24ed

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pokemon/types", (req, res) => {

  res.send(pokedex.types);
  res.send(pokedex.types)

});

app.get("/pokemon/all", (req, res) => {
  const names = [];
  for (const id in pokedex.pokemonById) {
    names.push(pokedex.pokemonById[id].name);
  }

<<<<<<< HEAD
  res.send(names);
});

app.get("/pokemon/name/:name", (req, res) => {
  //hint: to get the name passed in you would do
  const { name } = req.params;
  for (const id in pokedex.pokemonById) {
    const pokemon = pokedex.pokemonById[id];

    if (pokemon.name.toLowerCase() === name.toLowerCase()) {
      return res.send(pokemon);
    }
  }
  // console.log(name);
  // return;
  res.status(404).send({ error: "Pokemon not found" });
});

app.get("/pokemon/type/:type", (req, res) => {
  const { type } = req.params;
  const normalizedType = type.toLowerCase();

  const ids = pokedex.index.byType[normalizedType];

  if (!ids) {
    return res.status(404).send({ error: "Pokemon type not found" });
  }

  const pokemonList = ids.map((id) => pokedex.pokemonById[String(id)]);

  res.send(pokemonList);

  // console.log(type);
  // return;
=======
  res.send(names)
});

app.get("/pokemon/name/:name", (req, res) => {
  //hint: to get the name passed in you would do 
  const {name} = req.params;
  console.log(name);
  return;
>>>>>>> a498d835a069693610f7b3cffd2070fcf95e24ed
});

app.get("/pokemon/type/:type", (req, res) => {
  const {type} = req.params;
  console.log(type);
  return;
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
