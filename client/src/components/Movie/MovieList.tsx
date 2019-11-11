import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import styled from 'styled-components';

import { Table } from '../Table/Table';

import { Movie } from '../../models/Movie';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`
export function MovieList() {
  const [ movies, setMovies] = useState<Movie[]>([]);
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

  const columns = useMemo(
    () => [
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
      ],[]);

  return ( movies.length > 0 ?
    (
      <Styles>
        <Table<Movie> columns={columns} data={movies}/>
      </Styles>
    ) : (
      <p>Loading . . .</p>
    ));
}
