import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';
import './Pokemon.css';
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

  const lastPostIndex = pokemonPerPage * currentPage;
  const firstPostIndex = lastPostIndex - pokemonPerPage;

  const fetchPokemonDetails = async () => {
    try {

      const data = [];

      //console.log(lastPostIndex);
      
      for(let i = firstPostIndex; i<lastPostIndex; i++){
        const res = await fetch(allPokemon.results[i].url);
        //console.log(res);
        data.push(res.json());
      }

      const detailedResponses = await Promise.all(data);

      //console.log(detailedResponses)

      setPokemon(detailedResponses);
    } catch (error) {

    }
  }

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setAllPokemon(data);
      //console.log(data);
      setTotalData(data.results.length);
      setLoading(false);
    } catch (error) {
      //console.log(error);
      setLoading(false);
      setError(error);
    }

  };

  useEffect(() => {
    if (allPokemon) {
      fetchPokemonDetails();
    }
  }, [currentPage, allPokemon]);

  
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

  const onClickFunction = (event,value ) => {
    setCurrentPage(value);
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
        <div className='pagination'><Pagination count={Math.ceil(totalData / pokemonPerPage)} page={currentPage} color="secondary" onChange={onClickFunction}/></div>
      </section>
    </>
  )
}

export default Pokemon