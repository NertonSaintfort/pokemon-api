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
const { pokedex } = require("./data/pokedex.generated");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.get("/pokemon", (req, res) => {
  res.redirect("/pokemon/all");
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/pokemon/type/:type", (req, res) => {
  const { type } = req.params;
  //we want to check and make sure it's a string a not a number
  if (type.trim() !== "" && Number.isFinite(Number(type.trim()))) {
    return res.status(400).send({ error: "Pokemon types cannot be numbers" });
  }

  const normalizedType = type.toLowerCase();

  const ids = pokedex.index.byType[normalizedType];

  if (!ids) {
    return res.status(404).send({ error: "Pokemon type not found" });
  }

  const pokemonList = ids.map((id) => pokedex.pokemonById[String(id)]);

  return res.send(pokemonList);

  // console.log(type);
  // return;
});

app.get("/pokemon/:info/", (req, res) => {
  const { info } = req.params;
  const lowerCaseInfo = info.toLowerCase();
  if (info == "type") {
    return res.status(200).send(pokedex.types);
  }
  if (info == "all") {
    const names = [];
    for (const id in pokedex.pokemonById) {
      names.push(pokedex.pokemonById[id].name);
    }
    return res.status(200).send(names);
  }

  return res.status(400).send({ error: "Incorrect value sent" });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*
  REST requests to servers usually have a series of responses. 
  To try and create some type of consistency, long ago we created
  a list of "statuses" or codes that REST servers/apis should return

  200 - OK
  201 - Created

  301 - Moved Permanently
  308 - Permanent Redirect

  400 - Bad Request
  401 - Unauthorized
  403 - Forbidden
  404 - Not Found

  500 - Internal Server Error
  501 - Not Implemented
  502 - Bad Gateway
  503 - Service Unavailable



  https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
*/
