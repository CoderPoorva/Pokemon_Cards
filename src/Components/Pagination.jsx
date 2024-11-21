import React, { useEffect } from 'react'

const Paginations = ({setPokemon, postPerPage,totalData,setCurrentPage,firstPostIndex, lastPostIndex, allPokemon}) => {

  const onClickFunction = (number) => {
    setCurrentPage(number);
    fetchPokemonDetails();
  }

  const fetchPokemonDetails = async () => {
    try {

      const data = [];
      for(let i = firstPostIndex; i<lastPostIndex; i++){
        const res = await fetch(allPokemon.results[i].url);
        console.log(res);
        data.push(res.json());
      }

      const detailedResponses = await Promise.all(data);

      console.log(detailedResponses)

      setPokemon(detailedResponses);
    } catch (error) {

    }
  }
 
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / postPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  return (
    <div>
      {pageNumbers.map(number => (
        <button className='pageNumber' key={number} onClick={() => onClickFunction(number)} >
          {number}
        </button>
      ))}
    </div>
  )
}

export default Paginations