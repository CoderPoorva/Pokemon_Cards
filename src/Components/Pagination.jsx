import React from 'react'

const Paginations = ({postPerPage,totalData,setCurrentPage}) => {
 
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map(number => (
        <button className='pageNumber' key={number} onClick={() => setCurrentPage(number)}>
          {number}
        </button>
      ))}
    </div>
  )
}

export default Paginations