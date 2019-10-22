import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


const MovieList: React.FC = () => {
  const [ movies, setMovies] = useState([]);
  useEffect(() => {
    if(movies.length < 1) {
      axios.get('http://localhost:5000/movies/')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(`Error: ${err}`)
      });
    }
  });
  return (
    <div>
       {movies.length > 0 ? (<ReactTable
          data={movies}
          pageSizeOptions={[10, 20, 30, 50, 100, 200, 500]}
          columns={[
            {
              Header: 'Title',
              accessor: 'title',
              className: 'frozen'
            },
            {
              Header: 'Plot',
              accessor: 'plot'
            },
            {
              Header: 'Runtime',
              accessor: 'runtime'
            },
            {
              Header: 'Type',
              accessor: 'type'
            }
          ]}
          defaultPageSize={10}
          className='-striped -highlight'
      />) : (<p>Loading . . .</p>)}

    </div>
  );
}

export default MovieList;
