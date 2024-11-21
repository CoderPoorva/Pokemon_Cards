import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';
import './Pokemon.css';
import Paginations from './Pagination';
import { Pagination } from '@mui/material';


const Pokemon = () => {

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(4);
  const [allPokemon, setAllPokemon] = useState();
  const [totalData, setTotalData] = useState(0);



  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setAllPokemon(data);
      setTotalData(data.results.length);

      // const detailedPokemonData = data.results.map(async (curPokemon) => {
      //   const res = await fetch(curPokemon.url);
      //   const data = await res.json();
      //   return data;
      // });

      // const detailedResponses = await Promise.all(detailedPokemonData);
      // setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const lastPostIndex = pokemonPerPage * currentPage;
  const firstPostIndex = lastPostIndex - pokemonPerPage;

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>

        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }


  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <ul className="cards">
            {searchData.map((currPokemon) => {
              return (
                <PokemonCards key={currPokemon.id} pokemonData={currPokemon} />
              );
            })}
          </ul>
        </div>
        <Pagination count={totalData} color="secondary" />
        <Paginations setPokemon={setPokemon} allPokemon={allPokemon} firstPostIndex={firstPostIndex} lastPostIndex={lastPostIndex} postPerPage={pokemonPerPage} totalData={totalData} setCurrentPage={setCurrentPage} className='pagination' />
      </section>
    </>
  )
}

export default Pokemon